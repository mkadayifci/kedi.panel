<template>
  <div class="container-fluid pt-80">
    <h5>Modules</h5>
    <hr>
    <TopBar/>
    <ModuleList ref="moduleList"/>
  </div>
</template>
<script>
import TopBar from "@/components/TopBar.vue";
import ModuleList from "@/components/Module/ModuleList.vue";

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
