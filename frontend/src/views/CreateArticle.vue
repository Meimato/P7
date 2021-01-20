<template>
  <div class="create-article">
    <Navbar></Navbar>
    <WriteArticle></WriteArticle>
  </div>
</template>
<script>
import Navbar from "../components/Navbar.vue";
import WriteArticle from "../components/WriteArticle.vue";

export default {
  name: "CreateArticle",
  components: {
    Navbar,
    WriteArticle,
  },
};
</script>
