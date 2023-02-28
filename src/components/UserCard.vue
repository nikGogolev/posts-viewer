<template>
  <div class="user-card-container">
    <div class="user-card-block">
      <div class="user-card-item">
        <span class="user-card-label">User id: </span>
        <span class="user-card-info">{{ props.user.id }}</span>
      </div>
      <div class="user-card-item">
        <span class="user-card-label">Username: </span>
        <span class="user-card-info">{{ props.user.username }}</span>
      </div>
      <div class="user-card-item">
        <span class="user-card-label">Name: </span>
        <span class="user-card-info">{{ props.user.name }}</span>
      </div>
      <div class="user-card-item">
        <span class="user-card-label">Company name: </span>
        <span class="user-card-info">{{ props.user.company.name }}</span>
      </div>
      <div class="user-card-item">
        <span class="user-card-label">Website: </span>
        <span class="user-card-info">{{ props.user.website }}</span>
      </div>
    </div>

    <div class="user-posts-block">
      <div class="user-posts-heading" @click="showPosts = !showPosts">
        <h2 class="user-posts-header" :class="showPosts ? 'show-post' : ''">
          Posts
        </h2>
        <div class="arrow-8" :class="showPosts ? 'show-post' : ''"></div>
      </div>

      <Transition>
        <div v-if="showPosts">
          <PostCard
            v-for="post in posts"
            :key="post.id"
            :post="post"
            class="user-post-container"
          />
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import store from "@/store";
import { Post, User } from "@/types";
import { defineProps, ref, onMounted } from "vue";
import PostCard from "./PostCard.vue";

const props = defineProps<{
  user: User;
}>();

const posts = ref(new Array<Post>());
const showPosts = ref(false);

onMounted(() => {
  posts.value = store.getters.getPostsByUserId(props.user.id);
});
</script>

<style scoped>
.user-card-container {
  box-shadow: 10px 10px 10px 2px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin: 20px auto;
}

.user-card-block {
  background-color: aliceblue;
  padding: 10px 30px;
}

.user-posts-block {
  background-color: lightcyan;
  padding: 10px;
}
.user-card-item {
  text-align: left;
  margin-bottom: 10px;
}
.user-card-label {
  font-weight: bold;
  font-size: 1.2em;
}

.user-card-info {
  color: dimgray;
}

.user-posts-heading {
  cursor: pointer;
}
.user-posts-header {
  text-align: left;
  padding: 0 30px;
  transform: translateX(44%);
  transition: transform 0.3s ease-out;
  margin: 10px auto 5px;
}

.user-posts-header.show-post {
  transform: translateX(0%);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease-out;
}

.v-enter-to,
.v-leave-from {
  max-height: 9999999999px;
  overflow: auto;
  /* transform: scaleY(1); */
}

.v-enter-from,
.v-leave-to {
  max-height: 0;
  /* transform: scaleY(0); */
  overflow: hidden;
  /* transform-origin: top; */
}

.arrow-8 {
  position: relative;
  width: 15px;
  height: 15px;
  margin: 3px auto 10px auto;
  transition: transform 0.3s ease-out;
}

.arrow-8.show-post {
  transform: translateY(-25px);
}

.arrow-8:before,
.arrow-8:after {
  content: "";
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-left: 3px solid #337ab7;
  border-bottom: 3px solid #337ab7;
  animation: arrow-8 3s linear infinite;
}
.arrow-8:after {
  animation: arrow-8 3s linear infinite -1.5s;
}

.arrow-8.show-post:before,
.arrow-8.show-post:after {
  animation: arrow-8-up 3s linear infinite;
}
.arrow-8.show-post:after {
  animation: arrow-8-up 3s linear infinite -1.5s;
}
@keyframes arrow-8 {
  0% {
    opacity: 0;
    transform: translate(0, -10px) rotate(-45deg);
  }
  10%,
  90% {
    opacity: 0;
  }
  50% {
    opacity: 1;
    transform: translate(0, 0) rotate(-45deg);
  }
  100% {
    opacity: 0;
    transform: translate(0, 10px) rotate(-45deg);
  }
}

@keyframes arrow-8-up {
  0% {
    opacity: 0;
    transform: translate(0, 10px) rotate(135deg);
  }
  10%,
  90% {
    opacity: 0;
  }
  50% {
    opacity: 1;
    transform: translate(0, 0) rotate(135deg);
  }
  100% {
    opacity: 0;
    transform: translate(0, -10px) rotate(135deg);
  }
}
</style>
