import { defineStore } from 'pinia'
import { getMockApi } from '@/utils/api'
import { ref } from 'vue'

export const useMockApi = defineStore('mockApi', () => {
  const mockApiData = ref([])

  const fetchData = async () => {
    const response = await getMockApi()
    mockApiData.value = response.data
  }
  fetchData()

  return {
    mockApiData,
  }
})
