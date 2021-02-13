<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white">
    <div class="navbar-brand font-weight-bold d-flex align-items-center">
      <img
        src="../assets/icon.svg"
        class="primary-text"
        width="50rem"
        alt="Groupomania logo"
      />
      <router-link to="/" tag="span">Groupomania</router-link>
    </div>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarContent"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div
      id="navbarContent"
      class="collapse navbar-collapse justify-content-end"
    >
      <ul class="navbar-nav">
        <li v-if="!(this.$store.state.isLogged)" class="nav-item">
          <span class="nav-link"
            ><router-link to="/signup" tag="span">Signup</router-link></span
          >
        </li>
        <li v-if="!(this.$store.state.isLogged)"  class="nav-item">
          <span class="nav-link"
            ><router-link to="/login" tag="span">Login</router-link></span
          >
        </li>
        <li v-if="(this.$store.state.isLogged)" class="nav-item">
          <span class="nav-link"
            ><router-link to="/write" tag="span">Write</router-link></span
          >
        </li>
        <li v-if="(this.$store.state.isLogged)" class="nav-item">
          <span class="nav-link">
            <router-link to="/profile" tag="span">Profile</router-link>
          </span>
        </li>
        <li v-if="(this.$store.state.isLogged)" class="nav-item">
          <span @click="userLogout" class="nav-link logout">
            Deconnexion
          </span>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import store from "../store/index.js";

export default {
  name: "Navbar",
  methods: {
    userLogout(){
      store.dispatch("logout");
    }
  }
};
</script>

<style scoped>
nav {
  border-bottom: 0.2rem solid #FFD7D7;
}

.navbar-brand,
.navbar-brand:visited,
.nav-item span:hover  {
  color: #fd2d01;
}

.nav-item span,
.navbar-brand:hover {
  color: #06b15c;
}

.navbar-brand span {
  text-decoration: none;
}

.nav-link, .navbar-brand {
  cursor: pointer;
}

</style>
