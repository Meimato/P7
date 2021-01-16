<template>
  <div class="Signup">
    <Navbar></Navbar>
    <UserRegister></UserRegister>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import UserRegister from '../components/UserRegister.vue'

export default {
  name: 'Signup',
  components: {
    Navbar,
    UserRegister
  }
}
</script>