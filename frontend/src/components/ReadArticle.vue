<template>
  <div class="read-article">
    <article class="container">
      <div id="articles-list" class="row d-flex flex-column p-0">
        <div class="col card border-light shadow text-left px-3 pt-3">
          <div class="row align-items-center">
            <div class="col-9">
              <h2 id="title" class="text-left p-3"></h2>
            </div>
            <div class="col-2">
              <div class="d-flex flex-row justify-content-start">
                <div class="col">
                  <i class="fa fa-edit fa-2x" @click="edit"></i>
                </div>
                <div class="col">
                  <i class="fa fa-trash fa-2x" @click="trash"></i>
                </div>
              </div>
            </div>
          </div>
          <p id="description"></p>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
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

            if (result.image) {
              const myImage = document.createElement("img");
              myImage.setAttribute("src", result.image);
              myImage.classList.add("img-fluid");
              myDescription.after(myImage);
            }
          })
          .catch();
      })
      .catch(function(err) {
        console.log(err);
      });
  },
  methods: {
    edit() {
      const myKey = sessionStorage.getItem("key");
      fetch("http://localhost:3000/api/article/" + this.$route.params.id, {
        method: "PUT",
        credentials: "same-origin",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: myKey,
        },
      })
        .then()
        .catch();
      alert("Pushed EDIT");
    },
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
          window.location.href = window.location.hostname;
        })
        .catch();
      alert("Pushed TRASH");
    },
  },
};
</script>

<style scoped></style>
