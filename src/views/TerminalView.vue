
<template>
  <div class="container-fluid pt-80">
    <TopBar/>
    <div id="container"/>
  </div>
</template>

 <script>
import TopBar from "@/components/TopBar.vue";
import Terminal from "@/3rd-party/termlib/index";

export default {
  name: "terminal",
  components: { TopBar },
  data: function() {
    return {
      signalRProxy: {}
    };
  },
  mounted: function() {
    var term = new Terminal({
      handler: termHandler,
      greeting: "*** This is Terminal 1 ***",
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
          "30230bf96a884830a0b96805cf173717",
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
      term.prompt();
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

/* .term {
  font-family: courier, fixed, swiss, sans-serif;
  font-size: 12px;
  color: #33d011;
  background: none;
}

.termReverse {
  color: #111111;
  background: #33d011;
}


.term {
  font-family: "Menlo Regular", "Lucida Console", Monaco;
  font-size: 12px;
  color: white; 
  background: none repeat scroll 0% 0% transparent;
}

.termReverse {
  color: #111111;
  background: #33d011;
}


.lh15 {
  line-height: 15px;
}

a,
a:link,
a:visited {
  text-decoration: none;
  color: #77dd11;
}

a:hover {
  text-decoration: underline;
  color: #77dd11;
}

a:active {
  text-decoration: underline;
  color: #dddddd;
}

a.termopen,
a.termopen:link,
a.termopen:visited {
  text-decoration: none;
  color: #77dd11;
  background: none;
}

a.termopen:hover {
  text-decoration: none;
  color: #222222;
  background: #77dd11;
}
*/
#container a.termopen:active {
  text-decoration: none;
  color: #222222;
  background: #dddddd;
}
</style>