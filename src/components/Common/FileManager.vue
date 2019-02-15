<template>
  <div>
    <i class="fa fa-laptop" aria-hidden="true"></i>
    This PC
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li
          v-for="(pathItem,index) in fileSystemResult.pathBreadCrumb"
          :key="index"
          class="breadcrumb-item"
          style="cursor:pointer"
          aria-current="page"
          @click="getPathContent(pathItem.fullPath)"
        >{{pathItem.name}}</li>
      </ol>
    </nav>

      <divclass="row" >
        <div class="col-md-6" v-for="entry in fileSystemResult.entries" :key="entry.path">
          <div
            class="noneClickableStyle ioItem"
            :class="{'clickableStyle':entry.isFile && entry.itLooksLikeDump || !entry.isFile}"
            @click="getPathContent(entry.path)"
          >
            <img :src="entry.iconBase64">
            <span style="padding-left: 5px;">{{entry.name}}</span>
          </div>
        </div>
      </div>
  </div>
</template>
 <script>
import apiGateway from "@/server-communication/api-gateway";

export default {
  name: "file-manager",
  props: ["model"],
  data() {
    return {
      fileSystemResult: {}
    };
  },
  computed: {},
  components: {},
  methods: {
    alertMe: function() {
      alert("ss");
    },
    getPathContent: function(path) {
      apiGateway
        .getFileSystemInfo(path)
        .then(response => {
          this.fileSystemResult = response.data;
        })
        .catch(error => {
          alert(error);
        });
    }
  },
  mounted: function() {
    this.getPathContent();
  }
};
</script>
 

 <style scoped>
.clickableStyle {
  color: black !important;
  cursor: pointer !important;
}
.clickableStyle:hover {
  background-color: gray;
}

.noneClickableStyle {
  color: gray;
  cursor: no-drop;
}
.ioItem {
  padding: 2px 5px;
}
.ioItem:hover {
  background-color: #d3d3d3;
  border-radius: 5px;
}
</style>
 
 