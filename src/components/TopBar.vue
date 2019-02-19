<template>
  <nav style="z-index:4501" class="navbar fixed-top navbar-light bg-light navBarCustom">
    <a class="navbar-brand navBrandCustom" href="#">
      <img class="logo" :src="require('@/assets/images/logo-mini.png')">
      <span class="logoTitle">kedi analyzer</span>
    </a>
    <div class="form-inline my-2 my-lg-0">
      <button
      v-if="$route.name!=='open-file'"
        type="button"
        @click="closeActiveSession"
        class="btn btn-dark btn-sm"
      >Open Dump File</button>

      <!-- <input class="form-control mr-sm-2" type="search" placeholder="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>-->
    </div>
  </nav>
</template>
<script>
export default {
  //#a6c!important
  name: "top-bar",
  components: {},
  methods: {
    closeActiveSession: function() {
      this.$router.push({name:"open-file"});
    }
  }
};
</script>
<style scoped>
.navBarCustom {
  box-shadow: 0px 0px 1px black;
  -moz-box-shadow: 0px 0px 1px black;
  -webkit-box-shadow: 0px 0px 1px black;
  background-color: #d19b3d !important;
}
.navBrandCustom {
  padding-left: 15px;
}
.logo {
  width: 32px;
}
.logoTitle {
  padding-left: 5px;
}
</style>

