<template>
    <div class="header">
        <input type="search" v-model="searchTerm" @keydown.enter.prevent="submitSearch">
        <button class="notifications"></button>
    </div>
    <p class="title1">好友快拍</p>
    <div class="fastshot-list">
        <span class="user-block">
            <span class="fastshot-pic"></span>
            <span class="fastshot-words">MoonShot</span>
        </span>
        <span class="user-block">
            <span class="fastshot-pic"></span>
            <span class="fastshot-words">MoonShot</span>
        </span>
        <span class="user-block">
            <span class="fastshot-pic"></span>
            <span class="fastshot-words">MoonShot</span>
        </span>
        <span class="user-block">
            <span class="fastshot-pic"></span>
            <span class="fastshot-words">MoonShot</span>
        </span>
        <span class="user-block">
            <span class="fastshot-pic"></span>
            <span class="fastshot-words">MoonShot</span>
        </span>
        <span class="user-block">
            <span class="fastshot-pic"></span>
            <span class="fastshot-words">MoonShot</span>
        </span>
    </div>
    <div class="blogs">
        <div v-for="post in posts" :key="post.id" class="user_blogs">
            <div class="user_inf">
                <div class="user_icon"></div>
                <div class="user_name">{{ getUsername(post.userId) }}</div>
            </div>
            <h2>{{ post.title }}</h2>
            <p>{{ post.content }}</p>
        </div>
    </div>
    <div class="btm">
        <button class="mainmenu">首页</button>
        <button @click="showOptions = !showOptions" class="add-logo"><img src="../assets/Profile/新建帖子logo.png"
                class="add-logo"></button>
        <button @click="goToProfile" class="mine">我的</button>
    </div>
    <div v-if="showOptions" class="showOptions">
        <button class="postblog" @click="goToPostBlog">发帖</button>
        <button class="snap">快拍</button>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter();
const TOKEN_KEY = 'my_jwt_token'
const token = localStorage.getItem(TOKEN_KEY)
function goToProfile() {
    router.push('/profile');
}
function goToPostBlog() {
    router.push('/postblog');
}
function getUsername(uid){
  http.post('/', uid)
    .then(response => {
    })
    .catch(error => {
    })
}
//===================测试
const showOptions = ref(false)
const posts = ref([]);
http.get('/post/users/getallpost', {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
    .then(response => {
        console.log(response.data)
        posts.value = response.data
    })
//===================
</script>
<style scoped>
.user_icon {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-image: url(https://ts1.cn.mm.bing.net/th/id/R-C.61853f05a57f939cd6ec739ff7e61214?rik=QEwRnHLQtYlc6g&riu=http%3a%2f%2fwww.lgstatic.com%2fthumbnail_300x300%2fi%2fimage2%2fM01%2fA7%2fC9%2fCgoB5lvkC5aATt8fAABmSk5TuSw416.png&ehk=Qp2d%2fXPioALkgThaG4Y5M%2fda0aEZa0YG8lP1GBrSiGk%3d&risl=&pid=ImgRaw&r=0);
    background-size: 75px;
    background-position: 66px -10px;
}

.user_inf {
    width: 50%;
    height: 40px;
    background-color: green;
}

.user_blogs {
    width: 100%;
    padding-top: 5%;
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
    color: rgb(153, 153, 153);
}

.showOptions {
    margin: 0 auto;
    position: relative;
    width: 60%;
    display: flex;
    justify-content: space-between;
}

.snap {
    right: 20%;
    bottom: 13%;
    width: 90px;
    height: 45px;
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
    position: fixed;
}

.postblog {
    color: #FFFFFF;
    border-radius: 8px;
    bottom: 13%;
    width: 90px;
    height: 45px;
    background-color: rgb(218, 144, 244);
    border: none;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    left: 20%;
    position: fixed;
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
    color: #FFFFFF;
}

.btm {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding-left: 62px;
    padding-right: 62px;
    background-color: rgb(29, 29, 29);
    position: fixed;
    bottom: 0;
    padding-bottom: 5%;
}

.blogs {
    margin: 5% auto 5% auto;
    width: 90%;
    height: 484px;
    background-color: #fff;
    padding: 0% 5% 0 5%;
}

.fastshot-words {
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 17px;
    color: #FFFFFF;
    width: 60px;
    height: 17px;
    overflow: scroll;
}

.fastshot-pic {
    background-color: yellow;
    width: 60px;
    height: 60px;
    border-radius: 30px 0 30px 0;
}

.fastshot-list .user-block {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 80px;
    height: 88px;
    flex-shrink: 0;
}

.fastshot-list {
    margin-top: 2px;
    width: 95%;
    margin-left: 5%;
    gap: 10px;
    height: 117px;
    display: flex;
    overflow: auto;
    flex-wrap: nowrap;
}

* {
    margin: 0;
    padding: 0;
}

.title1 {
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    display: flex;
    align-items: center;
    color: gray;
    margin-top: 19px;
    margin-left: 5%;
}

.notifications {
    background-image: url(../assets/Feed/ic_home_notification_normal.png);
    width: 28px;
    height: 28px;
    background-color: rgb(29, 29, 29);
    background-size: contain;
    border: none;
    line-height: 28px;
}

.header {
    width: 90%;
    line-height: 28px;
    height: 28px;
    margin: 5% auto 5% auto;
    display: flex;
    justify-content: space-between;
}

.header input {
    line-height: 28px;
    width: 80%;
    height: 28px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    border: none;
    background-image: url(../assets/Feed/ic_home_search_normal.png);
    background-size: 15px 13px;
    background-repeat: no-repeat;
    background-position: 13px 8px;
    padding-left: 30px;
    color: white;
}</style>