<template>
  <div class="article-details">
    <ReadArticle></ReadArticle>
  </div>
</template>

<script>
import ReadArticle from "../components/ReadArticle.vue";

export default {
  name: "ArticleDetails",
  components: {
    ReadArticle,
  },
};
</script>
