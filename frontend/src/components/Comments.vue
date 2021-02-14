<template>
  <div class="comments">
    <div class="container mb-4">
      <div class="row">
        <div class="col">
          <form id="write-comment">
            <div class="form-group">
              <label for="comment" class="sr-only">Ecrivez un commentaire</label>
              <textarea
                v-model="userComment"
                name="textComment"
                id="textComment"
                class="form-control row-3"
                placeholder="Ecrivez un commentaire"
                required
              />
            </div>
            <button type="submit" @click.prevent="sendComment()" class="btn btn-light">
              Commenter
            </button>
          </form>
        </div>
      </div>
    </div>
    <div id="comment-panel" class="container card border-light shadow text-left px-3 pt-3 pb-0 mb-5">
      <div class="row">
        <ul id="comment-section" class="col m-0"></ul>
      </div>
    </div>
  </div>
</template>

<script>
import Router from "../router/index.js";

export default {
  name: "Comments",
  data() {
    return {
      userComment: "",
    };
  },
  created() {
    this.fetchComments();
  },
  methods: {
    fetchComments() {
      let myInfo = {
        token: this.$store.state.token,
        userId: this.$store.state.userId,
      };

      function trash(commentId) {
        fetch("http://localhost:3000/api/comment/delete/" + commentId, {
          method: "DELETE",
          credentials: "same-origin",
          headers: {
            Accept: "application/json",
            Authorization: JSON.stringify(myInfo),
          },
          body: JSON.stringify(commentId)
        })
        .then(() => {
          alert("Pushed TRASH");
          Router.push("/");
        })
        .catch();
      }

      fetch("http://localhost:3000/api/comment/read/" + this.$route.params.id, {
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
              if (result.length === 0) {
                const myCommentPanel = document.getElementById("comment-panel");
                myCommentPanel.remove();
              } else {
              result.forEach((el) => {
                const myList = document.getElementById("comment-section");

                const myListItem = document.createElement("li");

                myListItem.classList.add(
                  "col",
                  "card",
                  "border-light",
                  "shadow",
                  "text-left",
                  "p-1",
                  "mb-4",
                );

                myListItem.style.width = "100%";

                const myDescription = document.createElement("p");
                myDescription.textContent = el.text;

                const myAuthor = document.createElement("p");
                myAuthor.classList.add("small", "font-weight-bold");

                myAuthor.innerHTML = el.author;

                if (el.author === this.$store.state.username || this.$store.state.isAdmin) {
                  myAuthor.innerHTML = '<i class="fa fa-trash fa-2x btn"></i>' + el.author;
                  myAuthor.addEventListener('click', function(){
                    trash(el.id);
                  });
                } 

                myList.appendChild(myListItem);
                myListItem.appendChild(myAuthor);
                myListItem.appendChild(myDescription);
              });

              }
            })
            .catch(() => {
              alert("An error as occured during comment creation.");
            });
        })
        .catch(() => {
          alert("Cannot fetch any comment!");
        });
    },
    sendComment() {
      const myComment = {
        text: document.getElementById("textComment").value,
        username: this.$store.state.username,
        article: this.$route.params.id,
      };

      let myInfo = {
        token: this.$store.state.token,
        userId: this.$store.state.userId,
      };

      fetch("http://localhost:3000/api/comment/write", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          Accept: "application/json",
          Authorization: JSON.stringify(myInfo),
          "content-type": "application/json",
        },
        body: JSON.stringify(myComment),
      })
        .then(() => {
          this.$router.push("/");
        })
        .catch(() => {
          console.log("Error during comment creation");
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
