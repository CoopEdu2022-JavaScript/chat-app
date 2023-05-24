<template>
    <div class="user">
        <div class="usericon"></div>
        <div class="username">Steviline</div>
    </div>
    <div class="settings-logo">Logo</div>
    <div class="tiezi">帖子</div>
    <div class="fastshot">快拍</div>
    <div class="context"></div>
    <div class="lower-box">
        <div class="mainmenu">首页</div>
        <div class="add-logo"></div>
        <div class="mine">我的</div>
    </div>
</template>
  
<script>

</script>
  
<style scoped>
* {
    margin: 0;
    padding: 0;
}

.user {
    display: flex;
    align-items: flex-end;
    padding-left: 27.65px;
    height: 229px;
    background-color: rgb(131, 86, 146);
}

.usericon {
    width: 75px;
    height: 75px;
    border: 6px solid #1D1D1D;
    border-radius: 40.5px;
    position: relative;
    top: 10px;
    background-image: url(https://img2.baidu.com/it/u=523718858,1123582634&fm=253&fmt=auto&app=138&f=JPEG?w=231&h=500);
    background-size: 100px;
    background-position: 90px 120px;
}

.username {
    color: white;
    font-size: 20px;
    font-weight: 700;
    position: absolute;
    bottom: 101px;
    left: 124px;
    text-shadow: 0px 1px 7px black;
}

.settings-logo {
    color: white;
    font-size: 20px;
    font-weight: 700;
    position: absolute;
    bottom: 101px;
    left: 337.35px;
}

.tiezi {
    display: inline-block;
    margin-top: 39px;
    margin-left: 82px;
    width: 32px;
    height: 22px;
    font-size: 16px;
    font-weight: bold;
    color: white
}

.fastshot {
    display: inline-block;
    margin-top: 39px;
    margin-left: 165px;
    width: 32px;
    height: 22px;
    font-size: 16px;
    font-weight: bold;
    color: white
}

.lower-box {
    background-color: rgb(40, 40, 40);
    width: 100%;
    height: 81px;
    line-height: 81px;
}

.context {
    display: block;
    height: 468px;
    width: 100%;
}

.mainmenu {
    display: block;
    font-size: 16px;
    color: white;
    width: 32px;
    height: 22px;
    margin-left: 62px;
}

.add-logo {
    display: block;
    width: 45.35px;
    height: 34px;
    margin-left: 142px;
    background-color: purple;
}

.mine {
    display: block;
    position: absolute;
    font-size: 16px;
    color: white;
    width: 42px;
    height: 32px;
    margin-left: 5px;
    background-color: #fff;
}
</style>
  