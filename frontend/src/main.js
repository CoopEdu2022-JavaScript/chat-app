import { createApp } from 'vue'
import { createStore } from 'vuex' // 导入 createStore
import Antd from 'ant-design-vue'
import App from './App.vue'
import router from './router'
import 'ant-design-vue/dist/reset.css'

const store = createStore({ // 创建 store
    state: {
        count: 0
    },
    mutations: {
        increment(state) {
            state.count++
        }
    }
})

const app = createApp(App)
app.use(router)
app.use(store)
app.use(Antd)
app.mount('#app')