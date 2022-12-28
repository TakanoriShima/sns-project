<script setup>
import { reactive } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const data = reactive({
  email: "",
  password: "",
});

const auth = getAuth();

const signUp = () => {
  createUserWithEmailAndPassword(auth, data.email, data.password)
    .then((userCredential) => {
      console.log('登録成功');
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<template>
  <div class="row">
    <h1 class="text-center text-primary">新規会員登録</h1>
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
      <button class="form-control btn btn-primary" @click="signUp">ユーザーを作成</button>
    </div>
  </div>

  <div class="row">
    <a href="/">Topへ</a>
    <a href="/login">Login</a>
  </div>
</template>

<style scoped>
</style>