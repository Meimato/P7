<template>
  <div class="recent-article">
    <section class="container">
      <div class="row">
        <h2 class="text-left p-3">Recent Posts</h2>
      </div>
      <ul class="row p-0">
        <li class="col card border-light shadow text-left px-3 pt-3">
          <h2>Title</h2>
          <p class="small">Author</p>
          <p class="lead">
            Sample text to simulate the description of this article.
          </p>
          <img src="https://via.placeholder.com/700x500.png" />
          <div class="row">
            <div class="col">
              <button type="button" class="btn">
                <i class="fa fa-thumbs-up"> Like</i>
              </button>
              <span>TOTAL</span>
              <button type="button" class="btn">
                <i class="fa fa-thumbs-down"> Dislike</i>
              </button>
            </div>
            <div class="col text-right">
              <button type="button" class="btn">
                <i class="fa fa-edit"> Modify</i>
              </button>
              <button type="button" class="btn">
                <i class="fa fa-trash"> Delete</i>
              </button>
            </div>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: "RecentArticle",
  data() {
    return {
      articles: {
        id: '',
        title: '',
        author: '',
        description: ''
      },
    };
  },
  created() {
    const myKey = sessionStorage.getItem("key");

    fetch("http://localhost:3000/api/article", {
      method: "GET",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: myKey,
      },
    })
      .then((data) => {
        this.articles = data.json();
        console.log("*********************")
        console.log(this.articles);
        return this.articles;
      })
      .catch(() => {
        console.log("Cannot fetch any article!");
      });
  },
};
</script>

<style scoped>
.fa {
  background-color: black;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.fa-thumbs-up:hover {
  background-color: #166fe5;
}

.fa-thumbs-down:hover,
.fa-trash:hover {
  background-color: #fd2d01;
}

.fa-edit:hover {
  background-color: #145a3a;
}
</style>
