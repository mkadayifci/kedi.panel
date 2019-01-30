<template>
  <div class="home">




   
    <ModuleList ref="moduleList"/>
    <ThreadList ref="threadList"/>
  </div>
</template>

<script>
import ThreadList from "@/components/Thread/ThreadList.vue";
import ModuleList from "@/components/Module/ModuleList.vue";


export default {
  name: "threads",
  components: { ThreadList, ModuleList },
  mounted() {
    this.$refs.threadList.list();
  }
};
</script>


