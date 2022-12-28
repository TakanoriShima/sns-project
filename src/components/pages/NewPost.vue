<script setup>
import { reactive } from 'vue';
import { getDatabase, onValue, push, ref as dRef } from "firebase/database";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router"

const auth = getAuth();
const router = useRouter()
const db = getDatabase();
const storage = getStorage();

const data = reactive({
  user: '',
  title: '',
  content: "",
  image_url: "",
  posts: []
})

data.user = auth.currentUser;

const uploadFile =  (e) => {
  let file = e.target.files[0];
  const storageRef =  ref(storage, "files/" + file.name);
  uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log("アップロードに成功しました");
        getDownloadURL(storageRef).then((url) => 
          {
            console.log(url);
            data.image_url = url;
            document.getElementById('send').disabled = false;
          });
      })
      .catch((error) => {
        console.log("アップロードに失敗しました");
      })
}

const sendMessage = () => {
  if (data.title === "" || data.content === "") return;

  let today_str = new Date().toString();
  console.log(today_str);

  push(dRef(db, "posts"), {email: data.user.email, title: data.title, content: data.content, image_url: data.image_url, date: today_str}); // 追加

  data.title = "";
  data.content = "";
  document.getElementById('send').disabled = true;

  router.push('/posts');

}
</script>

<template>
<div class="row">
  <h1 class="text-center text-primary">新規投稿</h1>
</div>
<div class="row offset-sm-3 col-sm-6">
  <div class="form-group">
    <input type="text" class="form-control" v-model="data.title" id="title" placeholder="タイトル">
  </div>
  <div class="form-group mt-2">
    <input type="text" class="form-control" v-model="data.content" id="content" placeholder="内容">
  </div>
  <div class="form-group mt-2">
    <label for="image">画像</label>
    <input type="file" class="form-control" @change="uploadFile" id="image">
    <img v-bind:src="data.image_url" style="width: 100px;"/>
  </div>
  <div class="form-group mt-4">
    <button class="form-control btn btn-primary" @click="sendMessage" id="send" disabled>投稿</button>
  </div>
</div>
</template>

<style scoped>
 
</style>