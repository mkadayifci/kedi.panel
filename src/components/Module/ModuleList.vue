<template>
  <div>
    <ul>
      <li v-for="(result, index) in modules" :key="index">{{result.name}}</li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ModuleList",
  props: {},
  data: function() {
    return {
      server_url: "http://localhost:9000/api",
      modules: []
    };
  },
  methods: {
    list: function() {
      return axios
        .get(this.server_url + "/modules/30230bf96a884830a0b96805cf173717")
        .then(response => {
          this.modules = response.data;
        })
        .catch(error => {
          console.log(error);
          this.modules = [];
        });
    }
  }
};
</script>
