<template>
    <div class="body">
        <div class="upper-box">
            <div class="usericon"></div>
            <div class="username">Steviline</div>
            <div class="settings-logo">Logo</div>
            <div class="tiezi">帖子</div>
            <div class="fastshot">快拍</div>
        </div>
        <div class="context"></div>
        <div class="lower-box">
            <div class="mainmenu">首页</div>
            <div class="add-logo"></div>
            <div class="mine">我的</div>
        </div>
    </div>
</template>
  
<script>
import { defineComponent } from 'vue'
import { useStore } from 'pinia'

export default defineComponent({
    name: 'MyComponent',
    setup() {
        const store = useStore()

        return {
            // any data or methods you want to use
        }
    }
})
</script>
  
<style scoped>
* {
    margin: 0;
    padding: 0;
}

body {
    background-color: rgb(131, 86, 146);
}

.body {
    margin-top: 229px;
    background-color: rgb(50, 64, 65);
    display: block;
    height: 621px;
    width: 100%;
    border-radius: 8px 8px 0 0;
}

.upper-box {
    display: block;
    width: 100%;
    background-color: rgb(29, 29, 29);
    height: 74px;
    border-radius: 8px 8px 0 0;
    position: relative;
}

.usericon {
    margin-left: 27.65px;
    width: 71px;
    height: 71px;
    border: 6px solid;
    border-radius: 71px;
    position: absolute;
    bottom: 68px;
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
  