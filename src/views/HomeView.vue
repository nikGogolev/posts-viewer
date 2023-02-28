<template>
  <div class="home">
    <template v-if="users.length"
      ><div v-for="user in users" :key="user.id">
        <UserCard :user="user"></UserCard></div
    ></template>
    <template v-else>Loading...</template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import store from "@/store";
import { LOAD_DATA } from "@/store/actionTypes";
import { User, Post, Comment } from "@/types";
import UserCard from "@/components/UserCard.vue";

const posts = ref(new Array<Post>());
const users = ref(new Array<User>());
const comments = ref(new Array<Comment>());

onMounted(async () => {
  if (!store.getters.getLoadedState) {
    await store.dispatch(LOAD_DATA);
    posts.value = store.getters.getPosts;
    users.value = store.getters.getUsers;
    comments.value = store.getters.getComments;
  } else {
    posts.value = store.getters.getPosts;
    users.value = store.getters.getUsers;
    comments.value = store.getters.getComments;
  }
});
</script>
