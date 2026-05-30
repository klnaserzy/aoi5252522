# AOI GALLERY — 《蝕 / 光》五週年特展

Aoi Hinamori 五週年個人展覽網站，以 Vue 3 + Vite 建構，涵蓋展覽資訊、推文展廳、時間軸、周邊商品、交通指南與留言板功能。

## 技術棧

| 類別     | 套件                       |
| -------- | -------------------------- |
| 框架     | Vue 3 (Composition API)    |
| 路由     | Vue Router 5               |
| 狀態管理 | Pinia 3                    |
| HTTP     | Axios                      |
| 建構工具 | Vite 8                     |
| 型別檢查 | TypeScript 6 + vue-tsc     |
| Lint     | oxlint + ESLint + Prettier |

## 頁面

| 路由        | 說明                                            |
| ----------- | ----------------------------------------------- |
| `/`         | 展覽大廳（主視覺 + 最新公告）                   |
| `/tweet`    | 推文展廳（官方、同人、其他類型推文卡片）        |
| `/about`    | 關於 Aoi（出道至今時間軸）                      |
| `/merch`    | 周邊商品（皮革旅行袋、項鍊、鋁板畫等 8 件商品） |
| `/location` | 交通指南（附近捷運站 / 公車站資訊）             |
| `/chat`     | 留言板（即時查看與發送留言）                    |

## 快速開始

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run start:dev

# 型別檢查 + 正式建構
npm run build

# 預覽建構結果
npm run preview
```

## 專案結構

```
src/
├── views/          # 各頁面元件
├── components/     # 共用元件（TimelineSection）
├── stores/         # Pinia store（mockApi、chatStore、exhibition）
├── utils/          # Axios 實例與 API 呼叫封裝
├── router/         # Vue Router 路由設定
├── constants/      # 導覽列連結常數
└── assets/         # 全域樣式
```

## API

資料由 [MockAPI](https://mockapi.io) 提供，base URL：

```
https://67651da352b2a7619f5e6fe7.mockapi.io/aoi/
```

| 端點          | 方法  | 說明                                   |
| ------------- | ----- | -------------------------------------- |
| `/AOI522`     | GET   | 取得所有展覽資料（推文、時間軸、交通） |
| `/AOI522`     | POST  | 新增資料                               |
| `/AOI522/:id` | PATCH | 更新 / 隱藏資料                        |
| `/chat`       | GET   | 取得留言列表                           |
| `/chat`       | POST  | 新增留言                               |

## 部署

專案 base 設定為 `/aoi5252522/`，適用於 GitHub Pages 部署：

```bash
npm run build
# 輸出至 dist/，部署至 gh-pages 分支即可
```
