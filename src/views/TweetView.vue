<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useExhibitionStore, type ExhibitItem } from '../stores/exhibition'

const store = useExhibitionStore()
const filter = ref<'all' | 'artwork' | 'official' | 'other'>('all')

const filteredItems = computed(() => {
  if (filter.value === 'all') return store.exhibits
  if (filter.value === 'artwork') return store.exhibits.filter((i) => i.type === 'artwork')
  if (filter.value === 'official') return store.exhibits.filter((i) => i.type === 'official')
  return store.exhibits.filter((i) => i.type === 'other')
})

const showModal = ref(false)

const newTweet = reactive({
  url: '',
  author: '',
  authorHandle: '',
  type: 'official' as ExhibitItem['type'],
  title: '',
  description: '',
  date: new Date().toISOString().slice(0, 10),
})

const openModal = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const clearForm = () => {
  Object.assign(newTweet, {
    url: '',
    author: '',
    authorHandle: '',
    type: 'official',
    title: '',
    description: '',
    date: new Date().toISOString().slice(0, 10),
  })
}

const addTweet = () => {
  const id = newTweet.url.split('/').pop() ?? String(Date.now())
  store.exhibits.push({ id, ...newTweet })
  closeModal()
  clearForm()
}
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
        <button :class="{ active: filter === 'other' }" @click="filter = 'other'">
          📝 未歸類推文
        </button>
      </div>
    </div>

    <!-- 新增貼文 右側按鈕 -->
    <div class="add-tweet-area">
      <span class="add-tweet-btn" @click="openModal">新增貼文<span>+</span></span>
    </div>

    <!--  tweetCard: 推文展廳 -->
    <div class="grid">
      <div v-for="item in filteredItems" :key="item.id" class="art-frame">
        <a :href="item.url" target="_blank" class="frame-link">
          <div class="frame-top">
            <span class="author-tag">{{ item.authorHandle }}</span>
            <span class="type-icon">{{ item.type === 'artwork' ? '🎨 Art' : '💬 Post' }}</span>
          </div>

          <div class="frame-content">
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
          </div>
        </a>
      </div>
      <!-- 推文新增 -->
      <div class="art-frame add-frame" @click="openModal">
        <div class="add-inner">
          <span class="add-icon">＋</span>
          <span class="add-label">新增推文</span>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div v-show="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal">
          <h2>新增推文</h2>
          <div class="form-group">
            <label>推文 URL</label>
            <input v-model="newTweet.url" placeholder="https://x.com/..." />
          </div>
          <div class="form-group">
            <label>作者名稱</label>
            <input v-model="newTweet.author" placeholder="Aoi Hinamori 🎀" />
          </div>
          <div class="form-group">
            <label>作者 Handle</label>
            <input v-model="newTweet.authorHandle" placeholder="@AoiHinamori" />
          </div>
          <div class="form-group">
            <label>類型</label>
            <select v-model="newTweet.type">
              <option value="official">📢 官方公告/互動</option>
              <option value="artwork">🎨 繪師賀圖</option>
              <option value="other">📝 未歸類推文</option>
            </select>
          </div>
          <div class="form-group">
            <label>標題</label>
            <input v-model="newTweet.title" placeholder="推文標題" />
          </div>
          <div class="form-group">
            <label>描述</label>
            <textarea v-model="newTweet.description" rows="3" placeholder="推文摘要..." />
          </div>
          <div class="form-group">
            <label>日期</label>
            <input
              type="date"
              v-model="newTweet.date"
              class="date-input"
              @click="($event.target as HTMLInputElement).showPicker()"
            />
          </div>
          <div class="modal-actions">
            <button class="btn-clear" @click="clearForm">清除</button>
            <button class="btn-cancel" @click="closeModal">取消</button>
            <button class="btn-confirm" @click="addTweet">新增</button>
          </div>
        </div>
      </div>
    </Teleport>
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
.frame-link {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  text-decoration: none; /* 移除超連結下底線 */
  color: inherit; /* 繼承原本文字顏色 */
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
.frame-content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
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
.add-tweet-area {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.5rem;
}
.add-tweet-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 94, 126, 0.1);
  border: 1px solid rgba(255, 94, 126, 0.35);
  border-radius: 8px;
  padding: 0.45rem 1rem;
  color: #ff5e7e;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, transform 0.15s;
  user-select: none;
}
.add-tweet-btn span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: rgba(255, 94, 126, 0.2);
  font-size: 1rem;
  line-height: 1;
}
.add-tweet-btn:hover {
  background: rgba(255, 94, 126, 0.18);
  border-color: rgba(255, 94, 126, 0.6);
  transform: translateY(-1px);
}
.add-tweet-btn:active {
  transform: translateY(0);
}

.add-frame {
  cursor: pointer;
  border: 2px dashed var(--border-color);
  background: transparent;
  min-height: 200px;
}
.add-frame:hover {
  border-color: var(--primary-color);
  background: rgba(255, 94, 126, 0.04);
  transform: translateY(-4px);
}
.add-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-grow: 1;
  padding: 3rem 0;
}
.add-icon {
  font-size: 2.5rem;
  color: var(--text-muted);
  line-height: 1;
}
.add-label {
  font-size: 0.9rem;
  color: var(--text-muted);
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal {
  background: #1a1a24;
  border: 1px solid #2a2a35;
  border-radius: 12px;
  padding: 2rem;
  width: 480px;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
}
.modal h2 {
  margin: 0 0 1.5rem;
  font-size: 1.3rem;
  color: #f8fafc;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-bottom: 1rem;
}
.form-group label {
  font-size: 0.8rem;
  color: #94a3b8;
}
.form-group input,
.form-group select,
.form-group textarea {
  background: #0d0d14;
  border: 1px solid #2a2a35;
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  color: #f8fafc;
  font-size: 0.9rem;
  outline: none;
}
.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: var(--primary-color);
}
.form-group textarea {
  resize: vertical;
}
.date-input {
  cursor: pointer;
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.5rem;
}
.btn-clear {
  background: transparent;
  border: 1px solid #2a2a35;
  color: #64748b;
  padding: 0.5rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  margin-right: auto;
}
.btn-cancel {
  background: transparent;
  border: 1px solid #2a2a35;
  color: #94a3b8;
  padding: 0.5rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
}
.btn-confirm {
  background: var(--primary-color);
  border: none;
  color: #fff;
  padding: 0.5rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}
</style>
