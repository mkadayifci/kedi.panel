<template>
  <div class="container-fluid pt-80">
    <div id="container"/>
  </div>
</template>

<script>
import Terminal from "@/3rd-party/termlib/index";

export default {
  name: "terminal",
  components: {  },
  data: function() {
    return {
      signalRProxy: {}
    };
  },
  mounted: function() {
    var term = new Terminal({
      handler: termHandler,
      greeting: "Debugger Session Started - kedi",
      termDiv: "container",
      crsrBlockMode: true,
      wrapping: true,
      ps: "kedi~$"
    });
    console.log(term);
    term.open();
    let that = this;
    function termHandler() {
      var line = this.lineBuffer;
      this.newLine();
      if (line == "help") {
        this.write(helpPage);
      } else if (line == "exit") {
        this.close();
        return;
      } else if (line != "") {
        that.signalRProxy.invoke(
          "send",
          this.$route.params.sessionId,
          line
        );
        this.write(line);
      }
      this.prompt();
    }

    require("signalr");

    var connection = $.hubConnection("http://localhost:9000/signalr");
    this.signalRProxy = connection.createHubProxy("SignalRHub");
    this.signalRProxy.on("ReceiveMessage", function(message) {
      term.write(message);
      //term.prompt();
    });

    connection.start().done(function() {});
  }
};
</script>



   <style>
#container {
  color: #fff;
  font-size: 12px;
  line-height: 14px;
  font-weight: 100;
  background-color: black;
  width: 100%;
  height: 100%;
}
.term {
  font-family: "Ubuntu Mono", "Menlo Regular", "Lucida Console", Monaco;
  font-size: 16px;
  letter-spacing: 1px;
  color: white;
  background: none repeat scroll 0% 0% transparent;
}
.termReverse {
  color: black;
  background: #33d011;
}

#container a.termopen:active {
  text-decoration: none;
  color: black;
  background: #dddddd;
}
</style>