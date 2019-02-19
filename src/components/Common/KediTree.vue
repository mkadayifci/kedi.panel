<template>
  <li class="item">
    <div @click="toggle" @dblclick="changeType">
      <span v-if="isFolder">[{{open ? '-' : '+'}}] </span>
      

   <router-link v-if="model.address!==undefined"
            right
            class="nav-item"
            tag="a"
            target="_blank"
            :to="{ name: 'object', params: {sessionId:$route.params.sessionId, objectPointer:model.address }}"
          >{{model.text}}</router-link>


      <span v-else :class="{boldStyle:model.bold}">{{model.text}}</span>
      
    </div>

    <ul v-show="open" v-if="isFolder">
      <tree class="item" :model="node" v-for="(node,index) in model.nodes" :key="index"></tree>
      <!-- <li @click="addChild">{{model.text}}</li> -->
    </ul>
  </li>
</template>
 <script>
export default {
  name: "tree",
  props: ["model"],
  data() {
    return { open: true };
  },
  computed: {
    isFolder() {
      return this.model.nodes && this.model.nodes.length;
    }
  },
  components: {},
  methods: {
    toggle() {
      if (this.isFolder) {
        this.open = !this.open;
      }
    },
    addChild() {
      //   this.model.nodes.push({
      //     n: "addedChild"
      //   });
    },
    changeType() {
      if (!this.isFolder) {
        // Vue.set(this.model, "nodes", []);
        this.addChild();
        this.open = true;
      }
    }
  }
};
</script>
 

 <style scoped>
.item {
  cursor: pointer;
}
.boldStyle {
  font-weight: bold;
}
</style>
 