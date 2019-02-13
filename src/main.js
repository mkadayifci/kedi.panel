
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-vue/dist/bootstrap-vue.css";
import 'vue-loading-overlay/dist/vue-loading.css';
import "font-awesome/css/font-awesome.css"
import "vue-multiselect/dist/vue-multiselect.min.css"
import "@/assets/css/custom.css"
import Vue from "vue";
import App from "./App.vue";
import BootstrapVue from "bootstrap-vue";
import router from "./router";
import store from "./store";
import ECharts from 'vue-echarts'
import Loading from 'vue-loading-overlay';
import VueProgressBar from 'vue-progressbar'
import loadingIndicatorHelper from "@/helpers/loadingIndicator-helper";
import Multiselect from 'vue-multiselect'



window.$ = window.jQuery = require('jquery');

Vue.prototype.$loadingIndicatorHelper=loadingIndicatorHelper;

Vue.use(Loading);
Vue.use(VueProgressBar, { color: 'black', failedColor: 'red', thickness: '5px', autoFinish: false })
Vue.use(BootstrapVue);

Vue.component('v-chart', ECharts);
Vue.component('vue-multiselect', Multiselect);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");



