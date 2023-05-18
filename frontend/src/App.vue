<template>
    <router-view />
    <div>token={{ token }}</div>
</template>
  
<script setup>
  const userStore = useUserStore()
  let { token } = storeToRefs(userStore)
</script>

