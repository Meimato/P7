<template>
  <div class="read-article" onload="getDetails()">
    <section class="container">
      <ul id="articles-list" class="row d-flex flex-column p-0">
        <li class="col card border-light shadow text-left px-3 pt-3">
          <div class="row">
            <h2 class="text-left p-3">Title</h2>
          </div>
          <p>{{ article.title }}</p>
          <p>
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
  name: "ReadArticle",
  data() {
    return {
      article: {
        title: '',
        description: '',
        author: ''
      }
    };
  },
  created() {
    const myKey = sessionStorage.getItem("key");
    fetch("http://localhost:3000/api/article/" + this.$route.params.id, {
      method: "GET",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: myKey,
      },
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        console.log(json)
        this.article.title = json.title;
      })
      .catch(function(err) {
        console.log(err);
      });
  },
};
</script>

<style scoped>
ul#articles-list {
  list-style-type: none;
}

.fa {
  background-color: black;
  background-clip: text;
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
