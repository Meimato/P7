import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Main from "../views/Main.vue";
import CreateArticle from "../views/CreateArticle.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/api/auth/login",
    name: "UserLogin",
    component: Login,
  },
  {
    path: "/api/auth/signup",
    name: "UserSignup",
    component: Signup,
  },
  {
    path: "/",
    name: "MainPage",
    component: Main,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/api/article/write",
    name: "WriteArticle",
    component: CreateArticle,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (sessionStorage.getItem("key") == null) {
      console.log('NO KEY FOUND')
      next({
        name: 'UserLogin'
      });
    }
  }
  next();
});

export default router;
