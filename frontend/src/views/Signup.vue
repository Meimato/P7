<template>
  <div class="Signup">
    <Navbar></Navbar>
    <Register></Register>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Register from '../components/Register.vue'

export default {
  name: 'Signup',
  components: {
    Navbar,
    Register
  }
}
</script>