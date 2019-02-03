<template>
  <div class="container-fluid pt-80">
    <h5>Duplicate Strings Analyzer</h5>
    <hr>
    <TopBar/>

  </div>
</template>
<script>
import TopBar from "@/components/TopBar.vue";
import axios from "axios";

export default {
  name: "duplicate-strings-analyzer",
  components: { TopBar },
  data: function() {
    return {
      modules: {}
    };
  },
  methods: {},
  mounted() {
  }
};
</script>
