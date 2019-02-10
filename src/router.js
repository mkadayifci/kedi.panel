import Vue from "vue";
import Router from "vue-router";
import ThreadsView from "./views/ThreadsView.vue";
import SummaryView from "./views/SummaryView.vue";
import ModulesView from "./views/ModulesView.vue";
import ObjectView from "./views/ObjectView.vue";
import TerminalView from "./views/TerminalView.vue";
import MemoryView from "./views/MemoryView.vue";
import WelcomeView from "./views/WelcomeView.vue";

import ExceptionAnalyzerView from "./views/Analyzers/ExceptionAnalyzerView.vue";
import StackTraceAnalyzerView from "./views/Analyzers/StackTraceAnalyzerView.vue";
import DuplicateStringsAnalyzerView from "./views/Analyzers/DuplicateStringsAnalyzerView.vue";
import ThreadPoolAnalyzerView from "./views/Analyzers/ThreadPoolAnalyzerView.vue";
import LargeObjectsAnalyzerView from "./views/Analyzers/LargeObjectsAnalyzerView.vue";
import FinalizerQueueAnalyzerView from "./views/Analyzers/FinalizerQueueAnalyzerView.vue";


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/welcome/",
      name: "welcome",
      component: WelcomeView,
      alias: "/"
    },
    {
      path: "/summary/:sessionId",
      name: "summary",
      component: SummaryView
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
      path: "/terminal/:sessionId",
      name: "terminal",
      component: TerminalView
    },
    {
      path: "/object/:sessionId/:objectPointer",
      name: "object",
      component: ObjectView
    },
    {
      path: "/modules/:sessionId",
      name: "modules",
      component: ModulesView
    },
    {
      path: "/exception-analyzer/:sessionId",
      name: "exception-analyzer",
      component: ExceptionAnalyzerView
    },
    {
      path: "/finalizer-queue-analyzer/:sessionId",
      name: "finalizer-queue-analyzer",
      component: FinalizerQueueAnalyzerView
    },

    {
      path: "/stack-trace-analyzer/:sessionId",
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
