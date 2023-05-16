<template>
    <a-input-search
      v-model:value="value"
      placeholder="input search text"
      style="width: 200px"
      @search="onSearch"/>
      
</template>
<script setup>
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from '@/utils/axios'
import { localRemove, pathMap } from '@/utils'
const router = useRouter()



</script>
<style scoped>

</style>