

<template>
 <div class="container-fluid">
    <template>
      <b-table hover :items="objectDetail.members" class="table b-table table-hover table-sm">


          
      </b-table>
    </template>
  </div>
</template>
<script>
import apiGateway from "@/server-communication/api-gateway";
export default {
  data: () => {
    return {
      objectDetail: {}
    };
  },
  mounted() {
    apiGateway.getObject(this.$route.params.objectPointer)           
            .then(response => {
                this.objectDetail = response.data;
            })
            .catch(error => {
                console.log(error);
            });
 
 
  }
};
</script>
