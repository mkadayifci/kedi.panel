<template>
  <div class="container-fluid pt-80">
    <TopBar/>
    <div>
      <i class="fa fa-file-text fa-lg header-icon"></i>
      <h5 class="d-inline-block">Session Summary</h5>
    </div>
    <hr>
    <div v-if="isLoaded" class="card mb-3 alert-secondary">
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
import apiGateway from "@/server-communication/api-gateway";

export default {
  name: "summaryView",
  components: { TopBar },
  data: function() {
    return {
      summary: {},
      isLoaded: false
    };
  },
  methods: {
    getSummary: function() {
      this.$loadingIndicatorHelper.show(this);

      apiGateway
        .getSummary(this.$route.params.sessionId)
        .then(response => {
          this.summary = response.data;
          this.$loadingIndicatorHelper.hide(this);
          this.isLoaded = true;
        })
        .catch(error => {
          this.$loadingIndicatorHelper.hide(this);
        });
    }
  },
  mounted() {
    this.getSummary();
  }
};
</script>

