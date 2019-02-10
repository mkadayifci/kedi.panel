<template>
  <div>
    <template>
      <b-table
        hover
        small
        sort-by="typeName"
        :items="items"
        tbody-class="tbodyOuterBeige"
        thead-class="tHead"
        :fields="fields"
      >
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
  name: "ObjectList",
  props: ["items"],
  methods: {},
  data: function() {
    return {
      fields: {
        objectAddress: {
          label: "Address",
          sortable: true,
          tdClass: "tableMinColWidth",
          formatter: (value, key, item) => {
            return `${value} (${numberHelper.decimalToHexString(value)})`;
          }
        },
        typeName: {
          label: "Type",
          sortable: true
        }
      }
    };
  }
};
</script>
