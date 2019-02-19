<template>
  <div class="container-fluid pt-80">
    <h5>Welcome</h5>Welcome to the kedi analyzer. You can open a .NET memory dump file and inspect it.
    <hr>

    <LoginView/>
  </div>
</template>

<script>
import LoginView from "@/components/Welcome/Login.vue";

export default {
  name: "welcome",
  data: function() {
    return {};
  },
  computed: {},
  components: { LoginView },
  methods: {},
  mounted() {
    let sessionId = localStorage.getItem("sessionId");
    if (sessionId) {
      this.$router.push({ name: "summary", params: { sessionId: sessionId } });
    }
  }
};
</script>


   
  
  getFileSystemInfo