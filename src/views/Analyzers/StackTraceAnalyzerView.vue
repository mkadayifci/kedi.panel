<template>
  <div class="container-fluid pt-80">
    <h5>Stack Trace Analyzer</h5>
    <hr>
    <TopBar/>

  </div>
</template>
<script>
import TopBar from "@/components/TopBar.vue";
import axios from "axios";

export default {
  name: "stack-trace-analyzer",
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
