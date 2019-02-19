<template>
  <div class="container-fluid pt-80">
    <div>
      <i class="fa fa-gamepad fa-lg header-icon"></i>
      <h5 class="d-inline-block">Play Zone</h5>
    </div>This result is limited to first 500 objects. Max recursion number is 25 for member of objects.
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
          <b-form-input @keyup.enter.native="getResults" v-model="searchValue">cs_iis</b-form-input>
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
  components: {  },
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
  width: 150px;
  text-align: right;
  font-weight: bold;
  padding-right: 5px;
}
.card-body p {
  margin-bottom: 0.2rem !important;
}

</style>
