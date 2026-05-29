<script setup lang="ts">
import { ref, computed } from 'vue'

// 定義情感階段型別
type StageType = 'light-early' | 'eclipse' | 'reconciliation'

interface TimelineEvent {
  date: string // 具體年月
  title: string // 事件主題
  stage: StageType // 情感歸屬階段
  subtitle: string // 一句話摘要
  content: string // 詳細敘事內文
  icon: string // 節點小圖示
}

// 補齊 Aoi 護士 5 年來從出道到現今五週年特展的真實精細資料
const events = ref<TimelineEvent[]>([
  {
    date: '2021.05',
    title: '人間診所開張',
    stage: 'light-early',
    subtitle: '初配信啟動！吸血鬼護士降臨',
    content:
      '抱著「讓所有人充滿笑容」的純粹初心，Aoi 作為魔界護士正式在人間展開 VTuber 活動。充滿活力的趣味雜談與搞怪企劃，成功吸引了第一批核心「病患」入院。',
    icon: '🎀',
  },
  {
    date: '2022.08',
    title: '閃耀的成長期',
    stage: 'light-early',
    subtitle: '訂閱里程碑達成與 3D 化突破',
    content:
      '這是全速奔跑的一年。隨著社群關注度爆發，陸續解鎖了多場大型連動與個人專屬 3D 模型 reveal，在舞台上散發著最耀眼、最純粹的粉紅光芒。',
    icon: '✨',
  },
  {
    date: '2023.11',
    title: '遭遇數位暴風雨',
    stage: 'eclipse',
    subtitle: '個人勢的瓶頸與網路雜音的煎熬',
    content:
      '隨著名氣而來的，是成正比的巨大壓力與網路上的惡意流言。面對創作瓶頸與無法言說的身心症狀，Aoi 經歷了無數個關掉直播後獨自哭泣的黑夜，光芒逐漸被日蝕般的陰影吞噬。',
    icon: '🖤',
  },
  {
    date: '2024.10',
    title: '黑暗中的沉澱',
    stage: 'eclipse',
    subtitle: '短暫靜養，將痛苦轉化為音樂能量',
    content:
      '為了拉住即將墜落的自己，Aoi 選擇調整步調。在減少公開露面的沉寂期裡，她將這些掙扎、迷茫與眼淚，默默揉進了原創歌曲與漫畫腳本的籌備中。',
    icon: '🩹',
  },
  {
    date: '2025.05',
    title: '破曉與自我和解',
    stage: 'reconciliation',
    subtitle: '四週年回歸：帶著陰影一起前行',
    content:
      '經歷低谷後重新站上舞台。這時的 Aoi 不再強求完美的偽裝，而是學會接納自己的脆弱與不完美。她發現，那些曾經的傷疤，在病患們溫暖的包容下，反而折射出了更溫柔的光暈。',
    icon: '🔮',
  },
  {
    date: '2026.06',
    title: '《蝕／光》五週年特展',
    stage: 'reconciliation',
    subtitle: '實體畫展盛大開幕！見證終點亦是起點',
    content:
      '迎來意義非凡的 5 週年！正式推出籌備已久的台北西門實體特展、手工真皮旅行袋等頂級週邊。這場展覽是她將 5 年心路歷程具現化的期末報告，也是獻給所有不離不棄患者們的最深謝意。',
    icon: '👑',
  },
])

// 當前選中的事件索引（預設停在最後一個最新的 5 週年節點）
const activeIndex = ref(5)

// 【核心修正】加入空值保護（?? events.value[0]），確保 TS 100% 判定傳回值不是 undefined
const currentEvent = computed<TimelineEvent>(() => {
  return (events.value[activeIndex.value] ?? events.value[0])!
})

// 動態根據不同情感階段切換網頁環境光暈
const stageStyleClass = computed(() => {
  return {
    'stage-light-early': currentEvent.value.stage === 'light-early',
    'stage-eclipse': currentEvent.value.stage === 'eclipse',
    'stage-reconciliation': currentEvent.value.stage === 'reconciliation',
  }
})
</script>

