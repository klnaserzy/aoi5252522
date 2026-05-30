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

  return { merchandise }
})
