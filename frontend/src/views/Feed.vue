<template>
    <div class="header">
        <input type="search" v-model="searchTerm" @keydown.enter.prevent="submitSearch(searchTerm)" placeholder="请输入搜索内容">
        <!-- <q-input outlined type="search" rounded v-model="searchTerm" placeholder="Placeholder" :dense="dense" class="search-input"/> -->
        <q-btn color="white" dense round flat class="notifications" @click="notif_making">
            <q-badge color=red class="notif-badge" round floating transparent align="middle">{{ notif_num }}</q-badge>
        </q-btn>
    </div>
    <div>
        <!-- 以下是弹窗 -->
        <teleport to="body">
            <div v-if="show" class="popup" :style="{ backgroundColor: bgc }">
                <p>{{ notif_message }}</p>
                <button @click="close_notif" :style="{ backgroundColor: bgc }">关闭</button>
            </div>
        </teleport>
        <teleport to="body">
            <transition name="popup2-fade">
                <div v-if="show_Popup" class="popup2">
                    <img :src="currentUrl" @click="show_Popup = false">
                </div>
            </transition>
        </teleport>
    </div>
    <!-- 弹窗 -->
    <div class="blogs">
        <div v-for="(post, index) in posts" :key="post.post_id" class="user_blogs">
            <div class="user_inf">
                <img :src="icon_urls[index]" class="user_icon" />
                <div class="user_name">{{ postAuthors[index] }}</div>
                <div class="time">{{ post.date.slice(0, 19).replace('T', ' ') }}</div>
            </div>
            <h4>{{ post.title }}</h4>
            <div class="user_blogs_context">{{ post.content }}</div>
            <!-- <a :href="urls[index]" target="_blank"> -->
            <img :src="urls[index]" class="pic" @click="showImg(urls[index])">
            <!-- </a> -->
            <br>
            <br><br>
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
    </div>
    <div class="btm">
        <button class="mainmenu">首页</button>
        <button @click="showOptions = !showOptions" class="add-logo"><img src="../assets/Profile/新建帖子logo.png"
                class="add-logo"></button>
        <button @click="goToProfile" class="mine">我的</button>
    </div>
    <div v-if="showOptions" class="showOptions">
        <button class="postblog" @click="goToPostBlog">发帖</button>
        <button class="snap" @click="goToSnapShot">快拍(仅支持预览)</button>
    </div>
</template>
<script setup>
import http from '../api/http'
import { ref } from 'vue'
import { useRouter } from 'vue-router';
// store.js
import store from '../../store';
// 组件
import { useSearchStore } from '../../store/searchstore'
import { SaveWordStore } from '../../store/KeyWordStore'
//================弹窗
const show = ref(false)
function showPopup() {
    show.value = true
}
//===========弹窗2
const show_Popup = ref(false)
const currentUrl = ref('')

function showImg(url) {
    currentUrl.value = url
    show_Popup.value = true
}
//============
const searchStore = useSearchStore()
const KeyWordStore = SaveWordStore()
const result = searchStore.searchResult
const KeyWord = KeyWordStore.WordStore
const router = useRouter();
const TOKEN_KEY = 'my_jwt_token'
const token = localStorage.getItem(TOKEN_KEY)
const showOptions = ref(false)
const posts = ref([]);
const postAuthors = ref([]);
const icon_urls = ref([])
const bgc = ref("#fff")
const notif_num = ref()
const notif_message = ref("")
let urls = ref([]);
function trimAll(ele) {
    if (typeof ele === 'string') {
        return ele.split(/[\t\r\f\n\s]*/g).join('');
    }
}

