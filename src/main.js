
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-vue/dist/bootstrap-vue.css";
import 'vue-loading-overlay/dist/vue-loading.css';
import "font-awesome/css/font-awesome.css"
import "vue-multiselect/dist/vue-multiselect.min.css"
import "@/assets/css/custom.css"
import "vuejs-dialog/dist/vuejs-dialog.min.css"

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
import VuejsDialog from "vuejs-dialog"
import Notifications from 'vue-notification'

window.$ = window.jQuery = require('jquery');

Vue.prototype.$loadingIndicatorHelper = loadingIndicatorHelper;


var client = require('exceptionless').ExceptionlessClient.default;
client.config.apiKey = '80I0edYzAusnEtY57jVIMf1lfYee7ZmvSG2kmAgn';
Vue.prototype.$logger=client;


Vue.use(Loading);
Vue.use(VueProgressBar, { color: 'black', failedColor: 'red', thickness: '5px', autoFinish: false })
Vue.use(BootstrapVue);
Vue.use(VuejsDialog);
Vue.use(Notifications)

Vue.component('v-chart', ECharts);
Vue.component('vue-multiselect', Multiselect);
Vue.config.productionTip = false;

Vue.prototype.$errNotifier = function (title,message) {
  Vue.notify({
    group: 'foo',
    title: title,
    text: message,
    type:"error"
  });
}


window.vueInstance=new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");



