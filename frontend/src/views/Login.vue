<template>
  <div class="login">
    <UserLogin></UserLogin>
  </div>
</template>

<script>
import UserLogin from "../components/UserLogin.vue";

export default {
  name: "Login",
  components: {
    UserLogin,
  },
};
</script>
