<template>
  <div class="post-container">
    <h1>{{ post.title }}</h1>
    <span>Author: </span><span>{{ author.name }}</span>
    <p>{{ post.body }}</p>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import store from "@/store";
import { Post, User } from "@/types";
import { onMounted, ref } from "vue";
const post = ref({} as Post);
const author = ref({} as User);
onMounted(() => {
  post.value = store.getters.getPostById(+router.currentRoute.value.params.id);
  author.value = store.getters.getUserById(post.value.userId);
});
</script>

<style scoped>
.post-container {
  margin: 0 auto;
}
</style>
