<template>
  <div class="search-details">
    <SearchedArticle></SearchedArticle>
  </div>
</template>

<script>
import SearchedArticle from "../components/SearchedArticle.vue";

export default {
  name: "SearchDetails",
  components: {
    SearchedArticle,
  },
};
</script>
