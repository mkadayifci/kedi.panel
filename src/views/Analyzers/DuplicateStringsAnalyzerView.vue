<template>
  <div class="container-fluid pt-80">
    <div>
      <i class="fa fa-paw fa-lg header-icon"></i>
      <h5 class="d-inline-block">Duplicate Strings Analyzer</h5>
    </div>
    <hr>

    <p>
      <i class="fa fa-info fa-lg pr-1"></i> This analyzer inspects memory for strings that duplicates at least 2 times. This analyzer's result is limited to first 100 unique strings.
    </p>
    <b-table
      style="white-space: pre;"
      small
      bordered
      outlined
      tbody-class="tbodyOuterBeige"
      :fields="fields"
      :items="items"
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
        <div
          class="row"
          style="background-color:white;border-radius: 5px;margin: 0px !important;padding: 2px;"
        >
          <div class="col-md-1" v-for="item in row.item.itemArray" :key="item.value.address">
            <router-link
              right
              class="nav-item"
              tag="a"
              target="_blank"
              :to="{ name: 'object', params: {sessionId:$route.params.sessionId, objectPointer:item.value.address }}"
            >{{item.value.address}}</router-link>
          </div>
        </div>
      </template>
    </b-table>
  </div>
</template>
<script>
import apiGateway from "@/server-communication/api-gateway";

export default {
  name: "duplicate-strings-analyzer",
  components: {  },
  data: function() {
    return {
      baseData: [],
      items: [],
      fields: {
        show_details: {
          label: "",
          tdClass: "tableDetailColumn"
        },
        count: {
          label: "Count",
          sortable: true,
          tdClass: "tableMinColWidth"
        },
        size: {
          label: "Size",
          sortable: true,
          tdClass: "tableMinColWidth"
        },
        totalSize: {
          label: "Total size",
          sortable: true,
          tdClass: "tableMinColWidth"
        },
        content: {
          label: "Content",
          sortable: true,
          formatter: value => {
            return '"' + value + '"';
          }
        }
      },
      modules: {}
    };
  },
  methods: {
    tableRowDetailToggle: function(row) {
      row.toggleDetails();
    },
    generateDisplayData: function(baseData) {
      var displayData = [];
      baseData.forEach(element => {
        displayData.push({
          count: element.length,
          size: element[0].value.size,
          totalSize: element.length * element[0].value.size,
          content: element[0].value.value,
          itemArray: element
        });
      });
      return displayData;
    }
  },
  mounted() {
    this.$loadingIndicatorHelper.show(this);
    apiGateway
      .getDuplicateStrings(this.$route.params.sessionId)
      .then(response => {
        this.baseData = response.data;
        this.items = this.generateDisplayData(response.data);
        this.$loadingIndicatorHelper.hide(this);
      })
      .catch(error => {
        this.items = [];
        this.$loadingIndicatorHelper.hide(this);
      });
  }
};
</script>
