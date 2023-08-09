<template>
    <div class="heading">
        <button @click="goBack" class="return-arrow"></button>
        <div class="placeholder">
        </div>
    </div>
    <div class="blogs">
        <div class="keyword">关键词:{{ KeyWord }}</div>
        <div v-for="(post, index) in posts" :key="post.postid" class="user_blogs">
            <div class="user_inf">
                <div class="user_icon"></div>
                <div class="user_name">{{ postAuthors[index] }}</div>
                <div class="time">{{ post.date.slice(0, 19).replace('T', ' ') }}</div>
            </div>
            <h1>{{ post.title }}</h1>
            <div class="user_blogs_context">{{ post.content }}</div>
            <a :href="urls[index]" target="_blank">
                <img :src="urls[index]" class="pic">
            </a>
            <br>
            <span style="color:white ">[点击图片即可查看整张图片]</span>
            <div class="functions">
                <button @click.stop="like(post.post_id, post)" :state="post.isLiked ? 'press' : 'release'"
                    class="likes"></button>
                <div class="likes-count">{{
                    post.likes }}</div>
                <button class="comments" @click="goToComments(post.post_id)"></button>
                <div class="comment-count">{{
                    post.coments_id }}</div>
                <input type="text" placeholder="回复 最多15字" class="send-comment" maxlength="15" v-model="post.commentContent">
                <button class="send-comment-button" :class="{ active: isCommentContentValid(post) }"
                    :disabled="!isCommentContentValid(post)" @click="submitComment(post)">发送</button>
            </div>
        </div>
        <div class="isempty">{{ isempty }}</div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useSearchStore } from '../../store/searchstore'
import { SaveWordStore } from '../../store/KeyWordStore'
const router = useRouter();
const KeyWordSave = SaveWordStore()
const searchStore = useSearchStore()
const KeyWord = KeyWordSave.WordStore
const result = searchStore.searchResult
console.log(result)
const postAuthors = ref([]);
const posts = ref([]);
const urls = ref([]);
const isempty=ref();
const TOKEN_KEY = 'my_jwt_token'
const token = localStorage.getItem(TOKEN_KEY)
async function getUsername(postid) {
    try {
        const response = await http.get(`/post/${postid}/users`
        );
        //console.log(response.data);
        return response.data.usernames;
    } catch (error) {
        //console.log(error);
        return '';
    }
}
async function getUserNames(postid) {
    const usernamesPromise = getUsername(postid); // 调用getUsername()函数，并返回Promise对象
    const usernames = await usernamesPromise; // 等待Promise完成，并将结果赋给usernames变量
    //console.log(usernames); // 输出用户名
    return usernames;
}
function goBack() {
    router.go(-1)
}
let post_id

if (result.length > 0) {
    post_id = result.map(item => item)
    console.log(post_id)
    for (const pid of post_id) {
        getUserNames(pid.post_id).then(username => {
            postAuthors.value.push(username);
        });
        http.get(`/searchresult/${pid.post_id}/getdetails`)
            .then(response => {
                posts.value.push(response.data)
                console.log(response.data)
                // 获取并保存每篇文章的作者名字

            })
        http.get(`/feed/${pid.post_id}/getallpic`).then(res => {
            urls.value.push(res.data.path)
        })
    }
}
else {
    isempty.value="搜索结果为空"
}
const like = (post_id, post_A) => {
    http.get(`/post/${post_id}/hlike`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        //console.log(response.data.isLiked)
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
function trimAll(ele) {
    if (typeof ele === 'string') {
        return ele.split(/[\t\r\f\n\s]*/g).join('');
    }
}

const isCommentContentValid = (post) => {
    return trimAll(post.commentContent) !== '';
};
const submitComment = (post) => {
    // 发送评论
    //console.log('发送评论:', post.commentContent);
    http.post(`/comment/${post.post_id}/comment`, { content: post.commentContent })
        .then(() => {
            // 清空输入框
            post.commentContent = '';
            // 刷新feed页面
            location.reload();
        })
        .catch((error) => {
            console.error(error);
        });
}
</script>
<style scoped>
.isempty{
    color:white;
    font-size: 20px;
    font-weight:bolder;
    font-style: italic;
}
.heading {
    width: 100%;
    margin-top: 75px;
    background-color: rgb(29, 29, 29);
    height: 30px;
    line-height: 30px;
}

.heading .return-arrow {
    border: none;
    height: 16px;
    width: 16px;
    margin-left: 5%;
    background-image: url(../assets/PostBlog/ic_back.png);
    background-size: contain;
    background-color: rgb(29, 29, 29);
}

.keyword {
    font-size: larger;
    font-style: italic;
    font-weight: bolder;
    color: #FFFFFF;
    float: right;
}

.pic {
    width: 100px;
    height: 100px;
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
    word-wrap: break-word;
    overflow: scroll;
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
    width: 100%;
}

.user_icon {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-image: url(../assets/Feed/moonshotlogo.png);
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


.blogs {
    margin: 5% auto 5% auto;
    width: 90%;
    background-color: rgb(40, 40, 40);
    padding: 0% 5% 15% 5%;
    border-radius: 8px;
}


* {
    margin: 0;
    padding: 0;
}
</style>