<template>
  <div class="home">
    <div class="card bg-light mb-3" style="max-width: 18rem;">
      <div class="card-header">Header</div>
      <div class="card-body">
        <h5 class="card-title">{{summary.sourceName}}</h5>
        <p class="card-text">{{summary.version}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "summary",
  components: {},
  data: function() {
    return {
      summary: {}
    };
  },
  methods: {
    getSummary: function() {
      axios
        .get("http://localhost:9000/api/summary/30230bf96a884830a0b96805cf173717")
        .then(response => {
          this.summary = response.data;
        })
        .catch(error => {});
    }
  },
  mounted() {
    this.getSummary();
  }
};
</script>

