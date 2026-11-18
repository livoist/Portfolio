# 效能優化紀錄

這份文件記錄作品集網站的效能優化：每一項的原因、做法、取捨，以及如何量測。README 只列出成果摘要，細節都在這裡。

> 數字為 2026-11 的量測結果。之後新增作品或升級套件，數字會跟著改變；要更新時，請用文末的「量測方式」重新量測。

## 成果總覽

| 項目 | 優化前 | 優化後 |
| --- | --- | --- |
| 首屏 JS | 1,016 KB（gzip 290 KB） | 291 KB（gzip 107 KB），減少約 71% |
| 作品圖片 | 664 KB（PNG） | 110 KB（WebP），減少約 83% |
| 字型 CSS 開始下載時間 | 673 ms（需等網站 CSS 下載完） | 399 ms（與網站 CSS 同時開始） |
| 背景線條的 GPU 記憶體 | 隨時間持續累積 | 線條消失即釋放 |
| 背景線條渲染 | 切到作品頁後仍每幀渲染 | 被作品頁完全蓋住時暫停 |

## 載入速度

### 延後載入 Three.js

**問題**：所有程式碼都打包在一個 1,016 KB 的檔案裡，其中 three.js 就佔了約 60%。瀏覽器必須下載並解析完整個檔案，才會顯示任何畫面，連載入畫面也要等。

**做法**：背景線條要等載入畫面結束、再延遲 6.5 秒才會建立，所以 three.js 不需要出現在首屏。`EnterView.vue` 改用動態 `import('@/meshAn')`，Vite 會把 three.js、three.meshline 和 `src/meshAn/` 拆成獨立的 chunk。

**取捨**：
- `import()` 寫在 `<script setup>` 頂層，元件建立時就開始下載，和載入畫面平行進行。如果等到要用時才呼叫，線條會明顯晚出現。「拆開」和「何時開始載入」是兩件事。
- 型別改用 `import type { Engine }`，編譯後會被移除，不會把 three.js 帶回主 bundle。
- 動態載入多了下載失敗的可能，因此加上 `try/catch`。背景線條只是裝飾，失敗時略過即可，頁面照常運作。
- 這裡不使用 `defineAsyncComponent`：它是用來延後載入 Vue 元件的，而 `@/meshAn` 是一般的 class 和函式，不是元件。

### 以 inline SVG 取代 FontAwesome

**問題**：全站只用到 3 個社群 icon（GitHub、Medium、LinkedIn），卻要載入約 100 KB 的 FontAwesome 執行環境。

**做法**：icon 改為 `src/assets/icons/*.svg`，用 Vite 的 `?raw` 以字串形式內嵌進 JS，再透過 `v-html` 渲染。

**取捨**：
- 不使用 `<img src="icon.svg">`：`<img>` 裡的 SVG 讀不到外層 CSS 的 `color`，`fill="currentColor"` 會失效，hover 變色的效果就沒了；而且每個 icon 都會多一個網路請求。
- `v-html` 的內容是自己的靜態檔案，在 build 時就固定了，沒有 XSS 風險。
- FontAwesome 原本會在執行時注入 icon 的尺寸樣式。移除後，這段樣式要自己補進 `contact.css`，否則 SVG 會套用瀏覽器預設的 300×150 大小。
- icon 路徑來自 Font Awesome Free（CC BY 4.0），每個 SVG 檔都保留了出處註解。

### 第三方套件拆成獨立 chunk

**問題**：只要改動一點網站內容，整包 JS 的 hash 就會改變，回訪者必須重新下載全部。

**做法**：在 `vite.config.ts` 的 `codeSplitting.groups` 中，把 vue / pinia / vue-i18n 拆成 `vue-vendor`，gsap / smooth-scrollbar / charming 拆成 `vendor`。只改動網站內容時，這兩個 chunk 的 hash 不變，可以沿用瀏覽器快取，回訪者只需重新下載約 34 KB 的網站程式碼。

**取捨**：
- 這項**不會**讓第一次載入變快，總量不變，只是分成多個檔案。好處在於重新部署之後。
- **刻意不使用涵蓋所有 `node_modules` 的規則**。那會把 three.js 也放進首屏的 vendor chunk，等於讓延後載入白做。build 不會報錯，畫面也正常，只是悄悄變慢，很難發現。
- 驗證方式：檢查 `dist/index.html` 的 `modulepreload` 不包含 `meshAn`，並在產出的 JS 中搜尋 `WebGLRenderer`，確認它只出現在 `meshAn-*.js` 裡。

### 圖片改用 WebP

**問題**：5 張作品截圖用 PNG，共 664 KB。

**做法**：用 `cwebp` 轉檔。每張圖都比較 q90 有損和無損的大小，取較小者（色塊單純的 UI 圖，無損反而只要 5 KB）。

