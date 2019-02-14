<template>
  <div class="container-fluid pt-80">
    <div>
      <i class="fa fa-paw fa-lg header-icon"></i>
      <h5 class="d-inline-block">Pinned Objects</h5>
    </div>
    <hr>
    <ObjectList :items="pinnedObjects" :additionalFields="additionalFields"/>
  </div>
</template>
<script>
import ObjectList from "@/components/Common/ObjectList.vue";
import apiGateway from "@/server-communication/api-gateway";

export default {
  name: "pinned-objects-analyzer",
  components: {  ObjectList },
  data: function() {
    return {
      pinnedObjects: [],
      additionalFields: {
        handleType: {
          label: "Handle Type"
        }
      }
    };
  },
  computed: {},
  methods: {},
  mounted() {
    this.$loadingIndicatorHelper.show(this);

    apiGateway
      .getPinnedObjects(this.$route.params.sessionId)
      .then(response => {
        this.pinnedObjects = response.data;

        this.$loadingIndicatorHelper.hide(this);
      })
      .catch(error => {
        this.$loadingIndicatorHelper.hide(this);
        this.pinnedObjects = [];
      });
  }
};
</script>
