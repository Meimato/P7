import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Main from "../views/Main.vue";
import CreateArticle from "../views/CreateArticle.vue";
import ArticleDetails from "../views/ArticleDetails.vue";
import UserDetails from "../views/UserDetails.vue";
import SearchDetails from "../views/SearchDetails.vue";
import Store from "../store/index.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "UserLogin",
    component: Login,
  },
  {
    path: "/signup",
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
    path: "/profile",
    name: "Profile",
    component: UserDetails,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/write",
    name: "WriteArticle",
    component: CreateArticle,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/search",
    name: "SearchDetails",
    component: SearchDetails,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/article/:id",
    name: "ArticleDetails",
    component: ArticleDetails,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeResolve((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (Store.state.token == "") {
      next({
        name: 'UserLogin'
      });
    }
  }
  next();
});

export default router;
