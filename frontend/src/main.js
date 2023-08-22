import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import router from './router';
import 'ant-design-vue/dist/reset.css'
import { createPinia } from 'pinia';
import './style.css';
import fs from 'fs'
import http from './api/http'
import { Quasar } from 'quasar'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

// Assumes your root component is App.vue
// and placed in same folder as main.js
const app = createApp(App)
const pinia = createPinia()
app.use(Quasar, {
    plugins: {}, // import Quasar plugins and add here
  })
  
  // Assumes you have a <div id="app"></div> in your index.html
app.use(pinia)
app.use(Antd).use(router).mount('#app')
const update_pop = () => {
    http.get(`/feed/updatepopularity`)
}
setInterval(() => {
    update_pop()
}, 1000 * 60 * 10);
