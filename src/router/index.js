import * as vueRouter from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import HelloWorld from "../components/HelloWorld.vue";
import Login from "../components/pages/Login.vue";
import Signup from "../components/pages/Signup.vue";
import Post from "../components/pages/Post.vue";

const routes = [
  {
    path: "/",
    component: HelloWorld,
  },
  {
    path: "/signup",
    component: Signup,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/posts",
    component: Post,
    beforeEnter: (to, from, next) => {
      const auth = getAuth()
      onAuthStateChanged(auth, (user) => {
        if (user) {
          next();
        } else {
          next('/login');
        }
      });
    }
  },

];


const router = vueRouter.createRouter({
  history: vueRouter.createWebHistory(),
  routes,
});

export default router;