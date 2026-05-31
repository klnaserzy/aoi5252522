import axios, { AxiosError } from 'axios'

// create an axios instance
const instance = axios.create({
  baseURL: 'https://67651da352b2a7619f5e6fe7.mockapi.io/aoi/',
  timeout: 5000, // request timeout
})

instance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error: AxiosError) => {
    return Promise.reject(error)
  },
)

export default instance
