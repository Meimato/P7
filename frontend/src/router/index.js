import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/api/auth/login',
    name: 'Home',
    component: Home
  },
  {
    path: '/api/auth/signup',
    name: 'Signup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Signup
  },
  {
    path: '/',
    name: 'Main',
    component: Main
  }
]

const router = new VueRouter({
  routes
})

export default router
