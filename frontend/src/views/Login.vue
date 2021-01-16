<template>
  <div class="login">
    <Navbar></Navbar>
    <UserLogin></UserLogin>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import UserLogin from '../components/UserLogin.vue'

export default {
  name: 'Login',
  components: {
    UserLogin,
    Navbar
  }
}
</script>
