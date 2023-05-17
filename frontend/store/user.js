import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'user',
  () => {
    // eslint-disable-next-line no-undef
    const token = ref(false)
    return { token }
  },
  {
    persist: true
  }
)
