<template>
    <div class="heading">
        <button @click="goBack" class="return-arrow"></button>
        <button type="submit" :disabled="!canPost" :class="{ active: canPost }" @click="sendBlog" class="postblog">发布
        </button>
    </div>
    <div class="blogtitle">
        <input v-model="formData.title" name="title" maxlength="20" placeholder="标题" />
        <span>{{ textCount }}/20</span>
    </div>
    <div class="context">
        <textarea v-model="formData.content" name="content" placeholder="分享你的生活" cols="30" rows="10"
            maxlength="200"></textarea>
    </div>
    <div class="picupload">
        PS:必须上传一张图片当作封面哦
        <label for="fileInput" class="custom-file-input" :style="{ backgroundImage: `url(${previewSrc})` }">
            <input type="file" id="fileInput" accept="image/*" hidden @change="handleFileChange">
            <button v-if="previewSrc !== previewImage" class="clear-button" @click="clearPreview">x</button>
        </label>
    </div>
</template>
<script setup>
import { ref, watch, reactive } from 'vue';
import previewImage from '../assets/PostBlog/btn_addphotos.png';
import { useRouter } from 'vue-router';
import http from '../api/http'
const router = useRouter();
const textCount = ref(0);
const previewSrc = ref(previewImage);
const TOKEN_KEY = 'my_jwt_token';
const token = localStorage.getItem(TOKEN_KEY);
const imageFile = ref(null);
const postId = ref(null);
const formData = reactive({
    title: '',
    content: ''
})
async function sendBlog() {

    const postId = await sendPost();

    await sendPic(postId);
    router.push('/feed').then(() => {
        location.reload()
    })
}

async function sendPost() {

    const response = await http.post('/post/newpost', formData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.post_id;

}

async function sendPic(postId) {

    if (!imageFile.value) {
        return;
    }

    const formData = new FormData();

    formData.append('image', imageFile.value);

    const headers = {
        'Content-Type': 'multipart/form-data'
    };

    await http.post(`/upload/${postId}/upload`, formData, {
        headers
    });

}
function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            previewSrc.value = reader.result;
        });
        reader.readAsDataURL(file);
        imageFile.value = file;
    }
}
// clearPreview 函数
function clearPreview(event) {
    event.preventDefault();
    previewSrc.value = previewImage;

    // 重置 formDataImage

    const fileInput = document.querySelector('#fileInput');
    fileInput.value = '';
}
function goBack() {
    router.go(-1)
}
function trimAll(ele) {
    if (typeof ele === 'string') {
        return ele.split(/[\t\r\f\n\s]*/g).join('');
    }
}
watch(() => formData.title, (newVal) => {
    textCount.value = newVal.length;
});
const canPost = computed(() => {
    return trimAll(formData.title.trim()) !== '' && trimAll(formData.content.trim()) !== '' && imageFile.value
})
</script>
<style scoped>
* {
    margin: 0;
    padding: 0;
}

input[placeholder="标题"]:focus,
textarea:focus {
    outline: none;
    border-bottom: 1px solid white;
}

.clear-button {
    position: relative;
    top: 0px;
    left: 0px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: red;
    text-align: center;
    line-height: 20px;
    border: none;
}

.picupload label {
    border-radius: 10px;
    background-repeat: no-repeat;
    display: block;
    width: 150px;
    height: 150px;
    background-color: rgb(41, 41, 41);
    background-size: cover;
    background-position: center;
}

input[type="file"] {
    opacity: 0;
}

.picupload {
    margin-top: 36px;
    margin-left: 10%;
    width: 75%;
    color: white;
}

.context textarea {
    resize: none;
    overflow: auto;
    height: 100px;
    background-color: rgb(29, 29, 29);
    border: none;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    color: #FFFFFF;
    width: 100%;
}

.context {
    margin: 20px auto 0 auto;
    width: 80%;
}

.blogtitle {
    width: 80%;
    height: 34px;
    margin: 40px auto 0 auto;
    display: flex;
    justify-content: space-between;
    gap: 10px;
}

.blogtitle span {
    color: gray;
    font-size: 14px;
}

.blogtitle input {
    overflow: auto;
    background-color: rgb(29, 29, 29);
    border: none;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 34px;
    color: #FFFFFF;
}

.blogtitle input::placeholder {
    color: #FFFFFF;
}

.heading {
    width: 100%;
    margin-top: 75px;
    background-color: rgb(29, 29, 29);
    height: 30px;
    line-height: 30px;
}

.heading .postblog {
    width: 60px;
    height: 30px;
    line-height: 30px;
    border: none;
    background-size: contain;
    border-radius: 15px;
    float: right;
    margin-right: 5%;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    /* identical to box height */

    text-align: center;

    /* text/text_white_100 */

    color: #FFFFFF;
}

.heading .postblog:link {
    background-color: rgb(41, 41, 41);
}

.active {
    background-color: rgb(218, 144, 244);
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
</style>