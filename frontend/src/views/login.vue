<template>
  <h1 class="login-font">登录</h1>
  <div class="acc">邮箱</div>
  <input type="text" maxlength="10" v-model="formData.uid" placeholder="请输入"><br>
  <div class="psw">密码</div>
  <input type="password" minlength="6" maxlength="8" placeholder="请输入6-8位密码" v-model="formData.pwd">
  <div class="error-msg"></div>
  <input value="登录" type="submit" @click="login">
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
div {
  display: block;
}

* {
  margin: 0;
  padding: 0;
  margin-left: 40px;
  margin-right: 40px;
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
  width: 313px;
  height: 44px;
}


.acc {
  margin-top: 57px;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  width: 28px;
  height: 28px;
  margin-bottom: 13px;
}

.psw {
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 16px;
}

input[type="text"],
input[type="password"] {
  width: 313px;
  height: 22px;
  background-color: rgb(29, 29, 29);
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px gray solid;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
}

input[type="text"] {
  margin-bottom: 60px;
}

imput[type="password"] {
  margin-bottom: 138px;
}

input[type="text"]:focus,
input[type="password"]:focus {
  color: white;
}


input[type="submit"] {
  background-color: rgb(248, 233, 253);
  width: 313px;
  height: 65px;
  border-radius: 20px;
  border: none;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  text-align: center;
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

