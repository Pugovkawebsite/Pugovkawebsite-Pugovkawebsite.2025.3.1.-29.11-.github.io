import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;


createApp(App).mount('#app')
