import request from '@/utils/mockRequest'

export interface Message {
  id?: string
  author: string
  content: string
  isHidden: boolean
  time: string
}

export const getChatRecords = () => {
  return request({
    url: '/chat',
    method: 'get',
  })
}

export const createChatRecord = (data: object) => {
  return request({
    url: '/chat',
    method: 'post',
    data,
  })
}
