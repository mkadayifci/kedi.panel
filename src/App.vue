<template>
  <div id="app">
    <div class="container-fluid">
          <vue-progress-bar></vue-progress-bar>
              <TopBar/>

      <div class="row">
        <div class="col-md-2 sideBarContainer">
          <SideBar/>
        </div>
        <div class="col-md-10">
          <div>
            <div style="min-height:800px" id="routerViewContainer" class="row">
              <transition  name="fade">
              <router-view/>
              </transition>
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
  components: { SideBar,TopBar }
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

