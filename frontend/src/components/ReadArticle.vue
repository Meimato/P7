<template>
  <div class="read-article">
    <article class="container">
      <div class="row align-items-center">
        <div class="col">
          <h1 id="title" class="text-left py-3"></h1>
        </div>
        <div v-if="$store.state.isAdmin || $store.state.isOwner" class="col-2 text-right">
          <i class="fa fa-trash fa-2x" @click="trash"></i>
        </div>
      </div>
      <div id="articles-list" class="row d-flex flex-column">
        <div class="col card border-light shadow text-left p-3 mb-5">
          <p id="description"></p>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import store from "../store/index.js"

export default {
  name: "ReadArticle",
  data() {
    return {
      article: {
        title: "",
        description: "",
        author: "",
      },
    };
  },
  created() {
    const myKey = sessionStorage.getItem("key");
    const myUser = this.$store.state.username;
    fetch("http://localhost:3000/api/article/" + this.$route.params.id, {
      method: "GET",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: myKey,
      },
    })
      .then(function(data) {
        data
          .json()
          .then(function(result) {
            const myTitle = document.getElementById("title");
            myTitle.innerHTML = result.title;

            const myDescription = document.getElementById("description");
            myDescription.innerHTML = result.description;

            const myAuthor = document.createElement("p");
            myAuthor.innerHTML = "Écrit par " + result.author.bold();
            myAuthor.classList.add("text-left");
            myTitle.after(myAuthor);

            if (result.author === myUser) {
              store.commit("SET_IS_OWNER", true);
            } else {
              store.commit("SET_IS_OWNER", false);
            }

            if (result.image) {
              const myImage = document.createElement("img");
              myImage.setAttribute("src", result.image);
              myImage.classList.add("img-fluid");
              myDescription.after(myImage);
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      })
      .catch(function(err) {
        console.log(err);
      });
  },
  methods: {
    trash() {
      const myKey = sessionStorage.getItem("key");
      fetch("http://localhost:3000/api/article/" + this.$route.params.id, {
        method: "DELETE",
        credentials: "same-origin",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: myKey,
        },
      })
        .then(() => {
          this.$router.push("/");
        })
        .catch();
      alert("Pushed TRASH");
    },
  },
};
</script>

<style scoped></style>
