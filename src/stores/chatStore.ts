import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getChatRecords } from '@/utils/chatApi'
import type { Message } from '@/utils/chatApi'

export const useChatStore = defineStore('mockApi', () => {
  const chatMessage = ref<Message[]>([])
  const fetchData = async () => {
    const response = await getChatRecords()
    chatMessage.value = response.data
  }
  fetchData()

  return {
    fetchData,
    chatMessage,
  }
})
