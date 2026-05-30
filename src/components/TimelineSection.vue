<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { TimelineEvent } from '@/utils/api'
import { useMockApi } from '../stores/mockApi'

type Year = '2021' | '2022' | '2023' | '2024' | '2025' | '2026'

interface TimelineInteract {
  year: Year
  stage: 'light-early' | 'eclipse' | 'reconciliation'
  stageLabel: string
  icon: string
}

const timelineInteracts = ref<TimelineInteract[]>([
  {
    year: '2021',
    stage: 'light-early',
    stageLabel: '初開張',
    icon: '🎀',
  },
  {
    year: '2022',
    stage: 'light-early',
    stageLabel: '破繭與淬鍊',
    icon: '✨',
  },
  {
    year: '2023',
    stage: 'eclipse',
    stageLabel: '暗流湧現',
    icon: '🖤',
  },
  {
    year: '2024',
    stage: 'eclipse',
    stageLabel: '沉入蝕淵',
    icon: '🩹',
  },
  {
    year: '2025',
    stage: 'reconciliation',
    stageLabel: '破曉與和解',
    icon: '🔮',
  },
  {
    year: '2026',
    stage: 'reconciliation',
    stageLabel: '蝕光終章',
    icon: '👑',
  },
])

// // 補齊 Aoi 護士 5 年來從出道到現今五週年特展的真實精細資料
// const events = ref<TimelineEvent[]>([
//   {
//     id: 6,
//     page: 'timeline',
//     position: 'event',
//     year: '2021',
//     title: '人間診所開張',
//     subtitle: '初配信啟動！吸血鬼護士降臨',
//     content:
//       '抱著「讓所有人充滿笑容」的純粹初心，Aoi 作為魔界護士正式在人間展開 VTuber 活動。充滿活力的趣味雜談與搞怪企劃，成功吸引了第一批核心「病患」入院。',
//   },
//   {
//     id: 7,
//     page: 'timeline',
//     position: 'event',
//     year: '2023',
//     title: '遭遇數位暴風雨',
//     subtitle: '個人勢的瓶頸與網路雜音的煎熬',
//     content:
//       '隨著名氣而來的，是成正比的巨大壓力與網路上的惡意流言。面對創作瓶頸與無法言說的身心症狀，Aoi 經歷了無數個關掉直播後獨自哭泣的黑夜，光芒逐漸被日蝕般的陰影吞噬。',
//   },
//   {
//     id: 8,
//     page: 'timeline',
//     position: 'event',
//     year: '2024',
//     title: '閃耀的成長期',
//     subtitle: '訂閱里程碑達成與 3D 化突破',
//     content:
//       '這是全速奔跑的一年。隨著社群關注度爆發，陸續解鎖了多場大型連動與個人專屬 3D 模型 reveal，在舞台上散發著最耀眼、最純粹的粉紅光芒。',
//   },
//   {
//     id: 9,
//     page: 'timeline',
//     position: 'event',
//     year: '2024',
//     title: '黑暗中的沉澱',
//     subtitle: '短暫靜養，將痛苦轉化為音樂能量',
//     content:
//       '為了拉住即將墜落的自己，Aoi 選擇調整步調。在減少公開露面的沉寂期裡，她將這些掙扎、迷茫與眼淚，默默揉進了原創歌曲與漫畫腳本的籌備中。',
//   },
//   {
//     id: 10,
//     page: 'timeline',
//     position: 'event',
//     year: '2025',
//     title: '破曉與自我和解',
//     subtitle: '四週年回歸：帶著陰影一起前行',
//     content:
//       '經歷低谷後重新站上舞台。這時的 Aoi 不再強求完美的偽裝，而是學會接納自己的脆弱與不完美。她發現，那些曾經的傷疤，在病患們溫暖的包容下，反而折射出了更溫柔的光暈。',
//   },
//   {
//     id: 11,
//     page: 'timeline',
//     position: 'event',
//     year: '2026',
//     title: '《蝕／光》五週年特展',
//     subtitle: '實體畫展盛大開幕！見證終點亦是起點',
//     content:
//       '迎來意義非凡的 5 週年！正式推出籌備已久的台北西門實體特展、手工真皮旅行袋等頂級週邊。這場展覽是她將 5 年心路歷程具現化的期末報告，也是獻給所有不離不棄患者們的最深謝意。',
//   },
// ])

