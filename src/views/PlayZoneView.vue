<template>
  <div class="container-fluid pt-80">
    <TopBar/>
    <h5>Play Zone</h5>This result is limited to first 500 objects. Max recursion number is 25 for member of objects.
    <hr>
    <table style="width:100%">
      <tr>
        <td class="labelColumn">Result Objects</td>
        <td>
          <vue-multiselect :multiple="true" v-model="typesValue" :options="options"/>
        </td>
      </tr>
      <tr>
        <td class="labelColumn">Search Value</td>
        <td>
          <b-form-input v-on:keyup.13="getResults" v-model="searchValue">cs_iis</b-form-input>
        </td>
      </tr>
      <tr colspan="2">
        <td style="width:150px"></td>
        <td style="padding-top:5px">
          <b-button v-on:click="getResults">Search</b-button>
        </td>
      </tr>
    </table>
    <div>
      <hr>
      <b-table
        style="white-space: pre;"
        small
        hover
        outlined
        tbody-class="tbodyOuterBeige"
        thead-class="innerHead"
        :items="resultList"
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
        <template slot="row-details" slot-scope="row"></template>
      </b-table>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar.vue";
import apiGateway from "@/server-communication/api-gateway";

export default {
  name: "playZoneView",
  components: { TopBar },
  data: function() {
    return {
      resultList: [],
      searchValue: "",
      typesValue: null,
      options: ["list", "of", "options"]
    };
  },
  methods: {
    prepareForPresentations: function(responseData) {
      var returnValue = [];

      responseData.forEach(item => {
        returnValue.push({
          ObjectAddress: item.value.address,
          TypeName: item.value.typeName,
          FoundAtPath:
            item.foundAt.path === item.value.typeName
              ? "Self"
              : item.foundAt.path,
          FoundAtAddress: item.foundAt.foundAddress,
          FullContent: item.foundAt.fullContent
        });
      });
      return returnValue;
    },
    getTypeNames: function() {
      //  this.$loadingIndicatorHelper.show(this);
      apiGateway
        .getTypeNames(this.$route.params.sessionId)
        .then(response => {
          this.options = response.data;
        })
        .catch(error => {});

      console.log(this.typesValue);
    },
    getResults: function() {
      this.$loadingIndicatorHelper.showProgress(this);
      console.log(this.searchValue);
      console.log(this.typesValue);
      apiGateway
        .getPlayZoneResults(
          this.$route.params.sessionId,
          this.typesValue,
          this.searchValue
        )
        .then(response => {
          this.resultList = this.prepareForPresentations(response.data);
          this.$loadingIndicatorHelper.hideProgress(this);
        })
        .catch(error => {
          this.$loadingIndicatorHelper.hideProgress(this);
        });
    }
  },
  mounted() {
    this.getTypeNames();
  }
};
</script>

<style scoped>
.labelColumn {
  width: 150px;
  text-align: right;
  font-weight: bold;
  padding-right: 5px;
}
</style>
