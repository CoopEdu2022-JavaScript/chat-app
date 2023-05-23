<template>
  <h1 class="login-font">登录</h1>
  <span>账号/邮箱/手机号</span>
  <input type="text" maxlength="10" v-model="formData.uid" placeholder="请输入"><br>
  <span>密码</span>
  <input type="password" maxlength="15" placeholder="请输入" v-model="formData.pwd">
  <div class="error-msg"></div>
  <input value="login" type="submit" @click="login">
</template>
<script setup>
import http from '../api/http'
import { useRouter } from "vue-router"
import { reactive } from "vue"
import { useUserStore } from '../../store/user';
import { storeToRefs } from 'pinia';
const router = useRouter()
const formData = reactive({
  uid: '',
  pwd: ''
})

const userStore = useUserStore()
let { token } = storeToRefs(userStore)
const login = () => {
  http.post('/login', formData)
    .then(rep => {
      token.value = rep.data
      // console.log(formData)
      if (token.value) router.push('/feed')
    })
}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}

.login-font {
  color: white;
  margin-top: 20%;
  margin-bottom: 20%;
}

body {
  background-color: rgb(29, 29, 29);
  padding-left: 13%;
}

span {
  color: white;
  font-size: 12px;
  display: block;
  margin-bottom: 20px;
}

input[type="text"],
input[type="password"] {
  background-color: rgb(29, 29, 29);
  border: 0;
  border-bottom: 1px white solid;
  width: 85%;
  color: rgb(111, 111, 111);
  outline: none;
  line-height: 25px;
}

input[type="text"] {
  margin-bottom: 30%;
}

input[type="text"]:focus,
input[type="password"]:focus {
  color: white;
}


input[type="submit"] {
  background-color: rgb(248, 233, 253);
  width: 85%;
  color: white;
  border-radius: 20px;
  height: 60px;
}

input[type="submit"]:active {
  background-color: rgb(189, 108, 216);
}

.error-msg {
  font-size: 12px;
  color: rgb(255, 189, 189);
  margin-bottom: 106px;
}
</style>

