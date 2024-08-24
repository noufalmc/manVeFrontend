import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'



import axios from "axios";


axios.defaults.baseURL = "http://127.0.0.1:8000";
createApp(App).use(store).use(router).use(VueSweetalert2).mount('#app')
