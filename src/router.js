import Vue from "vue";
import Router from "vue-router";
import Threads from "./views/Threads.vue";
import Summary from "./views/Summary.vue";
import Modules from "./views/Modules.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/summary",
      name: "summaryView",
      component: Summary,
      alias: '/'
    },
    {
      path: "/threads",
      name: "threads",
      component: Threads
    },
    {
      path: "/modules",
      name: "moduleView",
      component: Modules
    }

  ]
});
