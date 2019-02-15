<template>
  <div class="container-fluid pt-80">
    <h5>Open File</h5>

    <hr>

    <file-manager/>
  </div>
</template>

<script>
import FileManager from "@/components/Common/FileManager.vue";

export default {
  name: "open-file",
  data: function() {
    return {};
  },
  computed: {},
  components: {  FileManager },
  methods: {},
  mounted() {}
};
</script>


   
  
  getFileSystemInfo