// searchStore.js

import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', () => {

  const searchResult = ref(null)

  return {
    searchResult
  }

})