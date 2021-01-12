<template>
  <div class="main">
    <Navbar></Navbar>
    <RecentArticle></RecentArticle>
    <Popular-article></Popular-article>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import RecentArticle from "../components/RecentArticle.vue";
import PopularArticle from "../components/PopularArticle.vue";

export default {
  name: "Main",
  components: {
    Navbar,
    RecentArticle,
    PopularArticle,
  },
};
</script>

<style scoped></style>
