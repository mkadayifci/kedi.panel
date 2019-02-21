import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentSession: null,
    lastLocation: ""
  },
  mutations: {
    lastLocation(state, lastLocation) {
      state.lastLocation = lastLocation;
      localStorage.setItem("lastLocation", lastLocation);
    },
    currentSession(state, currentSession) {
      state.currentSession = currentSession;
      if (!state.currentSession) {
        localStorage.removeItem("currentSession");
      } else {

        localStorage.setItem(
          "currentSession",
          JSON.stringify({
            filePath: currentSession.filePath,
            sessionId: currentSession.sessionId
          })
        );
      }
    }
  },
  getters: {
    currentSession: function (state) {
      if (!state.currentSession) {
        state.currentSession = JSON.parse(localStorage.getItem("currentSession"));
      }
      return state.currentSession;
    },
    lastLocation: function (state) {
      if (!state.lastLocation) {
        state.lastLocation = localStorage.getItem("lastLocation");
      }
      return state.lastLocation;
    }
  },
  actions: {}
});
