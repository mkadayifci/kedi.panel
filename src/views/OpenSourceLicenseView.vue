<template>
  <div class="container-fluid pt-80" style="padding-left:30px">
    <h5>Open-Source License Information</h5>
    <div style="padding-top:5px;">
      <span>These packages used in this application. Thanks for all.</span>
    </div>

    <hr>
    <div class="row">
      <div v-for="item in projectList" :key="item.name" class="col-md-12 project-card">
        <span class="projectName">{{item.name}}</span>
        <span>, {{item.description}}</span>
        <br>

        <strong>License:</strong>
        <span>{{item.licenseType}}</span>
        <br>
        <strong>Repository:</strong>
        <a :href="item.repositoryUrl" target="_blank">{{item.repositoryUrl}}</a>
        <br>
        <strong>Website:</strong>
        <a :href="item.webSite" target="_blank">{{item.webSite}}</a>
        <br>
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "open-source-license-information",
  data: function() {
    return {
      projectList: [
        {
          name: "vue-router",
          description: "The official router for Vue.js",
          repositoryUrl: "https://github.com/vuejs/vue-router",
          licenseType: "MIT",
          webSite: "https://router.vuejs.org/"
        },
        {
          name: "vue-notification",
          description: "Vue.js 2 library for showing notifications",
          repositoryUrl: "https://github.com/euvl/vue-notification",
          licenseType: "MIT",
          webSite: "http://vue-notification.yev.io/"
        },
        {
          name: "vue-loading-overlay",
          description: "Vue.js component for full screen loading indicator",
          repositoryUrl: " https://github.com/ankurk91/vue-loading-overlay",
          licenseType: "MIT",
          webSite: "https://ankurk91.github.io/vue-loading-overlay/"
        },
        {
          name: "vue-multiselect",
          description:
            "Universal select/multiselect/tagging component for Vue.js",
          repositoryUrl: "https://github.com/shentao/vue-multiselect",
          licenseType: "MIT",
          webSite: "https://vue-multiselect.js.org/"
        },
        {
          name: "vuejs-dialog",
          description:
            "A lightweight, promise based alert, prompt and confirm dialog",
          repositoryUrl: "https://github.com/Godofbrowser/vuejs-dialog",
          licenseType: "MIT",
          webSite: "https://godofbrowser.github.io/vuejs-dialog/"
        },
        {
          name: "vue-echarts",
          description: "ECharts component for Vue.js.",
          repositoryUrl: "https://github.com/ecomfe/vue-echarts",
          licenseType: "MIT",
          webSite: "https://ecomfe.github.io/vue-echarts/demo/"
        },
        {
          name: "incubator-echarts",
          description:
            " A powerful, interactive charting and visualization library for browser",
          repositoryUrl: "https://github.com/apache/incubator-echarts",
          licenseType: "Apache-2.0",
          webSite: "http://echarts.apache.org/"
        },
        {
          name: "vue-progressbar",
          description: "A lightweight progress bar for vue",
          repositoryUrl: "https://github.com/hilongjw/vue-progressbar",
          licenseType: "MIT",
          webSite: "http://hilongjw.github.io/vue-progressbar/"
        },
        {
          name: "Font-Awesome",
          description: "The iconic SVG, font, and CSS toolkit",
          repositoryUrl: "https://github.com/FortAwesome/Font-Awesome",
          licenseType: "OFL-1.1 & MIT",
          webSite: "https://fontawesome.com"
        },
        {
          name: "jquery",
          description: "jQuery JavaScript Library",
          repositoryUrl: "https://github.com/jquery/jquery",
          licenseType: "MIT",
          webSite: "https://jquery.com/"
        },
        {
          name: "typefaces",
          description: "NPM packages for Open Source typefaces",
          repositoryUrl: "https://github.com/KyleAMathews/typefaces",
          licenseType: "license",
          webSite:
            "https://www.bricolage.io/typefaces-easiest-way-to-self-host-fonts/"
        },
        {
          name: "bootstrap",
          description:
            "The most popular HTML, CSS, and JavaScript framework for developing responsive, mobile first projects on the web.",
          repositoryUrl: "https://github.com/twbs/bootstrap",
          licenseType: "MIT",
          webSite: "https://getbootstrap.com/"
        },
        {
          name: "bootstrap-vue",
          description:
            "BootstrapVue provides one of the most comprehensive implementations of Bootstrap 4 components and grid system for Vue.js and with extensive and automated WAI-ARIA accessibility markup.",
          repositoryUrl: "https://github.com/bootstrap-vue/bootstrap-vue",
          licenseType: "MIT",
          webSite: "https://bootstrap-vue.js.org/"
        },
        {
          name: "axios",
          description: "Promise based HTTP client for the browser and node.js",
          repositoryUrl: "https://github.com/axios/axios",
          licenseType: "MIT",
          webSite: "https://github.com/axios/axios"
        },
        {
          name: "vue",
          description:
            "Vue.js is a progressive, incrementally-adoptable JavaScript framework for building UI on the web.",
          repositoryUrl: "https://github.com/vuejs/vue",
          licenseType: "MIT",
          webSite: "https://vuejs.org/"
        },
        {
          name: "vuex",
          description: "Centralized State Management for Vue.js.",
          repositoryUrl: "https://github.com/vuejs/vuex",
          licenseType: "MIT",
          webSite: "https://vuex.vuejs.org/"
        },
        {
          name: "ClrMD",
          description:
            "Microsoft.Diagnostics.Runtime is a set of APIs for introspecting processes and dumps.",
          repositoryUrl: "https://github.com/Microsoft/clrmd",
          licenseType: "MIT",
          webSite: "https://github.com/Microsoft/clrmd"
        }
      ].sort((a, b) => {
        let aStr = a.name.toLowerCase();
        let bStr = b.name.toLowerCase();

        if (aStr < bStr) {
          return -1;
        }
        if (aStr > bStr) {
          return 1;
        }
        return 0;
      })
    };
  },
  computed: {},
  components: {},
  methods: {},
  mounted() {}
};
</script>


   
  
<style scoped>
strong {
  padding-right: 5px;
}
.projectName {
  font-size: 1.1em;
  font-style: italic;
  font-weight: bold;
  color: indianred;
}
.project-card {
  font-size: 1.1em;
}
</style>
