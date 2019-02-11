

<template>
  <div class="container-fluid pt-80">
    <h5>Memory</h5>
    <hr>
    <TopBar/>
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
        <a class="nav-link" href="#buzz" role="tab" data-toggle="tab">Heap segment details</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#references" role="tab" data-toggle="tab">references</a>
      </li>
    </ul>

    <!-- Tab panes -->
    <div style="padding-top:10px" class="tab-content">
      <div role="tabpanel" class="tab-pane fade in active show" id="profile">
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
            <template slot="row-details" slot-scope="row">
              {{row}}
            </template>
          </b-table>
        </template>
      </div>
      <div role="tabpanel" class="tab-pane fade" id="buzz">
        <v-chart :options="options"/>
      </div>
      <div role="tabpanel" class="tab-pane fade" id="references">ccc</div>
    </div>
  </div>
</template>
<script>
import TopBar from "@/components/TopBar.vue";
import apiGateway from "@/server-communication/api-gateway";
import numberHelper from "@/helpers/number-helper";

import "echarts/lib/chart/pie";
import "echarts/lib/component/legend";
import "echarts/lib/component/legendScroll";

export default {
  components: { TopBar },
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
          size: statsByTypeRaw[property].totalSize
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
      },
      options: {
        title: {
          text: "Text for chart",
          subtext: "Sub text for chart",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          right: 10,
          top: 20,
          bottom: 20,
          data: data.legendData,
          selected: data.selected
        },
        series: [
          {
            name: "Serie Name",
            type: "pie",
            radius: "55%",
            center: ["40%", "50%"],
            data: data.seriesData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      }
    };
  },
  mounted () {
    this.$loadingIndicatorHelper.show(this);
    apiGateway
      .getMemoryStats(this.$route.params.sessionId)
      .then(response => {
        this.statsItems = this.generatePresentationData(
          response.data.statsByType
        );
        this.$loadingIndicatorHelper.hide(this);
      })
      .catch(error => {
        this.statsItems = [];
        this.$loadingIndicatorHelper.hide(this);
      });
  }
};
</script>


