<template>
  <div>
    <div class="hello" ref="chartdiv"></div>
    <!-- <div v-for="meal in chartData" :key="meal.id">{{ meal.date }}:{{ meal.calories }}</div>-->
  </div>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);
export default {
  name: "XYChart",
  props: ["chartData", "datesBundle"],
  data() {
    return {};
  },
  computed: {
    filteredArrayData: function () {
      let newArray = this.chartData.slice();
      var startDate = this.datesBundle[0];
      var endDate = this.datesBundle[1];
      newArray = this.chartData.filter(function (obj) {
        return obj.date >= startDate && obj.date <= endDate;
      });
      return newArray;
    },
    chartDataEdited: function () {
      if (this.filteredArrayData.length < 1) {
        var result = this.chartData;
      } else {
        result = this.filteredArrayData;
      }
      return result;
    },
  },

  methods: {
    createChart(value) {
      let chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart);
      chart.paddingRight = 20;
      chart.data = value;
      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = "NUTRIENTS";
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;
      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "calories";
      series.tooltipText = "{valueY.value}";
      chart.cursor = new am4charts.XYCursor();
      series.tooltip.getFillFromObject = false;
      series.tooltip.background.fill = am4core.color("#fff");
      series.tooltip.label.fill = am4core.color("#00");
      var bullet = series.bullets.push(new am4charts.CircleBullet());
      bullet.circle.stroke = am4core.color("#fff");
      bullet.circle.strokeWidth = 2;
      let scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series);
      chart.scrollbarX = scrollbarX;
      this.chart = chart;
    },
    beforeDestroy() {
      if (this.chart) {
        this.chart.dispose();
      }
    },
  },
  watch: {
    chartDataEdited(value) {
      this.createChart(value);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  width: 100%;
  height: 500px;
}
</style>