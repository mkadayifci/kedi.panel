import Vue from "vue";
import Router from "vue-router";
import ThreadsView from "./views/ThreadsView.vue";
import SummaryView from "./views/SummaryView.vue";
import ModulesView from "./views/ModulesView.vue";
import ObjectView from "./views/ObjectView.vue";
import TerminalView from "./views/TerminalView.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/summary",
      name: "summaryView",
      component: SummaryView,
      alias: '/'
    },
    {
      path: "/threads",
      name: "threads",
      component: ThreadsView
    },
    {
      path: "/terminal",
      name: "terminal",
      component: TerminalView
    },
    {
      path: "/object/:objectPointer",
      name: "object",
      component: ObjectView
    },
    {
      path: "/modules",
      name: "moduleView",
      component: ModulesView
    }

  ]
});
