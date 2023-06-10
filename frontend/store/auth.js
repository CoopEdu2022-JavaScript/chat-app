import { reactive, computed } from 'vue'
import http from '../src/api/http'

const TOKEN_KEY = 'my_jwt_token'

export function useAuthStore() {
  const state = reactive({
    token: localStorage.getItem(TOKEN_KEY),
    user: null,
    error: null
  })

  // 登录
  function login(formData) {
    return new Promise((resolve, reject) => {
      http.post('/login', formData)
        .then(response => {
          if (response.data.statue) {
            state.token = response.data.token
            localStorage.setItem(TOKEN_KEY, state.token)
            setUser(state.token)
            resolve()
          } else {
            state.error = response.data.message
            reject(new Error(response.data.message))
          }
        })
        .catch(error => {
          state.error = '登录失败，请稍后重试。'
          reject(new Error('登录失败，请稍后重试。'))
        })
    })
  }

  // 注销
  function logout() {
    localStorage.removeItem(TOKEN_KEY)
    state.token = null
    state.user = null
  }

  // 解码JWT令牌
  function decodeToken(token) {
    try {
      return jwtDecode(token)
    } catch (error) {
      return null
    }
  }

  // 更新用户信息
  function setUser(token) {
    const decodedToken = decodeToken(token)
    if (decodedToken) {
      state.user = {
        id: decodedToken.user_id
      }
    }
  }

  // 计算属性：是否已登录
  const isAuthenticated = computed(() => {
    return !!state.token
  })

  return {
    token: state.token,
    user: state.user,
    isAuthenticated,
    error: state.error,
    login,
    logout
  }
}
