# 作品集展示網頁（Vue 3 + Vite）

個人作品集網站，Vue 3 + TypeScript 重寫版本（原始 Vue 2 版本見上層目錄）。單頁式應用，大量使用 GSAP 時間軸、Three.js（three.meshline）動態線條背景，以及自訂的頁面旋轉過場效果。

## 使用技術

- Vue 3（`<script setup>`）+ TypeScript
- Vite
- Pinia（狀態管理）
- GSAP（動畫時間軸）
- Three.js + three.meshline（背景 3D 線條動畫）
- vue-i18n（英 / 日語言切換）
- smooth-scrollbar
- charming（逐字文字動畫）
- FontAwesome

## 開發

```bash
npm install
npm run dev       # 啟動開發伺服器（HMR），預設 http://localhost:5173
npm run build     # TypeScript 型別檢查 + 打包到 dist/
npm run preview   # 本機預覽 build 後的成果
```

## 專案結構

這是單頁應用，沒有使用 vue-router；「進入頁」（`EnterView`）與「作品展示頁」（`GridLists`）是靠 Pinia store 狀態切換的兩個區塊，而不是路由頁面。

路徑別名（見 `vite.config.ts`）：

| 別名   | 指向                  |
| ------ | --------------------- |
| `@`    | `src`                 |
| `@c`   | `src/components`      |
| `@css` | `src/assets/style`    |
| `@img` | `src/assets/img`      |

其他重點目錄：

- `src/meshAn/` — 自製的輕量 Three.js render engine，負責背景動態線條動畫。
- `src/rotateLayout/` — 面板旋轉過場效果（`Revealer`/`RotateLayout`）。
- `src/mouse/` — 自訂滑鼠游標追蹤效果（僅在寬度 > 1024px 啟用）。
- `src/stores/portfolio.ts` — 集中管理跨元件的動畫狀態，例如目前顯示頁、語言、3D 線條配色、作品明細開關等。

## 功能特色

- 進場載入動畫、語言切換（英 / 日）
- 背景 3D 線條動畫與配色切換
- 滑鼠游標追蹤效果（桌面版）
- 作品集網格展示，點擊可查看細節（含上一個 / 下一個切換）
- 進場、返回主頁的動畫過場效果
