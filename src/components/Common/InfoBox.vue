<template>
  <div class="info-box hover-zoom-effect">
    <div class="icon bg-gray">
      <i class="fa fa-lg" :class="icon"></i>
    </div>
    <div class="content">
      <div class="text">{{title}}</div>
      <div class="number" v-html=text></div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["title", "text","icon"],
  components: {}
};
</script>

<style scoped>
.info-box {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  height: 80px;
  display: flex;
  cursor: default;
  background-color: #fff;
  position: relative;
  overflow: hidden;
  margin-bottom: 30px;
}
.info-box .icon {
  display: inline-block;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.12);
  width: 80px;
}

.bg-pink {
  background-color: #e91e63 !important;
  color: #fff;
}
.bg-gray {
  background-color:#d19b3d !important;
  color: #fff;
}
.info-box .content .text {
  font-size: 13px;
  margin-top: 11px;
  color: #555;
}
.info-box .content .number {
  font-weight: normal;
  font-size: 26px;
  margin-top: -4px;
  color: #555;
}
.info-box.hover-zoom-effect .icon i {
  -moz-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
.info-box .icon i {
  color: #fff;
  font-size: 50px;
  line-height: 75px;
}
.info-box .content {
  display: inline-block;
  padding: 7px 10px;
}
</style>

