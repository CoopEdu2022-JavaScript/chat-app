<template>
    <div class="header">
        <button class="return-arrow"></button>
        <span>设置</span>
        <span class="placehold"></span>
    </div>
    <div class="logout-button">
        <button class="logout" @click="showModal = true">退出登录</button>
        <div v-if="showModal" class="log modal-overlay" @click="showModal = false">
            <div class="modal" @click.stop>
                <div class="ask-for-logout">退出登录?</div>
                <div class="username">@MoonShot</div>
                <div class="options">
                    <button @click="option1">取消</button>
                    <button @click="option2">确认</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'

const showModal = ref(false)

const option1 = () => {
    alert('return')
    showModal.value = false
}

const option2 = () => {
    alert('exit')
    showModal.value = false
}
</script>
<style scoped>
* {
    margin: 0;
    padding: 0;
}

.options {
    margin: 31px auto 0 auto;
    display: flex;
    width: 230px;
    height: 22px;
    justify-content: space-between;
    flex-direction: row;
    align-items: flex-start;
}

.options button {
    border: none;
    background-color: rgb(29, 29, 29);
    text-align: center;
    width: 115px;
    height: 22px;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    color: #DA90F4;
}

.username {
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #FFFFFF;
}

.ask-for-logout {
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 25px;
    color: #FFFFFF;

}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgb(29, 29, 29);
    padding: 20px;
    width: 280px;
    height: 147px;
    border-radius: 8px;
}

.logout-button {
    text-align: center;
}

.logout {
    margin-top: 571px;
    width: 300px;
    height: 60px;
    background-color: rgb(40, 40, 40);
    border: none;
    border-radius: 8px;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    color: #DA90F4;
}

.header .placehold {
    width: 16px;
    height: 16px;
    margin-right: 5%;
}

.header .return-arrow {
    border: none;
    height: 16px;
    width: 16px;
    background-image: url(../assets/PostBlog/ic_back.png);
    background-size: contain;
    background-color: rgb(29, 29, 29);
    margin-left: 5%;
}

.header {
    text-align: center;
    padding-top: 73px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 30px;
    line-height: 10px;
    text-align: center;
}

.header span {
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    /* identical to box height */

    text-align: center;

    /* text/text_white_100 */

    color: #FFFFFF;
    width: 63px;
    height: 28px;

}
</style>