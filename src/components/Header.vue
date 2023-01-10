<script setup>
import { reactive, ref } from 'vue';
import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "vue-router" 

const auth = getAuth();
const router = useRouter();
const login_flag = ref(false);

const data = reactive({
  user: Object,
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    data.user = user;
    login_flag.value = true;
  } else {
    login_flag.value = false;
  }
});

const logout = () => {
  signOut(auth);
  router.push('/login');
}
</script>

<template>
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a v-if="login_flag" class="navbar-brand" href="/posts">SNS Project</a>
    <a v-else class="navbar-brand" href="/">SNS Project</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li v-if="login_flag" class="nav-item">
          <a class="nav-link">{{ data.user.displayName }}</a>
        </li>
        <li v-if="login_flag"><img v-bind:src="data.user.photoURL" style="width: 4git 0px;"/></li>
        <li v-if="login_flag" class="nav-item">
          <a href="/profile/edit" class="nav-link">プロフィール編集</a>
        </li>
        <li v-if="login_flag" class="nav-item">
          <a href="/newPost" class="nav-link">新規投稿</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success me-5" type="submit">Search</button>
      </form>
      <ul v-if="login_flag" class="navbar-nav">
          <li class="nav-item"><a class="btn btn-outline-primary" @click="logout">Logout</a></li>
      </ul>
      <ul v-else class="navbar-nav">
          <li class="nav-item"><a href="/signup" class="btn btn-outline-danger me-2">Signup</a></li>
          <li class="nav-item"><a href="/login" class="btn btn-outline-primary">Login</a></li>
      </ul>
    </div>
  </div>
</nav>

</template>