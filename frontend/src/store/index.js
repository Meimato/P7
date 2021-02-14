import Vue from "vue";
import Vuex from "vuex";
import router from "../router/index.js";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    username: "",
    email: "",
    userId: 0,
    token: "",
    isLogged: false,
    isAdmin: false,
    isOwner: false,
  },
  getters: {
    getUsername(state) {
      return `${state.username}`
    },
    getUserEmail(state) {
      return `${state.email}`
    },
    getUserId(state) {
      return `${state.userId}`;
    },
    getToken(state) {
      return `${state.token}`;
    },
    getLogged(state) {
      return `${state.isLogged}`;
    },
    getPermissions(state) {
      return `${state.isAdmin}`;
    },
    getIsOwner(state) {
      return `${state.isOwner}`;
    }
  },
  mutations: {
    SET_USERNAME(state, payload) {
      state.username = String(payload);
    },
    SET_USER_EMAIL(state, payload) {
      state.email = String(payload);
    },
    SET_USERID(state, payload) {
      state.userId = Number(payload);
    },
    SET_TOKEN(state, payload) {
      state.token = String(payload);
    },
    SET_LOGGED(state, payload) {
      state.isLogged = Boolean(payload);
    },
    SET_ADMIN(state, payload) {
      state.isAdmin = Boolean(payload);
    },
    SET_IS_OWNER(state, payload) {
      state.isOwner = Boolean(payload);
    }
  },
  actions: {
    login({commit}, info) {
      commit("SET_USERNAME", info.username);
      commit("SET_USER_EMAIL", info.email);
      commit("SET_USERID", info.userid);
      commit("SET_TOKEN", info.token);
      commit("SET_LOGGED", true);
      commit("SET_ADMIN", info.isAdmin);
      commit("SET_IS_OWNER", false);
      router.push("/");
    },
    logout() {
      this.commit("SET_USERNAME", "");
      this.commit("SET_USER_EMAIL", "");
      this.commit("SET_USERID", 0);
      this.commit("SET_TOKEN", "");
      this.commit("SET_LOGGED", false);
      this.commit("SET_ADMIN", false);
      this.commit("SET_IS_OWNER", false);
      router.push("/login");
    }
  },
  modules: {},
});

export default store;