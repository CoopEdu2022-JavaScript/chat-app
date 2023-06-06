<template>
    <div class="header">
        <button class="return-arrow"></button>
        <span>回复</span>
        <span class="placehold"></span>
    </div>
    <div class="messages">
        <div class="notification">
            <div class="user-block">
                <span class="read-or-not"></span>
                <span class="user-icon"></span>
                <span class="username">UserA</span>
                <span class="event"> 
                    fsdfsdfsdfdajkshdjkadfjksdfsdfsdf
                </span>
                <span class="time">22:00</span>
            </div>
            <div class="blog-pic"></div>
        </div>
    </div>
</template>
<script setup>
</script>
<style scoped>
.blog-pic {
    background-color: #fff;
    width: 44px;
    height: 50px;
    margin-right: 5%;
    border-radius: 8px;
}

.time {
    display: inline-block;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 17px;
    /* identical to box height */
    position: absolute;
    bottom: 0;
    text-align: right;
    color: gray;
    margin-left: 1%;
}

.event {
    white-space: nowrap;
    display: inline-block;
    /* Regular/五级文字 */

    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    width: 60%;
    /* identical to box height */


    /* text/text_white_100 */

    color: #FFFFFF;
    overflow: hidden;
    text-overflow: ellipsis;
}

.username {
    display: inline-block;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;

    /* text/text_white_100 */

    color: #FFFFFF;
    position: absolute;
    top: 0;
}


.user-icon {
    display: inline-block;
    width: 50px;
    height: 50px;
    margin-left: 2.4%;
    background-color: red;
    border-radius: 25px;
    margin-right: 4%;
}

.read-or-not {
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: rgb(218, 144, 244);
    border-radius: 4px;
    margin-bottom: 21px;
}

.user-block {
    width: 320px;
    height: 50px;
    margin-left: 5%;
    position: relative;
}

.notification {
    padding-top: 12px;
    width: 100%;
    height: 74px;
    display: flex;
    justify-content: space-between;
    background-color: rgb(40, 40, 40);
    margin-bottom: 3px;

}

.messages {
    margin-top: 136px;
    width: 100%;
    height: 100%;
}

.header {
    background-color: rgb(29, 29, 29);
    z-index: 9999;
    text-align: center;
    padding-top: 77px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 136px;
    line-height: 10px;
    text-align: center;
    position: fixed;
    top: 0px;
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