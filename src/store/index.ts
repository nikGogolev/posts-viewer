import { User, Post, Comment, EditPostPayload } from "@/types";
import { createStore } from "vuex";
import { LOAD_DATA } from "./actionTypes";
import {
  EDIT_POST,
  SET_COMMENTS,
  SET_LOADED_TRUE,
  SET_POSTS,
  SET_USERS,
} from "./mutationTypes";

export default createStore({
  state: {
    users: new Array<User>(),
    posts: new Array<Post>(),
    comments: new Array<Comment>(),
    loaded: false,
  },
  getters: {
    getUsers: (state) => state.users,
    getPosts: (state) => state.posts,
    getComments: (state) => state.comments,
    getUserById: (state) => (id: number) =>
      state.users.find((item) => item.id === id),
    getPostById: (state) => (id: number) =>
      state.posts.find((item) => item.id === id),
    getCommentById: (state) => (id: number) =>
      state.comments.find((item) => item.id === id),
    getPostsByUserId: (state) => (userId: number) =>
      state.posts.filter((item) => item.userId === userId),
    getCommentsByPostId: (state) => (postId: number) =>
      state.comments.filter((item) => item.postId === postId),
    getLoadedState: (state) => state.loaded,
  },
  mutations: {
    [SET_USERS](state, payload: User[]) {
      state.users = payload;
    },
    [SET_POSTS](state, payload: Post[]) {
      state.posts = payload;
    },
    [SET_COMMENTS](state, payload: Comment[]) {
      state.comments = payload;
    },
    [EDIT_POST](state, payload: EditPostPayload) {
      const editIndex = state.posts.findIndex((item) => item.id === payload.id);
      state.posts[editIndex].title = payload.title;
      state.posts[editIndex].body = payload.body;
    },
    [SET_LOADED_TRUE](state) {
      state.loaded = true;
    },
  },
  actions: {
    async [LOAD_DATA](state) {
      try {
        const usersResponse = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const usersData = await usersResponse.json();
        state.commit(SET_USERS, usersData);

        const postsResponse = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const postsData = await postsResponse.json();
        state.commit(SET_POSTS, postsData);

        const commentsResponse = await fetch(
          "https://jsonplaceholder.typicode.com/comments"
        );
        const commentsData = await commentsResponse.json();
        state.commit(SET_COMMENTS, commentsData);
        state.commit(SET_LOADED_TRUE);
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: {},
});
