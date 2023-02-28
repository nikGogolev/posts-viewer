<template>
  <div class="comment-container">
    <div class="comment-item">
      <span class="comment-item-label">Email: </span
      ><span class="comment-item-info">{{ props.comment.email }}</span>
    </div>
    <div class="comment-item">
      <span class="comment-item-label">Name: </span
      ><span class="comment-item-info">{{ props.comment.name }}</span>
    </div>
    <div class="comment-item">
      <span class="comment-item-label">Body: </span>
      <p class="comment-item-body">{{ props.comment.body }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { Comment } from "@/types";

const props = defineProps<{ comment: Comment }>();
</script>

<style scoped>
.comment-container {
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 15px;
}

.comment-item {
  margin-bottom: 10px;
}

.comment-item-label {
  font-weight: bold;
}

.comment-item-info {
  color: dimgray;
}

.comment-item-body {
  margin: 0;
  color: cornflowerblue;
}
</style>
