import { createApp } from 'vue'
import './style.css'
import App from './App.vue';
import router from './router/index';

const app = createApp(App);

app.provide('provide1', 'provide1');
app.use(router).mount('#app')
