import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    openedFile: localStorage.getItem('openedFile'),
    sessionId: "30230bf96a884830a0b96805cf173717"
  },
  mutations: {
    changeOpenedFile(state, filePath) {
      this.openedFile = filePath;
      localStorage.setItem('openedFile', filePath);
    },
    changeSessionId(state, sessionId) {
      this.sessionId = sessionId;
      localStorage.setItem('sessionId', sessionId);
    }
  },
  getters: {
    openedFile: (state) => {
      return state.openedFile;
    },
    sessionId: (state) => {
      if (!sessionId) {
        state.sessionId = localStorage.getItem('sessionId');
      }
      return state.sessionId;
    }

  },
  actions: {}
});
