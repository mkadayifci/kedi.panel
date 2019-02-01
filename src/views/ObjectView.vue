

<template>
  <div class="container-fluid pt-80">
    <TopBar/>
    <div
      class="pb-2 mt-4 mb-2 border-bottom"
    >Object Detail of {{this.$route.params.objectPointer}} / {{this.objectDetail.typeName}}</div>
    {{this.objectDetail.elementType}}
    <template>
      <b-table hover :items="objectDetail.members" class="table b-table table-hover table-sm"></b-table>
    </template>
  </div>
</template>
<script>
import TopBar from "@/components/TopBar.vue";
import apiGateway from "@/server-communication/api-gateway";

export default {
  components:{TopBar},
  data: () => {
    return {
      objectDetail: {}
    };
  },
  mounted() {
    apiGateway
      .getObject(this.$route.params.objectPointer)
      .then(response => {
        this.objectDetail = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  
  }
};
</script>
