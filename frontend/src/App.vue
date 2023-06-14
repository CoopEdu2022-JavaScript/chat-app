<template>
  <router-view />
  <!-- <span class="token">token={{ token }}</span> -->
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '../store/user.js'
const userStore = useUserStore()
let { token } = storeToRefs(userStore)
const test = () => {
  http.get('/').then((rep) => {
    console.log(rep.data)
  })
}
</script>

<style scoped>
.token {
  position: absolute;
  left: 0;
  bottom: 0;
  color: white;
}
</style>

