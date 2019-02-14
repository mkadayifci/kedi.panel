<template>
  <div class="container-fluid pt-80">
    <div>
      <i class="fa fa-paw fa-lg header-icon"></i>
      <h5 class="d-inline-block">Blocking Objects</h5>
    </div>

    <hr>
    <TopBar/>
  </div>
</template>
<script>
import TopBar from "@/components/TopBar.vue";

export default {
  name: "blocking-objects-analyzer",
  components: { TopBar },
  data: function() {
    return {
      modules: {}
    };
  },
  methods: {},
  mounted() {}
};
</script>
