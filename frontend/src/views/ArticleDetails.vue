<template>
  <div class="article-details">
    <ReadArticle></ReadArticle>
    <Comments></Comments>
  </div>
</template>

<script>
import ReadArticle from "../components/ReadArticle.vue";
import Comments from "../components/Comments.vue";

export default {
  name: "ArticleDetails",
  components: {
    ReadArticle,
    Comments
  },
};
</script>
