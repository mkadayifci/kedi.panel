

<template>
  <div class="container-fluid pt-80">
    <h5>Memory</h5>
    <hr>
    <TopBar/>Memory
    <v-chart :options="options"/>
  </div>
</template>
<script>
import TopBar from "@/components/TopBar.vue";
import "echarts/lib/chart/pie";
import "echarts/lib/component/legend";
import "echarts/lib/component/legendScroll";

export default {
  components: { TopBar },
  data: function() {
    let data = {
      legendData: ["Seee1","Seee2"],
      seriesData: [{ name: "Seee1", value: 50 }, { name: "Seee2", value: 20 }],
      selected: {Seee1:true,Seee2:true}
    };

   
    return {
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
  }
};
</script>


