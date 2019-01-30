<template>
  <div>
    <h6>Stack Objects</h6>
    <template>
      <b-table hover :items="items" :fields="fields"></b-table>
    </template>
  </div>
</template>
<script>
import numberHelper from "@/helpers/number-helper";
export default {
  name: "StackObjects",
  props: ["items"],
  data: function() {
    return {
      fields: {
        typeName: {
          label: "Type",
          tdClass: "tableDetailColumn"
        },
        address: {
          label: "Address",
          sortable: true,
          formatter: (value, key, item) => {
            return numberHelper.decimalToHexString(value);
          }
        }
      }
    };
  }
};
</script>
