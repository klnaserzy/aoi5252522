<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useExhibitionStore } from '../stores/exhibition'
import { useMockApi } from '@/stores/mockApi'
import { postMockApi } from '@/utils/api'

const router = useRouter()
const store = useExhibitionStore()
const { mockApiData } = useMockApi()

postMockApi({
  website: 'test',
})

setTimeout(() => {
  console.log(mockApiData)
}, 2000)

const mainAnnouncement = computed(() => store.exhibits[0])
</script>

<template>
  <div class="home-container">
    <section class="hero">
      <div class="hero-content">
        <p class="subtitle">VAMPIRE NURSE CLINIC EVENT</p>
        <h1 class="title">阿歐依 <span>《蝕 / 光》畫展</span></h1>
        <p class="description">
          歡迎光臨吸血鬼護士 Aoi Hinamori
          的虛擬展覽空間。此處收錄了本次活動的主視覺開幕推文，以及來自特邀繪師老師們帶來的絕美應援創作。
        </p>
        <button @click="router.push('/tweet')" class="enter-btn">進入貼文觀展 ➔</button>
      </div>
    </section>

    <section v-if="mainAnnouncement" class="featured">
      <h2 class="section-title">✦ 最新展覽焦點 ✦</h2>
      <div class="announcement-card">
        <div class="card-header">
          <div class="user-meta">
            <span class="avatar-icon">🩺</span>
            <div>
              <h3>{{ mainAnnouncement.author }}</h3>
              <p>{{ mainAnnouncement.authorHandle }}</p>
            </div>
          </div>
          <span class="badge">主要公告</span>
        </div>
        <div class="card-body">
          <h4>{{ mainAnnouncement.title }}</h4>
          <p>{{ mainAnnouncement.description }}</p>
        </div>
        <div class="card-footer">
          <a :href="mainAnnouncement.url" target="_blank" class="x-link">在 X 上查看原始推文 ↗</a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-container {
  max-width: 900px;
  margin: 0 auto;
}
.hero {
  background: linear-gradient(135deg, #221216 0%, #111115 100%);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 3.5rem 2.5rem;
  margin-bottom: 3rem;
}
.subtitle {
  color: var(--primary-color);
  font-weight: 600;
  letter-spacing: 2px;
  font-size: 0.85rem;
}
.title {
  font-size: 2.8rem;
  margin: 0.5rem 0 1.5rem 0;
  font-weight: 800;
}
.title span {
  color: var(--primary-color);
}
.description {
  color: var(--text-muted);
  line-height: 1.7;
  margin-bottom: 2rem;
}
.enter-btn {
  background-color: var(--primary-color);
  color: #fff;
  border: none;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}
.enter-btn:hover {
  background-color: var(--accent-color);
}
.section-title {
  text-align: center;
  font-size: 1.6rem;
  margin-bottom: 1.5rem;
}
.announcement-card {
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 2rem;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.user-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.avatar-icon {
  font-size: 1.8rem;
  background: rgba(255, 77, 109, 0.1);
  padding: 0.4rem;
  border-radius: 50%;
}
.user-meta h3 {
  margin: 0;
  font-size: 1.05rem;
}
.user-meta p {
  margin: 0;
  font-size: 0.8rem;
  color: var(--text-muted);
}
.badge {
  background: rgba(255, 77, 109, 0.15);
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-size: 0.75rem;
}
.card-body h4 {
  margin: 0 0 0.5rem 0;
  color: #fff;
}
.card-body p {
  color: #d1d5db;
  line-height: 1.6;
  margin: 0;
}
.card-footer {
  text-align: right;
  margin-top: 1.5rem;
}
.x-link {
  font-size: 0.9rem;
  font-weight: 600;
}
</style>
