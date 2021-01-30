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
         <!-- v-if="!(this.$store.getters.getLogged)" -->
        <li class="nav-item">
          <span class="nav-link"
            ><router-link to="/api/auth/signup">Signup</router-link></span
          >
        </li>
        <li class="nav-item">
          <span class="nav-link"
            ><router-link to="/api/auth/login">Login</router-link></span
          >
        </li>
        <li class="nav-item">
          <span class="nav-link"
            ><router-link to="/api/article/write">Write</router-link></span
          >
        </li>
        <li class="nav-item">
          <span class="nav-link">
            <router-link to="/api/auth/profile">Profile</router-link>
          </span>
        </li>
        <li class="nav-item">
          <span class="nav-link">
            <router-link to="/api/auth/logout">Disconnect</router-link>
          </span>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
.navbar-brand,
.navbar-brand:visited {
  color: #fd2d01;
}
.navbar-brand span {
  text-decoration: none;
}

.navbar-brand:hover {
  cursor: pointer;
  color: #166fe5;
}
</style>
