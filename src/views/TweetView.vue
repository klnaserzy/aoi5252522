<script setup lang="ts">
import { ref, computed } from 'vue'
import { useExhibitionStore } from '../stores/exhibition'

const store = useExhibitionStore()
const filter = ref<'all' | 'artwork' | 'official'>('all')

const filteredItems = computed(() => {
  if (filter.value === 'all') return store.exhibits
  if (filter.value === 'artwork') return store.exhibits.filter((i) => i.type === 'artwork')
  return store.exhibits.filter((i) => i.type !== 'artwork')
})
</script>

<template>
  <div class="tweet-container">
    <div class="tweet-header">
      <h1>貼文展廳</h1>
      <div class="filter-buttons">
        <button :class="{ active: filter === 'all' }" @click="filter = 'all'">
          全部貼文 ({{ store.exhibits.length }})
        </button>
        <button :class="{ active: filter === 'official' }" @click="filter = 'official'">
          📢 官方公告/互動
        </button>
        <button :class="{ active: filter === 'artwork' }" @click="filter = 'artwork'">
          🎨 繪師賀圖
        </button>
      </div>
    </div>

    <div class="grid">
      <div v-for="item in filteredItems" :key="item.id" class="art-frame">
        <a :href="item.url" target="_blank">
          <div class="frame-top">
            <span class="author-tag">{{ item.authorHandle }}</span>
            <span class="type-icon">{{ item.type === 'artwork' ? '🎨 Art' : '💬 Post' }}</span>
          </div>

          <div class="canvas" :class="item.type">
            <div class="canvas-inner">
              <p class="art-title">{{ item.title }}</p>
            </div>
          </div>

          <div class="frame-details">
            <p class="desc">{{ item.description }}</p>
            <div class="action-bar">
              <span class="date">{{ item.date }}</span>
              <span target="_blank" class="link-btn">查看推文 ↗</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tweet-container {
  max-width: 1200px;
  margin: 0 auto;
}
.tweet-header {
  text-align: center;
  margin-bottom: 2.5rem;
}
.filter-buttons {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1rem;
}
.filter-buttons button {
  background: var(--card-bg);
  color: var(--text-main);
  border: 1px solid var(--border-color);
  padding: 0.4rem 1.2rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s;
}
.filter-buttons button.active,
.filter-buttons button:hover {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: #fff;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}
.art-frame {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition:
    transform 0.3s,
    border-color 0.3s;
}
.art-frame:hover {
  transform: translateY(-4px);
  border-color: var(--primary-color);
}
.frame-top {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  font-size: 0.8rem;
  background: #141418;
}
.author-tag {
  color: var(--text-muted);
  font-weight: 500;
}
.type-icon {
  color: var(--primary-color);
  font-weight: bold;
}
.canvas {
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: linear-gradient(45deg, #1b1316 0%, #15151c 100%);
  text-align: center;
}
.canvas.artwork {
  background: linear-gradient(45deg, #2c161b 0%, #14111a 100%);
}
.art-title {
  font-weight: 600;
  color: #fff;
  font-size: 1rem;
  margin: 0;
}
.frame-details {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
}
.desc {
  font-size: 0.88rem;
  color: #cbd5e1;
  line-height: 1.5;
  margin: 0 0 1.25rem 0;
}
.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
}
.date {
  color: var(--text-muted);
}
.link-btn {
  font-weight: bold;
}
</style>
