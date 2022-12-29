import { createApp } from 'vue'
import App from './App.vue'
import VueRouter from "./router/index"; // 追加

// import "bootstrap/dist/css/bootstrap.min.css" //　追加
// import jQuery from 'jquery'
// global.jquery = jQuery
// global.$ = jQuery
// window.$ = window.jQuery = require('jquery')

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDIkQWaV4nIY33PGkuqj2gXJ8kxDedz0HQ",
  authDomain: "sns-project-e82da.firebaseapp.com",
  projectId: "sns-project-e82da",
  storageBucket: "sns-project-e82da.appspot.com",
  messagingSenderId: "82964653786",
  appId: "1:82964653786:web:b34b9710b44c42c773a7e3"
};


// Initialize Firebase
initializeApp(firebaseConfig);
createApp(App).use(VueRouter).mount("#app"); // 変更
