# 🔮 Tarot Draw Frontend

> 線上抽塔羅的單頁應用，以 **Vue 3 + Vite + TypeScript** 實作，支援大／小阿爾克那選牌、自訂抽牌數量、正逆位顯示、結果複製與 Canvas 星星背景等。
>
> ✨ 點此開始占卜：https://inagakiromi.github.io/tarot-draw-frontend/

---

## 🧠 專案介紹

**Tarot Draw Frontend** 是一款結合占卜體驗與網頁互動設計的線上塔羅抽牌系統。  
使用者只需選擇牌組與抽牌數量，即可隨機抽出代表當下狀態的塔羅牌，並以動態動畫呈現結果。

網站支援 **大／小阿爾克那牌組切換**、**正逆位顯示**、**一鍵複製結果** 等功能，  
讓使用者能以最直覺的方式完成抽牌、紀錄占卜結果，並可自由在桌機或手機上操作。

---

## 🧰 技術架構

- **Vue 3 + TypeScript + Composition API** 架構開發，模組化且型別安全。
- **Vite 7**：建置與開發伺服器。
- **Vue Router**：前端路由。
- **Tailwind CSS 4**：樣式與 RWD。
- **ESLint**、**Prettier**：程式碼檢查與格式化。
- 以 **Composables 模式** 將邏輯與畫面解耦（如：`useTarotCard`、`useFadeInAnimation`、`useCopyDrawResult`）。
- 使用 `ref` 與 `reactive` 實現響應式狀態管理，確保 UI 與資料同步。

---

## ✨ 互動與動畫

- **複製提示動畫**：提供抽牌結果一鍵複製並顯示提示動畫，增強使用者互動回饋。
- **星空背景效果**：
  - 使用原生 **Canvas API** 製作高效能、無依賴的閃爍星星動畫。
  - 封裝為 `useStarCanvas` Composable，與 Composition API 完美整合。
  - 採用 `requestAnimationFrame` 控制動畫循環，並實作透明度變化模擬星星閃爍。
  - 根據視窗尺寸自動調整畫布與星星位置，實現全螢幕自適應效果。
  - 內建 **清理機制**，移除動畫與事件監聽，避免記憶體洩漏。
- **抽牌／改數量**：卡牌區域淡入上移動畫，提升操作回饋。

---

## 📱 響應式設計

- 完整支援 RWD（512px、840px 斷點），適配電腦、平板、手機裝置，確保良好使用體驗。
- 調整標題、按鈕、卡牌尺寸與排版；金色標題、紫色按鈕與邊框、四角月亮裝飾。

---

## 🔧 已實作功能

- 大／小阿爾克那牌組切換（22 張／78 張，切換時重置抽牌數量與畫面）
- 隨機抽牌（含正逆位、避免重複）
- 抽牌數量可自訂（1～牌組最大張數，邊界檢查與錯誤提示）
- 正逆位顯示（牌名含正逆位，逆位牌 180° 旋轉）
- 動態抽牌顯示（翻轉＋淡入動畫）
- 抽牌結果一鍵複製（換行分隔，顯示「已複製！」提示）
- 星星閃爍背景動畫（數量、大小、透明度可調）
- 響應式 UI（桌面／行動端）

---

## 🧩 模組架構

| 模組名稱                     | 功能說明 |
| --------------------------- | -------------------------------------- |
| `App.vue`                   | 根元件：星星背景、router-view、四角月亮裝飾 |
| `Pages/Home.vue`            | 首頁：牌組選擇、抽牌數量、抽牌、結果展示、複製結果 |
| `components/TarotCard.vue`   | 單張塔羅牌顯示與正逆位旋轉 |
| `components/StarsBackground.vue` | Canvas 閃爍星空背景 |
| `router/index.ts`           | 前端路由（首頁 /） |
| `config/tarotConfig.ts`     | 塔羅設定（張數、卡背 ID、編號範圍） |
| `constants/stanceArcana.ts` | 正逆位、大／小阿爾克那常數 |
| `data/tarotCards.ts`        | 塔羅牌資料（cardId、cardName、cardUrl） |
| `utils/drawResultName.ts`   | 依卡牌 ID 與位向回傳顯示名稱與圖片路徑 |

---

## 📂 目錄結構

| 目錄／檔案        | 說明                                               |
| ----------------- | -------------------------------------------------- |
| Pages/Home.vue    | 首頁：牌組選擇、抽牌數量、抽牌、結果展示、複製結果 |
| components/       | TarotCard（單張牌＋正逆位）、StarsBackground（Canvas 星星） |
| router/index.ts   | 路由（首頁 /）                                     |
| config/           | 塔羅設定（張數、卡背 ID、編號範圍）                 |
| constants/        | 正逆位、大／小阿爾克那常數                         |
| data/             | 塔羅牌資料（cardId、cardName、cardUrl）            |
| utils/            | 依卡牌 ID 與位向回傳顯示名稱與圖片路徑             |
| assets/           | main.css、星星背景與按鈕相關 CSS                    |

---

## 🚀 快速開始

```bash
npm install
npm run dev
```

建置生產版：`npm run build`。型別檢查、Lint、格式化請參閱 `package.json` 腳本。

---

## 🖼️ 介面展示

### 電腦版
<p align="left">
  <img src="https://github.com/user-attachments/assets/ca2ca3a3-9ff3-4e39-b3c8-3c2f7bcf0dd7" width="450" align="top"/>
  <img src="https://github.com/user-attachments/assets/b1e6e3d5-d969-4006-9338-bfe4e6bce136" width="450" align="top"/>

</p>

### 平板/手機版
<img src="https://github.com/user-attachments/assets/e51334d4-b8cf-4331-98b3-8fdb61c3b683" height="900">
<img src="https://github.com/user-attachments/assets/244b5586-eb54-4a54-862f-d280a17f5915" height="900">
