<template>
  <div class="container-fluid pt-80">
    <h5>Welcome</h5>Welcome to the kedi analyzer. You can open a .NET memory dump file and inspect it.
    <hr>
  </div>
</template>

<script>
export default {
  name: "welcome",
  data: function() {
    return {};
  },
  computed: {},
  components: {},
  methods: {},
  mounted() {
    let currentSession = this.$store.currentSession;
    if (currentSession) {
      this.$router.push({
        name: "summary",
        params: { sessionId: currentSession.sessionId }
      });
    } else {
      this.$router.push({
        name: "open-file"
      });
    }
  }
};
</script>


   