<template>
  <div class="container-fluid pt-80">
    <TopBar/>
    <div class="card bg-light mb-3" style="max-width: 18rem;">
      <div class="card-header">Header</div>
      <div class="card-body">
        <h5 class="card-title">{{summary.sourceName}}</h5>
        <p class="card-text">Version: {{summary.version}}</p>
        <p class="card-text">Flavor: {{summary.flavor}}</p>
        <p class="card-text">DAC Info: {{summary.dacInfo}}</p>
        <p class="card-text">Architecture: {{summary.targetArchitecture}}</p>
        <p class="card-text">Is64Bit: {{summary.is64Bit}}</p>
        <p class="card-text">GC Mode: {{summary.gcMode}}</p>
        <p class="card-text">Thread Count: {{summary.threadCount}}</p>
        <p class="card-text">Heap Count: {{summary.heapCount}}</p>
        <p class="card-text">Is Minidump: {{summary.isMinidump}}</p>

      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar.vue";
import axios from "axios";

export default {
  name: "summaryView",
  components: {TopBar},
  data: function() {
    return {
      summary: {}
    };
  },
  methods: {
    getSummary: function() {
      axios
        .get("http://localhost:9000/api/summary/30230bf96a884830a0b96805cf173717")
        .then(response => {
          this.summary = response.data;
        })
        .catch(error => {});
    }
  },
  mounted() {
    this.getSummary();
  }
};
</script>

