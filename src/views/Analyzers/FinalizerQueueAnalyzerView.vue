<template>
  <div class="container-fluid pt-80">
    <h5>Finalizer Queue Analyzer</h5>
    <hr>
    <TopBar/>

    <ul class="nav nav-tabs" role="tablist">
      <li class="nav-item">
        <a class="nav-link active" href="#profile" role="tab" data-toggle="tab">Finalizable objects</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#buzz" role="tab" data-toggle="tab">Objects in finalization queue</a>
      </li>
    </ul>

    <!-- Tab panes -->
    <div style="padding-top:10px" class="tab-content">
      <div role="tabpanel" class="tab-pane fade in active show" id="profile">
      <ObjectList :items="finalizableObjects"/>
      </div>
      <div role="tabpanel" class="tab-pane fade" id="buzz"></div>
    </div>
  </div>
</template>
<script>
import TopBar from "@/components/TopBar.vue";
import ObjectList from "@/components/Common/ObjectList.vue";
import apiGateway from "@/server-communication/api-gateway";

export default {
  name: "finalizer-queue-analyzer",
  components: { TopBar,ObjectList },
  data: function() {
    return {
      finalizableObjects: []
    };
  },
  computed: {
  },
  methods: {},
  mounted() {
    this.$loadingIndicatorHelper.show(this);

    apiGateway
      .getFinalizerQueue(this.$route.params.sessionId)
      .then(response => {
        this.finalizableObjects = response.data;
        this.$loadingIndicatorHelper.hide(this);
      })
      .catch(error => {
        this.$loadingIndicatorHelper.hide(this);
        this.items = [];
      });
  }
};
</script>
