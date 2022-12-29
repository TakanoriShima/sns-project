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
  <div class="container py-4">
    <div class="p-5 mb-4 bg-light rounded-3">
      <div class="container-fluid py-5">
        <h1 class="display-5 fw-bold">Hello SNS!!</h1>
        <p class="offset-md-2 col-md-8 fs-4 text-center">みんなで盛り上げよう</p>
        <button class="btn btn-primary btn-lg" type="button">Example button</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.blue {
  color: blue;
}
</style>
