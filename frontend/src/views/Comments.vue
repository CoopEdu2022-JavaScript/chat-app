<template>
    <button class="return" @click="goBack"></button>
    <div class="comment-area" v-for="comment in comments" key="comment.conment_id">
        <div class="comment">
            {{ comment.username }} : {{ comment.content }}
        </div>
    </div>
</template>
<script setup>
import http from '../api/http'
import { ref } from 'vue'
import { useRouter } from 'vue-router';
const TOKEN_KEY = 'my_jwt_token'
const token = localStorage.getItem(TOKEN_KEY)
const router = useRouter();
let post_id = sessionStorage.getItem('postID');
const comments = ref([]);
http.get(`/comment/${post_id}/comment`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
}).then(response => {
    comments.value = response.data;
})
//console.log(comments.value)
function goBack() {
    router.go(-1)
}
</script>
<style scoped>
.comment {
    height: 40px;
    line-height: 40px;
    font-style: 30px;
    color: white;
    width: 100%;
    background-color: gray;
    border-bottom: rgb(29, 29, 29) solid 1px;
}

.return {
    margin-top: 5%;
    margin-bottom: 5%;
    border: none;
    height: 16px;
    width: 16px;
    margin-left: 5%;
    background-image: url(../assets/PostBlog/ic_back.png);
    background-size: contain;
    background-color: rgb(29, 29, 29);
}
</style>