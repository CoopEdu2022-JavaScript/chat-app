<template>
    <div class="header">
        <button class="return-arrow"></button>
    </div>
    <p class="title1">我的情绪是...</p>
    <p class="title2">选择你的情绪卡片</p>
    <div class="cards">
        <div class="options">
            <div class="opt">
                <img src="../assets/PostSnapShot/Ellipse 104.png" alt="图片未加载">
                <span>吃饱了</span>
            </div>
            <div class="opt">
                <img src="../assets/PostSnapShot/Ellipse 107.png" alt="图片未加载">
                <span>有点儿意思</span>
            </div>
            <div class="opt">
                <img src="../assets/PostSnapShot/12.png" alt="">
                <span>开心</span>
            </div>
        </div>
        <div class="options">
            <div class="opt">
                <img src="../assets/PostSnapShot/9.png" alt="图片未加载">
                <span>学累了</span>
            </div>
            <div class="opt">
                <img src="../assets/PostSnapShot/6.png" alt="图片未加载">
                <span>炸裂的</span>
            </div>
            <div class="opt">
                <img src="../assets/PostSnapShot/3.png" alt="">
                <span>伤心</span>
            </div>
        </div>
        <div class="options">
            <div class="opt">
                <img src="../assets/PostSnapShot/8.png" alt="图片未加载">
                <span>好尴尬</span>
            </div>
            <div class="opt">
                <img src="../assets/PostSnapShot/11.png" alt="图片未加载">
                <span>我麻了</span>
            </div>
            <div class="opt">
                <img src="../assets/PostSnapShot/2.png" alt="">
                <span>我方了</span>
            </div>
        </div>
        <div class="options">
            <div class="opt">
                <img src="../assets/PostSnapShot/7.png" alt="图片未加载">
                <span>充满力量</span>
            </div>
            <div class="opt">
                <img src="../assets/PostSnapShot/Rectangle 413.png" alt="图片未加载">
                <span>酸了</span>
            </div>
            <div class="opt">
                <img src="../assets/PostSnapShot/1.png" alt="">
                <span>骚动</span>
            </div>
        </div>
    </div>
</template>
<script setup>
</script>
<style scoped>
.opt img {
    width: 100px;
    height: 100px;
}

.options span {
    margin-top: 8px;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 17px;
    text-align: center;
}

.opt {
    color:#FFFFFF;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100px;
    height: 125px;
}
.options {
    display: flex;
    gap: 16.5px;
    text-align: center;
    height: 125px;
    width: 353px;
    margin-left: 10px;
    margin-bottom: 43px;
}

.cards {
    padding-top: 43px;
    border-radius: 8px;
    margin: 48px auto 0 auto;
    width: 353px;
    height: 740px;
    background-color: rgb(41, 41, 41);
}

.title2 {
    margin-left: 20px;
    margin-top: 16px;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    color: rgb(204, 204, 204)
}

.title1 {
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 34px;
    margin-top: 40px;
    color: #FFFFFF;
    margin-left: 20px;
}

* {
    margin: 0;
    padding: 0;
}

.header .return-arrow {
    border: none;
    height: 16px;
    width: 16px;
    background-image: url(../assets/PostBlog/ic_back.png);
    background-size: contain;
    background-color: rgb(29, 29, 29);
    margin-left: 20px;
    margin-top: 76px;
}
</style>