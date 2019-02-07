<template>
  <div class="container-fluid pt-80">
    <h5>ThreadPool Analyzer</h5>
    <hr>
    <TopBar/>

    <div class="row">
      <div class="col-md-4">
        <InfoBox icon="fa-tachometer" title="CPU" :text="cpuText"/>
      </div>
      <div class="col-md-4">
        <InfoBox icon="fa-cogs" title="Threads" :text="threadBoxText"/>
      </div>
      <div class="col-md-4">
        <InfoBox
          icon="fa-exchange "
          title="Completion Port Threads"
          :text="completationThreadBoxText"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <InfoBox icon="fa-tachometer" title="CPU" :text="cpuText"/>
      </div>
      <div class="col-md-4">
        <InfoBox icon="fa-cogs" title="Threads" :text="threadBoxText"/>
      </div>
      <div class="col-md-4">
        <InfoBox
          icon="fa-exchange "
          title="Completion Port Threads"
          :text="completationThreadBoxText"
        />
      </div>
    </div>

  </div>
</template>
<script>
import InfoBox from "@/components/Common/InfoBox.vue";
import TopBar from "@/components/TopBar.vue";
import apiGateway from "@/server-communication/api-gateway";

export default {
  name: "threadpool-analyzer",
  components: { TopBar, InfoBox },
  data: function() {
    return {
      threadPoolDetail: {}
    };
  },
  computed: {
    cpuText: function() {
      return `${this.threadPoolDetail.cpuUtilization}%`;
    },
    threadBoxText: function() {
      return `Min: ${this.threadPoolDetail.minThreads}, <br/> Manx: ${
        this.threadPoolDetail.maxThreads
      }`;
    },
    completationThreadBoxText: function() {
      return `Min: ${this.threadPoolDetail.minCompletionPorts}, Max: ${
        this.threadPoolDetail.maxCompletionPorts
      }`;
    }
  },
  methods: {},
  mounted() {
    apiGateway
      .getThreadPoolDetail(this.$route.params.sessionId)
      .then(response => {
        this.threadPoolDetail = response.data;
      })
      .catch(error => {
        this.items = [];
      });
  }
};
</script>
