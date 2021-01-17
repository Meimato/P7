<template>
  <div class="create-article">
    <WriteArticle></WriteArticle>
  </div>
</template>
<script>
import WriteArticle from "../components/WriteArticle.vue";

export default {
  name: "CreateArticle",
  components: {
    WriteArticle,
  },
};
</script>
