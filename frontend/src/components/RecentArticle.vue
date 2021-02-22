<template>
  <div class="recent-article">
    <section class="container">
      <div class="row align-items-center">
        <div class="col-12 col-md-6">
          <h1 class="text-left p-3">Publications Récentes</h1>
        </div>
        <div class="col-12 col-md-6">
          <form>
            <div class="form-group row align-items-center pt-3">
              <div class="col-12 col-md-9">
                <label for="title" class="sr-only"
                  >Recherche par titre</label
                >
                <input
                  type="text"
                  name="title"
                  id="title"
                  class="form-control"
                  placeholder="Recherche par titre"
                  v-model="searchByTitle"
                />
              </div>
              <div class="col-12 col-md-3">
                <button
                  type="submit"
                  class="btn btn-link"
                  @click.prevent="searchArticles"
                >
                  Chercher un article
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ul
        id="articles-list"
        class="row d-flex flex-column-reverse p-0 m-0"
      ></ul>
    </section>
  </div>
</template>

<script>
export default {
  name: "RecentArticle",
  data() {
    return {
      searchByTitle: "",
    };
  },
  mounted() {
    this.fetchArticles();
  },
  methods: {
    fetchArticles() {
      let myInfo = {
        token: this.$store.state.token,
        userId: this.$store.state.userId,
      };

      fetch("http://localhost:3000/api/article", {
        method: "GET",
        credentials: "same-origin",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: JSON.stringify(myInfo),
        },
      })
        .then((data) => {
          data
            .json()
            .then((result) => {
              result.forEach((el) => {
                const myList = document.getElementById("articles-list");

                const myListItem = document.createElement("li");
                const myCardLink = document.createElement("article");
                const targetLink = "./#/article/" + el.id;

                myCardLink.addEventListener("click", function() {
                  window.location.href = targetLink;
                });

                myCardLink.classList.add(
                  "col",
                  "card",
                  "border-light",
                  "shadow",
                  "text-left",
                  "p-3",
                  "mb-5",
                  "btn",
                  "btn-outline-dark"
                );

                myCardLink.style.width = "100%";

                const myTitle = document.createElement("h2");
                myTitle.innerHTML = el.title;

                myList.appendChild(myListItem);
                myListItem.appendChild(myCardLink);
                myCardLink.appendChild(myTitle);
              });
            })
            .catch(() => {
              alert("An error as occured during articles creation.");
            });
        })
        .catch(() => {
          alert("Cannot fetch any article!");
        });
    },
    searchArticles() {
      this.$router.push({ path: "/search" , query: { title: this.searchByTitle} })
    },
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
