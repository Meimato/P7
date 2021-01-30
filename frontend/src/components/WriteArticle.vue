<template>
  <div class="container">
    <div class="row">
      <div class="col-6 mx-auto p-5 text-left">
        <form id="write-article" class="write-article">
          <div class="form-group">
            <label for="article-title">Titre:</label>
            <input
              type="text"
              id="article-title"
              name="title"
              class="form-control"
              placeholder="Commencez par fournir un titre"
              required
            />
          </div>
          <div class="form-group">
            <label for="article-description">Description:</label>
            <textarea
              name="description"
              id="article-description"
              class="form-control"
              placeholder="Ici, vous pouvez écrire votre article et..."
              required
            />
          </div>
          <div class="form-group">
            <label for="article-image">Partagez une image</label>
            <input
              type="file"
              name="image"
              id="image"
              class="form-control-file"
            />
          </div>
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

        let myFormData = new FormData(document.getElementById("write-article"));
        myFormData.append("userId", myParsedKey.userId);
        fetch("http://localhost:3000/api/article/write", {
          method: "POST",
          credentials: "same-origin",
          headers: {
            Accept: "application/json",
            Authorization: myKey,
          },
          body: myFormData
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
