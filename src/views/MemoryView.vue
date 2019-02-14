

<template>
  <div class="container-fluid pt-80">
    <div>
      <i class="fa fa-microchip fa-lg header-icon"></i>
      <h5 class="d-inline-block">Memory Statistics</h5>
    </div>
    <hr>
    <ul class="nav nav-tabs" role="tablist">
      <li class="nav-item">
        <a
          class="nav-link active"
          href="#profile"
          role="tab"
          data-toggle="tab"
        >Type statistics for application</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#buzz" role="tab" data-toggle="tab">Heap segment usage</a>
      </li>
    </ul>
    <div style="padding-top:10px" class="tab-content">
      <div role="tabpanel" class="tab-pane fade in active show" id="profile">
        <div class="pb-2">
          <span style="line-height: 2.5;" class="pr-2">
            <strong>Memory Regions:</strong>
          </span>
          <b-form-select
            style="width:300px"
            v-model="selectedMemoryRegion"
            :options="memoryRegionSelectOptionsForTypeStats"
            size="sm"
          />
        </div>
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
            :fields="statsFields"
            :items="statsItems"
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
            <template slot="row-details" slot-scope="row">{{row}}</template>
          </b-table>
        </template>
      </div>
      <div role="tabpanel" class="tab-pane fade" id="buzz">
        <SegmentChart :segmentUsageArray="segmentUsageArray" :totalHeap="totalHeap"/>
      </div>
    </div>
  </div>
</template>
<script>
import SegmentChart from "@/components/Memory/SegmentChart.vue";
import apiGateway from "@/server-communication/api-gateway";
import numberHelper from "@/helpers/number-helper";

export default {
  components: {  SegmentChart },
  methods: {
    tableRowDetailToggle: function(row) {
      row.toggleDetails();
    },
    generatePresentationData: function(statsByTypeRaw) {
      var returnValue = [];
      for (let property in statsByTypeRaw) {
        returnValue.push({
          typeName: property.charAt(0).toUpperCase() + property.slice(1),
          count: statsByTypeRaw[property].count,
          size: statsByTypeRaw[property].totalSize,
          percentage: statsByTypeRaw[property].percentage
        });
      }
      return returnValue;
    }
  },
  data: function() {
    let data = {
      legendData: ["Seee1", "Seee2"],
      seriesData: [{ name: "Seee1", value: 50 }, { name: "Seee2", value: 20 }],
      selected: { Seee1: true, Seee2: true }
    };

    return {
      selectedMemoryRegion: "Whole",
      memoryRegionSelectOptionsForTypeStats: [
        { value: "Whole", text: "Whole application memory" },
        { value: "Gen0", text: "Generation 0 Objects" },
        { value: "Gen1", text: "Generation 1 Objects" },
        { value: "Gen2", text: "Generation 2 Objects" },
        { value: "Gen3", text: "Large Object Heap" }
      ],
      segmentUsageArray: [],
      totalHeap:0,
      responseData: {},
      sortDesc: true,
      statsItems: [],
      statsFields: {
        show_details: {
          label: "",
          tdClass: "tableDetailColumn"
        },
        count: {
          label: "Count",
          sortable: true,
          tdClass: "tableMinColWidth",
          formatter: value => {
            return numberHelper.numberWithCommas(value);
          }
        },
        percentage: {
          label: "Percentage",
          sortable: true,
          tdClass: "tableMinColWidth",
          formatter: value => {
            return `${value}%`;
          }
        },
        size: {
          label: "Size",
          sortable: true,
          formatter: value => {
            return numberHelper.readableBytes(value);
          }
        },
        typeName: {
          label: "Type",
          sortable: true
        }
      }
    };
  },
  watch: {
    selectedMemoryRegion: function(val) {
      switch (val) {
        case "Whole":
          this.statsItems = this.generatePresentationData(
            this.responseData.statsByType
          );
          break;
        case "Gen0":
          this.statsItems = this.generatePresentationData(
            this.responseData.statsByTypeGen0
          );
          break;
        case "Gen1":
          this.statsItems = this.generatePresentationData(
            this.responseData.statsByTypeGen1
          );
          break;
        case "Gen2":
          this.statsItems = this.generatePresentationData(
            this.responseData.statsByTypeGen2
          );
          break;
        case "Gen3":
          this.statsItems = this.generatePresentationData(
            this.responseData.statsByTypeGen3
          );
          break;
      }
    }
  },
  mounted() {
    this.$loadingIndicatorHelper.show(this);
    apiGateway
      .getMemoryStats(this.$route.params.sessionId)
      .then(response => {

        this.segmentUsageArray = [
          response.data.lohLength,
          response.data.gen2Length,
          response.data.gen1Length,
          response.data.gen0Length
        ];

        this.totalHeap=response.data.totalHeapSize;

        this.statsItems = this.generatePresentationData(
          response.data.statsByType
        );
        this.responseData = response.data;
        this.$loadingIndicatorHelper.hide(this);
      })
      .catch(error => {
        this.statsItems = [];
        this.$loadingIndicatorHelper.hide(this);
      });
  }
};
</script>


