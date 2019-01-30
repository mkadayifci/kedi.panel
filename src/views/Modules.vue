<template>
  <div class="home">
    <ModuleList ref ="moduleList"/>
  </div>
</template>

<script>
import ModuleList from "@/components/Module/ModuleList.vue";

import axios from "axios";

export default {
  name: "modules",
  components: {ModuleList},
  data: function() {
    return {
      modules: {}
    };
  },
  methods: {
  },
  mounted() {
    this.$refs.moduleList.list();


  }
};
</script>


   