| 圖片 | PNG | WebP |
| --- | --- | --- |
| portfolio0 | 94 KB | 24 KB（q90） |
| portfolio1 | 203 KB | 38 KB（q90） |
| portfolio2 | 301 KB | 32 KB（q90） |
| portfolio3 | 30 KB | 5 KB（無損） |
| portfolio4 | 36 KB | 11 KB（q90） |

**取捨**：
- 只用 WebP，不做 AVIF：實測這幾張圖用 AVIF 沒有比 WebP 小，而 WebP 所有主流瀏覽器都支援，不需要 `<picture>` fallback。
- 用 q90 而不是 q85：作品截圖的畫質很重要，而兩者只差幾 KB。
- 沒有縮小圖片尺寸：圖片寬約 600px，在詳細頁約以 547px 顯示，Retina 螢幕上其實還不夠清晰。
- 格線的 `<img>` 加上 `width="600" height="380"`，搭配 CSS `height: auto`。瀏覽器在圖片下載前就能預留正確比例，避免版面位移；smooth-scrollbar 一開始量到的頁面高度也會是正確的。

### Google Fonts 載入方式

**問題**：字型用 CSS `@import` 載入，必須等網站自己的 CSS 下載並解析完，才會開始請求 Google Fonts，形成一條串連的鏈。

**做法**：
- 改在 `index.html` 用 `<link rel="stylesheet">` 載入，瀏覽器解析 HTML 時就能發現，與網站 CSS 平行下載。
- 加上 `preconnect`，提早完成 DNS 查詢和 TLS 交握。`fonts.gstatic.com` 一定要加 `crossorigin`，因為字型檔是用 CORS 模式下載的，沒加的話，預先建立的連線不會被使用。
- 多個字型合併為一個請求。
- 移除 Julius Sans One：它在 `font-family` 中排在 Shippori Mincho 之後，而 Shippori Mincho 本身就有英文字母，所以永遠輪不到它。實測只下載了 1 KB 的 CSS，字型檔一次都沒下載過。

**補充**：Noto Serif TC 看起來很大，但 Google Fonts 會依 `unicode-range` 把中日文字型切成上百個小片段，瀏覽器只下載實際用到的字。實測只下載了 2 個片段、共 6 KB，所以不需要用 `&text=` 縮小。

## 執行期效能與記憶體

### 釋放 three.js 的 GPU 資源

**問題**：背景每秒大約產生 12 條線。線條消失時，原本只是從場景移除，但 three.js renderer 內部仍保有 geometry 的引用，所以 GC 無法回收，GPU 上的頂點 buffer 也一直留著。頁面開得越久，記憶體就越多。

**做法**：`AnimatedMeshLine` 新增 `dispose()`，釋放 geometry 和 material。`LineGenerator` 在線條消失（`removeLine()`）和重建（`clear()`）時呼叫它。

**驗證**：DevTools → Memory 拍兩次 Heap snapshot，中間隔幾分鐘，用 Comparison 模式搜尋 `MeshLine`。優化前，# Delta 持續為正；優化後接近 0。

### 背景看不見時暫停渲染

**問題**：背景的 `requestAnimationFrame` 迴圈從頁面載入後就一直執行。切到作品頁、背景完全被蓋住時，仍然每一幀都在渲染。

**做法**：`Engine` 新增 `pause()`，`start()` 可以重複呼叫。進入作品頁的轉場結束後暫停，回到首頁時在轉場開始前就恢復，讓背景淡入時已經在動。

### 避免多餘的畫布重新配置

**問題**：`renderer.setSize()` 會讓 GPU 重新配置繪圖緩衝區。手機轉向時，`orientationchange` 和 `resize` 會各觸發一次，同樣的尺寸被設定兩次。

**做法**：視窗尺寸沒變時，略過 `setSize()`。

**取捨**：沒有加上 debounce。`resize` 事件本來就最多每一幀觸發一次；如果加了 debounce，拖曳視窗的過程中畫布會停在舊尺寸，露出空白或被裁切。

## 量測方式

| 項目 | 方式 |
| --- | --- |
| 打包大小 | `npm run build` 輸出的檔案大小（含 gzip） |
| 記憶體洩漏 | DevTools → Memory → Heap snapshot（Comparison 模式），搜尋 `MeshLine`、`BufferAttribute` |
| 渲染負擔 | DevTools → Performance monitor（CPU usage、JS heap size） |
| 網路請求的時間點 | DevTools → Network；或用 headless Chrome（puppeteer）記錄請求的開始時間 |

注意事項：
- 要看 class 名稱時，請用 `npm run dev`。production build 會把名稱壓縮，搜不到。
- 要看 chunk 拆分的結果時，請用 `npm run build && npm run preview`。dev 模式不會打包，看到的是許多個小檔案。
- headless Chrome 沒有 GPU，WebGL 只能用 CPU 軟體渲染，畫面大約每秒只有 4 幀。量測與 WebGL 無關的項目時，可以攔截 `meshAn` chunk 的請求，讓背景線條不載入，避免干擾結果。
