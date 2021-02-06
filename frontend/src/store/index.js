import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    username: "",
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
  actions: {},
  modules: {},
});

export default store;