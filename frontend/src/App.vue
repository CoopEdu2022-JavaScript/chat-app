<template>
    <router-view />
    <div>token={{ token }}</div>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '../store/user.js'
const userStore = useUserStore()
let { token } = storeToRefs(userStore)
</script>

