import { createApp } from 'vue'
import App from './App.vue'
import VueRouter from "./router/index"; // 追加

import "bootstrap/dist/css/bootstrap.min.css" //　追加
import jQuery from 'jquery'
global.jquery = jQuery
global.$ = jQuery
// window.$ = window.jQuery = require('jquery')

createApp(App).use(VueRouter).mount("#app"); // 変更
