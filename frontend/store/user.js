import { defineStore } from 'pinia'
import { ref } from 'vue'
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
