<template>
    <router-view />
    <div>token={{ token }}</div>
</template>
  
<script setup>
import { storeToRefs } from 'pinia'
const userStore = useUserStore()
let { token } = storeToRefs(userStore)
</script>

