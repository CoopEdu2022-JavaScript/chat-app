// frontend/src/api/http.js

import axios from "axios"
import { useUserStore } from '../../store/user'

const http = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-type": "application/json",
  }
})

// 拦截 axios 请求，在每次发送请求之前，从 pinia 获取 token
http.interceptors.request.use( // Request Interceptor
  config => {
    const { token } = useUserStore()
    if (token) config.headers.Authorization = `Bearer ${token}`  // add jwt token to headers
    return config
  },
  error => Promise.reject(error)
)

export default http
