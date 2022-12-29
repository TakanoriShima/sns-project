<script setup>
import { reactive } from 'vue';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRouter } from "vue-router"

const router = useRouter()
const data = reactive({
  email: "",
  password: "",
  userName: '',
});

const auth = getAuth();

const signUp = () => {
  createUserWithEmailAndPassword(auth, data.email, data.password)
    .then((userCredential) => {
      const user = auth.currentUser;
      // console.log(userCredential.user.auth)
      updateProfile(user, {
        displayName: data.userName
      });
      // auth.currentUser.updateProfile(update);
      console.log('登録成功');
    })
    .catch((err) => {
      console.log(err);
    });

    router.push('/login');
};

// firebase.auth().createUserWithEmailAndPassword(email, password).then((result)=>{
//         result.user.updateProfile({
//         displayName:userName
//         })
</script>

<template>
  <div class="row">
    <h1 class="text-center text-primary">新規会員登録</h1>
  </div>
  <div class="row offset-sm-3 col-sm-6">
    <div class="form-group mt-2">
        <!-- <label for="userName">お名前</label> -->
        <input type="text" class="form-control" v-model="data.userName" id="userName" placeholder="お名前">
    </div>
    <div class="form-group mt-2">
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
</template>

<style scoped>
</style>