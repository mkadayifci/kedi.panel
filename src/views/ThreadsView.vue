<template>
  <div class="container-fluid pt-80">
    <h5>Thread List</h5>
    <hr>
    <TopBar/>
    <ThreadList v-show="isLoaded" v-on:on-loaded="onThreadListLoaded" ref="threadList"/>
  </div>
</template>

<script>
import ThreadList from "@/components/Thread/ThreadList.vue";
import TopBar from "@/components/TopBar.vue";
export default {
  name: "threads",
  data: function() {
    return {
      isLoaded: false
    };
  },
  computed: {},
  components: { ThreadList, TopBar },
  methods: {
    onThreadListLoaded: function() {
      this.$loadingIndicatorHelper.hide(this);
      this.isLoaded = true;
    }
  },
  mounted() {
    this.$loadingIndicatorHelper.show(this);
    this.$refs.threadList.list();
  }
};
</script>


   
  
  
  
  

