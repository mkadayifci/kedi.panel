<template>
  <div class="container-fluid pt-80">
    <div>
      <i class="fa fa-gamepad fa-lg header-icon"></i>
      <h5 class="d-inline-block">Play Zone</h5>
    </div>This result is limited to first 500 objects. Max recursion number is 25 for member of objects.
    <hr>
    <div class="row labelRow">
      <div class="col-md-1 labelDiv">
        <span class="labelColumn">Result Objects</span>
      </div>
      <div class="col-md-11">
        <vue-multiselect :multiple="true" v-model="typesValue" :options="options"/>
      </div>
    </div>
    <div class="row labelRow">
      <div class="col-md-1 labelDiv">
        <span class="labelColumn">Search Value</span>
      </div>
      <div class="col-md-11">
        <b-form-input @keyup.enter.native="getResults" v-model="searchValue">cs_iis</b-form-input>
      </div>
    </div>
    <div class="row labelRow">
      <div class="col-md-1"></div>
      <div class="col-md-11">
        <b-button v-on:click="getResults">Search</b-button>
      </div>
    </div>

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
          <div class="card alert" style="width:100%">
            <div class="card-body" style="padding:0px !important">
              <p>
                <strong>Found At Address:&nbsp;</strong>
                <span>
                  <router-link
                    right
                    class="nav-item"
                    tag="a"
                    target="_blank"
                    :to="{ name: 'object', params: {sessionId:$route.params.sessionId, objectPointer:row.item.foundAtAddress }}"
                  >{{row.item.foundAtAddress}}{{row.item.foundAtPath==='Self'?' (Self)':' (Member)'}}</router-link>
                </span>
              </p>
              <p>
                <strong>Found At Path:&nbsp;</strong>
                <span>{{row.item.foundAtPath}}</span>
              </p>
              <p>
                <strong>Content:&nbsp;</strong>
                <span>{{row.item.fullContent}}</span>
              </p>
            </div>
          </div>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import apiGateway from "@/server-communication/api-gateway";

export default {
  name: "playZoneView",
  components: {},
  data: function() {
    return {
      resultList: [],
      fields: {
        show_details: {
          label: "",
          tdClass: "tableDetailColumn"
        },
        objectAddress: {
          label: "Object Address",
          sortable: true
        },
        typeName: {
          label: "Type Name",
          sortable: true
        }
      },
      searchValue: "",
      typesValue: null,
      options: []
    };
  },
  methods: {
    tableRowDetailToggle: function(row) {
      row.toggleDetails();
    },
    prepareForPresentations: function(responseData) {
      var returnValue = [];

      responseData.forEach(item => {
        returnValue.push({
          objectAddress: item.value.address,
          typeName: item.value.typeName,
          foundAtPath:
            item.foundAt.path === item.value.typeName
              ? "Self"
              : item.foundAt.path,
          foundAtAddress: item.foundAt.foundAddress,
          fullContent: item.foundAt.fullContent
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
    },
    getResults: function() {
      this.$loadingIndicatorHelper.showProgress(this);
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
    this.getResults();
  }
};
</script>

<style scoped>
.labelColumn {
  text-align: right;
  font-weight: bold;
  display: inline-block !important;
  vertical-align: middle;
}
.labelRow {
  padding-bottom: 5px;
}
.card-body p {
  margin-bottom: 0.2rem !important;
}
.labelDiv {
  display: table-cell !important;
  text-align: right;
  padding-right: 0px !important;
}
</style>
