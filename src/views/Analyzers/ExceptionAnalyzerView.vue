<template>
  <div class="container-fluid pt-80">
            <div>
      <i class="fa fa-paw fa-lg header-icon"></i>
      <h5 class="d-inline-block">Exception Analyzer</h5>
    </div>

    <hr>
    <template>
      <b-table
        style="white-space: pre;"
        small
        hover
        outlined
        sort-by="count"
        :sort-desc="sortDesc"
        tbody-class="tbodyOuterBeige"
        thead-class="innerHead"
        :fields="combinedTableFields"
        :items="combinedItems"
      >
        <template slot="show_details" slot-scope="row">
          <i
            @click.stop="tableRowDetailToggle(row)"
            class="tableIcon fa"
            v-bind:class="
          row.detailsShowing ? 'fa-minus-square' : 'fa-plus-square'
          "
          ></i>
        </template>
        <template slot="row-details" slot-scope="row">
          <ExceptionList style="font-style:italic" :items="row.item.fullItems"/>
        </template>
      </b-table>
    </template>
  </div>
</template>
<script>
import ExceptionList from "@/components/Analyzers/Exception/ExceptionList.vue";
import apiGateway from "@/server-communication/api-gateway";

export default {
  name: "exception-analyzer",
  components: {  ExceptionList },
  data: function() {
    return {
      sortDesc: true,
      combinedItems: [],
      items: [],
      combinedTableFields: {
        show_details: {
          label: "",
          tdClass: "tableDetailColumn"
        },
        count: {
          label: "Count",
          sortable: true,
          tdClass: "tableMinColWidth"
        },
        typeName: {
          label: "Exception Type",
          sortable: true
        }
      }
    };
  },

  methods: {
    tableRowDetailToggle: function(row) {
      row.toggleDetails();

      if (row.item.fullItems === undefined) {
        var query = row.item.typeName;
        var fullItemsForRow = this.items.filter(item => {
          return item.typeName === query;
        });
        row.item.fullItems = fullItemsForRow;
      }
    },
    generateCombinedItemsByType: function(exceptionList) {
      var itemMap = new Map();
      exceptionList.forEach(element => {
        if (itemMap.has(element.typeName) !== true) {
          itemMap.set(element.typeName, 1);
        } else {
          itemMap.set(element.typeName, itemMap.get(element.typeName) + 1);
        }
      });

      var returnArray = [];
      for (const [key, value] of itemMap) {
        returnArray.push({
          typeName: key,
          count: value
        });
      }

      return returnArray;
    }
  },
  mounted() {
    this.$loadingIndicatorHelper.show(this);

    apiGateway
      .getExceptionObjects(this.$route.params.sessionId)
      .then(response => {
        this.$loadingIndicatorHelper.hide(this);

        this.items = response.data;
        this.combinedItems = this.generateCombinedItemsByType(this.items);
      })
      .catch(error => {
        this.$loadingIndicatorHelper.hide(this);

        this.items = [];
      });
  }
};
</script>
<style>


.innerHead {
  background-color: #181818;
  color: white;
}

.tbodyInner {
  font-style: italic !important;
}
</style>
