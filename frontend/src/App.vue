<template>
    <router-view />
    <div>token={{ token }}</div>
    <div>123</div>
</template>
  
<script setup>
const userStore = useUserStore()
let { token } = storeToRefs(userStore)
</script>

