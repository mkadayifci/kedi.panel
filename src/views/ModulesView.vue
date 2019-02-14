<template>
  <div class="container-fluid pt-80">
    <div>
      <i class="fa fa-cubes fa-lg header-icon"></i>
      <h5 class="d-inline-block">Loaded Modules</h5>
    </div>

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
