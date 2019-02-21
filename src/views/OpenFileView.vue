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
      let currentSession = this.$store.getters.currentSession;

      if (currentSession) {
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
      this.$loadingIndicatorHelper.show(this);
      apiGateway
        .closeAllSessions()
        .then(closeResponse => {
          apiGateway
            .createSession(filePath)
            .then(response => {
              this.$store.commit("currentSession", {
                filePath: filePath,
                sessionId: response.data
              });

              this.$loadingIndicatorHelper.hide(this);
              this.$router.push({
                name: "summary",
                params: { sessionId: response.data }
              });
            })
            .catch(error => {
              this.$loadingIndicatorHelper.hide(this);
            });
        })
        .catch(error => {
          this.$loadingIndicatorHelper.hide(this);
        });
    }
  },
  mounted() {
    apiGateway
      .commitFeedback(
        "Mehmet Kadayıfçı",
        "mkadayifci@gmail.com",
        "Çok acayip iyi, çok .ok güzel olmuş abi, ellerine koluna sığmasın inşallah"
      )
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>


   
  
