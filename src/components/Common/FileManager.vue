<template>
  <div>
    <div @click="getPathContent('[ThisPC]')" class="specialButton">
      <i class="fa fa-laptop" aria-hidden="true"></i>
      <span>This PC</span>
    </div>
    <div @click="getPathContent('[Desktop]')" class="specialButton">
      <i class="fa fa-desktop" aria-hidden="true"></i>
      <span>Desktop</span>
    </div>
    <div @click="getPathContent('[Documents]')" class="specialButton">
      <i class="fa fa-file-text-o" aria-hidden="true"></i>
      <span>Documents</span>
    </div>
    <div @click="getPathContent(fileSystemResult.levelUpDirectory)" class="specialButton">
      <i class="fa fa-level-up" aria-hidden="true"></i>
      <span>Level Up</span>
    </div>

    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li
          v-for="(pathItem,index) in fileSystemResult.pathBreadCrumb"
          :key="index"
          class="breadcrumb-item"
          style="cursor:pointer;color:blue"
          aria-current="page"
          @click="getPathContent(pathItem.fullPath)"
        >{{pathItem.name}}</li>
      </ol>
    </nav>

    <div class="row">
      <div class="col-md-6" v-for="entry in fileSystemResult.entries" :key="entry.path">
        <div
          class="noneClickableStyle ioItem"
          :class="{'clickableStyle':entry.isFile && entry.itLooksLikeDump || !entry.isFile}"
          @click="itemClicked(entry.path,entry.isFile,entry.itLooksLikeDump)"
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
  event: "on-dumpfile-clicked",
  data() {
    return {
      fileSystemResult: {}
    };
  },
  computed: {},
  components: {},
  methods: {
    getPathContent: function(path) {
      this.$loadingIndicatorHelper.show(this);
      apiGateway
        .getFileSystemInfo(path)
        .then(response => {
          this.fileSystemResult = response.data;
          localStorage.setItem("lastLocation",path);
          this.$loadingIndicatorHelper.hide(this);
        })
        .catch(error => {
          this.$loadingIndicatorHelper.hide(this);
          this.$errNotifier("Communication Error",error.message);
        });
    },
    itemClicked: function(path, isFile, itLooksLikeDump) {
      if (itLooksLikeDump === true) {
        this.$emit("on-dumpfile-clicked", this,path);
      } else if (isFile) {
        return;
      } else {
        this.getPathContent(path);
      }
    }
  },
  mounted: function() {
    let lastLocation = localStorage.getItem("lastLocation");

    this.getPathContent(lastLocation);
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

.specialButton {
  user-select: none;
  padding: 5px 10px;
  display: inline-block;
  background-color: #d19b3d;
  border-radius: 5px;
  margin-right: 5px;
  margin-bottom: 15px;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.specialButton:hover {
  box-shadow: 0 0px 0px rgba(0, 0, 0, 0.2);
}

.specialButton i {
  padding-right: 10px;
  font-size: 20px;
}
</style>
 
 