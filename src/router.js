import Vue from "vue";
import Router from "vue-router";

import ThreadsView from "./views/ThreadsView.vue";
import SummaryView from "./views/SummaryView.vue";
import ModulesView from "./views/ModulesView.vue";
import ObjectView from "./views/ObjectView.vue";
import TerminalView from "./views/TerminalView.vue";
import MemoryView from "./views/MemoryView.vue";
import WelcomeView from "./views/WelcomeView.vue";
import PlayZoneView from "./views/PlayZoneView.vue";
import OpenFileView from "./views/OpenFileView.vue";

import ExceptionAnalyzerView from "./views/Analyzers/ExceptionAnalyzerView.vue";
import StackTraceAnalyzerView from "./views/Analyzers/StackTraceAnalyzerView.vue";
import DuplicateStringsAnalyzerView from "./views/Analyzers/DuplicateStringsAnalyzerView.vue";
import LargeObjectsAnalyzerView from "./views/Analyzers/LargeObjectsAnalyzerView.vue";
import FinalizerQueueAnalyzerView from "./views/Analyzers/FinalizerQueueAnalyzerView.vue";
import PinnedObjectsAnalyzerView from "./views/Analyzers/PinnedObjectsAnalyzerView.vue";
import BlockingObjectsAnalyzerView from "./views/Analyzers/BlockingObjectsAnalyzerView.vue";

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "/welcome/",
      name: "welcome",
      component: WelcomeView,
      alias: "/",
      meta: {
        title: 'Welcome - kedi'
      }
    },
    {
      path: "/open-file/",
      name: "open-file",
      component: OpenFileView,
      meta: {
        title: 'Open File - kedi'
      }
    },

    {
      path: "/summary/:sessionId",
      name: "summary",
      component: SummaryView,
      meta: {
        title: 'Summary - kedi'
      }
    },
    {
      path: "/threads/:sessionId",
      name: "threads",
      component: ThreadsView,
      meta: {
        title: 'Thread List - kedi'
      }
    },
    {
      path: "/memory/:sessionId",
      name: "memory",
      component: MemoryView,
      meta: {
        title: 'Memory Statistics - kedi'
      }
    },
    {
      path: "/terminal/:sessionId",
      name: "terminal",
      component: TerminalView,
      meta: {
        title: 'Terminal - kedi'
      }
    },
    {
      path: "/play-zone/:sessionId",
      name: "play-zone",
      component: PlayZoneView,
      meta: {
        title: 'Play Zone - kedi'
      }

    },
    {
      path: "/object/:sessionId/:objectPointer",
      name: "object",
      component: ObjectView,
      meta: {
        title: 'Object Detail - kedi'
      }
    },
    {
      path: "/modules/:sessionId",
      name: "modules",
      component: ModulesView,
      meta: {
        title: 'Loaded Modules - kedi'
      }
    },
    {
      path: "/exception-analyzer/:sessionId",
      name: "exception-analyzer",
      component: ExceptionAnalyzerView,
      meta: {
        title: 'Exceptions In Memory - kedi'
      }
    },
    {
      path: "/blocking-objects-analyzer/:sessionId",
      name: "blocking-objects-analyzer",
      component: BlockingObjectsAnalyzerView,
      meta: {
        title: 'Blocking Objects (locks) - kedi'
      }
    },
    {
      path: "/finalizer-queue-analyzer/:sessionId",
      name: "finalizer-queue-analyzer",
      component: FinalizerQueueAnalyzerView,
      meta: {
        title: 'Finalizable Objects and Queue - kedi'
      }
    },
    {
      path: "/pinned-objects-analyzer/:sessionId",
      name: "pinned-objects-analyzer",
      component: PinnedObjectsAnalyzerView,
      meta: {
        title: 'Pinned Memory Objects - kedi'
      }
    },

    {
      path: "/stack-trace-analyzer/:sessionId",
      name: "stack-trace-analyzer",
      component: StackTraceAnalyzerView,
      meta: {
        title: 'Call Stacks - kedi'
      }
    },
    {
      path: "/duplicate-strings-analyzer/:sessionId",
      name: "duplicate-strings-analyzer",
      component: DuplicateStringsAnalyzerView,
      meta: {
        title: 'Duplicate Strings in Memory - kedi'
      }
    },
    {
      path: "/large-objects-analyzer",
      name: "large-objects-analyzer",
      component: LargeObjectsAnalyzerView,
      meta: {
        title: 'Large Objects in Memory - kedi'
      }
    }
  ]

});


router.beforeEach((to, from, next) => {
  let currentSession = JSON.parse( localStorage.getItem("currentSession"));
  if (!currentSession &&
    to.path !== "/open-file") {
      next("/open-file");
  } else {
    document.title = to.meta.title;
    next();
  }
});

export default router;
