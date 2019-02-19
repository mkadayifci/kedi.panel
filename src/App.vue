<template>
  <div id="app">
    <div class="container-fluid">
      <vue-progress-bar></vue-progress-bar>
      <TopBar/>
      <notifications
        style="z-index:15000"
        type="error"
        :duration=5000
        position="bottom left"
        group="foo"
        width="400px"
      />
      <div class="row">
        <div v-if="isSideBarVisible" class="col-md-2 sideBarContainer">
          <SideBar/>
        </div>
        <div :class="{'col-md-10':isSideBarVisible,'col-md-12':!isSideBarVisible}">
          <div>
            <div style="min-height:800px" id="routerViewContainer" class="row">
              <transition name="page" mode="out-in">
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
require("typeface-open-sans");
require("typeface-ubuntu-mono");
import SideBar from "@/components/SideBar.vue";
import TopBar from "@/components/TopBar.vue";

export default {
  components: { SideBar, TopBar },
  methods: {},
  computed: {
    isSideBarVisible: function() {
      var hideInThesePages = ["/", "/welcome", "/open-file"];
      return !hideInThesePages.includes(this.$route.path);
    }
  }
};
</script>


<style>
#app {
  font-family: "Open Sans", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 13px;
  color: #111111;
}
.page-leave-active {
  transition: opacity 0.1s, transform 0.1s;
}
.page-enter-active {
  transition: opacity 0.1s, transform 0.1s;
}

.page-enter {
  opacity: 0;
  transform: translateY(-30%);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(+30%);
}
</style>

