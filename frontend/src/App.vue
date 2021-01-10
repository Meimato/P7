<template>
  <div id="app">
    <Navbar></Navbar>
    <Login></Login>
  </div>
</template>

<script>
import Login from './components/Login.vue'
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Login,
    Navbar
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
