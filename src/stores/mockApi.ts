import { defineStore } from 'pinia'
import { getRecords } from '@/utils/api'
import { ref, computed } from 'vue'
import type { TweetCard, TimelineEvent } from '@/utils/api'

export const useMockApi = defineStore('mockApi', () => {
  const mockApiData = ref<TweetCard[] | TimelineEvent[]>([])
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

  return {
    fetchData,
    tweetCard,
    timelineEvent,
  }
})
