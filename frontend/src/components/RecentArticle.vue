<template>
  <div class="recent-article">
    <section class="container">
      <div class="row">
        <h2 class="text-left p-3">Publications Récentes</h2>
      </div>
      <ul id="articles-list" class="row d-flex flex-column-reverse"></ul>
    </section>
  </div>
</template>

<script>
export default {
  name: "RecentArticle",
  mounted() {
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
        data
          .json()
          .then(function(result) {
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

              const myDescription = document.createElement("p");
              myDescription.classList.add("lead");
              myDescription.textContent = el.description;

              myList.appendChild(myListItem);
              myListItem.appendChild(myCardLink);
              myCardLink.appendChild(myTitle);
              myCardLink.appendChild(myDescription);
              if (el.image !== null) {
                const myImage = document.createElement("img");
                myImage.setAttribute("src", el.image);
                myImage.classList.add("card-img-bottom", "img-fluid");
                myCardLink.appendChild(myImage);
              }
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
