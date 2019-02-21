<template>
  <div>
    <div v-if="debugModeModuleCount==1" class="alert alert-danger" role="alert">
      <i
        style="font-size: 1.4rem; padding-right: 20px;"
        class="fa fa-exclamation-triangle"
        aria-hidden="true"
      ></i>
      <span>There is a module in the list that is compiled in DEBUG mode.</span>
    </div>
    <div v-if="debugModeModuleCount>1" class="alert alert-danger" role="alert">
      <i
        style="font-size: 1.4rem; padding-right: 20px;"
        class="fa fa-exclamation-triangle"
        aria-hidden="true"
      ></i>
      <span>There are {{debugModeModuleCount}} modules in the list which are compiled in DEBUG mode.</span>
    </div>

    <div
      class="card alert"
      v-bind:class="{'alert-danger':moduleItem.isInDebugMode,'alert-secondary':!moduleItem.isInDebugMode}"
      v-for="moduleItem in modules"
      :key="moduleItem.name"
    >
      <div class="card-body" style="padding:0px !important">
        <i
          style="padding-right: 10px;vertical-align: middle;margin-top: -6px;"
          class="fa fa-th-large"
          aria-hidden="true"
        ></i>
        <h5 class="card-title d-inline-block">{{moduleItem.fileName}}</h5>
        <h6 class="card-subtitle mb-2 text-muted">{{moduleItem.assemblyName}}</h6>
        <p class="card-text">
          <strong>Debugging Mode:</strong>
          {{moduleItem.debuggingMode}}
        </p>
        <div v-if="moduleItem.isInDebugMode" style="font-size:0.8rem">
          <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
          <p class="card-text d-inline-block pl-2">Compiled in DEBUG mode</p>
        </div>
        <div></div>
        <!-- <a href="#" class="card-link">Download Module</a> -->
      </div>
    </div>
    <div class="col-md-1"></div>
  </div>
</template>

<script>
import apiGateway from "@/server-communication/api-gateway";

export default {
  name: "ModuleList",
  props: {},
  data: function() {
    return {
      modules: [],
      debugModeModuleCount: 0
    };
  },
  methods: {
    list: function() {
      this.$loadingIndicatorHelper.show(this);
      apiGateway
        .getModuleList(this.$route.params.sessionId)
        .then(response => {
          this.modules = response.data;
          this.debugModeModuleCount = response.data.filter(
            module => module.isInDebugMode
          ).length;
          this.$loadingIndicatorHelper.hide(this);
        })
        .catch(error => {
          this.modules = [];
          this.$loadingIndicatorHelper.hide(this);
        });
    }
  }
};
</script>







