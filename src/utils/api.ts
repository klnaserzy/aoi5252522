import request from '@/utils/mockApi'

export interface Type {
  website: string
}

export const getMockApi = () => {
  return request({
    url: '/522',
    method: 'get',
  })
}

export const postMockApi = (data: Type) => {
  return request({
    url: '/522',
    method: 'post',
    data: data,
  })
}
