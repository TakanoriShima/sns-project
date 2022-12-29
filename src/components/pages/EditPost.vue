<script setup>
import { reactive } from 'vue';
import { getDatabase, onValue, push, ref as dRef, set } from "firebase/database";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router"

const auth = getAuth();
const router = useRouter()
const db = getDatabase();
const storage = getStorage();

const props = defineProps({
  id: String,
})

const data = reactive({
  user: '',
  uid: '',
  name: '',
  title: '',
  content: "",
  image_url: "",
  flag: false,
})

data.user = auth.currentUser;
data.id = props.id;

const RefPost = dRef(db, 'posts/' + props.id);

onValue(RefPost, (snapshot) => {
  let post = snapshot.val();
  data.uid = post.uid;
  data.name = post.name,
  data.title = post.title;
  data.content = post.content;
  data.image_url = post.image_url;

  if(data.user.uid !== data.uid){
    router.push('/posts'); 
  }
});

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

const updateMessage = () => {
  if (data.title === "" || data.content === "") return;

  let today_str = new Date().toString();
  console.log(today_str);
  
  let postData = {
    uid: data.uid,
    name: data.name,
    title: data.title,
    content: data.content,
    image_url: data.image_url,
    date: today_str
  };

  set(RefPost, postData)
  .then(() => {
    // Data saved successfully!
  })
  .catch((error) => {
    // The write failed...
  });

  router.push('/posts/' + props.id);
}
</script>

<template>
<div class="row">
  <h1 class="text-center text-primary mt-5">投稿編集</h1>
</div>
<div class="row offset-sm-3 col-sm-6 mt-2">
  <div class="form-group">
    <input type="text" class="form-control" v-model="data.title" id="title" placeholder="タイトル">
  </div>
  <div class="form-group mt-2">
    <input type="text" class="form-control" v-model="data.content" id="content" placeholder="内容">
  </div>
  <div class="form-group mt-2">
    <label for="image">画像</label>
    <input type="file" class="form-control" @change="uploadFile" id="image">
    <img v-bind:src="data.image_url" style="width: 100px;" class="mt-4"/>
  </div>
  <div class="form-group mt-4">
    <button class="form-control btn btn-primary" @click="updateMessage" id="send" disabled>更新</button>
  </div>
</div>
</template>

<style scoped>
 
</style>