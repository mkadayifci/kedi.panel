<template>
  <div class="container-fluid pt-80">
    <h5>Open File</h5>

    <hr>

    <file-manager v-on:on-dumpfile-clicked="onDumpFileClicked"/>
  </div>
</template>

<script>
import FileManager from "@/components/Common/FileManager.vue";
import apiGateway from "@/server-communication/api-gateway";

export default {
  name: "open-file",
  data: function() {
    return {};
  },
  computed: {},
  components: { FileManager },
  methods: {
    onDumpFileClicked: function(source, filePath) {
      let openedFile = localStorage.getItem("openedFile");

      if (openedFile) {
        let self = this;
        this.$dialog
          .confirm("This will close current dump file! Do you want to proceed?")
          .then(function() {
            self.createSession(filePath);
          })
          .catch(function() {});
      } else {
        this.createSession(filePath);
      }
    },
    createSession: function(filePath) {
      apiGateway
        .closeAllSessions()
        .then(closeResponse => {
          apiGateway
            .createSession(filePath)
            .then(response => {
              localStorage.setItem("sessionId", response.data);
              localStorage.setItem("openedFile", filePath);
              this.$router.push({
                name: "summary",
                params: { sessionId: response.data }
              });
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    console.log(this);
  }
};
</script>


   
  
