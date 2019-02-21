<template>
  <div class="container-fluid pt-80">
    <div>
      <i class="fa fa-paw fa-lg header-icon"></i>
      <h5 class="d-inline-block">Stack Trace Analyzer</h5>
    </div>
    <hr>

    <ul class="nav nav-tabs" role="tablist">
      <li class="nav-item">
        <a
          class="nav-link active"
          href="#profile"
          role="tab"
          data-toggle="tab"
        >Method hit counts in current threads</a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          href="#buzz"
          role="tab"
          data-toggle="tab"
        >Exact match call stacks in threads</a>
      </li>
    </ul>

    <!-- Tab panes -->
    <div style="padding-top:10px" class="tab-content">
      <div role="tabpanel" class="tab-pane fade in active show" id="profile">
        <template>
          <b-table
            small
            hover
            :items="callCountList"
            :fields="callCountFields"
            tbody-class="tbodyOuterBeige"
            thead-class="tHead"
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
              <strong style="padding-left: 2px;padding-bottom: 5px;">Seen in these threads (OS Id)</strong>
              <div
                class="row"
                style="background-color:white;border-radius: 5px;margin: 0px !important;padding: 2px;"
              >
                <div
                  class="col-md-1"
                  v-for="item in row.item.seenInThreads"
                  :key="item"
                >{{getFormattedThreadId(item)}}</div>
              </div>
            </template>
          </b-table>
        </template>
      </div>
      <div role="tabpanel" class="tab-pane fade" id="buzz">
        <b-table
          small
          hover
          :items="exactMatchList"
          :fields="exactMatchFields"
          tbody-class="tbodyOuterBeige"
          thead-class="tHead"
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
              <ul style="font-family:consolas; list-style-type: none;padding-left:0px">
                <li
                  style="white-space:pre"
                  class="col-md-1"
                  v-for="(item,index) in row.item.callStack"
                  :key="index"
                >{{" ".repeat(index) + item}}</li>
              </ul>
            </div>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>
<script>
import numberHelper from "@/helpers/number-helper";
import apiGateway from "@/server-communication/api-gateway";

export default {
  name: "stack-trace-analyzer",
  components: {},
  data: function() {
    return {
      exactMatchData: [],
      exactMatchList: [],
      exactMatchFields: {
        show_details: {
          label: "",
          tdClass: "tableDetailColumn"
        },
        numberOfThreads:{
          label: "# Threads",
        },
        osThreadIds: {
          label: "OS Thread Ids",
          formatter: value => {
            return value
              .map(item => {
                return numberHelper.decimalToHexString(item);
              })
              .join(", ");
          }
        }
      },
      callCountList: [],
      callCountFields: {
        show_details: {
          label: "",
          tdClass: "tableDetailColumn"
        },
        count: {
          label: "Hit(s)",
          sortable: true,
          tdClass: "tableMinColWidth",
          formatter: value => {
            return numberHelper.numberWithCommas(value);
          }
        },
        stackMethodDisplayString: {
          label: "Method",
          sortable: true
        },
        moduleName: {
          label: "Module Name",
          sortable: true
        }
      }
    };
  },
  methods: {
    tableRowDetailToggle: function(row) {
      row.toggleDetails();
    },
    getFormattedThreadId(id) {
      return numberHelper.decimalToHexString(id);
    }
  },
  mounted() {
    this.$loadingIndicatorHelper.show(this);
    apiGateway
      .getStackTraceAnalyze(this.$route.params.sessionId)
      .then(response => {
        this.callCountList = response.data.methodHitData;
        this.exactMatchList = response.data.exactMatchData;

        this.$loadingIndicatorHelper.hide(this);
      })
      .catch(error => {
        this.callCountList == [];
        this.exactMatchData == [];
        this.$loadingIndicatorHelper.hide(this);
      });
  }
};
</script>


 