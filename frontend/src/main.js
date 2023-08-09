import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import router from './router';
import 'ant-design-vue/dist/reset.css'
import { createPinia } from 'pinia';
import './style.css';
import fs from 'fs'
import http from './api/http'
const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(Antd).use(router).mount('#app')
const update_pop = () => {
    http.get(`/feed/updatepopularity`)
}
setInterval(() => {
    update_pop()
}, 1000 * 60 * 10);
