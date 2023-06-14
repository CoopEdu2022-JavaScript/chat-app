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
        <div v-for="(post, index) in posts" :key="post.id" class="user_blogs">
            <div class="user_inf">
                <div class="user_icon"></div>
                <div class="user_name">{{ postAuthors[index] }}</div>
                <div class="time">sad</div>
            </div>
            <h1>{{ post.title }}</h1>
            <div class="user_blogs_context">{{ post.content }}</div>
            <div class="functions">
                <button @click.stop="like(post.post_id, post)" :state="post.isLiked ? 'press' : 'release'"
                    class="likes"></button>
                <div class="likes-count">{{
                    post.likes }}</div>
                <button class="comments"></button>
                <div class="comment-count">{{
                    post.coments_id }}</div>
                <input type="text" placeholder="回复 最多15字" class="send-comment" maxlength="15" v-model="post.commentContent">
                <button class="send-comment-button" :class="{ active: isCommentContentValid(post) }"
                    :disabled="!isCommentContentValid(post)" @click="submitComment(post)">发送</button>
            </div>
            <div class="comment-area" v-for="(comment,index) in comments" :key="comment.postId">
                <div class="comment">
                    {{ findComment(post,index).username }}:{{ findComment(post,index).content }}
                </div>
            </div>
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
import http from '../api/http'
import { ref } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter();
const TOKEN_KEY = 'my_jwt_token'
const token = localStorage.getItem(TOKEN_KEY)
const showOptions = ref(false)
const posts = ref([]);
const postAuthors = ref([]);
const commentContent = ref('');
const comments=ref([])
const isCommentContentValid = (post) => {
    return post.commentContent !== '';
};
const findComment = async (post,index) => {
  const response = await http.get(`/comment/${post.post_id}/comment`, {
    headers: {
      Authorization: `Bearer ${token}`
    }})
    console.log(response.data);
    return response.data[index].postId
};
const submitComment = (post) => {
    // 发送评论
    console.log('发送评论:', post.commentContent);
    http.post(`/comment/${post.post_id}/comment`,{ content: post.commentContent}
    )
    // 清空输入框
    post.commentContent = '';
}
const like = (post_id, post_A) => {
    http.get(`/post/${post_id}/hlike`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        console.log(response.data.isLiked)
        post_A.isLiked = response.data.isLiked;
        post_A.isLiked = !post_A.isLiked
        post_A.likes += (post_A.isLiked ? 1 : -1)
        if (post_A.isLiked) http.post(`post/${post_id}/likes`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        else http.delete(`/post/${post_id}/unlike`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    })
}
function goToProfile() {
    router.push('/profile');
}
function goToPostBlog() {
    router.push('/postblog');
}
async function getUsername(postid) {
    try {
        const response = await http.get(`/post/${postid}/users`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data);
        return response.data.usernames;
    } catch (error) {
        console.log(error);
        return '';
    }
}
async function getUserNames(postid) {
    const usernamesPromise = getUsername(postid); // 调用getUsername()函数，并返回Promise对象
    const usernames = await usernamesPromise; // 等待Promise完成，并将结果赋给usernames变量
    console.log(usernames); // 输出用户名
    return usernames;
}

http.get('/feed', {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
    .then(response => {
        posts.value = response.data
        console.log(response.data)
        // 获取并保存每篇文章的作者名字
        response.data.forEach(post => {
            http.get(`/post/${post.post_id}/hlike`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                post.isLiked=response.data.isLiked;
                post.likes=response.data.likes;
                post.commentContent = '';
            })
            console.log(post.post_id)
            getUserNames(post.post_id).then(username => {
                postAuthors.value.push(username);
            });
            // if(findComment(post)!=[])comments.value.push(findComment(post));
        });
    })

//===================
//==================
</script>
<style scoped>
.comment{
color:white
}
button.active {
    color: black;
}

.send-comment-button {
    width: 20%;
    margin-left: 3%;
    position: relative;
    bottom: 7px;
    height: 34px;
    border-radius: 17px;
    border: 3px solid gray;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    color: rgb(204, 204, 204);
}

.send-comment::placeholder {
    color: rgb(153, 153, 153);
}

.send-comment {
    width: 45%;
    position: relative;
    bottom: 5px;
    height: 34px;
    border-radius: 17px;
    border: 3px solid gray;
    padding-left: 5%;
    box-sizing: border-box;
    padding-right: 5%;
    white-space: pre-wrap;
    /* 保留回车符并自动换行 */
}

.likes-count,
.comment-count {
    height: 25px;
    line-height: 25px;
    display: inline-block;
    position: relative;
    bottom: 5px;
    margin-left: 2%;
    margin-right: 2%;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 17px;
    color: rgb(204, 204, 204);
}

[state='press'] {
    background-image: url(../assets/Feed/ic_like_final_active.png);
}

[state='release'] {
    background-image: url(../assets/Feed/ic_like_final.png);
}

.comments {
    background-image: url(../assets/Feed/ic_comment.png);
}

.likes,
.comments {
    background-size: contain;
    width: 25px;
    height: 25px;
    border: none;
    background-color: rgb(40, 40, 40);
}

.user_blogs_context {
    margin-bottom: 5%;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    display: flex;
    align-items: center;

    color: #FFFFFF;
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
    position: relative;
    margin-bottom: 5%;
}

.user_inf * {
    display: inline-block;
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
    background-color: rgb(40, 40, 40);
    padding: 0% 5% 5% 5%;
    border-radius: 8px;
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
}
</style>