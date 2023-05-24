<template>
    <router-view />
    <span>token={{ token }}</span>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '../store/user.js'
const userStore = useUserStore()
let { token } = storeToRefs(userStore)
</script>


