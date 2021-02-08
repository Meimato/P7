<template>
  <section class="container d-flex flex-column justify-content-md-center">
    <div class="row">
      <div class="col-12 col-md-5 offset-md-1 my-5">
        <h1 class="font-weight-bold">Groupomania</h1>
        <h2 class="lead">Partagez et restez en contact avec votre equipe.</h2>
      </div>
      <div class="col-12 col-md-4 offset-md-1 card rounded-corners shadow">
        <form class="form-group">
          <input
            type="email"
            name="user-mail"
            id="user-mail"
            placeholder="E-mail"
            class="form-control col rounded-corners my-3 py-3"
            required
          />
          <input
            type="password"
            name="user-password"
            id="user-password"
            class="form-control col rounded-corners mb-3 py-3"
            placeholder="Mot de passe"
            required
          />

          <button
            type="submit"
            @click="login"
            id="btn-login"
            value="login"
            class="btn btn-primary btn-block rounded-corners text-white p-2"
          >
            Connexion
          </button>
          <hr />
          <router-link to="/api/auth/signup"
            ><button
              type="button"
              id="btn-signup"
              class="btn btn-success btn-block rounded-corners text-white p-2"
            >
              Créer un compte
            </button></router-link
          >
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Login",
  created() {
    if (this.$store.state.getLogged === true) {
      this.$route.push("/");
    }
  },
  methods: {
    async login(event) {
      event.preventDefault();
      const myForm = document.querySelector("form");
      const myUserMail = myForm["user-mail"].value;
      const myUserPassword = myForm["user-password"].value;

      if (myUserMail !== "" && myUserPassword !== "") {
        const myUserLogin = {
          email: myUserMail,
          password: myUserPassword,
        };

        const data = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          credentials: "same-origin",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(myUserLogin),
        });
        console.log(data);
        if (data.status === 401 || data.status === 404 || data.status === 500) {
          alert("Cet utilisateur n'existe pas ou le mot de passe est erroné");
          this.$router.go();
        } else {
          data
            .json()
            .then((result) => {
              console.log("I'M HERE!")
              this.$store.commit("SET_USERNAME", result.username);
              delete result.username;
              this.$store.commit("SET_USER_EMAIL", result.email);
              delete result.email;
              this.$store.commit("SET_USERID", result.userId);
              this.$store.commit("SET_TOKEN", result.token);
              this.$store.commit("SET_LOGGED", true);

              if (result.roles[0] === "ROLE_MODERATOR") {
                this.$store.commit("SET_ADMIN", true);
              }
            })
            .then(this.$router.push("/").catch(() => {}))
            .catch(() => {
              alert(
                "Cet utilisateur n'existe pas ou le mot de passe est erroné"
              );
            });
        }
      } else {
        alert("Remplissez chaque champ s'il vous plait");
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

a {
  text-decoration: none;
}
</style>
