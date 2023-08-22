
<template>
  <h1 class="login-font">登录</h1>
  <q-input class="textin-1" label-color="white" standout="bg-teal" v-model="formData.ID" :input-style="{ color: 'white' }"
    clearable clear-icon="×" label="学号" />
  <q-input class="textin-2" label-color="white" standout="bg-teal" v-model="formData.password" minlength="6" maxlength="8"
    clearable clear-icon="×" :input-style="{ color: 'white' }" label="密码" />
  <div class="error-msg">{{ errorMsg }}</div>
  <q-btn :ripple="{ color: 'red' }" color="secondary" label="登录" no-caps @click="login" />
</template>

<script setup>

import http from '../api/http'
import { useRouter } from "vue-router"
import { reactive, ref } from "vue"
import { useUserStore } from '../../store/user';
import { storeToRefs } from 'pinia';
localStorage.removeItem('my_jwt_token')//用来删除token
const router = useRouter()
const formData = reactive({
  ID: '',
  password: ''
})
const { token } = storeToRefs(useUserStore())
const errorMsg = ref('')
function login() {
  http.post('/login', formData)
    .then(response => {
      const TOKEN_KEY = 'my_jwt_token'
      if (response.data.statue) {
        token.value = response.data.token
        localStorage.setItem(TOKEN_KEY, token.value) // 将令牌存储到 localStorage 中
        router.push('/feed')
      } else {
        errorMsg.value = response.data.message
      }
    })
    .catch(error => {
      errorMsg.value = '登录失败，请稍后重试。'
    })
}
</script>

<style scoped>
.textin-1,
.textin-2 {
  width: 80%;
  margin-left: 10%;
  border-bottom: 1px white solid;
  margin-top: 17%;
  background-color: rgb(31, 31, 31);
}

.textin-2 {
  margin-bottom: 15%;
}

.error-msg {
  margin-top: 3%;
  margin-left: 10%;
  font-size: 12px;
  color: rgb(255, 189, 189);
  margin-bottom: 30%;
  height: 12px;
}

div {
  display: block;
}

* {
  margin: 0;
  padding: 0;
  color: #FFFFFF
}

.login-font {
  margin-top: 105px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 42px;
  width: 80%;
  margin-left: 10%;
  height: 44px;
}

input[type="text"] {
  margin-bottom: 60px;
}



button {
  width: 80%;
  height: 65px;
  border-radius: 20px;
  border: none;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  text-align: center;
  margin-left: 10%;
}
</style>

