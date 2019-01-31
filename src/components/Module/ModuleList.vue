<template>
  
    <div class="container-fluid">
    <div v-for="(result, index) in modules" :key="index" class="card bg-light mb-3" >
      <div class="card-header">{{result.fileName}}</div>
      <div class="card-body">

        <span>{{result.fullPath}}</span>
        <p class="card-text"></p>
      </div>
    </div>
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
