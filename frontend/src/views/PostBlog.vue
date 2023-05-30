<template>
    <div class="heading">
        <button class="return-arrow"></button>
        <button class="postblog">
        </button>
    </div>
    <div class="blogtitle">
        <input maxlength="20" placeholder="标题" v-model="inputText" />
        <span>{{ textCount }}/20</span>
    </div>
    <div class="context">
        <textarea placeholder="分享你的生活" cols="30" rows="10"></textarea>
    </div>
    <div class="picupload">
        <label for="fileInput" class="custom-file-input" :style="{ backgroundImage: `url(${previewSrc})` }">
            <input type="file" id="fileInput" accept="image/*" hidden @change="handleFileChange">
            <button v-if="previewSrc !== previewImage" class="clear-button" @click="clearPreview">x</button>
        </label>
    </div>
</template>
<script setup>
import { ref, watch } from 'vue';
import previewImage from '../assets/PostBlog/btn_addphotos.png';
const inputText = ref('');
const textCount = ref(0);
const previewSrc = ref(previewImage);
function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            previewSrc.value = reader.result;
        });
        reader.readAsDataURL(file);
    }
}
function clearPreview(event) {
    event.preventDefault();
    previewSrc.value = previewImage;
    const fileInput = document.querySelector('#fileInput');
    fileInput.value = '';
}
watch(inputText, (newVal) => {
    textCount.value = newVal.length;
});
</script>
<style scoped>
.clear-button {
    position: relative;
    top: 0px;
    left: 0px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #fff;
    text-align: center;
    line-height: 20px;
    border: none;
}

.picupload label {
    background-repeat: no-repeat;
    display: block;
    width: 150px;
    height: 150px;
    background-color: rgb(41, 41, 41);
    background-size: 150px 150px;
}

input[type="file"] {
    opacity: 0;
}

.picupload {
    margin: 36px auto 0 auto;
    width: 75%;
}

.context textarea {
    resize: none;
    overflow: auto;
    margin-left: 40px;
    width: 80%;
    height: 300px;
    background-color: rgb(29, 29, 29);
    border: none;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    color: #FFFFFF;
}

.context {
    margin-top: 20px;
}

.blogtitle {
    width: 312px;
    height: 34px;
    margin: 40px auto 0 auto;
    display: flex;
    justify-content: space-around;
    align-items: last baseline;
}

.blogtitle span {
    color: gray;
    font-size: 14px;
}

.blogtitle input {
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
    background-image: url(../assets/PostBlog/ic_add_publish.png);
    background-size: contain;
    border-radius: 15px;
    float: right;
    margin-right: 20px;
}

.heading .return-arrow {
    border: none;
    height: 16px;
    width: 16px;
    margin-left: 20px;
    background-image: url(../assets/PostBlog/ic_back.png);
    background-size: contain;
    background-color: rgb(29, 29, 29);
}
</style>