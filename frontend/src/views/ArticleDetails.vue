<template>
  <div class="article-details">
    <Navbar></Navbar>
    <ReadArticle></ReadArticle>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import ReadArticle from "../components/ReadArticle.vue";

export default {
  name: "ArticleDetails",
  components: {
    Navbar,
    ReadArticle,
  },
};
</script>
