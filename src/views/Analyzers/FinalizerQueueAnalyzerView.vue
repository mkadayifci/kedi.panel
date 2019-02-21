<template>
  <div class="container-fluid pt-80">
                <div>
      <i class="fa fa-paw fa-lg header-icon"></i>
      <h5 class="d-inline-block">Finalizer Queue Analyzer</h5>
    </div>

    <hr>

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
      <div role="tabpanel" class="tab-pane fade" id="buzz">
        <div v-if="objectsInFinalizerQueue.length==0" class="alert alert-success" role="alert">
          <i
            style="font-size: 1.4rem; padding-right: 20px;"
            class="fa fa-info"
            aria-hidden="true"
          ></i>
          <span>There is no object in the finalizer queue.</span>
        </div>

        <ObjectList v-if="objectsInFinalizerQueue.length>0"  :items="objectsInFinalizerQueue"/>
      </div>
    </div>
  </div>
</template>
<script>
import ObjectList from "@/components/Common/ObjectList.vue";
import apiGateway from "@/server-communication/api-gateway";

export default {
  name: "finalizer-queue-analyzer",
  components: { ObjectList },
  data: function() {
    return {
      finalizableObjects: [],
      objectsInFinalizerQueue: []
    };
  },
  computed: {},
  methods: {},
  mounted() {
    this.$loadingIndicatorHelper.show(this);

    apiGateway
      .getFinalizerQueue(this.$route.params.sessionId)
      .then(response => {
        this.finalizableObjects = response.data.finalizableObjects;
        this.objectsInFinalizerQueue = response.data.objectsInFinalizerQueue;

        this.$loadingIndicatorHelper.hide(this);
      })
      .catch(error => {
        this.$loadingIndicatorHelper.hide(this);
        this.finalizableObjects = [];
        this.objectsInFinalizerQueue = [];
      });
  }
};
</script>
