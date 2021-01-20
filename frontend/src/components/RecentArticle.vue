<template>
  <div class="recent-article">
    <section class="container">
      <div class="row">
        <h2 class="text-left p-3">Recent Posts</h2>
      </div>
      <div class="row">
        <div class="col-12 col-md-6 col-xl-3">
          <section class="card shadow bg-dark text-white border-light">
            <img
              src="../assets/1.jpg"
              alt="Card image"
              style="max-width: 18rem;"
            />
            <div class="card-img-overlay">
              <h3 class="card-title">
                Title and that's it.
              </h3>
              <p class="card-text">Some example text.</p>
            </div>
          </section>
        </div>
        <div class="col-12 col-md-6 col-xl-3">
          <section class="card shadow bg-dark text-white border-light">
            <img
              src="../assets/2.jpg"
              alt="Card image"
              style="max-width: 18rem;"
            />
            <div class="card-img-overlay">
              <h3 class="card-title">
                Title and that's it.
              </h3>
              <p class="card-text">Some example text.</p>
            </div>
          </section>
        </div>
        <div class="col-12 col-md-6 col-xl-3">
          <section class="card shadow bg-dark text-white border-light">
            <img
              src="../assets/3.jpg"
              alt="Card image"
              style="max-width: 18rem;"
            />
            <div class="card-img-overlay">
              <h3 class="card-title">
                Title and that's it.
              </h3>
              <p class="card-text">Some example text.</p>
            </div>
          </section>
        </div>
        <div class="col-12 col-md-6 col-xl-3">
          <section class="card shadow bg-dark text-white border-light">
            <img
              src="../assets/4.jpg"
              alt="Card image"
              style="max-width: 18rem;"
            />
            <div class="card-img-overlay">
              <h3 class="card-title">
                Title and that's it.
              </h3>
              <p class="card-text">Some example text.</p>
            </div>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "RecentArticle",
  data() {
    return {
      articles: {
      },
    };
  },
  mounted() {

    const myKey = sessionStorage.getItem('key');
    
    fetch("http://localhost:3000/api/article", {
      method: "GET",
      credentials: 'same-origin',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: myKey,
      },
    })
      .then((data) => {
        this.articles = data.json();
        console.log(this.articles);
      })
      .catch(()=>{console.log("Cannot fetch any article!")});
  },
  
};
</script>

<style scoped>
section {
  overflow: hidden;
}
section > img {
  opacity: 0.2;
}

section.card {
  max-width: 18rem;
  max-height: 10rem;
}
</style>
