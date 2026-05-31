<script setup lang="ts">
import { ref, computed } from 'vue'
import type { mrtStationsInfo, busStationsInfo } from '@/utils/exhibitionApi'
import { createRecord, updateRecord } from '@/utils/exhibitionApi'
import { useMockApi } from '../stores/exhibitionStore'

const mockApiStore = useMockApi()

const createMrtLoading = ref(false)
const createBusLoading = ref(false)

const revealedIds = ref<Set<string>>(new Set())
const hideLoading = ref<string | null>(null)
const unhideLoading = ref<string | null>(null)

const reveal = (id: string) => {
  revealedIds.value = new Set([...revealedIds.value, id])
}

const hide = async (item: mrtStationsInfo | busStationsInfo) => {
  if (!item.id) return
  hideLoading.value = item.id
  try {
    await updateRecord(item.id, { ...item, isHidden: true })
    await mockApiStore.fetchData()
  } catch (error) {
    console.log(error)
  } finally {
    hideLoading.value = null
  }
}

const unhide = async (item: mrtStationsInfo | busStationsInfo) => {
  if (!item.id) return
  unhideLoading.value = item.id
  try {
    await updateRecord(item.id, { ...item, isHidden: false })
    await mockApiStore.fetchData()
    revealedIds.value.delete(item.id)
  } catch (error) {
    console.log(error)
  } finally {
    unhideLoading.value = null
  }
}

// 實體展出資訊
const venue = ref({
  name: '築步苑',
  address: '108臺北市萬華區新起里漢中街160號',
  googleMapsUrl: 'https://maps.app.goo.gl/qjGQCoFNrX33pmb66', // 實際的地圖縮網址
})

// 附近捷運站台資訊
const mrtStations = computed(() => {
  return mockApiStore.mrtStations
})

const showAddMrt = ref(false)
const newMrt = ref<mrtStationsInfo>({
  page: 'location',
  position: 'mrtStationsInfo',
  name: '',
  line: '',
  distance: '',
  guide: '',
  isHidden: false,
})
const cancelMrt = () => {
  showAddMrt.value = false
  newMrt.value = {
    page: 'location',
    position: 'mrtStationsInfo',
    name: '',
    line: '',
    distance: '',
    guide: '',
    isHidden: false,
  }
}
const confirmMrt = async () => {
  createMrtLoading.value = true
  try {
    const now = new Date()
    newMrt.value.updateTime = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`

    await createRecord(newMrt.value)
    mockApiStore.fetchData()
    cancelMrt()
  } catch (error) {
    console.log(error)
  } finally {
    createMrtLoading.value = false
  }
}

const showAddBus = ref(false)
const newBus = ref<busStationsInfo>({
  page: 'location',
  position: 'busStationsInfo',
  name: '',
  buses: '',
  guide: '',
  isHidden: false,
})
const cancelBus = () => {
  showAddBus.value = false
  newBus.value = {
    page: 'location',
    position: 'busStationsInfo',
    name: '',
    buses: '',
    guide: '',
    isHidden: false,
  }
}

const confirmBus = async () => {
  createBusLoading.value = true
  try {
    const now = new Date()

    newBus.value.updateTime = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`

    await createRecord(newBus.value)
    mockApiStore.fetchData()
    cancelBus()
  } catch (error) {
    console.log(error)
  } finally {
    createBusLoading.value = false
  }
}

// 附近公車站台資訊
const busStations = computed(() => {
  return mockApiStore.busStations
})
</script>

