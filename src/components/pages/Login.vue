<script setup>
import { reactive } from 'vue';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router"

const data = reactive({
  email: "",
  password: "",
});

const auth = getAuth();
const router = useRouter()

const login = () => {
  signInWithEmailAndPassword(auth, data.email, data.password)
    .then((userCredential) => {
      console.log("ログインに成功しました！");
      router.push('/posts');
    })
    .catch((err) => {
      console.log(err);
      // alert("正しいログイン情報を入力してください");
    });
};

</script>

<template>
<div class="row">
  <h1 class="text-center text-primary">ログイン</h1>
</div>
<div class="row offset-sm-3 col-sm-6">
  <div class="form-group">
    <!-- <label for="email">メールアドレス</label> -->
    <input type="email" class="form-control" v-model="data.email" id="inputName" placeholder="メールドレス">
  </div>
  <div class="form-group mt-2">
    <!-- <label for="password">パスワード</label> -->
    <input type="password" class="form-control" v-model="data.password" id="password" placeholder="パスワード">
  </div>
  <div class="form-group mt-4">
    <button class="form-control btn btn-primary" @click="login">ログイン</button>
  </div>
</div>
</template>

<style scoped>
 
</style>