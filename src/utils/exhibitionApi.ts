import request from '@/utils/mockRequest'

export interface BaseRecord {
  id?: string
  page: string
  position: string
  isHidden: boolean
  updateTime?: string
  updateBy?: string
}
export interface TweetCard extends BaseRecord {
  page: 'tweet'
  position: 'tweetCard'
  url: string
  author: string
  authorHandle: string
  type: 'official' | 'artwork' | 'other'
  title: string
  description: string
  date: string
}
export interface TimelineEvent extends BaseRecord {
  page: 'timeline'
  position: 'event'
  year: string // 具體年份
  title: string // 事件主題
  subtitle: string // 一句話摘要
  content: string // 詳細敘事內文
}
export interface mrtStationsInfo extends BaseRecord {
  page: 'location'
  position: 'mrtStationsInfo'
  name: string
  line: string
  distance: string
  guide: string
}
export interface busStationsInfo extends BaseRecord {
  page: 'location'
  position: 'busStationsInfo'
  name: string
  buses: string
  guide: string
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
    method: 'put',
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
