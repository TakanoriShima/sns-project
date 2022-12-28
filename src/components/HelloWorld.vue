<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';
defineProps({
  msg: String
});

const count = ref(0);
const  msg = ref('Hello Vue!');

onMounted(() => {
  $('#test').text('jQuery Test').addClass('blue');
});
</script>

<template>
  <div class="row">

    <h1 class="text-danger">{{ msg }}</h1>
    <h2 id="test"></h2>
    <p>
      Recommended IDE setup:
      <a href="https://code.visualstudio.com/" target="_blank">VS Code</a>
      +
      <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    </p>
  
    <p>
      <a href="https://vitejs.dev/guide/features.html" target="_blank">
        Vite Documentation
      </a>
      |
      <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
    </p>
  
    <button type="button" @click="count++" class="btn btn-primary">count is: {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test hot module replacement.
    </p>
  </div>
</template>

<style scoped>
a {
  color: #42b983;
}
.blue {
  color: blue;
}
</style>
