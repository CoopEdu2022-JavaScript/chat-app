<template>
    <div>{{ result }}</div>
</template>
<script setup>
import { ref } from 'vue'
import { useSearchStore } from '../../store/searchstore'
const searchStore = useSearchStore()
const result = searchStore.searchResult
</script>
<style scoped>
*{
    color:white;
    width: 100px;
    height: 100px;
}
div{
    width: 100px;
    height: 100px;
}
</style>