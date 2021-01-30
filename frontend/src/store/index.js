import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: 0,
    token: "",
    isLogged: false,
    isAdmin: false,
  },
  getters: {
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
  },
  mutations: {
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
  },
  actions: {},
  modules: {},
});
