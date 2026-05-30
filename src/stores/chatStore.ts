import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getChatRecords } from '@/utils/chatApi'
import type { Message } from '@/utils/chatApi'

export const useChatStore = defineStore('chat', () => {
  const chatMessage = ref<Message[]>([])
  const fetchChatData = async () => {
    const response = await getChatRecords()
    chatMessage.value = response.data
  }

  return {
    fetchChatData,
    chatMessage,
  }
})
