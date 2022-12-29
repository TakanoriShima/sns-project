<script setup>
import { reactive, onMounted } from 'vue';
import { getDatabase, onValue, ref } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useRouter } from "vue-router"


const auth = getAuth();
const router = useRouter()
const db = getDatabase();

const props = defineProps({
  id: String,
})

const data = reactive({
  post: Object,
  flag: false
})

// console.log(props.id);

onValue(ref(db, 'posts'), (snapshot) => {
  let post = null;
  for (const key in snapshot.val()) {
    if(key === props.id){
      post = snapshot.val()[key];
      post['key'] = key;
      // console.log(post)
      break;
    }else{
      console.log('ng');
    }
  }
  data.post = post;

  if(auth.currentUser.email === data.post.email){
    data.flag = true;
  }

  console.log(post)
});

</script>

<template>
<div class="row">
  <h1 class="text-center text-primary">投稿詳細</h1>
  <!-- <div>{{ this.$route.params.id }}</div> -->
</div>
<div class="row">
    <table class="table table-bordered table-striped">
      <tr>
        <th>メールアドレス</th>
        <th>タイトル</th>
        <th>投稿内容</th>
        <th>画像</th>
        <th>投稿日時</th>
      </tr>
      <tr>
        <td>{{data.post.email}}</td>
        <td>{{data.post.title}}</td>
        <td>{{data.post.content}}</td>
        <td><img v-bind:src="data.post.image_url" style="width: 100px;"/></td>
        <td>{{data.post.date}}</td>
      </tr>
  </table>
</div> 

<div class="row mt-5" v-if="data.flag">
  <a href="/posts/edit" class="btn btn-success offset-sm-2 col-sm-3">投稿編集</a>
  <a href="/posts/delete" class="btn btn-danger offset-sm-2 col-sm-3">投稿削除</a>
</div>

<div class="row mt-4">
  <a href="/posts" class="btn btn-primary offset-sm-4 col-sm-4">投稿一覧へ</a>
</div>

</template>

<style scoped>
 
</style>