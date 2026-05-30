<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import headerLinks from '@/constants/headerLinks'
import { useMockApi } from '@/stores/mockApi'
import { useChatStore } from '@/stores/chatStore'

const mockApiStore = useMockApi()
const chatStore = useChatStore()

// 控制行動端選單開關狀態
const isMenuOpen = ref(false)

onMounted(() => {
  Promise.all([mockApiStore.fetchData(), chatStore.fetchChatData()])
})
</script>

<template>
  <header class="app-header">
    <div class="header-container">
      <!-- hamburger -->
      <button
        class="hamburger"
        :class="{ 'is-active': isMenuOpen }"
        @click="isMenuOpen = !isMenuOpen"
        aria-label="Toggle Navigation"
      >
        <span class="burger-line"></span>
        <span class="burger-line"></span>
        <span class="burger-line"></span>
      </button>

      <!-- 行動端彈出式導覽連結 -->
      <div class="mobile-nav-links" :class="{ 'is-open': isMenuOpen }">
        <RouterLink
          v-for="link in headerLinks"
          :key="link.name"
          :to="link.path"
          active-class="active-link"
          @click="isMenuOpen = false"
        >
          {{ link.label }}
        </RouterLink>
      </div>

      <RouterLink to="/" class="logo">
        <span class="logo-icon">🩸</span>
        <span class="logo-text">AOI GALLERY</span>
      </RouterLink>
      <nav class="desktop-nav-links">
        <RouterLink
          v-for="link in headerLinks"
          :key="link.name"
          :to="link.path"
          active-class="active-link"
        >
          {{ link.label }}
        </RouterLink>
      </nav>
    </div>
  </header>

  <main class="app-content">
    <RouterView v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
  </main>

  <footer class="app-footer">
    <p>2026 Aoi Hinamori 《蝕 / 光》畫展 | 概念展示設計</p>
  </footer>
</template>

<style scoped>
.app-header {
  background-color: rgba(26, 26, 31, 0.85);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border-color);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}
.header-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}
.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  letter-spacing: 2px;
  color: var(--primary-color);
}
.desktop-nav-links {
  display: flex;
  gap: 2rem;
}
.desktop-nav-links a {
  color: var(--text-muted);
  font-weight: 500;
  padding: 0.25rem 0;
  border-bottom: 2px solid transparent;
}
.desktop-nav-links a:hover,
.desktop-nav-links .active-link {
  color: var(--primary-color);
}
.desktop-nav-links .active-link {
  border-bottom-color: var(--primary-color);
}
.app-content {
  margin-top: 75px;
  min-height: calc(100vh - 150px);
  padding: 2rem;
  box-sizing: border-box;
}
.app-footer {
  background-color: #0b0b0d;
  border-top: 1px solid var(--border-color);
  padding: 1.5rem;
  text-align: center;
  color: var(--text-muted);
  font-size: 0.85rem;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .desktop-nav-links {
    display: none;
  }
}

/* ==========================================================================
   以下為新增的 Hamburger 與行動選單專屬樣式（原樣式無調整）
   ========================================================================== */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 110;
}
.burger-line {
  width: 100%;
  height: 2px;
  background-color: var(--text-main, #f3f4f6);
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

/* 點擊後變形為「X」的特效 */
.hamburger.is-active .burger-line:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}
.hamburger.is-active .burger-line:nth-child(2) {
  opacity: 0;
}
.hamburger.is-active .burger-line:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

.mobile-nav-links {
  display: none;
}

@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }
  .mobile-nav-links {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    height: 100vh;
    background-color: rgba(26, 26, 31, 0.96);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border-color);
    padding: 1.5rem 2rem;
    gap: 1.25rem;
    transform: translateY(-15px);
    opacity: 0;
    pointer-events: none;
    transition:
      transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
      opacity 0.3s ease;
    z-index: 105;
  }
  .mobile-nav-links.is-open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }
  .mobile-nav-links a {
    color: var(--text-muted);
    font-weight: 500;
    font-size: 1.05rem;
    text-decoration: none;
    padding: 0.25rem 0;
  }
  .mobile-nav-links a:hover,
  .mobile-nav-links .active-link {
    color: var(--primary-color);
  }
}
</style>
