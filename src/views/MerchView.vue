<script setup lang="ts">
import { useExhibitionStore } from '../stores/exhibition'
const store = useExhibitionStore()
</script>

<template>
  <div class="merch-view">
    <div class="info-banner">
      <h2>{{ store.info.title }}</h2>
      <p class="concept">"{{ store.info.concept }}"</p>
      <div class="meta-grid">
        <div><strong>📍 展出地點：</strong>{{ store.info.location }}</div>
        <div><strong>📆 展出日期：</strong>{{ store.info.date }}</div>
      </div>
    </div>

    <h3>🛒 5週年特展限定週邊</h3>
    <div class="merch-grid">
      <div
        v-for="item in store.merchandise"
        :key="item.id"
        class="merch-card"
        :class="{ 'premium-border': item.category === 'premium' }"
      >
        <div v-if="item.isLimited" class="limit-badge">LTD 限量</div>
        <div class="merch-photo-placeholder">
          <span>{{ item.name }}</span>
        </div>
        <div class="merch-info">
          <h4>{{ item.name }}</h4>
          <p class="spec" v-if="item.spec">{{ item.spec }}</p>
          <p class="desc">{{ item.description }}</p>
          <div class="price-tag">NT$ {{ item.price.toLocaleString() }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ==========================================================================
   頂部展覽資訊看板樣式
   ========================================================================== */
.info-banner {
  background: linear-gradient(180deg, #120e1a 0%, #060608 100%);
  border: 1px solid rgba(255, 94, 126, 0.2);
  padding: 2.5rem 2rem;
  border-radius: 12px;
  margin-bottom: 3.5rem;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}
.info-banner h2 {
  font-size: 1.8rem;
  color: #f8fafc;
  margin: 0;
}
.concept {
  font-style: italic;
  color: #94a3b8;
  max-width: 600px;
  margin: 1rem auto 1.5rem auto;
  font-size: 0.95rem;
  line-height: 1.6;
}
.meta-grid {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  font-size: 0.9rem;
  color: #cbd5e1;
  border-top: 1px solid #1f1f2e;
  padding-top: 1.25rem;
  max-width: 500px;
  margin: 0 auto;
}

/* ==========================================================================
   商品展示區與網格佈局 (設計核心)
   ========================================================================== */
.merch-view {
  max-width: 1200px;
  margin: 0 auto;
}

.merch-view h3 {
  font-size: 1.4rem;
  color: #f8fafc;
  margin-bottom: 1.75rem;
  border-left: 4px solid #ff5e7e;
  padding-left: 0.75rem;
  letter-spacing: 1px;
}

/* 響應式商品網格 */
.merch-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 2rem;
}

/* ==========================================================================
   商品卡片單體樣式
   ========================================================================== */
.merch-card {
  background: #14141f;
  border: 1px solid #1f1f2e;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  transition:
    transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

/* 一般卡片 Hover：微微升起與經典護士粉紅微光 */
.merch-card:hover {
  transform: translateY(-6px);
  border-color: rgba(255, 94, 126, 0.4);
  box-shadow: 0 12px 24px rgba(255, 94, 126, 0.08);
}

/* 【Premium 頂級週邊】特別外框：靜態帶有黑紫極光神祕感 */
.merch-card.premium-border {
  border-color: rgba(139, 92, 246, 0.35);
  box-shadow: 0 0 15px rgba(139, 92, 246, 0.05);
}
/* 【Premium 頂級週邊】Hover：極光爆發視覺提升 */
.merch-card.premium-border:hover {
  border-color: #8b5cf6;
  box-shadow: 0 12px 28px rgba(139, 92, 246, 0.2);
}

/* 限量 LTD 標籤 */
.limit-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: linear-gradient(45deg, #ff5e7e, #ff2e55);
  color: #ffffff;
  font-size: 0.7rem;
  font-weight: 800;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  z-index: 10;
  box-shadow: 0 3px 8px rgba(255, 94, 126, 0.4);
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

/* 圖片占位預留區 (未來換成 <img> 標籤也完美相容) */
.merch-photo-placeholder {
  width: 100%;
  height: 240px;
  background: linear-gradient(135deg, #1b162c 0%, #0d0a14 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  box-sizing: border-box;
  border-bottom: 1px solid #1f1f2e;
}
.merch-photo-placeholder span {
  color: rgba(255, 255, 255, 0.2);
  font-size: 0.85rem;
  font-weight: 500;
  text-align: center;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 商品文字資訊區佈局 */
.merch-info {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* 確保不論文字多寡，價格都能被推擠到底部對齊 */
}

.merch-info h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  color: #ffffff;
  line-height: 1.4;
}

/* 商品規格標籤 (如：真皮 / 2L尺寸) */
.spec {
  font-size: 0.75rem;
  color: #c084fc;
  background: rgba(139, 92, 246, 0.12);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  width: fit-content;
  margin: 0 0 0.75rem 0;
  font-weight: 600;
}

/* 商品敘述：自動裁切多餘行數以維持整齊度 */
.desc {
  font-size: 0.85rem;
  color: #94a3b8;
  line-height: 1.5;
  margin: 0 0 1.25rem 0;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 最多顯示 3 行，多出來的會自動變三個點... */
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 價格標籤 */
.price-tag {
  font-size: 1.25rem;
  font-weight: 700;
  color: #ff5e7e;
  margin-top: auto; /* 核心對齊設定 */
  letter-spacing: 0.5px;
}

/* ==========================================================================
   手機版行動端微調
   ========================================================================== */
@media (max-width: 640px) {
  .meta-grid {
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
  }
  .merch-grid {
    gap: 1.25rem;
  }
}
</style>
