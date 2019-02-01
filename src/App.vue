<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-2 ">
          <SideBar/>
        </div>
        <div class="col-md-10 pl-0">
          <div>
            <div class="row">
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
  font-size: 12px;
  color: #111111;
}
.pt-80{
  padding-top: 80px !important;
}
</style>
