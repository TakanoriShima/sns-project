import * as vueRouter from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import HelloWorld from "../components/HelloWorld.vue";
import Login from "../components/pages/Login.vue";
import Signup from "../components/pages/Signup.vue";
import Posts from "../components/pages/Posts.vue";
import NewPost from "../components/pages/NewPost.vue";
import Post from "../components/pages/Post.vue";
import DeletePost from "../components/pages/DeletePost.vue";
import EditPost from "../components/pages/EditPost.vue";

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
    component: Posts,
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
  {
    path: "/newPost",
    component: NewPost,
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
  {
    path: "/posts/:id",
    component: Post,
    props: true,
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
  {
    path: "/posts/:id/delete",
    component: DeletePost,
    props: true,
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
  {
    path: "/posts/:id/edit",
    component: EditPost,
    props: true,
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