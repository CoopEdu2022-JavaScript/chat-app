<template>
    <a-input v-model:value="value" :bordered="false" placeholder="input email" defaultValue="请输入邮箱"/>
    <a-input-password v-model:value="value" placeholder="input password" bordered="false" defaultValue="请输入密码"/> 
    <a-button type="primary" size="large"  @click="submit"></a-button>
</template>

<script setup>
import { useRouter } from "vue-router"
const router = useRouter()
const authStore = userAuthStore()
const token = 
</script>
