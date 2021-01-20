<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <form class="write-article">
          <input
            type="text"
            id="article-title"
            name="article-title"
            class="form-control"
            placeholder="Title"
            required
          />
          <input
            type="textarea"
            name="description"
            id="article-description"
            class="form-control"
            placeholder="Description"
            required
          />
          <button @click="write" type="button" class="btn btn-primary">
            Publier
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WriteArticle",
  methods: {
    write(event) {
      event.preventDefault();
      const myForm = document.querySelector("form");
      const myTitle = myForm["article-title"].value;
      const myDescription = myForm["article-description"].value;

      if (myTitle !== "" && myDescription !== "") {
        const myKey = sessionStorage.getItem("key");
        const myParsedKey = JSON.parse(myKey);

        const myArticle = {
          title: myTitle,
          description: myDescription,
          userId: myParsedKey.userId,
        };

        fetch("http://localhost:3000/api/article/write", {
          method: "POST",
          credentials: "same-origin",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            Authorization: myKey,
          },
          body: JSON.stringify(myArticle),
        })
          .then(() => {
            console.log("Article Created!");
            this.$router.push("/");
          })
          .catch(() => {
            console.log("Error during article creation");
          });
      } else {
        console.log("Please, fill each field!");
      }
    },
  },
};
</script>

<style scoped></style>