const mockApiStore = useMockApi()

const events = computed(() => {
  return mockApiStore.timelineEvent
})
// 當前選中的事件索引（預設停在最後一個最新的 5 週年節點）
const activeIndex = ref<Year>('2021')

const year2021Events = computed(() => {
  return events.value.filter((e) => e.year === '2021')
})

const year2022Events = computed(() => {
  return events.value.filter((e) => e.year === '2022')
})

const year2023Events = computed(() => {
  return events.value.filter((e) => e.year === '2023')
})

const year2024Events = computed(() => {
  return events.value.filter((e) => e.year === '2024')
})

const year2025Events = computed(() => {
  return events.value.filter((e) => e.year === '2025')
})

const year2026Events = computed(() => {
  return events.value.filter((e) => e.year === '2026')
})

const selectYearEvents = computed(() => {
  switch (activeIndex.value) {
    case '2021':
      return year2021Events.value
    case '2022':
      return year2022Events.value
    case '2023':
      return year2023Events.value
    case '2024':
      return year2024Events.value
    case '2025':
      return year2025Events.value
    case '2026':
      return year2026Events.value
    default:
      return year2021Events.value
  }
})

const currentTimeLine = computed<TimelineInteract>(() => {
  return timelineInteracts.value.find((i) => i.year === activeIndex.value)!
})

const stageStyleClass = computed(() => {
  return {
    'stage-light-early': currentTimeLine.value?.stage === 'light-early',
    'stage-eclipse': currentTimeLine.value?.stage === 'eclipse',
    'stage-reconciliation': currentTimeLine.value?.stage === 'reconciliation',
  }
})

const handleSelectYear = (year: Year) => {
  activeIndex.value = year
}

const showAddForm = ref(false)
const newEvent = ref<TimelineEvent>({
  page: 'timeline',
  position: 'event',
  year: activeIndex.value,
  title: '',
  subtitle: '',
  content: '',
})

watch(activeIndex, () => {
  showAddForm.value = false
  newEvent.value = {
    page: 'timeline',
    position: 'event',
    year: activeIndex.value,
    title: '',
    subtitle: '',
    content: '',
  }
})

const cancelAddEvent = () => {
  showAddForm.value = false
  newEvent.value = {
    page: 'timeline',
    position: 'event',
    year: activeIndex.value,
    title: '',
    subtitle: '',
    content: '',
  }
}

