<script setup>
import { reactive, onMounted } from 'vue';
import { getDatabase, onValue, ref , remove} from "firebase/database";
import { getAuth } from "firebase/auth";
import { useRouter } from "vue-router"

const auth = getAuth();
const router = useRouter()
const db = getDatabase();

const props = defineProps({
  id: String,
})

// const data = reactive({
//   post: Object
// });

const refPost = ref(db, 'posts/' + props.id); 

// onValue(refPost, (snapshot) => {
//   data.post = snapshot.val();
// });

remove(refPost).then(() => {
  console.log("location removed");
});


router.push('/posts');

</script>

<template>

</template>

<style scoped>
 
</style>