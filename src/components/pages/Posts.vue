<script setup>
import { reactive } from 'vue';
import { getDatabase, onValue, ref, query } from "firebase/database";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router"

const auth = getAuth();
const router = useRouter()
const db = getDatabase();

const data = reactive({
  user: '',
  posts: [],
  flag: false,
})

data.user = auth.currentUser;
console.log(auth.currentUser.displayName)

console.log(auth.currentUser.email);

onValue(ref(db, 'posts'), (snapshot) => {
  data.posts = [];
  // console.log(snapshot);
  for (const key in snapshot.val()) {
    // console.log(key)
    // console.log(snapshot.val()[key])
    let post = snapshot.val()[key];
    
    post['key'] = key;
    data.posts.push(post)
    data.flag = true; 
  }
});

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
  <h1 class="text-center text-primary mt-5">投稿一覧</h1>
</div>
<div class="row">
  <table class="table table-striped table-bordered mt-2" v-if="data.flag">
    <thead>
    <tr>
        <th>投稿番号</th>
        <th>名前</th>
        <th>タイトル</th>
        <th>投稿日時</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(post, index) in data.posts " :key="index">
        <td><a v-bind:href="'/posts/' + post.key">{{index + 1}}</a></td>
        <td>{{post.name}}</td>
        <td>{{post.title}}</td>
        <td>{{post.date}}</td>
      </tr>
    </tbody>
  </table>
  <div v-else class="row mt-2">
    <h2>まだ投稿はありません</h2>
  </div>
</div>

</template>

<style scoped>
 
</style>