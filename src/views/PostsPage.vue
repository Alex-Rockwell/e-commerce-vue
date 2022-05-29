<template>
  <div >
    <h1>PostsPage.vue</h1>
    <PostItem 
      v-for="item in posts" 
      :key="item.id"
      :item="item"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import PostItem from "../components/PostItem.vue";

const posts = ref([
  { id: 1, title: "Lorem ipsum 1", body: "Описание поста" },
  { id: 2, title: "Lorem ipsum 2", body: "Описание поста 2" },
  { id: 3, title: "Lorem ipsum 3", body: "Описание поста 3" },
]);

</script>

<style lang="scss" scoped></style>