<template>
  <div class="timeline-section" :class="stageStyleClass">
    <div class="section-intro">
      <p class="tagline">5 YEARS JOURNEY</p>
      <h2>《蝕／光》時光迴廊</h2>
      <p class="desc">點擊下方時間節點，一同經歷 Aoi 護士這五年來的內心蛻變與軌跡。</p>
    </div>

    <!-- 互動時間軸導覽條 -->
    <div class="timeline-nav">
      <div class="progress-line"></div>
      <div
        v-for="(event, index) in events"
        :key="event.date"
        class="timeline-node"
        :class="{ active: activeIndex === index, [event.stage]: true }"
        @click="activeIndex = index"
      >
        <div class="node-dot">
          <span class="node-icon">{{ event.icon }}</span>
        </div>
        <span class="node-year">{{ event.date }}</span>
      </div>
    </div>

    <!-- 情感敘事展示看板 -->
    <transition name="slide-fade" mode="out-in">
      <div :key="activeIndex" class="story-board">
        <div class="story-header">
          <span class="stage-badge">{{ currentEvent.date }}</span>
          <h3>{{ currentEvent.title }}</h3>
        </div>
        <h4 class="story-subtitle">{{ currentEvent.subtitle }}</h4>
        <p class="story-content">{{ currentEvent.content }}</p>

        <!-- 裝飾性背景氛圍文字 -->
        <div class="ambient-text">{{ currentEvent.stage.toUpperCase() }}</div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.timeline-section {
  max-width: 950px; /* 微調寬度以容納 6 個節點 */
  margin: 4rem auto;
  padding: 3rem 2rem;
  border-radius: 16px;
  background: #09090d;
  border: 1px solid #1f1f2e;
  position: relative;
  overflow: hidden;
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

/* --- 動態環境光暈 (Ambient Glow) --- */
.timeline-section::before {
  content: '';
  position: absolute;
  top: -100px;
  right: -100px;
  width: 350px;
  height: 350px;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.15;
  transition: background 0.6s ease;
  pointer-events: none;
}

.stage-light-early::before {
  background: #ff5e7e;
}
.stage-light-early .node-dot {
  box-shadow: 0 0 15px rgba(255, 94, 126, 0.3);
}
.stage-light-early .stage-badge {
  background: rgba(255, 94, 126, 0.15);
  color: #ff5e7e;
}

.stage-eclipse::before {
  background: #7c1c2b;
  opacity: 0.25;
}
.stage-eclipse .node-dot {
  box-shadow: 0 0 15px rgba(124, 28, 43, 0.3);
}
.stage-eclipse .stage-badge {
  background: rgba(156, 163, 175, 0.1);
  color: #9ca3af;
}

.stage-reconciliation::before {
  background: linear-gradient(45deg, #ff5e7e, #8b5cf6);
  opacity: 0.2;
}
.stage-reconciliation .node-dot {
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.4);
}
.stage-reconciliation .stage-badge {
  background: linear-gradient(45deg, rgba(255, 94, 126, 0.2), rgba(139, 92, 246, 0.2));
  color: #c084fc;
  border: 1px solid rgba(139, 92, 246, 0.3);
}

/* --- 介面元素樣式 --- */
.section-intro {
  text-align: center;
  margin-bottom: 3rem;
}
.tagline {
  color: #ff5e7e;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 3px;
  margin: 0;
}
.section-intro h2 {
  font-size: 2rem;
  margin: 0.5rem 0;
  color: #f8fafc;
}
.desc {
  color: #6b7280;
  font-size: 0.95rem;
  margin: 0;
}

/* 時間軸導覽軌道 */
.timeline-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin: 0 auto 3.5rem auto;
  max-width: 800px; /* 拉寬導覽條讓 6 個點不擁擠 */
}
.progress-line {
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
  height: 2px;
  background: #1f1f2e;
  z-index: 1;
}
.timeline-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
  cursor: pointer;
  flex: 1;
}
.node-dot {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #14141f;
  border: 2px solid #2a2a35;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}
.node-icon {
  font-size: 1.1rem;
}
.node-year {
  margin-top: 0.75rem;
  font-size: 0.8rem;
  color: #6b7280;
  font-weight: 600;
  transition: color 0.3s;
  white-space: nowrap;
}

/* 節點互動狀態 */
.timeline-node:hover .node-dot,
.timeline-node.active .node-dot {
  transform: scale(1.15);
}
.timeline-node.active .node-year {
  color: #f8fafc;
}
.timeline-node.active.light-early .node-dot {
  border-color: #ff5e7e;
}
.timeline-node.active.eclipse .node-dot {
  border-color: #9ca3af;
}
.timeline-node.active.reconciliation .node-dot {
  border-color: #8b5cf6;
}

/* 敘事面板 */
.story-board {
  background: rgba(20, 20, 31, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid #1f1f2e;
  border-radius: 12px;
  padding: 2.5rem;
  position: relative;
  min-height: 160px;
}
.story-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}
.stage-badge {
  padding: 0.2rem 0.6rem;
  font-size: 0.75rem;
  border-radius: 4px;
  font-weight: bold;
}
.story-header h3 {
  font-size: 1.5rem;
  margin: 0;
  color: #fff;
}
.story-subtitle {
  color: #e2e8f0;
  font-size: 1.1rem;
  margin: 0 0 1rem 0;
  font-weight: 500;
}
.story-content {
  color: #94a3b8;
  line-height: 1.7;
  margin: 0;
  font-size: 0.95rem;
  text-align: justify;
}

/* 裝飾浮水印字樣 */
.ambient-text {
  position: absolute;
  bottom: 5px;
  right: 15px;
  font-size: 3rem;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.02);
  user-select: none;
  pointer-events: none;
  letter-spacing: 4px;
}

/* Vue 轉場動畫 */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.25s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from {
  transform: translateY(10px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
