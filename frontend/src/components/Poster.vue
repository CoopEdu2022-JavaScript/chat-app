<template>
    <hr />
    <div @click="goDetail">
      <img src="" alt=" ">
      <span >{{ nickname }}</span>
      <span>&nbsp;</span>
      <span >{{ date }}</span>
      <p >{{ text }}</p>
      <div class="image">imgs: 
        <img src="" alt=" ">
        <img src="" alt=" ">
        <img src="" alt=" ">
        <img src="" alt=" ">
      </div>
      <span >{{ comment }}</span>
      <span>&nbsp;</span>
      <span >{{ like }}</span>
    </div>
</template>
  
<script setup>
  import http from '../api/http';
  
  let nickname = 'nickname: '
  let date = 'date: '
  let text = 'text content: '
  let comment = 'comment: '
  let like = 'like: '
  
  const router = useRouter()
  const goDetail = () => {
    router.push('/feed/detail')
  }
  
</script>
  
<style scoped>
</style>