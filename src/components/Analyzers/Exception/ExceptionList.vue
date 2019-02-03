<template>
  <div>
    <b-table style="white-space: pre" small hover :fields="fields" :items="items">

      <template slot="objectPointer" slot-scope="data">
        <router-link
          right
          class="nav-item"
          tag="a"
          :to="getRouterLink(data.item.objectPointer)"
        >{{data.item.objectPointer}}</router-link>
      </template>
    </b-table>
  </div>
</template>
<script>

export default {
  name: "ExceptionList",
  props: ["items"],
  methods: {
    tableRowDetailToggle: function(row) {
      row.toggleDetails();
    },
    getRouterLink: function(address) {
      return `/object/${address}`;
    }
  },
  data: function() {
    return {
      fields: {
        objectPointer: {
          label: "Address",
          sortable: true
        },
        typeName: {
          label: "Exception Type",
          sortable: true
        },
        message: {
          label: "Message",
          sortable: true
        },
        method: {
          label: "Method",
          sortable: true
        },
        
        hResult: {
          label: "HResult",
          sortable: true
        }
      }
    };
  }
};
</script>
