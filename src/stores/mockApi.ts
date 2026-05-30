import { defineStore } from 'pinia'
import { getRecords } from '@/utils/api'
import { ref, computed } from 'vue'
import type { TweetCard } from '@/utils/api'

export const useMockApi = defineStore('mockApi', () => {
  const mockApiData = ref<TweetCard[]>([])
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

  return {
    tweetCard,
  }
})
