<template>
  <div>
    <div class="totalSizeLabel">Total Size: {{totalHeapSizeComputed}}</div>
    <v-chart autoresize :options="option"/>
  </div>
</template>
<script>
import "echarts/lib/chart/bar";
import numberHelper from "@/helpers/number-helper";

export default {
  name: "SegmentChart",
  props: ["segmentUsageArray", "totalHeap"],
  methods: {},
  data: function() {
    return {
      option: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: ["Length"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value"
        },
        yAxis: {
          type: "category",
          data: ["LOH", "Gen 2", "Gen 1", "Gen 0"]
        },
        series: [
          {
            name: "Length",
            type: "bar",
            label: {
              normal: {
                itemStyle: { color: "green" },
                show: true,
                position: "insideRight",
                formatter: function(item) {
                  return numberHelper.readableBytes(item.value);
                }
              }
            },
            data: this.segmentUsageArray
          }
        ]
      }
    };
  },
  computed: {
    totalHeapSizeComputed: function() {
      return numberHelper.readableBytes(this.totalHeap);
    }
  },
  mounted() {},
  watch: {
    segmentUsageArray: function(val) {
      var dataArray = [];
      val.forEach(item => {
        dataArray.push({
          value: item,
          itemStyle: { color: "#23819C" }
        });
      });

      this.option.series[0].data = dataArray;
    }
  }
};
</script>



<style scoped>
.totalSizeLabel {
  padding-left: 26px;
  font-weight: bold;
  font-size: 1rem;
  padding-top: 10px;
}
</style>


