<template>
  <div class="container-fluid pt-80">
    <h5>Stack Trace Analyzer</h5>
    <hr>
    <TopBar/>

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
            <template slot="row-details" slot-scope="row">{{row.item.seenInThreads}}</template>
          </b-table>
        </template>
      </div>
      <div role="tabpanel" class="tab-pane fade" id="buzz"></div>
    </div>
  </div>
</template>
<script>
import TopBar from "@/components/TopBar.vue";
import numberHelper from "@/helpers/number-helper";
import apiGateway from "@/server-communication/api-gateway";

export default {
  name: "stack-trace-analyzer",
  components: { TopBar },
  data: function() {
    return {
      exactMatchData: [],
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
        seenInThreads: {
          label: "Seen in threads (OS Id)",
          sortable: true,
          formatter: value => {
            return value;
          }
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
    }
  },
  mounted() {
    this.$loadingIndicatorHelper.show(this);
    apiGateway
      .getStackTraceAnalyze(this.$route.params.sessionId)
      .then(response => {
        this.callCountList = response.data.methodHitData;
        this.exactMatchData = response.data.exactMatchData;

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


 