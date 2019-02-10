<template>
  <div id="app">
    <div class="container-fluid">
          <vue-progress-bar></vue-progress-bar>
      <div class="row">
        <div class="col-md-2" style="z-index:10000">
          <SideBar/>
        </div>
        <div class="col-md-10 pl-0">
          <div>
            <div style="min-height:800px" id="routerViewContainer" class="row">
              <router-view/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
require('typeface-open-sans');
require('typeface-ubuntu-mono');
import SideBar from "@/components/SideBar.vue";
import TopBar from "@/components/TopBar.vue";

export default {
  components: { SideBar, TopBar }
};
</script>


<style>
#app {
  font-family: "Open Sans","Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 13px;
  color: #111111;
  
}


</style>

