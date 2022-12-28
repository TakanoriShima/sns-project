<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';
defineProps({
  msg: String
});

const count = ref(0);
const  msg = ref('Hello SNS');

onMounted(() => {
  $('#test').text('jQuery Test').addClass('blue');
});
</script>

<template>
  <div class="row">

    <h1 class="text-danger text-center">{{ msg }}</h1>
  </div>
  <div class="row mt-3">
    <!-- <h2 id="test"></h2> -->
  <a href="/signup" class="offset-sm-2 col-sm-3 btn btn-primary">Signup</a>
  <a href="/login" class="offset-sm-2 col-sm-3 btn btn-danger">Login</a>
  </div>
  <!-- <div class="row">
    <button type="button" @click="count++" class="btn btn-primary">count is: {{ count }}</button>
  </div> -->
</template>

<style scoped>
.blue {
  color: blue;
}
</style>
