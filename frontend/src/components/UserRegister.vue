<template>
  <section
    class="container d-flex flex-column align-items-center justify-content-center my-5"
  >
    <div class="row">
      <div class="col col-md-6 mx-auto">
        <div class="row card rounded-corners shadow mt-5">
          <form class="p-4">
            <section class="top border-bottom">
              <h1 class="card-title">S'inscrire</h1>
              <h2 class="card-text lead pb-4">C’est rapide et facile.</h2>
            </section>
            <section class="bottom">
              <input
                type="text"
                name="user-name"
                id="user-name"
                placeholder="Nom utilisateur"
                class="form-control col rounded-corners my-3"
                required
              />
              <input
                type="email"
                name="user-email"
                id="user-email"
                placeholder="E-mail"
                class="form-control col rounded-corners my-3"
                required
              />
              <input
                type="password"
                name="user-password"
                id="user-password"
                class="form-control col rounded-corners mb-3"
                placeholder="Nouveau mot de passe"
                required
              />
              <p class="small">
                En cliquant sur S’inscrire, vous acceptez nos Conditions
                générales. Vous recevrez peut-être des notifications par texto
                de notre part et vous pouvez à tout moment vous désabonner.
              </p>
              <button
                type="submit"
                @click="signup"
                id="btn-signup"
                class="btn btn-success btn-block rounded-corners text-white"
              >
                S'inscrire
              </button>
            </section>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "UserRegister",
  methods: {
    signup(event) {
      event.preventDefault();
      const myForm = document.querySelector("form");
      const myUserName = myForm["user-name"].value;
      const myUserEmail = myForm["user-email"].value;
      const myUserPassword = myForm["user-password"].value;

      if (myUserName !== "" && myUserEmail !== "" && myUserPassword !== "") {
        const myUserSignup = {
          username: myUserName,
          email: myUserEmail,
          password: myUserPassword,
        };

        fetch("http://localhost:3000/api/auth/signup", {
          method: "POST",
          credentials: 'same-origin',
          headers: {
            accept: "application/json",
            "content-type": "application/json",
          },
          body: JSON.stringify(myUserSignup),
        })
          .then((data) => {
            if (data.status === 401) {
              this.$router.go();
            } else {
              data
                .json()
                .then()
                .catch(()=>{alert("Cannot create the user!")});

                this.$router.push("login");
            }
          })
          .catch(()=>{alert("Fetch error!")});
      } else {
        alert("Please, fill each field!");
      }
    },
  },
};
</script>

<style scoped>
.container {
  height: 70vh;
  background-color: #f0f2f5;
}

h1 {
  color: #fd2d01;
}

.rounded-corners {
  border-radius: 0.5rem;
}

#user-mail,
#user-password {
  border: 1px solid #c4c4c4;
}

#user-mail:hover,
#user-password:hover {
  border: 1px solid #1877f2;
}
</style>
