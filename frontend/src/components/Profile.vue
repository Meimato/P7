<template>
  <section class="container card text-left my-5 p-3">
    <div class="jumbotron bg-dark text-info">
      <h1>{{ this.$store.getters.getUsername }}</h1>
      <div class="row my-3">
        <div class="col info">
          <strong>Informations de contact</strong>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <strong>Email: </strong>{{ this.$store.getters.getUserEmail }}
        </div>
      </div>
      <div v-if="this.$store.state.isAdmin" class="row">
        <div class="col"><strong>Role: </strong>Moderator</div>
      </div>
      <div v-else class="row">
        <div class="col"><strong>Role: </strong>User</div>
      </div>
      <div class="row">
        <div class="col">
          <strong>UserId: </strong>{{ this.$store.getters.getUserId }}
        </div>
      </div>
    </div>
    <button @click="showPanel" class="btn btn-warning mb-3">
      Supprimer votre compte
    </button>
    <form v-if="!hidden" class="form-group p-5">
      <p>
        Nous sommes désolés d'apprendre que vous souhaitez supprimer votre
        compte.
      </p>
      <p>Entrez le mot de passe pour confirmer l'opération.</p>
      <p class="alert alert-danger">
        ATTENTION : Il ne sera pas possible de récupérer votre compte
        ultérieurement.
      </p>
      <input
        type="password"
        name="myPwd"
        id="myPwd"
        class="form-control rounded-borders mb-3 py-3"
      />
      <button @click="deleteAccount" class="btn btn-danger">Supprimer</button>
    </form>
  </section>
</template>

<script>
import store from "../store/index.js";

export default {
  name: "Profile",
  data() {
    return {
      hidden: true,
    };
  },
  methods: {
    deleteAccount(event) {
      event.preventDefault();
      const myForm = document.querySelector("form");
      const myUserPassword = myForm["myPwd"].value;
      const myUserId = this.$store.getters.getUserId;

      if (myUserPassword !== "") {
        const myUserInformations = {
          myUserId,
          myUserPassword,
        };

        let myInfo = {
          token: this.$store.state.token,
          userId: this.$store.state.userId,
        };

        fetch("http://localhost:3000/api/auth/delete/", {
          method: "DELETE",
          credentials: "same-origin",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: JSON.stringify(myInfo),
          },
          body: JSON.stringify(myUserInformations),
        })
          .then((data) => {
            if (
              data.status === 401 ||
              data.status === 404 ||
              data.status === 500
            ) {
              alert("Le mot de passe est erroné!");
              this.$router.go();
            } else {
              store.dispatch('logout');
            }
          })
          .catch();
      } else {
        alert("Mot de passe vide.");
      }
    },
    showPanel() {
      this.hidden = !this.hidden;
    },
  },
};
</script>

<style scoped>
.info {
  border-bottom: 1px solid #fd2d01;
}

@media (min-width: 768px) {
  .container {
    width: 75%;
  }
}

@media (min-width: 992px) {
  .container {
    width: 50%;
  }
}
</style>
