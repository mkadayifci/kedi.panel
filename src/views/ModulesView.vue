<template>
  <div class="container-fluid pt-80">
    <TopBar/>
    <ModuleList ref="moduleList"/>
  </div>
</template>
<script>
import TopBar from "@/components/TopBar.vue";
import ModuleList from "@/components/Module/ModuleList.vue";
import axios from "axios";

export default {
  name: "modules",
  components: { ModuleList, TopBar },
  data: function() {
    return {
      modules: {}
    };
  },
  methods: {},
  mounted() {
    this.$refs.moduleList.list();
  }
};
</script>
