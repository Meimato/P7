<template>
  <div class="home">
    <Navbar></Navbar>
    <Login></Login>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Login from '../components/Login.vue'

export default {
  name: 'Home',
  components: {
    Login,
    Navbar
  }
}
</script>
