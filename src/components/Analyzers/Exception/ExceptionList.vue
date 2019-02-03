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
          sortable: true,
          tdClass:"columnWidth"
        },
        typeName: {
          label: "Exception Type",
          sortable: true,
          tdClass:"columnWidth"
        },
        message: {
          label: "Message",
          sortable: true,
          tdClass:"columnWidth"
        },
        method: {
          label: "Method",
          sortable: true,
          tdClass:"columnWidth"
        },
        
        hResult: {
          label: "HResult",
          sortable: true,
          tdClass:"columnWidth"
        }
      }
    };
  }
};
</script>
<style>
.columnWidth{
    width: 1px;
    padding-right: 10px !important;
}
</style>

