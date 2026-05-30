import { defineStore } from 'pinia'
import { getRecords } from '@/utils/api'
import { ref, computed } from 'vue'
import type { TweetCard, TimelineEvent, mrtStationsInfo, busStationsInfo } from '@/utils/api'

export const useMockApi = defineStore('mockApi', () => {
  const mockApiData = ref<TweetCard[] | TimelineEvent[] | mrtStationsInfo[] | busStationsInfo[]>([])
  const fetchData = async () => {
    const response = await getRecords()
    mockApiData.value = response.data
  }
  fetchData()

  const tweetCard = computed(() => {
    return mockApiData.value.filter(
      (item) => item.page === 'tweet' && item.position === 'tweetCard',
    )
  })

  const timelineEvent = computed(() => {
    return mockApiData.value.filter((item) => item.page === 'timeline' && item.position === 'event')
  })

  const mrtStations = computed(() => {
    return mockApiData.value.filter(
      (item) => item.page === 'location' && item.position === 'mrtStationsInfo',
    )
  })
  const busStations = computed(() => {
    return mockApiData.value.filter(
      (item) => item.page === 'location' && item.position === 'busStationsInfo',
    )
  })

  return {
    fetchData,
    tweetCard,
    timelineEvent,
    mrtStations,
    busStations,
  }
})

// Tweet card 暫存
// const exhibits = ref<TweetCard[]>([
//   {
//     id: '1',
//     page: 'tweet',
//     position: 'tweetCard',
//     url: 'https://x.com/AoiHinamori/status/2058909320495128866',
//     author: 'Aoi Hinamori 🎀',
//     authorHandle: '@AoiHinamori',
//     type: 'official',
//     title: '【展覽開幕】主視覺公告與活動啟動',
//     description:
//       '《蝕 / 光》代表著「光曾被吞沒，但從未真正消失」這不只是一場畫展 更是我一路走來的故事！',
//     date: '2026-05-26',
//   },
//   {
//     id: '2',
//     page: 'tweet',
//     position: 'tweetCard',
//     url: 'https://x.com/AoiHinamori/status/2059092306679288066',
//     author: 'Aoi Hinamori 🎀',
//     authorHandle: '@AoiHinamori',
//     type: 'official',
//     title: '商品情報 周邊公開',
//     description:
//       '這次的周邊是我傾注一切的心血！ 希望大家可以把《蝕 / 光》的故事，一起帶回家收藏！',
//     date: '2026-05-26',
//   },
//   {
//     id: '3',
//     page: 'tweet',
//     position: 'tweetCard',
//     url: 'https://x.com/star_2290/status/2059096643895734771',
//     author: '筱星朔光 ✦',
//     authorHandle: '@star_2290',
//     type: 'artwork',
//     title: '【💉Live2D 動畫委託展示💖】',
//     description:
//       '我負責了Aoi 的個展《蝕 / 光》主視覺的Live2D插圖動態！再次有幸做到了林花老師繪製的作品，邊做邊感嘆Aoi的美貌絕世無雙🫶🫶',
//     date: '2026-05-26',
//   },
//   {
//     id: '4',
//     page: 'tweet',
//     position: 'tweetCard',
//     url: 'https://x.com/AoiHinamori/status/2059490425191428293',
//     author: 'Aoi Hinamori 🎀',
//     authorHandle: '@AoiHinamori',
//     type: 'official',
//     title: '預購品 ✦LAHEE',
//     description:
//       'LAHEE 聽見這個名字的瞬間 相信光之戰士們已經在腦中自動播放了🎶 這款項鍊以十字架與向日葵為設計核心🌻 將旅途中那些難忘的旋...',
//     date: '2026-05-26',
//   },
//   {
//     id: '5',
//     page: 'tweet',
//     position: 'tweetCard',
//     url: 'https://x.com/chocobanadd/status/2059532645982441844',
//     author: 'chocobanadd 🍌',
//     authorHandle: '@chocobanadd',
//     type: 'artwork',
//     title: 'Custom Dollfie Dream Doll - Aoi Hinamori',
//     description: 'dd 娃',
//     date: '2026-05-27',
//   },
// ])

// TimelineSection 資料暫存
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

// 附近捷運站台資訊暫存
// const mrtStations = ref<mrtStationsInfo[]>([
//   {
//     "page": "location",
//     "position": "mrtStationsInfo",
//     "name": "捷運西門站（1號出口）",
//     "line": "板南線 / 松山新店線",
//     "distance": "步行約 3 分鐘 (約 230 公尺)",
//     "guide":
//       "出站後左轉進入漢中街（往西門紅樓旁側方向），直行通過長沙街二段路口，目的地即在您的右側。",
//   },
//   {
//     "page": "location",
//     "position": "mrtStationsInfo",
//     "name": "捷運西門站（6號出口）",
//     "line": "板南線 / 松山新店線",
//     "distance": "步行約 5 分鐘 (約 380 公尺)",
//     "guide":
//       "出西門町步行區大門口後左轉，沿著漢中街直行（經過成都路與西門紅樓），過馬路後繼續直行即可抵達。",
//   },
// ])

// 附近公車站台資訊暫存
// const busStations = ref<busStationsInfo[]>([
//   {
//     page: 'location',
//     position: 'busStationsInfo',
//     name: '捷運西門站',
//     buses: '307, 265, 212, 965, 綠17 (大遠百/西門市場側)',
//     guide: '下車後往西門紅樓方向移動，沿漢中街步行約 4 分鐘。',
//   },
//   {
//     page: 'location',
//     position: 'busStationsInfo',
//     name: '西門市場(漢中)',
//     buses: '18, 235, 257, 621, 640',
//     guide: '站牌即位在漢中街周邊，下車後朝長沙街方向步行 1-2 分鐘。',
//   },
// ])
