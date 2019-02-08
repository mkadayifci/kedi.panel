import Vue from "vue";
import Router from "vue-router";
import ThreadsView from "./views/ThreadsView.vue";
import SummaryView from "./views/SummaryView.vue";
import ModulesView from "./views/ModulesView.vue";
import ObjectView from "./views/ObjectView.vue";
import TerminalView from "./views/TerminalView.vue";
import MemoryView from "./views/MemoryView.vue";

import ExceptionAnalyzerView from "./views/Analyzers/ExceptionAnalyzerView.vue";
import StackTraceAnalyzerView from "./views/Analyzers/StackTraceAnalyzerView.vue";
import DuplicateStringsAnalyzerView from "./views/Analyzers/DuplicateStringsAnalyzerView.vue";
import ThreadPoolAnalyzerView from "./views/Analyzers/ThreadPoolAnalyzerView.vue";
import LargeObjectsAnalyzerView from "./views/Analyzers/LargeObjectsAnalyzerView.vue";


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
      path: "/threads/:sessionId",
      name: "threads",
      component: ThreadsView
    },
    {
      path: "/memory/:sessionId",
      name: "memory",
      component: MemoryView
    },
    {
      path: "/terminal",
      name: "terminal",
      component: TerminalView
    },
    {
      path: "/object/:sessionId/:objectPointer",
      name: "object",
      component: ObjectView
    },
    {
      path: "/modules",
      name: "moduleView",
      component: ModulesView
    },
    {
      path: "/exception-analyzer/:sessionId",
      name: "exception-analyzer",
      component: ExceptionAnalyzerView
    },
    {
      path: "/stack-trace-analyzer",
      name: "stack-trace-analyzer",
      component: StackTraceAnalyzerView
    },
    {
      path: "/duplicate-strings-analyzer/:sessionId",
      name: "duplicate-strings-analyzer",
      component: DuplicateStringsAnalyzerView
    },
    {
      path: "/threadpool-analyzer/:sessionId",
      name: "threadpool-analyzer",
      component: ThreadPoolAnalyzerView
    },
    {
      path: "/large-objects-analyzer",
      name: "large-objects-analyzer",
      component: LargeObjectsAnalyzerView
    }
    
  ]
});
