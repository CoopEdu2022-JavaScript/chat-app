import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import router from './router';
import 'ant-design-vue/dist/reset.css'
import { createPinia } from 'pinia';
import './style.css';
import fs from 'fs'
const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(Antd).use(router).mount('#app')
