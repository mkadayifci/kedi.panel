<template>
  <div class="container-fluid pt-80">
    <TopBar/>
        <h5>Summary</h5>
    <hr>
    <div class="card mb-3 alert-secondary">
      <div class="card-body">
        <h4 class="card-title">{{summary.sourceName}}</h4>
        <div class="row" style="font-size: 1.1em;line-height: 2em;">
          <div class="col-md-6">
            <span class="d-block">Version: {{summary.version}}</span>
            <span class="d-block">Flavor: {{summary.flavor}}</span>
            <span class="d-block">DAC Info: {{summary.dacInfo}}</span>
            <span class="d-block">Architecture: {{summary.targetArchitecture}}</span>
          </div>
          <div class="col-md-6">
            <span class="d-block">GC Mode: {{summary.gcMode}}</span>
            <span class="d-block">Thread Count: {{summary.threadCount}}</span>
            <span class="d-block">Heap Count: {{summary.heapCount}}</span>
            <span class="d-block">Is Minidump: {{summary.isMinidump}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar.vue";
import axios from "axios";

export default {
  name: "summaryView",
  components: { TopBar },
  data: function() {
    return {
      summary: {}
    };
  },
  methods: {
    getSummary: function() {
      axios
        .get(
          "http://localhost:9000/api/summary/30230bf96a884830a0b96805cf173717"
        )
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

