<template>
  <div>
    <h6>Stack Objects</h6>
    <template>
      <b-table hover :items="items" :fields="fields">
        <template slot="objectAddress" slot-scope="data">
          <router-link right class="nav-item" tag="a" :to="getRouterLink(data.item.objectAddress)">
            {{data.item.objectAddress}}
          </router-link>
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
  methods: {
    getRouterLink: function (address){
      return `/object/${address}`
    }
  },
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
