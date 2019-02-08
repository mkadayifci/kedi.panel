<template>
  <div>
    <h6>Stack Objects</h6>
    <template>
      <b-table hover :items="items" :fields="fields">
        <template slot="objectAddress" slot-scope="data">
          <router-link
            right
            class="nav-item"
            tag="a"
            target="_blank"
            :to="{ name: 'object', params: {sessionId:$route.params.sessionId, objectPointer:data.item.objectAddress }}"
          >{{data.item.objectAddress}}</router-link>
        </template>
      </b-table>
    </template>
  </div>
</template>
<script>
import numberHelper from "@/helpers/number-helper";
export default {
  name: "StackObjects",
  props: ["items"],
  methods: {},
  data: function() {
    return {
      fields: {
        typeName: {
          label: "Type",
          tdClass: "tableDetailColumn"
        },
        objectAddress: {
          label: "Address",
          sortable: true,
          formatter: (value, key, item) => {
            return value; //numberHelper.decimalToHexString(value);
          }
        }
      }
    };
  }
};
</script>
