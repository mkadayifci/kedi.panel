<template>
  <nav style class="navbar fixed-top navbar-light bg-light navBarCustom">
    <a class="navbar-brand navBrandCustom" href="#">
      <img class="logo" :src="require('@/assets/images/logo-mini.png')">
      <span class="logoTitle">kedi analyzer</span>
    </a>
  </nav>
</template>
<script>
export default {
  //#a6c!important
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

