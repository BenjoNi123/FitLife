<template>
  <div>
    <div class="hello" id="chartdiv"></div>
  </div>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";
am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_kelly);
export default {
  props: ["chartData", "datesBundle", "randomMeals", "dataSet"],
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
  beforeDestroy() {
    am4core.disposeAllCharts();
  },
  methods: {
    createChart(value) {
      let chart = am4core.create("chartdiv", am4charts.XYChart);
      //this.sortMyArray();
      chart.paddingRight = 20;
      chart.data = value;
      //create AXES
      var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "date";
      categoryAxis.renderer.grid.template.location = 0;

      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.inside = true;
      valueAxis.renderer.labels.template.disabled = true;
      valueAxis.min = 0;
      valueAxis.extraMax = 0.1;
      valueAxis.calculateTotals = true;
      valueAxis.title.text = "NUTRIENTS";
      // Create series
      function createSeries(field, name) {
        // Set up series
        var series = chart.series.push(new am4charts.ColumnSeries());
        series.name = name;
        series.dataFields.valueY = field;
        series.dataFields.categoryX = "date";
        series.sequencedInterpolation = true;
        // Make it stacked
        series.stacked = true;
        // Configure columns
        series.columns.template.width = am4core.percent(60);
        series.columns.template.tooltipText =
          "[bold]{name}[/]\n[font-size:14px]{food}: {valueY}";
        // Add label
        var labelBullet = series.bullets.push(new am4charts.LabelBullet());
        labelBullet.label.text = "{valueY}";
        labelBullet.label.fill = am4core.color("#fff");
        labelBullet.locationY = 0.5;
        return series;
      }
      createSeries("protein", "Protein");
      createSeries("carbs", "Carbs");
      createSeries("fats", "Fats");
      // Create series for total
      var totalSeries = chart.series.push(new am4charts.ColumnSeries());
      totalSeries.dataFields.valueY = "none";
      totalSeries.dataFields.categoryX = "date";
      totalSeries.stacked = true;
      totalSeries.hiddenInLegend = true;
      totalSeries.columns.template.strokeOpacity = 0;
      var totalBullet = totalSeries.bullets.push(new am4charts.LabelBullet());
      totalBullet.dy = -20;
      totalBullet.label.text = "{valueY.total}";
      totalBullet.label.hideOversized = false;
      totalBullet.label.fontSize = 18;
      totalBullet.label.background.fill = totalSeries.stroke;
      totalBullet.label.background.fillOpacity = 0.2;
      totalBullet.label.padding(5, 10, 5, 10);
      //ADD CURSOR
      chart.cursor = new am4charts.XYCursor();
    },
  },
  watch: {
    dataSet(value) {
      if (value == true) {
        this.createChart(this.chartDataEdited);
      } else {
        this.createChart(this.randomMeals);
      }
    },
    chartDataEdited(value) {
      this.createChart(value);
    },
    randomMeals(value) {
      this.createChart(value);
    },
  },
};
</script>

<style scoped>
.hello {
  width: 100%;
  height: 500px;
}
</style>