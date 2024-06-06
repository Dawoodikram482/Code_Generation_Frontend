import 'bootstrap/dist/css/bootstrap.css';
import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import { Quasar, Notify } from 'quasar';
import 'quasar/src/css/index.sass';
import { useUserSessionStore } from '@/stores/UserSession';

// Create the Vue application instance
const app = createApp(App);

// Create the Pinia instance
const pinia = createPinia();

// Use Pinia, Router, and Quasar plugins
app.use(pinia);
app.use(router);
app.use(Quasar, {
    plugins: {
        Notify,
    },
});

// Initialize user session from token before mounting the app
const userSessionStore = useUserSessionStore(pinia);
userSessionStore.checkUserRole(); // Initialize user data from token on app initialization

// Mount the application
app.mount('#app');