<template>
  <div class="location-container">
    <!-- 頁面標題區 -->
    <div class="page-header">
      <p class="tagline">VENUE & ACCESS</p>
      <h1>會場資訊 & 交通指南</h1>
      <p class="description">
        《蝕／光》實體特展位於台北西門町鬧區周邊，交通極為便利。請參考以下交通方式前來診所回診。
      </p>
    </div>

    <!-- 主內容區：左地圖、右資訊 -->
    <div class="main-layout">
      <!-- 左欄：地圖區塊 -->
      <div class="map-block">
        <div class="map-wrapper">
          <!--  Google Map Embed Iframe -->
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.7337926284614!2d121.5049386!3d25.0431948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a90967db053d%3A0x63eb4c14bdf88285!2zMTA45Y-w5YyX5biC6JCs6I-v5Y2A5ryi5Lit6KGXMTYw6Jmf!5e0!3m2!1szh-TW!2stw!4v1716000000000!5m2!1szh-TW!2stw"
            width="100%"
            height="100%"
            style="border: 0"
            allowfullscreen="true"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          >
          </iframe>
        </div>
        <div class="map-actions">
          <span class="venue-address">📍 {{ venue.address }}</span>
          <a :href="venue.googleMapsUrl" target="_blank" class="map-btn">打開 Google Maps 導航 ➔</a>
        </div>
      </div>

      <!-- 右欄：站台與路線提示 -->
      <div class="info-block">
        <div class="venue-card">
          <span class="badge">展出地點</span>
          <h2>{{ venue.name }}</h2>
          <p class="time-info">📅 展出展期：2026.06.05 – 06.14</p>
          <p class="time-info">⏰ 開放時間：11:00 – 18:00</p>
        </div>

        <!-- MRTGuide: 捷運指引 -->
        <div class="transport-section">
          <h3 class="section-sub"><span class="icon">🚇</span> 搭乘捷運 (MRT)</h3>
          <div v-for="mrt in mrtStations" :key="mrt.name" class="station-card">
            <div class="station-header">
              <h4>{{ mrt.name }}</h4>
              <span class="line-tag">{{ mrt.line }}</span>
            </div>
            <p class="distance-text">⏳ {{ mrt.distance }}</p>
            <p class="guide-text">{{ mrt.guide }}</p>
            <!-- 隱藏按鈕 -->
            <div v-if="!mrt.isHidden" class="hide-bar">
              <button class="hide-btn" :disabled="hideLoading === mrt.id" @click="hide(mrt)">
                {{ hideLoading === mrt.id ? '處理中...' : '內容有誤隱藏此站台' }}
              </button>
            </div>
            <!-- 隱藏遮罩 -->
            <div v-if="mrt.isHidden && !revealedIds.has(mrt.id ?? '')" class="hidden-mask">
              <p class="mask-label">此資訊有誤，已進行隱藏</p>
              <div class="mask-actions">
                <button class="mask-btn reveal-btn" @click="reveal(mrt.id ?? '')">
                  查看隱藏內容
                </button>
                <button
                  class="mask-btn unhide-btn"
                  :disabled="unhideLoading === mrt.id"
                  @click="unhide(mrt)"
                >
                  {{ unhideLoading === mrt.id ? '處理中...' : '取消隱藏' }}
                </button>
              </div>
            </div>
          </div>

          <!-- 新增捷運指引 -->
          <div class="add-station-area">
            <button v-if="!showAddMrt" class="add-station-btn" @click="showAddMrt = true">
              ＋ 新增捷運站台
            </button>
            <div v-else class="add-station-form">
              <input v-model="newMrt.name" class="s-input" placeholder="站名（含出口）*" />
              <input v-model="newMrt.line" class="s-input" placeholder="路線名稱" />
              <input v-model="newMrt.distance" class="s-input" placeholder="步行距離" />
              <textarea
                v-model="newMrt.guide"
                class="s-textarea"
                rows="2"
                placeholder="指引說明..."
              />
              <div class="add-station-actions">
                <button class="s-cancel" :disabled="createMrtLoading" @click="cancelMrt">
                  取消
                </button>
                <button class="s-confirm" :disabled="createMrtLoading" @click="confirmMrt">
                  <span v-if="createMrtLoading" class="btn-spinner" />
                  {{ createMrtLoading ? '新增中...' : '新增' }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- busGuide: 公車指引 -->
        <div class="transport-section">
          <h3 class="section-sub"><span class="icon">🚌</span> 搭乘公車 (Bus)</h3>
          <div v-for="bus in busStations" :key="bus.name" class="station-card">
            <div class="station-header">
              <h4>{{ bus.name }} 站</h4>
            </div>
            <p class="bus-lines"><strong>停靠線路：</strong>{{ bus.buses }}</p>
            <p class="guide-text">{{ bus.guide }}</p>
            <!-- 隱藏按鈕 -->
            <div v-if="!bus.isHidden" class="hide-bar">
              <button class="hide-btn" :disabled="hideLoading === bus.id" @click="hide(bus)">
                {{ hideLoading === bus.id ? '處理中...' : '內容有誤隱藏此站台' }}
              </button>
            </div>
            <!-- 隱藏遮罩 -->
            <div v-if="bus.isHidden && !revealedIds.has(bus.id ?? '')" class="hidden-mask">
              <p class="mask-label">此資訊有誤，已進行隱藏</p>
              <div class="mask-actions">
                <button class="mask-btn reveal-btn" @click="reveal(bus.id ?? '')">
                  查看隱藏內容
                </button>
                <button
                  class="mask-btn unhide-btn"
                  :disabled="unhideLoading === bus.id"
                  @click="unhide(bus)"
                >
                  {{ unhideLoading === bus.id ? '處理中...' : '取消隱藏' }}
                </button>
              </div>
            </div>
          </div>

          <!-- 新增公車指引 -->
          <div class="add-station-area">
            <button v-if="!showAddBus" class="add-station-btn" @click="showAddBus = true">
              ＋ 新增公車站台
            </button>
            <div v-else class="add-station-form">
              <input v-model="newBus.name" class="s-input" placeholder="站名 *" />
              <input v-model="newBus.buses" class="s-input" placeholder="停靠線路（逗號分隔）" />
              <textarea
                v-model="newBus.guide"
                class="s-textarea"
                rows="2"
                placeholder="指引說明..."
              />
              <div class="add-station-actions">
                <button class="s-cancel" :disabled="createBusLoading" @click="cancelBus">
                  取消
                </button>
                <button class="s-confirm" :disabled="createBusLoading" @click="confirmBus">
                  <span v-if="createBusLoading" class="btn-spinner" />
                  {{ createBusLoading ? '新增中...' : '新增' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部溫馨提醒 -->
    <div class="notice-bar">
      <h4>🩺 患者入院小叮嚀</h4>
      <ul>
        <li>因實體展場空間有限，若現場人潮眾多，將啟動容留人數管制，請依循工作人員引導排隊。</li>
        <li>展場內局部區域開放拍照，部分珍貴原畫展件禁止攝影，觀展時請注意牆面標示。</li>
        <li>會場周邊機車停車格較少，建議多加利用上述<strong>捷運大眾運輸工具</strong>前來。</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.location-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 0 4rem 0;
}
.page-header {
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
.page-header h1 {
  font-size: 2.2rem;
  margin: 0.5rem 0;
  color: #f8fafc;
}
.description {
  color: #94a3b8;
  max-width: 600px;
  margin: 0 auto;
  font-size: 0.95rem;
  line-height: 1.6;
}

/* 雙欄佈局 */
.main-layout {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 2.5rem;
  margin-bottom: 3rem;
}

@media (max-width: 900px) {
  .main-layout {
    grid-template-columns: 1fr;
  }
}

/* 左側地圖 */
.map-block {
  display: flex;
  flex-direction: column;
}
.map-wrapper {
  background: #140f20;
  border: 1px solid #2a2a35;
  border-radius: 12px;
  height: 450px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}
.map-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  background: #140f20;
  border: 1px solid #1f1f2e;
  padding: 1rem;
  border-radius: 8px;
}
.venue-address {
  font-size: 0.9rem;
  color: #cbd5e1;
}
.map-btn {
  background: #ff5e7e;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  transition: background 0.2s;
}
.map-btn:hover {
  background: #cc0022;
  color: #fff;
}

/* 右側資訊欄 */
.info-block {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.venue-card {
  background: linear-gradient(135deg, #1b1322 0%, #0d0a14 100%);
  border: 1px solid rgba(255, 94, 126, 0.2);
  padding: 1.5rem;
  border-radius: 12px;
}
.badge {
  background: rgba(255, 94, 126, 0.15);
  color: #ff5e7e;
  padding: 0.25rem 0.6rem;
  font-size: 0.75rem;
  border-radius: 4px;
  font-weight: bold;
}
.venue-card h2 {
  margin: 0.75rem 0;
  font-size: 1.6rem;
  color: #fff;
}
.time-info {
  margin: 0.3rem 0;
  color: #94a3b8;
  font-size: 0.9rem;
}

.section-sub {
  font-size: 1.15rem;
  color: #f8fafc;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid #1f1f2e;
  padding-bottom: 0.5rem;
}
.station-card {
  position: relative;
  background: #140f20;
  border: 1px solid #1f1f2e;
  padding: 1.25rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  overflow: hidden;
}
.hide-bar {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
  border-top: 1px solid var(--border-color);
}
.hide-btn {
  background: transparent;
  border: none;
  color: #64748b;
  font-size: 0.75rem;
  cursor: pointer;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  transition: color 0.2s;
}
.hide-btn:hover:not(:disabled) {
  color: #ff5e7e;
}
.hide-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.hidden-mask {
  position: absolute;
  inset: 0;
  background: rgba(13, 9, 20, 0.9);
  backdrop-filter: blur(6px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  text-align: center;
  padding: 1rem;
}
.mask-label {
  color: #94a3b8;
  font-size: 0.85rem;
  margin: 0;
}
.mask-actions {
  display: flex;
  gap: 0.75rem;
}
.mask-btn {
  padding: 0.4rem 1rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid transparent;
  transition: background 0.2s;
}
.mask-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.reveal-btn {
  background: rgba(255, 94, 126, 0.15);
  border-color: rgba(255, 94, 126, 0.4);
  color: #ff5e7e;
}
.reveal-btn:hover:not(:disabled) {
  background: rgba(255, 94, 126, 0.28);
}
.unhide-btn {
  background: rgba(100, 116, 139, 0.15);
  border-color: rgba(100, 116, 139, 0.4);
  color: #94a3b8;
}
.unhide-btn:hover:not(:disabled) {
  background: rgba(100, 116, 139, 0.28);
}
.station-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.station-header h4 {
  margin: 0;
  font-size: 1.05rem;
  color: #fff;
}
.line-tag {
  background: #2a2a35;
  color: #cbd5e1;
  font-size: 0.75rem;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
}
.distance-text {
  color: #ff5e7e;
  font-size: 0.85rem;
  font-weight: 600;
  margin: 0.4rem 0;
}
.bus-lines {
  color: #c084fc;
  font-size: 0.85rem;
  margin: 0.4rem 0;
}
.guide-text {
  color: #94a3b8;
  font-size: 0.88rem;
  line-height: 1.5;
  margin: 0;
}

/* 底部提醒 */
.notice-bar {
  background: rgba(255, 94, 126, 0.04);
  border: 1px solid rgba(255, 94, 126, 0.15);
  border-radius: 12px;
  padding: 1.5rem 2rem;
}
.notice-bar h4 {
  margin: 0 0 0.75rem 0;
  color: #ff5e7e;
  font-size: 1.05rem;
}
.notice-bar ul {
  margin: 0;
  padding-left: 1.2rem;
  color: #94a3b8;
  font-size: 0.9rem;
}
.notice-bar li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.add-station-area {
  margin-top: 0.75rem;
}
.add-station-btn {
  width: 100%;
  background: transparent;
  border: 1px dashed #2a2a35;
  border-radius: 8px;
  color: #4b5563;
  font-size: 0.82rem;
  padding: 0.55rem;
  cursor: pointer;
  transition:
    border-color 0.2s,
    color 0.2s;
}
.add-station-btn:hover {
  border-color: rgba(255, 94, 126, 0.4);
  color: #ff5e7e;
}
.add-station-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: #0d0d14;
  border: 1px solid #2a2a35;
  border-radius: 8px;
  padding: 0.875rem;
}
.s-input,
.s-textarea {
  background: #140f20;
  border: 1px solid #2a2a35;
  border-radius: 6px;
  padding: 0.4rem 0.65rem;
  color: #f8fafc;
  font-size: 0.85rem;
  outline: none;
  font-family: inherit;
}
.s-input:focus,
.s-textarea:focus {
  border-color: rgba(255, 94, 126, 0.5);
}
.s-textarea {
  resize: vertical;
}
.add-station-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 0.15rem;
}
.s-cancel {
  background: transparent;
  border: 1px solid #2a2a35;
  color: #6b7280;
  padding: 0.3rem 0.85rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.82rem;
}
.s-confirm {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: rgba(255, 94, 126, 0.15);
  border: 1px solid rgba(255, 94, 126, 0.3);
  color: #ff5e7e;
  padding: 0.3rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.82rem;
  font-weight: 600;
  transition: background 0.2s;
}
.s-confirm:hover {
  background: rgba(255, 94, 126, 0.28);
}
.s-confirm:disabled,
.s-cancel:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.btn-spinner {
  display: inline-block;
  width: 11px;
  height: 11px;
  border: 2px solid rgba(255, 94, 126, 0.3);
  border-top-color: #ff5e7e;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
