
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "font-awesome/css/font-awesome.css"
import "@/assets/css/custom.css"
import Vue from "vue";
import App from "./App.vue";
import BootstrapVue from "bootstrap-vue";
import router from "./router";
import store from "./store";
import ECharts from 'vue-echarts'
import VueProgressBar from 'vue-progressbar'

window.$ = window.jQuery = require('jquery');

Vue.use(VueProgressBar, { color: 'black', failedColor: 'red', thickness: '5px', autoFinish: false })
Vue.use(BootstrapVue);

Vue.component('v-chart', ECharts);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
