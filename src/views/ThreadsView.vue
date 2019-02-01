<template>
  <div class="container-fluid pt-80">
    <TopBar/>
    <ModuleList ref="moduleList"/>
    <ThreadList ref="threadList"/>
  </div>
</template>

<script>
import ThreadList from "@/components/Thread/ThreadList.vue";
import ModuleList from "@/components/Module/ModuleList.vue";
import TopBar from "@/components/TopBar.vue";

export default {
  name: "threads",
  components: { ThreadList, ModuleList,TopBar },
  mounted() {
    this.$refs.threadList.list();
  }
};
</script>


  
  
  
  

