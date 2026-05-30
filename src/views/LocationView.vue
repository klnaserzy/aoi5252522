<script setup lang="ts">
import { ref, reactive } from 'vue'

interface StationInfo {
  name: string
  line: string
  distance: string
  guide: string
}

// 實體展出資訊
const venue = ref({
  name: '築步苑',
  address: '108臺北市萬華區新起里漢中街160號',
  googleMapsUrl: 'https://maps.app.goo.gl/qjGQCoFNrX33pmb66', // 可替換為實際的地圖縮網址
})

// 附近捷運站台資訊
const mrtStations = ref<StationInfo[]>([
  {
    name: '捷運西門站（1號出口）',
    line: '板南線 / 松山新店線',
    distance: '步行約 3 分鐘 (約 230 公尺)',
    guide:
      '出站後左轉進入漢中街（往西門紅樓旁側方向），直行通過長沙街二段路口，目的地即在您的右側。',
  },
  {
    name: '捷運西門站（6號出口）',
    line: '板南線 / 松山新店線',
    distance: '步行約 5 分鐘 (約 380 公尺)',
    guide:
      '出西門町步行區大門口後左轉，沿著漢中街直行（經過成都路與西門紅樓），過馬路後繼續直行即可抵達。',
  },
])

const showAddMrt = ref(false)
const newMrt = reactive({ name: '', line: '', distance: '', guide: '' })
const cancelMrt = () => { showAddMrt.value = false; Object.assign(newMrt, { name: '', line: '', distance: '', guide: '' }) }
const confirmMrt = () => { if (!newMrt.name.trim()) return; mrtStations.value.push({ ...newMrt }); cancelMrt() }

const showAddBus = ref(false)
const newBus = reactive({ name: '', buses: '', guide: '' })
const cancelBus = () => { showAddBus.value = false; Object.assign(newBus, { name: '', buses: '', guide: '' }) }
const confirmBus = () => { if (!newBus.name.trim()) return; busStations.value.push({ ...newBus }); cancelBus() }

// 附近公車站台資訊
const busStations = ref([
  {
    name: '捷運西門站',
    buses: '307, 265, 212, 965, 綠17 (大遠百/西門市場側)',
    guide: '下車後往西門紅樓方向移動，沿漢中街步行約 4 分鐘。',
  },
  {
    name: '西門市場(漢中)',
    buses: '18, 235, 257, 621, 640',
    guide: '站牌即位在漢中街周邊，下車後朝長沙街方向步行 1-2 分鐘。',
  },
])
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
          <!-- 實際環境中可替換為真實的 Google Map Embed Iframe -->
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
          </div>

          <!-- 新增捷運指引 -->
          <div class="add-station-area">
            <button v-if="!showAddMrt" class="add-station-btn" @click="showAddMrt = true">＋ 新增捷運站台</button>
            <div v-else class="add-station-form">
              <input v-model="newMrt.name" class="s-input" placeholder="站名（含出口）*" />
              <input v-model="newMrt.line" class="s-input" placeholder="路線名稱" />
              <input v-model="newMrt.distance" class="s-input" placeholder="步行距離" />
              <textarea v-model="newMrt.guide" class="s-textarea" rows="2" placeholder="指引說明..." />
              <div class="add-station-actions">
                <button class="s-cancel" @click="cancelMrt">取消</button>
                <button class="s-confirm" @click="confirmMrt">新增</button>
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
          </div>

          <!-- 新增公車指引 -->
          <div class="add-station-area">
            <button v-if="!showAddBus" class="add-station-btn" @click="showAddBus = true">＋ 新增公車站台</button>
            <div v-else class="add-station-form">
              <input v-model="newBus.name" class="s-input" placeholder="站名 *" />
              <input v-model="newBus.buses" class="s-input" placeholder="停靠線路（逗號分隔）" />
              <textarea v-model="newBus.guide" class="s-textarea" rows="2" placeholder="指引說明..." />
              <div class="add-station-actions">
                <button class="s-cancel" @click="cancelBus">取消</button>
                <button class="s-confirm" @click="confirmBus">新增</button>
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
  background: #140f20;
  border: 1px solid #1f1f2e;
  padding: 1.25rem;
  border-radius: 8px;
  margin-bottom: 1rem;
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
  transition: border-color 0.2s, color 0.2s;
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
</style>
