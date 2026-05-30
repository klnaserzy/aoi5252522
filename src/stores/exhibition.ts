import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { TweetCard } from '@/utils/api'

export interface MerchandiseItem {
  id: string
  name: string
  price: number
  category: 'standard' | 'premium' | 'apparel'
  spec?: string
  isLimited: boolean
  description: string
}

export const useExhibitionStore = defineStore('exhibition', () => {
  const exhibits = ref<TweetCard[]>([
    {
      id: '1',
      page: 'tweet',
      position: 'tweetCard',
      url: 'https://x.com/AoiHinamori/status/2058909320495128866',
      author: 'Aoi Hinamori 🎀',
      authorHandle: '@AoiHinamori',
      type: 'official',
      title: '【展覽開幕】主視覺公告與活動啟動',
      description:
        '《蝕 / 光》代表著「光曾被吞沒，但從未真正消失」這不只是一場畫展 更是我一路走來的故事！',
      date: '2026-05-26',
    },
    {
      id: '2',
      page: 'tweet',
      position: 'tweetCard',
      url: 'https://x.com/AoiHinamori/status/2059092306679288066',
      author: 'Aoi Hinamori 🎀',
      authorHandle: '@AoiHinamori',
      type: 'official',
      title: '商品情報 周邊公開',
      description:
        '這次的周邊是我傾注一切的心血！ 希望大家可以把《蝕 / 光》的故事，一起帶回家收藏！',
      date: '2026-05-26',
    },
    {
      id: '3',
      page: 'tweet',
      position: 'tweetCard',
      url: 'https://x.com/star_2290/status/2059096643895734771',
      author: '筱星朔光 ✦',
      authorHandle: '@star_2290',
      type: 'artwork',
      title: '【💉Live2D 動畫委託展示💖】',
      description:
        '我負責了Aoi 的個展《蝕 / 光》主視覺的Live2D插圖動態！再次有幸做到了林花老師繪製的作品，邊做邊感嘆Aoi的美貌絕世無雙🫶🫶',
      date: '2026-05-26',
    },
    {
      id: '4',
      page: 'tweet',
      position: 'tweetCard',
      url: 'https://x.com/AoiHinamori/status/2059490425191428293',
      author: 'Aoi Hinamori 🎀',
      authorHandle: '@AoiHinamori',
      type: 'official',
      title: '預購品 ✦LAHEE',
      description:
        'LAHEE 聽見這個名字的瞬間 相信光之戰士們已經在腦中自動播放了🎶 這款項鍊以十字架與向日葵為設計核心🌻 將旅途中那些難忘的旋...',
      date: '2026-05-26',
    },
    {
      id: '5',
      page: 'tweet',
      position: 'tweetCard',
      url: 'https://x.com/chocobanadd/status/2059532645982441844',
      author: 'chocobanadd 🍌',
      authorHandle: '@chocobanadd',
      type: 'artwork',
      title: 'Custom Dollfie Dream Doll - Aoi Hinamori',
      description: 'dd 娃',
      date: '2026-05-27',
    },
  ])

  // 直播公開的週邊商品資訊
  const merchandise = [
    {
      id: 'm1',
      name: '手工皮革旅行袋',
      price: 35000,
      category: 'premium',
      spec: '師傅純手工製作，真牛皮皮革搭配滿版內裡設計',
      isLimited: true,
      description: '極限量販售！可收納約兩天一夜換洗衣物，內裡布滿滿的 Aoi 元素細節。',
    },
    {
      id: 'm2',
      name: 'LAHEE 紀念項鍊',
      price: 4000,
      category: 'premium',
      spec: '項鍊附收納小袋、精美包裝盒',
      isLimited: false,
      description: '極具紀念價值的信仰飾品。',
    },
    {
      id: 'm3',
      name: '蝕光鋁板畫',
      price: 3500,
      category: 'premium',
      spec: 'A3 尺寸 / 附精美包裝',
      isLimited: false,
      description: '將本次展覽核心視覺以最高規格的鋁板畫永久典藏。',
    },
    {
      id: 'm4',
      name: '豪華套裝親簽名板',
      price: 1700,
      category: 'standard',
      isLimited: true,
      description: '包含 Aoi 親筆簽名的極珍貴收藏。',
    },
    {
      id: 'm5',
      name: '塊狀秋葵',
      price: 1500,
      category: 'standard',
      isLimited: false,
      description: '直播掀起話題的粉絲迷因實體化商品！',
    },
    {
      id: 'm6',
      name: "Aoi's Diary 原創漫畫",
      price: 550,
      category: 'standard',
      spec: '附 A3 海報一張',
      isLimited: false,
      description: '收錄 Aoi 日常與心路歷程的原創漫畫冊。',
    },
    {
      id: 'm7',
      name: '患者絨毛徽章套 + LED發光徽章組',
      price: 600,
      category: 'standard',
      spec: '內附電池',
      isLimited: false,
      description: '讓你在應援場地所到之處無不驚艷。',
    },
    {
      id: 'm8',
      name: '極光色立牌',
      price: 500,
      category: 'standard',
      isLimited: false,
      description: '採用特殊極光鍍膜，不同角度折射出夢幻光影。',
    },
  ] as MerchandiseItem[]

  return { exhibits, merchandise }
})
