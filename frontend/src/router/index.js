import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Main from "../views/Main.vue";
import CreateArticle from "../views/CreateArticle.vue";
import ArticleDetails from "../views/ArticleDetails.vue";

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
    path: "/write",
    name: "WriteArticle",
    component: CreateArticle,
    meta: {
      requiresAuth: true,
    },
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
