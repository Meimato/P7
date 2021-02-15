<template>
  <div class="searched-article">
    <section class="container">
      <h2 class="text-left py-5">Résultat de la recherche</h2>
      <ul id="search-list" class="row d-flex flex-column-reverse p-0 m-0"></ul>
    </section>
  </div>
</template>

<script>
export default {
  name: "SearchedArticle",
  data() {
    return {
      searchByTitle: "",
    };
  },
  mounted() {
    this.searchByTitle = window.location.href.split("/search?title=")[1];
    let myInfo = {
      token: this.$store.state.token,
      userId: this.$store.state.userId,
    };
    let myList = document.getElementById("search-list");
    while (myList.hasChildNodes()) {
      myList.removeChild(myList.firstChild);
    }
    fetch("http://localhost:3000/api/article/?title=" + this.searchByTitle, {
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
          .then(function(result) {
            result.forEach((el) => {
              const myList = document.getElementById("search-list");

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
  methods: {
    searchArticles() {
      this.$router.push({
        path: "/search",
        query: { title: this.searchByTitle },
      });
    },
  },
};
</script>

<style scoped>
ul#search-list {
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
