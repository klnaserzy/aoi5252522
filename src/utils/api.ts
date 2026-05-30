import request from '@/utils/mockApi'

export interface BaseRecord {
  id?: string
  page: string
  position: string
  updateTime?: string
  updateBy?: string
  hidden?: boolean
}
export interface TweetCard {
  page: 'tweet'
  position: 'tweetCard'
  id?: number
  url: string
  author: string
  authorHandle: string
  type: 'official' | 'artwork' | 'other'
  title: string
  description: string
  date: string
}

export const getRecords = () => {
  return request({
    url: '/AOI522',
    method: 'get',
  })
}

export const createRecord = (data: object) => {
  return request({
    url: '/AOI522',
    method: 'post',
    data,
  })
}

export const updateRecord = (id: string, data: object) => {
  return request({
    url: `/AOI522/${id}`,
    method: 'patch',
    data,
  })
}

export const hideRecord = (id: string, updatedBy?: string) => {
  return updateRecord(id, {
    hidden: true,
    updateTime: new Date().toISOString(),
    updateBy: updatedBy,
  })
}
