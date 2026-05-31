<script setup lang="ts">
import { ref } from 'vue'

const base = import.meta.env.BASE_URL

const IMAGE_PATH = {
  aoiHungry: `${base}aoi-hungry.png`,
  aoiFed: `${base}aoi-linepay.jpg`,
  giveAoiMealExpenses: `${base}give-aoi-meal-expenses.png`,
}

const aoiFedSrc = ref([IMAGE_PATH.aoiFed, IMAGE_PATH.giveAoiMealExpenses])
const aoiFedIndex = ref(Math.floor(Math.random() * aoiFedSrc.value.length))

const fed = ref(false)
const shaking = ref(false)
const zoomedSrc = ref<string | undefined>('')

function feedAoi() {
  if (fed.value) return
  shaking.value = true
  setTimeout(() => {
    shaking.value = false
    fed.value = true
  }, 600)
}
</script>

<template>
  <div class="notfound">
    <div class="content">
      <p class="lost-label">404 — 你迷路了嗎？</p>
      <h1 class="title">這裡有一隻可愛的 AOI 也迷路了</h1>
      <p class="subtitle">她說她餓了，你可以餵她吃飯飯 🍚</p>

      <div class="aoi-wrap" :class="{ shake: shaking }" @click="zoomedSrc = IMAGE_PATH.aoiHungry">
        <img :src="IMAGE_PATH.aoiHungry" alt="AOI 餓了" class="aoi-img" :class="{ fed: fed }" />
        <div class="zoom-hint">🔍</div>
      </div>

      <div v-if="!fed" class="feed-area">
        <button class="feed-btn" @click="feedAoi">餵飯飯 🍙</button>
      </div>

      <Transition name="fade-up">
        <div v-if="fed" class="pay-area">
          <p class="pay-label">謝謝你餵 AOI 吃飽飽！ 🎀</p>
          <div class="qr-wrap" @click="zoomedSrc = aoiFedSrc[aoiFedIndex]">
            <img :src="aoiFedSrc[aoiFedIndex]" alt="LINE Pay QR" class="qr-img" />
            <div class="zoom-hint">🔍</div>
          </div>
          <p class="pay-hint">掃描即可完成餵飯儀式</p>
        </div>
      </Transition>

      <Teleport to="body">
        <Transition name="fade">
          <div v-if="zoomedSrc" class="lightbox" @click="zoomedSrc = ''">
            <img :src="zoomedSrc" class="lightbox-img" />
          </div>
        </Transition>
      </Teleport>

      <a href="/" class="home-link">← 回到首頁</a>
    </div>
  </div>
</template>

<style scoped>
.notfound {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
  max-width: 480px;
}

.lost-label {
  font-size: 0.85rem;
  color: var(--text-muted);
  letter-spacing: 0.08em;
  margin: 0;
}

.title {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-main);
  margin: 0;
}

.subtitle {
  font-size: 1rem;
  color: var(--text-muted);
  margin: 0;
}

.aoi-wrap {
  width: 220px;
  height: 220px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid var(--border-color);
  transition: border-color 0.3s;
  margin: 0.5rem 0;
  position: relative;
  cursor: zoom-in;
}

.aoi-wrap:hover {
  border-color: var(--primary-color);
}

.aoi-wrap.shake {
  animation: shake 0.5s ease;
}

.aoi-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  transition: transform 0.4s ease;
}

.aoi-img.fed {
  transform: scale(1.05);
  filter: brightness(1.1);
}

@keyframes shake {
  0% {
    transform: rotate(0deg);
  }
  20% {
    transform: rotate(-6deg);
  }
  40% {
    transform: rotate(6deg);
  }
  60% {
    transform: rotate(-4deg);
  }
  80% {
    transform: rotate(4deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.feed-area {
  margin-top: 0.5rem;
}

.feed-btn {
  background: rgba(255, 94, 126, 0.12);
  border: 1px solid rgba(255, 94, 126, 0.4);
  color: #ff5e7e;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.65rem 2rem;
  border-radius: 999px;
  cursor: pointer;
  transition:
    background 0.2s,
    transform 0.15s,
    border-color 0.2s;
}

.feed-btn:hover {
  background: rgba(255, 94, 126, 0.22);
  border-color: rgba(255, 94, 126, 0.7);
  transform: translateY(-2px) scale(1.03);
}

.feed-btn:active {
  transform: translateY(0) scale(0.98);
}

.pay-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.pay-label {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-main);
  margin: 0;
}

.qr-wrap {
  width: 200px;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid var(--border-color);
}

.qr-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pay-hint {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin: 0;
}

.home-link {
  margin-top: 1rem;
  font-size: 0.88rem;
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.2s;
}

.home-link:hover {
  color: var(--primary-color);
}

.zoom-hint {
  position: absolute;
  bottom: 8px;
  right: 8px;
  font-size: 0.85rem;
  opacity: 0;
  transition: opacity 0.2s;
  pointer-events: none;
}

.aoi-wrap:hover .zoom-hint {
  opacity: 1;
}

.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  cursor: zoom-out;
  padding: 1.5rem;
}

.lightbox-img {
  max-width: min(480px, 90vw);
  max-height: 90vh;
  border-radius: 16px;
  object-fit: contain;
  box-shadow: 0 8px 48px rgba(0, 0, 0, 0.6);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-up-enter-active {
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
}
.fade-up-enter-from {
  opacity: 0;
  transform: translateY(16px);
}
</style>
