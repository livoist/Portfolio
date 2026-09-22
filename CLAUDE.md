# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A Vue 3 + TypeScript + Vite single-page portfolio site (Chinese README), rewritten from an earlier Vue 2 version. Heavy use of GSAP timelines, Three.js (via `three.meshline`) for animated background line art, and custom page-transition/rotation effects. No test suite and no lint config exist in this repo.

## Commands

```bash
npm run dev       # vite dev server with HMR, http://localhost:5173
npm run build     # vue-tsc type-check + production build to dist/
npm run preview   # preview the production build locally
npm run deploy    # build, then publish dist/ to the gh-pages branch (gh-pages package) — deployed at https://livoist.github.io/Portfolio/
```

There are no test or lint scripts configured — don't assume `npm test` or `npm run lint` exist.

`vite.config.ts` sets `base: '/Portfolio/'` to match the GitHub Pages project-site path — don't remove it, or built asset URLs will 404 when deployed.

## Architecture

**Not a multi-route app.** There is no `vue-router` instance. The site is a single page whose "views" are toggled via a Pinia store and GSAP timelines/CSS classes rather than route changes — treat `EnterView` (intro/landing) and `GridLists` (portfolio grid) as two state-driven sections of one `App.vue`, not separate routes.

**Central state (`src/stores/portfolio.ts`, Pinia)** coordinates cross-component animation state: which DOM elements are the "first page" (`EnterView`) and "second page" (`GridLists`) container refs, transition-reverse flags (`isReverse`), current i18n language, grid item overlay/full-view state (`fullView`, `curFullViewID`), and the active color map for the 3D line background. Components read/call store actions to synchronize timelines across otherwise-unrelated components (e.g. `App.vue` captures `firstEl`/`secEl` refs on mount and stores them so child components can animate them).

**Path aliases** (kept in sync between `vite.config.ts` and `tsconfig.app.json`): `@` → `src`, `@c` → `src/components`, `@css` → `src/assets/style`, `@img` → `src/assets/img`. Barrel files `src/components/index.ts` and `src/views/index.ts` re-export all components/views — import from `@c` / `@/views`, not individual files. `src/assets/img/index.ts` eagerly globs every image under `src/assets/img/` via `import.meta.glob` and exposes them through `getImg(filename)` — **only add images that are actually referenced**, since anything dropped in that folder gets bundled into `dist/` whether it's used or not.

**Animation systems, each self-contained:**
- `src/meshAn/` — a small custom Three.js render engine (`Engine` class: scene/camera/renderer + per-frame `update()` loop over registered meshes) plus decorators/mixins (`FullScreenInBackground`, `HandleCameraOrbit`) and line generators (`CustomLineGenerator`, `LineGenerator`, `AnimatedMeshLine`) that draw the animated background line art using `three.meshline`. Composed in `EnterView.vue`'s `meshLine()` method using function-mixin composition (`FullScreenInBackground(HandleCameraOrbit({x,y})(Engine))`). The render loop runs via `requestAnimationFrame` for the lifetime of the page — there is currently no pause/resume when the canvas is hidden behind the grid view.
- `src/rotateLayout/rotateLayout.ts` — a `Revealer`/`RotateLayout` class that rotates a DOM element and sizes its inner content to fully cover the viewport at an arbitrary angle, used for the angled panel-reveal transitions.
- `src/mouse/mouseEvent.ts` — custom cursor tracking (`MouseCursor`) that follows the pointer (via `gsap.quickTo` for cheap high-frequency updates) and swaps cursor style/z-index based on hovered element classes/tags; only active above 1024px width.
- GSAP (`TimelineMax`/`TweenMax` from the `gsap` package) drives nearly all animation sequencing; `charming` splits heading text into per-letter `<span>`s for staggered letter animations.

**i18n**: `vue-i18n` with `en`/`jp` locale JSON files under `src/i18n/`, loaded in `main.ts`. Language switching also toggles `store.lang`, which several components watch to pick which language-specific timeline/content to animate.

**Styling**: plain CSS under `src/assets/style/`, split into partials (`reset.css`, `keyframe.css`, etc.) and imported globally via `main.css` (imported from `App.vue`). Templates are standard Vue SFC HTML (not pug).

## Working in this codebase

- When adding new portfolio grid items, `GridLists.vue`'s `gridContents` array (id/date/skill/link/i18Tag) drives rendering, and each item's grid position is hardcoded per-`id` in the component's scoped CSS (`.portfolio0`, `.portfolio1`, ...) — both need updating together, and i18n keys (`preview-name-<i18Tag>`, `preview-des-content-<i18Tag>`) must exist in both `en.json` and `jp.json`. The referenced image (`portfolio<id>.png`) must exist under `src/assets/img/`.
- `OverlayDetail.vue`'s local `curId` ref and the store's `curFullViewID` must be kept in sync on every path that changes which item is showing (grid click, prev/next arrows, close) — a watcher only fires on an actual value *change*, so if one path updates `curId` without also updating the store (or vice versa), re-opening the same item can silently show stale content.
- Animation timelines throughout heavily reference `this.$refs`/template refs and store-provided DOM element refs (`firstPageEl`, `secPageEl`, `gridItems`, `overlayElems`); when modifying a component's template structure, check whether other components' GSAP timelines depend on those ref names/DOM structure before renaming or restructuring.
