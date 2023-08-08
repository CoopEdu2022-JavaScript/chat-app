import { defineStore } from 'pinia'
export const SaveWordStore = defineStore('wordstore', () => {
  const WordStore = ref(null)
  return {
    WordStore
  }
})