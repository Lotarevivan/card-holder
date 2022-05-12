import { createApp } from 'vue'
import Maska from 'maska'
import App from './App.vue'
import M from 'materialize-css'
const app = createApp(App)
app.use(Maska)
app.config.globalProperties.$material = M
app.mount('#app')