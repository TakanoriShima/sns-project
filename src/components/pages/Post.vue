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
onValue(ref(db, 'posts/' + props.id), (snapshot) => {
  let post = snapshot.val();
  post['key'] = props.id;
  console.log(post);
  data.post = post;
  if(auth.currentUser.email === data.post.email){
    data.flag = true;
  }
});

// onValue(ref(db, 'posts'), (snapshot) => {
//   let post = null;
//   for (const key in snapshot.val()) {
//     if(key === props.id){
//       post = snapshot.val()[key];
//       post['key'] = key;
//       // console.log(post)
//       break;
//     }else{
//       console.log('ng');
//     }
//   }
//   data.post = post;

//   if(auth.currentUser.email === data.post.email){
//     data.flag = true;
//   }

//   console.log(post)
// });

</script>

<template>
<div class="row">
  <h1 class="text-center text-primary">投稿詳細</h1>
  <!-- <div>{{ this.$route.params.id }}</div> -->
</div>
<div class="row">
    <table class="table table-bordered table-striped">
      <thead>
      <tr>
        <th>メールアドレス</th>
        <th>タイトル</th>
        <th>投稿内容</th>
        <th>画像</th>
        <th>投稿日時</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{{data.post.email}}</td>
        <td>{{data.post.title}}</td>
        <td>{{data.post.content}}</td>
        <td><img v-bind:src="data.post.image_url" style="width: 100px;"/></td>
        <td>{{data.post.date}}</td>
      </tr>
    </tbody>
  </table>
</div> 

<div class="row mt-5" v-if="data.flag">
  <a v-bind:href="'/posts/' + props.id + '/edit'" class="btn btn-success offset-sm-2 col-sm-3">投稿編集</a>
  <a v-bind:href="'/posts/' + props.id + '/delete'" class="btn btn-danger offset-sm-2 col-sm-3" onclick="return confirm('削除してよろしいですか？')">投稿削除</a>
</div>
</template>

<style scoped>
 
</style>