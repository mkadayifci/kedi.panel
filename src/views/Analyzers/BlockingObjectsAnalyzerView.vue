<template>
  <div class="container-fluid pt-80">
    <div>
      <i class="fa fa-paw fa-lg header-icon"></i>
      <h5 class="d-inline-block">Blocking Objects</h5>
    </div>

    <hr>
    <b-table
      style="white-space: pre;"
      small
      hover
      outlined
      sort-by="locked"
      :sort-desc="sortDesc"
      tbody-class="tbodyOuterBeige"
      thead-class="innerHead"
      :items="blockingObjects"
      :fields="fields"
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
      <template slot="waiterThreadCount" slot-scope="data">
        <span>{{data.item.waiterThreadCount}}</span>
                <i style="padding-left:5px;color:#d19b3d"
          v-if="data.item.waiterThreadCount>0"
          class="fa fa-exclamation-triangle"
          aria-hidden="true"
        ></i>

      </template>
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
  </div>
</template>
<script>
import apiGateway from "@/server-communication/api-gateway";

export default {
  name: "blocking-objects-analyzer",
  components: {},
  data: function() {
    return {
      blockingObjects: [],
      fields: {
        show_details: {
          label: "",
          tdClass: "tableDetailColumn"
        },
        objectAddress: {
          label: "Address",
          sortable: true,
          tdClass: "tableMinColWidth"
        },

        recursionCount: {
          label: "Recursion",
          sortable: true,
          tdClass: "tableMinColWidth"
        },
        locked: {
          label: "Locked",
          sortable: true,
          tdClass: "tableMinColWidth"
        },
        ownerThreadCount: {
          label: "Owner Threads",
          sortable: true,
          tdClass: "tableMinColWidth"
        },
        waiterThreadCount: {
          label: "Waiter Threads",
          sortable: true,
          tdClass: "tableMinColWidth"
        },
        reason: {
          label: "Reason",
          sortable: true
        }
      },

      sortDesc: true
    };
  },
  methods: {},
  mounted() {
    this.$loadingIndicatorHelper.show(this);
    apiGateway
      .getBlockingObjects(this.$route.params.sessionId)
      .then(response => {
        this.blockingObjects = response.data;
        this.$loadingIndicatorHelper.hide(this);
      })
      .catch(error => {
        this.blockingObjects = [];
        this.$loadingIndicatorHelper.hide(this);
      });
  }
};
</script>
getBlockingObjects