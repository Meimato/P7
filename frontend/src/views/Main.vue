<template>
  <div class="main">
    <Navbar></Navbar>
    <RecentArticle></RecentArticle>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import RecentArticle from "../components/RecentArticle.vue";

export default {
  name: "Main",
  components: {
    Navbar,
    RecentArticle,
  },
};
</script>

<style scoped></style>
