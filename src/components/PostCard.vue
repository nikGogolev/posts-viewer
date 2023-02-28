<template>
  <div
    class="user-post-container"
    @click.stop="switchEditPost = !switchEditPost"
  >
    <div class="user-post-item">
      <span class="user-post-item-label">Post id: </span
      ><span class="user-post-item-info">{{ props.post.id }}</span>
    </div>
    <div class="user-post-item">
      <span class="user-post-item-label">Title: </span
      ><span class="user-post-item-info">{{ props.post.title }}</span>
    </div>
    <div class="user-post-item">
      <span class="user-post-item-label">Words: </span
      ><span class="user-post-item-info">{{
        props.post.body
          .replace(/[\s]+/gim, " ")
          .replace(/[\n]+/gim, " ")
          .split(" ").length
      }}</span>
    </div>
    <div class="user-post-item">
      <span class="user-post-item-label">Chars: </span
      ><span class="user-post-item-info">{{ props.post.body.length }}</span>
    </div>
    <button
      @click.stop="switchEditPost = !switchEditPost"
      class="show-edit-form-btn"
    >
      Edit
    </button>
    <button
      @click="() => router.push(`/post/${props.post.id}`)"
      class="show-edit-form-btn"
    >
      Watch
    </button>
    <div v-if="switchEditPost" class="edit-post-container">
      <form @click.stop @submit.prevent="editPost" class="edit-post-form">
        <h3 class="edit-form-header">Post id: {{ post.id }}</h3>
        <label for="title">Title:</label>
        <input type="text" v-model="title" id="title" class="edit-form-title" />
        <label for="body">Body:</label>
        <textarea
          cols="30"
          rows="10"
          v-model="body"
          id="body"
          class="edit-form-body"
        ></textarea>
        <button type="submit" class="submit-form-btn">Submit</button>
      </form>
      <div class="post-comments-block" @click.stop>
        <div
          class="post-comments-heading"
          @click="showComments = !showComments"
        >
          <h2
            class="post-comments-header"
            :class="showComments ? 'show-comments' : ''"
          >
            Comments
          </h2>
          <div
            class="arrow-8"
            :class="showComments ? 'show-comments' : ''"
          ></div>
        </div>

        <Transition>
          <div v-if="showComments">
            <CommentCard
              v-for="comment in comments"
              :key="comment.id"
              :comment="comment"
              class="post-comment-container"
            />
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Comment, Post } from "@/types";
import { defineProps, ref, onMounted } from "vue";
import store from "@/store";
import { EDIT_POST } from "@/store/mutationTypes";
import CommentCard from "./CommentCard.vue";
import router from "@/router";

const props = defineProps<{ post: Post }>();
const title = ref(props.post.title);
const body = ref(props.post.body);
const switchEditPost = ref(false);
const comments = ref(new Array<Comment>());
const showComments = ref(false);

const editPost = () => {
  store.commit(EDIT_POST, {
    id: props.post.id,
    title: title.value,
    body: body.value,
  });
};

onMounted(() => {
  comments.value = store.getters.getCommentsByPostId(props.post.id);
});
</script>

<style scoped>
.user-post-container {
  box-shadow: 5px 5px 3px 5px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  padding: 10px;
  cursor: pointer;
  text-align: left;
}

.edit-form-header {
  margin: 5px 10px;
}

.user-post-item {
  text-align: left;
  margin-bottom: 5px;
}

.user-post-item-label {
  font-weight: bold;
  font-size: 1.2em;
}

.user-post-item-info {
  color: dimgray;
}

.show-edit-form-btn {
  margin: 10px;
  cursor: pointer;
  padding: 10px 20px;
  background-color: cadetblue;
  border: none;
  border-radius: 3px;
  font-size: 1.2em;
}

.edit-post-form {
  display: flex;
  flex-direction: column;
  background-color: lavenderblush;
  padding: 20px;
  cursor: auto;
}

.edit-form-title {
  margin-bottom: 5px;
}

.edit-form-body {
  margin-bottom: 5px;
}

.submit-form-btn {
  padding: 10px 20px;
  cursor: pointer;
  padding: 10px 20px;
  background-color: cadetblue;
  border: none;
  border-radius: 3px;
  max-width: 100px;
  font-size: 1.2em;
}

.post-comments-block {
  cursor: auto;
}

.post-comments-heading {
  cursor: pointer;
}

.post-comments-header {
  text-align: left;
  padding: 0 30px;
  transform: translateX(40%);
  transition: transform 0.3s ease-out;
  margin: 10px auto 5px;
}

.post-comments-header.show-comments {
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

.arrow-8.show-comments {
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

.arrow-8.show-comments:before,
.arrow-8.show-comments:after {
  animation: arrow-8-up 3s linear infinite;
}
.arrow-8.show-comments:after {
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
