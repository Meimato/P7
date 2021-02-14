<template>
  <section class="container-fluid d-flex flex-column justify-content-md-center">
    <div class="overlay"></div>
    <div class="row">
      <div class="col-12 col-md-5 offset-md-2 my-5 text-left">
        <h1 class="font-weight-bold">Groupomania</h1>
        <h2 class="lead text-white">
          Partagez et restez en contact avec votre equipe.
        </h2>
      </div>
      <div class="col-12 col-md-4 card rounded-corners shadow">
        <form class="form-group">
          <label for="user-mail" class="sr-only">E-mail</label>
          <input
            type="email"
            name="user-mail"
            id="user-mail"
            placeholder="E-mail"
            class="form-control col rounded-corners my-3 p-4"
            required
          />
          <label for="user-password" class="sr-only">Mot de passe</label>
          <input
            type="password"
            name="user-password"
            id="user-password"
            class="form-control col rounded-corners mb-3 p-4"
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
          <router-link to="/signup"
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
import Store from "../store/index.js";

export default {
  name: "Login",
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
        if (data.status === 401 || data.status === 404 || data.status === 500) {
          alert("Cet utilisateur n'existe pas ou le mot de passe est erroné");
          this.$router.go();
        } else {
          data
            .json()
            .then((result) => {
              let adminPerm = false;
              if (result.roles[0] === "ROLE_MODERATOR") {
                adminPerm = true;
              }
              const myInfos = {
                "isAdmin": adminPerm,
                "username": result.username,
                "email": result.email,
                "userid": result.userId,
                "token": result.token,
              };
              Store.dispatch("login", myInfos);
            })
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
.overlay {
  background: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0;
  right: 0;
  z-index: 0;
}

.container-fluid {
  height: 90vh;
  background-color: #f0f2f5;
  opacity: 1;
  position: relative;
  background-image: url("../assets/1.jpg");
  background-size: cover;
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
