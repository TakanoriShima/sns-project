<script setup>
import { reactive } from 'vue';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router"

const data = reactive({
  isLoggedIn: false,
  isLoading: true,
});
const auth = getAuth();
const router = useRouter()

const logout = () => {
  signOut(auth);
  router.push('/');
};
onAuthStateChanged(auth, user => {
  data.isLoggedIn = user ? true : false;
  data.isLoading = false;
});
</script>

<template>
<div class="row">
  <h1 class="text-center text-primary">投稿一覧</h1>
</div>
<div v-if="data.isLoggedIn" class="row">
  <button @click="logout" class="offset-sm-3 col-sm-6">ログアウト</button>
</div>
</template>

<style scoped>
 
</style>