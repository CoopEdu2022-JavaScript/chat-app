// frontend/src/api/http.js

import axios from "axios"
import { useUserStore } from '../../store/user'

const http = axios.create({
  baseURL: "http://localhost:3000",//http://172.10.21.169:3000
  headers: {
    'Access-Control-Allow-Origin': '*',
    "Content-type": "application/json",
  }
})

// 拦截 axios 请求，在每次发送请求之前，从 pinia 获取 token
http.interceptors.request.use( // Request Interceptor
  config => {
    const TOKEN_KEY = 'my_jwt_token'
const token = localStorage.getItem(TOKEN_KEY)
    if (token) config.headers.Authorization = `Bearer ${token}`  // add jwt token to headers
    return config
  },
  error => Promise.reject(error)
)
localStorage.setItem('jwtToken', 'your_jwt_token_here');

// 2. 创建一个全局拦截器
// axios.interceptors.request.use(
//   config => {
//     const jwtToken = localStorage.getItem('jwtToken');
//     if (jwtToken) {
//       config.headers.Authorization = `Bearer ${jwtToken}`;
//     }
//     return config;
//   },
//   error => Promise.reject(error)
// );
export default http
