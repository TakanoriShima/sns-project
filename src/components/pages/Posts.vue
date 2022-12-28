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
  posts: []
})

data.user = auth.currentUser;

console.log(auth.currentUser.email);

onValue(ref(db, 'posts'), (snapshot) => {
  data.posts = [];
  for (const i in snapshot.val()) {
    data.posts.push(snapshot.val()[i])
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
  <h1 class="text-center text-primary">投稿一覧</h1>
</div>
    <div class="message-area">
        <table class="table table-bordered table-striped">
          <tr>
            <th>投稿番号</th>
            <th>メールアドレス</th>
            <th>タイトル</th>
            <th>投稿内容</th>
            <th>画像</th>
            <th>投稿日時</th>
          </tr>
          <tr v-for="(post, index) in data.posts " :key="index">
            <td>{{index + 1}}</td>
            <td>{{post.email}}</td>
            <td>{{post.title}}</td>
            <td>{{post.content}}</td>
            <td><img v-bind:src="post.image_url" style="width: 100px;"/></td>
            <td>{{post.date}}</td>
          </tr>
      </table>
    </div> 
<div v-if="data.isLoggedIn" class="row">
  <button @click="logout" class="offset-sm-3 col-sm-6">ログアウト</button>
</div>

<div class="row">
  <a href="/newPost" class="btn btn-primary offset-sm-4 col-sm-4">新規投稿</a>
</div>

</template>

<style scoped>
 
</style>