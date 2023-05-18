html
<template>
  <form id="login-form" action="http://localhost:80" method="Post">
    <h1 class="login-font">登录</h1>
    <span>账号/邮箱/手机号</span>
    <input type="text" maxlength="10" id="username" name="fusername" placeholder="请输入"><br>
    <span>密码</span>
    <input type="password" maxlength="15" id="password" name="fpassword" placeholder="请输入">
    <div class="error-msg"></div>
    <input type="submit" id="login-button">
  </form>
</template>
<script>
export default {
  mounted() {
    const loginForm = document.getElementById('login-form');
    const loginButton = document.getElementById('login-button');
    const errorMsg = document.querySelector('.error-msg');

    loginForm.addEventListener('submit', (event) => {
      event.preventDefault(); // 防止浏览器刷新页面

      const formData = new FormData(loginForm);

      fetch('/login', {
        method: 'Post',
        body: formData
      })
        .then(response => {
          if (response.ok) {
            window.location.href = '/user';
          } else {
            response.json().then(data => {
              errorMsg.textContent = '登陆失败';
            });
          }
        })
        .catch(error => console.error('Error:', error));
    });
  }
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