const confirmAddEvent = () => {
  events.value.push({ ...newEvent.value })
  cancelAddEvent()
}
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
        v-for="timelineInteract in timelineInteracts"
        :key="timelineInteract.year"
        class="timeline-node"
        :class="{ active: activeIndex === timelineInteract.year, [timelineInteract.stage]: true }"
        @click="handleSelectYear(timelineInteract.year)"
      >
        <div class="node-dot">
          <span class="node-icon">{{ timelineInteract.icon }}</span>
        </div>
        <span class="node-year">{{ timelineInteract.year }}</span>
      </div>
    </div>

    <!-- 情感敘事展示看板 -->
    <transition name="slide-fade" mode="out-in">
      <div :key="activeIndex" class="story-board">
        <div class="board-header">
          <span class="board-icon">{{ currentTimeLine.icon }}</span>
          <span class="board-year">{{ activeIndex }}</span>
          <span class="stage-badge">{{ currentTimeLine.stageLabel }}</span>
        </div>

        <div class="event-list">
          <div v-for="(event, i) in selectYearEvents" :key="i" class="event-card">
            <div class="event-accent"></div>
            <div class="event-body">
              <h3 class="event-title">{{ event.title }}</h3>
              <h4 class="event-subtitle">{{ event.subtitle }}</h4>
              <p class="event-content">{{ event.content }}</p>
            </div>
          </div>
        </div>

        <!-- 新增事件 -->
        <div class="add-event-area">
          <button v-if="!showAddForm" class="add-event-btn" @click="showAddForm = true">
            ＋ 新增事件
          </button>
          <div v-else class="add-event-form">
            <input v-model="newEvent.title" class="add-input" placeholder="事件標題 *" />
            <input v-model="newEvent.subtitle" class="add-input" placeholder="一句話摘要" />
            <textarea
              v-model="newEvent.content"
              class="add-textarea"
              rows="3"
              placeholder="詳細敘述..."
            />
            <div class="add-form-actions">
              <button class="add-cancel" @click="cancelAddEvent">取消</button>
              <button class="add-confirm" @click="confirmAddEvent">新增</button>
            </div>
          </div>
        </div>

        <div class="ambient-text">{{ activeIndex }}</div>
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
.stage-light-early .event-accent {
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
.stage-eclipse .event-accent {
  color: #9ca3af;
}

.stage-reconciliation::before {
  background: linear-gradient(45deg, #ff5e7e, #8b5cf6);
  opacity: 0.2;
}
.stage-reconciliation .node-dot {
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.4);
}
.stage-reconciliation .event-accent {
  color: #c084fc;
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
  font-size: 0.72rem;
  color: #6b7280;
  font-weight: 600;
  transition: color 0.3s;
  text-align: center;
  max-width: 80px;
  word-break: keep-all;
  line-height: 1.3;
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
  padding: 2rem 2.5rem 2.5rem;
  position: relative;
  min-height: 160px;
  overflow: hidden;
}
.board-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.75rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid #1f1f2e;
}
.board-icon {
  font-size: 1.4rem;
  line-height: 1;
}
.board-year {
  font-size: 1.6rem;
  font-weight: 800;
  color: #f8fafc;
  letter-spacing: 0.02em;
  line-height: 1;
}
.stage-badge {
  padding: 0.2rem 0.65rem;
  font-size: 0.75rem;
  border-radius: 4px;
  font-weight: bold;
}
.event-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.event-card {
  display: flex;
  gap: 1.25rem;
}
.event-accent {
  width: 3px;
  border-radius: 2px;
  background: currentColor;
  flex-shrink: 0;
  opacity: 0.4;
}
.event-body {
  flex: 1;
}
.event-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: #f8fafc;
  margin: 0 0 0.3rem;
}
.event-subtitle {
  font-size: 0.9rem;
  color: #e2e8f0;
  font-weight: 500;
  margin: 0 0 0.6rem;
}
.event-content {
  color: #94a3b8;
  line-height: 1.7;
  margin: 0;
  font-size: 0.9rem;
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

@media (max-width: 768px) {
  .node-dot {
    width: 32px;
    height: 32px;
  }
}

/* 新增事件 */
.add-event-area {
  margin-top: 1.5rem;
}
.add-event-btn {
  width: 100%;
  background: transparent;
  border: 1px dashed #56566c;
  border-radius: 8px;
  color: #90a7c6;
  font-size: 0.85rem;
  padding: 0.65rem;
  cursor: pointer;
  transition:
    border-color 0.2s,
    color 0.2s;
}
.add-event-btn:hover {
  border-color: currentColor;
  color: #94a3b8;
}
.add-event-form {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  background: rgba(9, 9, 13, 0.6);
  border: 1px solid #2a2a35;
  border-radius: 8px;
  padding: 1rem;
}
.add-input,
.add-textarea {
  background: #0d0d14;
  border: 1px solid #2a2a35;
  border-radius: 6px;
  padding: 0.45rem 0.75rem;
  color: #f8fafc;
  font-size: 0.88rem;
  outline: none;
  font-family: inherit;
}
.add-input:focus,
.add-textarea:focus {
  border-color: #4b5563;
}
.add-textarea {
  resize: vertical;
}
.add-form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 0.25rem;
}
.add-cancel {
  background: transparent;
  border: 1px solid #2a2a35;
  color: #6b7280;
  padding: 0.35rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
}
.add-confirm {
  background: #374151;
  border: none;
  padding: 0.35rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  color: #f8fafc;
  transition: background 0.2s;
}
.add-confirm:hover {
  background: #4b5563;
}
.stage-light-early .add-confirm {
  background: rgba(255, 94, 126, 0.25);
  color: #ff5e7e;
}
.stage-light-early .add-confirm:hover {
  background: rgba(255, 94, 126, 0.4);
}
.stage-eclipse .add-confirm {
  background: rgba(156, 163, 175, 0.15);
  color: #d1d5db;
}
.stage-eclipse .add-confirm:hover {
  background: rgba(156, 163, 175, 0.25);
}
.stage-reconciliation .add-confirm {
  background: rgba(192, 132, 252, 0.2);
  color: #c084fc;
}
.stage-reconciliation .add-confirm:hover {
  background: rgba(192, 132, 252, 0.35);
}
</style>
