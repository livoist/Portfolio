# 作品集展示網頁（Vue 3 + Vite）

個人作品集網站，Vue 3 + TypeScript 重寫版本（原始 Vue 2 版本見上層目錄）。單頁式應用，大量使用 GSAP 時間軸、Three.js（three.meshline）動態線條背景，以及自訂的頁面旋轉過場效果。

## 使用技術

- Vue 3（`<script setup>`）+ TypeScript
- Vite
- Pinia（狀態管理）
- GSAP（動畫時間軸）
- Three.js + three.meshline（背景 3D 線條動畫）
- vue-i18n（英 / 日 / 中語言切換）
- smooth-scrollbar
- charming（逐字文字動畫）

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

- 進場載入動畫、語言切換（英 / 日 / 中）
- 背景 3D 線條動畫與配色切換
- 滑鼠游標追蹤效果（桌面版）
- 作品集網格展示，點擊可查看細節（含上一個 / 下一個切換）
- 進場、返回主頁的動畫過場效果

## 效能優化

在功能與畫面不變的前提下，針對載入速度、執行期效能與記憶體做了一系列優化（2026-11 量測）：

| 項目 | 優化前 | 優化後 |
| --- | --- | --- |
| 首屏 JS | 1,016 KB（gzip 290 KB） | 291 KB（gzip 107 KB） |
| 作品圖片 | 664 KB（PNG） | 110 KB（WebP） |
| 字型 CSS 開始下載時間 | 673 ms | 399 ms |
| 背景線條的 GPU 記憶體 | 隨時間持續累積 | 線條消失即釋放 |
| 背景線條渲染 | 切到作品頁後仍持續渲染 | 看不見時暫停 |

- 延後載入 Three.js，在載入畫面期間於背景下載
- 以 inline SVG 取代 FontAwesome
- 第三方套件拆成獨立 chunk，重新部署後可沿用瀏覽器快取
- 圖片改用 WebP，並預留尺寸避免版面位移
- Google Fonts 改由 `<link>` + `preconnect` 載入，移除未使用的字型
- 釋放 three.js 的 GPU 資源，背景看不見時暫停渲染

各項的原因分析、取捨與量測方式，請見 [docs/performance.md](docs/performance.md)。
