<template>
    <div class="user">
        <div class="usericon"></div>
        <div class="username">{{ user ? user.usernames : '' }}</div>
    </div>
    <img src="../assets/Profile/ic_setting.png" class="settings">
    <div class="background-pur">
        <div class="background-blk">
            <div class="tiezi">帖子</div>
            <div class="fastshot">快拍</div>
        </div>
    </div>
    <div class="context">
        <img src="https://th.bing.com/th/id/OIP.hFrKNRbu4jH3427Gl3I4_AHaHQ?w=207&h=203&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="">
        <img src="https://th.bing.com/th/id/OIP.FUlFdWUUiMrKbYA7k3BzOQHaHa?w=176&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="">
        <img src="https://tse4-mm.cn.bing.net/th/id/OIP-C.RPe0ThRMPmKnvybT7Z28JQHaHa?w=177&h=180&c=7&r=0&o=5&dpr=1.6&pid=1.7"
            alt="">
        <img src="https://th.bing.com/th/id/OIP.FUlFdWUUiMrKbYA7k3BzOQHaHa?w=176&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="">
        <img src="https://th.bing.com/th/id/OIP.FUlFdWUUiMrKbYA7k3BzOQHaHa?w=176&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="">
        <img src="https://th.bing.com/th/id/OIP.FUlFdWUUiMrKbYA7k3BzOQHaHa?w=176&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="">
        <div></div>
    </div>
    <div class="btm">
        <button @click="goToFeed" class="mainmenu">首页</button>
        <button @click="showOptions = !showOptions" class="add-logo"><img src="../assets/Profile/新建帖子logo.png"
                class="add-logo"></button>
        <button class="mine">我的</button>
    </div>
    <div v-if="showOptions" class="showOptions">
        <button @click="goToPostBlog" class="postblog">发帖</button>
        <button class="snap">快拍</button>
    </div>
</template>
  
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
//===========
import http from '../api/http'
const user = ref(null)
const TOKEN_KEY = 'my_jwt_token'
const token = localStorage.getItem(TOKEN_KEY)

http.get('/login/profile', {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
  .then(response => {
    user.value=response.data
  })
//============
const router = useRouter();
function goToFeed() {
    router.push('/feed');
}
function goToPostBlog() {
    router.push('/postblog');
}
const showOptions = ref(false)
</script>
  
<style scoped>
* {
    margin: 0;
    padding: 0;
}

.showOptions {
    margin: 0 auto;
    position: relative;
    width: 60%;
    display: flex;
    justify-content: space-between;
}

.snap {
    width: 90px;
    height: 45px;
    position: relative;
    bottom: 115px;
    background-color: rgb(218, 144, 244);
    border: none;
    border-radius: 8px;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    color: #FFFFFF;
}

.postblog {
    color: #FFFFFF;
    border-radius: 8px;
    width: 90px;
    height: 45px;
    position: relative;
    bottom: 115px;
    background-color: rgb(218, 144, 244);
    border: none;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
}

.btm {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding-left: 62px;
    padding-right: 62px;
}

.mainmenu {
    background-color: rgb(29, 29, 29);
    display: inline-block;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    width: 32px;
    height: 22px;
    border: none;
    color: rgb(153, 153, 153);
}

* {
    margin: 0;
    padding: 0;
}

.settings {
    width: 20px;
    height: 20px;
    position: relative;
    bottom: 39px;
    float: right;
    margin-right: 5.5%;
}

.background-blk {
    padding-top: 31px;
    border-radius: 8px 8px 0px 0px;
    background-color: rgb(29, 29, 29);
    height: 74px;
}

.background-pur {
    background-color: rgb(131, 86, 146);
    height: 74px;
}

.user {
    display: flex;
    align-items: flex-end;
    padding-left: 27.65px;
    height: 229px;
    background-color: rgb(131, 86, 146);
}

.usericon {
    width: 75px;
    height: 75px;
    border: 6px solid #1D1D1D;
    border-radius: 40.5px;
    position: relative;
    top: 10px;
    background-image: url(https://ts1.cn.mm.bing.net/th/id/R-C.61853f05a57f939cd6ec739ff7e61214?rik=QEwRnHLQtYlc6g&riu=http%3a%2f%2fwww.lgstatic.com%2fthumbnail_300x300%2fi%2fimage2%2fM01%2fA7%2fC9%2fCgoB5lvkC5aATt8fAABmSk5TuSw416.png&ehk=Qp2d%2fXPioALkgThaG4Y5M%2fda0aEZa0YG8lP1GBrSiGk%3d&risl=&pid=ImgRaw&r=0);
    background-size: 116px;
    background-position: 104px -13px;
}

.username {
    position: relative;
    top: 10px;
    margin-left: 5%;
    color: #FFFFFF;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 75px;
    height: 75px;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.tiezi {
    display: inline-block;
    width: 50%;
    text-align: center;
    height: 42px;
    line-height: 42px;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    color: #FFFFFF;
    border-bottom: #FFFFFF 1px solid;
}

.fastshot {
    display: inline-block;
    text-align: center;
    width: 50%;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    color: rgb(153, 153, 153);
}

.context {
    align-content: flex-start;
    height: 468px;
    background-color: gray;
    display: flex;
    flex-wrap: wrap;
    overflow: scroll;
    margin-bottom: 15px;
}

.context * {
    display: block;
    width: 50%;
    height: 196.5px;
}

.add-logo {
    background-color: rgb(29, 29, 29);
    width: 45.35px;
    height: 34px;
    display: inline-block;
    border: none;
}

.mine {
    display: inline-block;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    width: 32px;
    height: 22px;
    background-color: rgb(29, 29, 29);
    border: none;
    color: #FFFFFF;
}
</style>
  