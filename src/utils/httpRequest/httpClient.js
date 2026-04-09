import axios from 'axios'
import Cookies from 'js-cookie'
import { storageKeys } from '@/constants'

const routerBasename = import.meta.env.VITE_API_ROUTER_BASENAME

const handleUnauthorized = () => {
  Cookies.remove(storageKeys.token)
  window.location.href = `${window.location.origin}${
    routerBasename ? `/${routerBasename}` : ''
  }/login`
}

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截：token
httpClient.interceptors.request.use((config) => {
  const token = Cookies.get(storageKeys.token)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 响应拦截：统一错误处理
httpClient.interceptors.response.use(
  (res) => res.data,
  (error) => {
    if (error?.response?.status === 401) {
      handleUnauthorized()
    }
    return Promise.reject(
      new Error(error?.response?.data?.message || error.message || 'Request failed')
    )
  }
)

export default httpClient
