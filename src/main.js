import 'bootstrap/dist/css/bootstrap.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { Quasar, Notify } from 'quasar';
import 'quasar/src/css/index.sass';



const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Quasar, {
    plugins: {
        Notify
    }
});

app.mount('#app')
