<template>
  <div class="container-fluid pt-80">
    <div>
      <i class="fa fa-cogs fa-lg header-icon"></i>
      <h5 class="d-inline-block">Thread Information</h5>
    </div>

    <hr>
    <div v-if="isLoaded" class="card alert alert-secondary pb-0">
      <div class="card-body" style="padding:0px !important;">
        <div class="row">
          <div style="text-align:center" class="col-md-2">
            <strong >CPU Usage</strong>
            <v-chart style="width:120px;height:120px" :options="option"/>
          </div>
          <div class="col-md-5 pl-5">
            <div>
              <strong>Total Threads:</strong>
              {{this.threadPoolDetail.totalThreads}}
            </div>
            <div>
              <strong>Running Threads:</strong>
              {{this.threadPoolDetail.runningThreads}}
            </div>
            <div>
              <strong>Idle Threads:</strong>
              {{this.threadPoolDetail.idleThreads}}
            </div>
            <div>
              <strong>Min Threads:</strong>
              {{this.threadPoolDetail.minThreads}}
            </div>
            <div>
              <strong>Max Threads:</strong>
              {{this.threadPoolDetail.maxThreads}}
            </div>
          </div>
          <div class="col-md-5">
            <div>
              <strong>Max Completion Ports:</strong>
              {{this.threadPoolDetail.maxCompletionPorts}}
            </div>
            <div>
              <strong>Min Completion Ports:</strong>
              {{this.threadPoolDetail.minCompletionPorts}}
            </div>
            <div>
              <strong>Max Free Completion Ports:</strong>
              {{this.threadPoolDetail.maxFreeCompletionPorts}}
            </div>
            <div>
              <strong>Free Completion Port Count:</strong>
              {{this.threadPoolDetail.freeCompletionPortCount}}
            </div>
          </div>
        </div>
        <p/>
      </div>
    </div>

    <ThreadList v-show="isLoaded" v-on:on-loaded="onThreadListLoaded" ref="threadList"/>
  </div>
</template>

<script>
import ThreadList from "@/components/Thread/ThreadList.vue";
import apiGateway from "@/server-communication/api-gateway";
import "echarts/lib/chart/gauge";

export default {
  name: "threads",
  data: function() {
    return {
      completedProcessCount: 0,
      threadPoolDetail: {},
      isLoaded: false,
      option: {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: "Usage",
            type: "gauge",
            min: 0,
            max: 100,
            detail: { formatter: "{value}%" },
            data: [{ value: 0, name: "" }],
            pointer: {
              width: 4,
              color: "#6e312f"
            },
            axisLine: {
              lineStyle: {
                width: 7,
                color: [[0.8, "#363813"], [1, "#ff1a4a"]]
              }
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false,
              length: 1,
              lineStyle: {
                color: "auto"
              }
            },
            splitLine: {
              show: false
            },
            detail: {
              fontWeight: "normal",
              fontSize: "14px"
            }
          }
        ]
      }
    };
  },
  computed: {},
  components: { ThreadList },
  methods: {
    onThreadListLoaded: function() {
      this.completedProcessCount++;
      this.checkToHideLoadingStuff();
    },
    checkToHideLoadingStuff: function() {
      if (this.completedProcessCount == 2) {
        this.isLoaded = true;
        this.$loadingIndicatorHelper.hide(this);
      }
    }
  },
  mounted() {
    this.completedProcessCount = 0;
    this.$loadingIndicatorHelper.show(this);
    

    apiGateway
      .getThreadPoolDetail(this.$route.params.sessionId)
      .then(response => {
        this.threadPoolDetail = response.data;
        this.option.series[0].data[0].value = this.threadPoolDetail.cpuUtilization;
        this.completedProcessCount++;
        this.$refs.threadList.list();
      })
      .catch(error => {
        this.threadPoolDetail = {};
        this.completedProcessCount++;
        this.checkToHideLoadingStuff();
      });
  }
};
</script>





   
  
  
  
  
