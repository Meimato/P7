<template>
  <div class="recent-article">
    <section class="container">
      <div class="row">
        <h2 class="text-left p-3">Recent Posts</h2>
      </div>
      <ul id="articles-list" class="row d-flex flex-column p-0">
        <li class="col card border-light shadow text-left px-3 pt-3">
          <h2>Title</h2>
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
              const myCardLink = document.createElement("router-link");
              const targetLink = "/api/article/" + el.id;
              myCardLink.setAttribute("to", targetLink);
              myCardLink.setAttribute("tag", "div");

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

              const myTitle = document.createElement("h2");
              myTitle.innerHTML = el.title;

              const myDescription = document.createElement("p");
              myDescription.classList.add("lead");
              myDescription.textContent = el.description;

              // if el.image not null
              const myImage = document.createElement("img");
              myImage.setAttribute("src", "https://via.placeholder.com/700x500.png")

              myList.appendChild(myListItem);
              myListItem.appendChild(myCardLink);
              myCardLink.appendChild(myTitle);
              myCardLink.appendChild(myDescription);
              myCardLink.appendChild(myImage);

            });
          })
          .catch(() => {
            console.log("An error as occured during articles creation.");
          });
      })
      .catch(() => {
        console.log("Cannot fetch any article!");
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
