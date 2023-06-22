<template>
    <div class="user_inf">
        <div class="user_icon"></div>
        <div class="user_name">{{ postAuthors[index] }}</div>
        <div class="time">sad</div>
    </div>
    <h1>{{ post.title }}</h1>
    <div class="user_blogs_context">{{ post.content }}</div>
    <div class="functions">
        <button @click.stop="like" :state="post.liked?'press':'release'">likes</button>: {{ post.likes }}
        <button class="comments"></button>
        <input type="text" placeholder="回复" class="send_comment">
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter();
const TOKEN_KEY = 'my_jwt_token'
const token = localStorage.getItem(TOKEN_KEY)
async function getUsername(uid) {
    try {
        const response = await http.get(`/post/usersname/${uid}`);
        //console.log(response.data.usernames);
        return response.data.usernames;
    } catch (error) {
        //console.log(error);
        return '';
    }
}
async function anotherAsyncFunction(uid) {
    const usernamesPromise = getUsername(uid); // 调用getUsername()函数，并返回Promise对象
    const usernames = await usernamesPromise; // 等待Promise完成，并将结果赋给usernames变量
    //console.log(usernames); // 输出用户名
    return usernames;
}

//===================测试
const posts = ref([]);
const postAuthors = ref([]);
http.get('/post/users/getallpost', {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
    .then(response => {
        //console.log(response.data)
        posts.value = response.data
        // 获取并保存每篇文章的作者名字
        response.data.forEach(post => {
            anotherAsyncFunction(post.uid).then(username => {
                postAuthors.value.push(username);
            });
        });
    })
//===================
</script>
<style scoped>
.comments {
    background-image: url(../assets/Feed/);
}

.like {
    background-image: url('../assets/Feed/ic_like_final.png');
}

.like,
.comments {
    background-size: contain;
    width: 25px;
    height: 25px;
    border: none;
    background-color: rgb(40, 40, 40);
}

.user_blogs_context {
    margin-bottom: 5%;
}

.user_blogs h1 {
    margin-bottom: 5%;
}

.user_name {
    position: absolute;
    top: 0;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 600;
    font-size: 10px;
    line-height: 14px;
    /* identical to box height */


    /* text/text_white_100 */

    color: #FFFFFF;
}

.time {
    position: absolute;
    bottom: 0;
    /* Regular/七级文字 */

    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 17px;
    color: rgb(191, 191, 191);
}

.user_icon {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-image: url(https://ts1.cn.mm.bing.net/th/id/R-C.61853f05a57f939cd6ec739ff7e61214?rik=QEwRnHLQtYlc6g&riu=http%3a%2f%2fwww.lgstatic.com%2fthumbnail_300x300%2fi%2fimage2%2fM01%2fA7%2fC9%2fCgoB5lvkC5aATt8fAABmSk5TuSw416.png&ehk=Qp2d%2fXPioALkgThaG4Y5M%2fda0aEZa0YG8lP1GBrSiGk%3d&risl=&pid=ImgRaw&r=0);
    background-size: 75px;
    background-position: 66px -10px;
    margin-right: 8px;
}

.user_inf {
    width: 50%;
    height: 40px;
    background-color: green;
    position: relative;
    margin-bottom: 5%;
}

.user_inf * {
    display: inline-block;
}</style>