const isCommentContentValid = (post) => {
    return trimAll(post.commentContent) !== '';
};
// const findComment = async (post,index) => {
//   const response = await http.get(`/comment/${post.post_id}/comment`, {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }})
//     //console.log(response.data);
//     return response.data[index].postId
// };
const submitSearch = (searchWord) => {
    http.get(`/feed/${searchWord}/search`)
        .then(res => {
            // 保存结果
            useSearchStore().searchResult = res.data
            SaveWordStore().WordStore = searchWord
            router.push('/searchresult')
        })
}
const notif_making = () => {
    http.get('/feed/clear_notif')
    notif_num.value = ""
    showPopup()
    // setTimeout(() => {
    //     alert("叮~~~(铃铛声)\n这边检测到您点击了通知按钮呢\n遗憾的是我们还在开发呢");
    // }, 300);
    let i = 100

    const interval = setInterval(() => {
        i -= 2
        bgc.value = `hsl(0, 0%, ${i}%)`

        if (i <= 0) {
            clearInterval(interval)
        }
    }, 20)
};
const close_notif = () => {
    show.value = false
    bgc.value = "#fff"
    notif_message.value = "目前还没有新的通知哦"
}
const submitComment = (post) => {
    // 发送评论
    //console.log('发送评论:', post.commentContent);
    http.post(`/comment/${post.post_id}/comment`, { content: post.commentContent })
        .then(() => {
            // 清空输入框
            post.commentContent = '';
            // 刷新feed页面
            setTimeout(function () {
                location.reload();
            }, 50)
        })
        .catch((error) => {
            console.error(error);
        });
}
const like = (post_id, post_A) => {
    if (localStorage.getItem("posts") == null) {
        localStorage.setItem("posts", JSON.stringify({}))
    }
    let obj = JSON.parse(localStorage.getItem("posts"))
    obj[post_id] = !post_A.isLiked;
    console.log(obj)
    localStorage.setItem("posts", JSON.stringify(obj))
    console.log(localStorage.getItem("posts"))
    post_A.isLiked = !post_A.isLiked
    post_A.likes += (post_A.isLiked ? 1 : -1)
}
function goToComments(postID) {
    // Store the postID in sessionStorage
    sessionStorage.setItem('postID', postID);
    if (localStorage.getItem("posts") != null) {
        console.log(localStorage.getItem("posts"))
        http.post(`/post/${localStorage.getItem("posts")}/likes`)
    }
    // Navigate to the comment page
    router.push('/comment');
}
function goToProfile() {
    if (localStorage.getItem("posts") != null) {
        console.log(localStorage.getItem("posts"))
        http.post(`/post/${localStorage.getItem("posts")}/likes`)
    }
    router.push('/profile');
}
function goToPostBlog() {
    if (localStorage.getItem("posts") != null) {
        console.log(localStorage.getItem("posts"))
        http.post(`/post/${localStorage.getItem("posts")}/likes`)
    }
    router.push('/postblog');
}
function goToSnapShot() {
    if (localStorage.getItem("posts") != null) {
        console.log(localStorage.getItem("posts"))
        http.post(`/post/${localStorage.getItem("posts")}/likes`)
    }
    router.push('/postsnapshot')
}
async function getUsername(postid) {
    try {
        const response = await http.get(`/post/${postid}/users`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        //console.log(response.data);
        return response.data;
    } catch (error) {
        //console.log(error);
        return '';
    }
}
async function getUserNames(postid) {
    const usernamesPromise = await getUsername(postid); // 调用getUsername()函数，并返回Promise对象
    const usernames = usernamesPromise; // 等待Promise完成，并将结果赋给usernames变量
    //console.log(usernames); // 输出用户名
    return usernames;
}
// function getblogpic(postid) {
//   return new URL(getim ageurl(postid), import.meta.url).href;
// }

async function getimageurl(postid) {
    const res = await http.get(`/feed/${postid}/getallpic`)
    console.log(res.data)
    return res.data.path
}

watch(() => posts.value, async (posts) => {
    for (let i = 0; i < posts.length; i++) {
        const imageUrl = await getimageurl(posts[i].post_id);
        urls.value.push(imageUrl);
    }
});
//=================
http.get('/feed', {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
    .then(response => {
        posts.value = response.data
        console.log(posts.value)
        //console.log(response.data)
        // 获取并保存每篇文章的作者名字
        getData(0, posts.value.length)
        function getData(i, length) {
            let post = posts.value[i]
            http.get(`/post/${post.post_id}/hlike`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                post.isLiked = response.data.isLiked;
                post.likes = response.data.likes;
                post.commentContent = '';
            })
            //console.log(post.post_id)
            http.get(`/feed/${post.post_id}/user_notif_inf`).then(res => {
                notif_num.value = res.data.notif_likes + res.data.notif_comments
                if (notif_num.value == 0) {

                    notif_num.value = ""
                    notif_message.value = "目前还没有新的通知哦"
                }
                else {
                    if (notif_num.value > 99) {
                        notif_num.value = "99+"
                    }
                    if (res.data.notif_likes > 0 && res.data.notif_comments > 0) {
                        notif_message.value = `您获得了${res.data.notif_likes}个新的点赞和${res.data.notif_comments}条新的评论`
                    }
                    else if (res.data.notif_likes > 0) { notif_message.value = `您获得了${res.data.notif_likes}个新的点赞` }
                    else { notif_message.value = `您获得了${res.data.notif_comments}条新的评论` }
                }

            })
            // if(findComment(post)!=[])comments.value.push(findComment(post));
            getUserNames(post.post_id).then(res => {
                postAuthors.value.push(res.usernames);
                icon_urls.value.push(res.usericon)
                if (++i < length) {
                    getData(i, length)
                }
            });
        };
    })

//===================
const countdown = ref(10)//这边是一个倒计时,用于优化like算法
const interval = ref(null)
onMounted(() => {
    interval.value = setInterval(() => {
        countdown.value--
        if (countdown.value === 0) {
            // Run statement here
            if (localStorage.getItem("posts") != null) {
                console.log('Likes Added')
                console.log(localStorage.getItem("posts"))
                http.post(`/post/${localStorage.getItem("posts")}/likes`).then(res => {
                    localStorage.clear()
                })
            }
            countdown.value = 10 // Reset countdown
        }
    }, 1000)
})

onUnmounted(() => {
    clearInterval(interval.value)
})
//==================
</script>
<style scoped>
.popup2 img {
    width: 100%;
    margin: auto
}

.popup2-fade-enter-active {
    transition: all 0.3s ease;
}

.popup2-fade-leave-active {
    transition: all 0.3s ease;
}

.popup2-fade-enter-from,
.popup2-fade-leave-to {
    opacity: 0;
}

.popup2 {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
}

.search-input {
    border-color: aqua;
}

.popup button {
    margin-top: 10px;
    border: none;
    border-radius: 10%;
    font-weight: bold;
}

.popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 45px;
    font-weight: bolder;
    font-size: 20px;
    font-style: italic;
    color: white;
    line-height: 20px;
    text-align: center;
    border-radius: 20%;
}

.user_icon {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-size: contain;
    margin-right: 8px;
    border: 2px white solid
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
    padding: 0% 5% 15% 5%;
    border-radius: 8px;
}

* {
    margin: 0;
    padding: 0;
}

.notifications {
    background-image: url(../assets/Feed/ic_home_notification_normal.png);
    width: 30px;
    height: 30px;
    background-color: rgb(40, 40, 40);
    color: red;
    border-radius: 15px;
    font-weight: 800;
    background-size: contain;
    border: none;
    line-height: 30px;
}

/*按下右上角的小玲铛以后变黄色，暂时禁用(手机端效果不是很好)
/* .notifications:active {
    background-image: url(../assets/Feed/ic_home_notification_active.png);
} */

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