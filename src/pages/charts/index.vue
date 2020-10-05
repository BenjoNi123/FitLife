<template>
  <div id="parent">
    <div class="charts">
      <calories-chart
        :dataSet="dataSet"
        :randomMeals="randomMeals"
        :datesBundle="datesbundle"
        :chartData="sortedMeals"
      ></calories-chart>
      <stacks-chart
        :dataSet="dataSet"
        :randomMeals="randomMeals"
        :datesBundle="datesbundle"
        :chartData="sortedMeals"
      ></stacks-chart>
      <h2 style="text-align: center">
        Please pick two dates to filter chart data between them
      </h2>
      <v-row class="dataControl">
        <v-col>
          <datePicker @datesArray="filterArray" :msg="dates"></datePicker>
        </v-col>
      </v-row>
    </div>

    <div class="sideBar">
      <sidebar
        @dooriginal="changeData"
        @dorandomize="randomMealsGenerator()"
      ></sidebar>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import caloriesChart from "./caloriesChart";
import stacksChart from "./stacksChart";
import datePicker from "./datePicker";
import sidebar from "../../components/sidebar";

export default {
  components: { caloriesChart, stacksChart, datePicker, sidebar },
  data() {
    return {
      meals: [],
      randomMeals: [],
      datesbundle: [],
      dates: [],
      dataSet: true,
    };
  },
  computed: {
    sortedMeals() {
      return this.sumMeals(this.meals);
    },
  },

  created() {
    this.getMeals(this.getUserPreferences());
  },
  methods: {
    changeData() {
      this.dataSet = true;
    },
    sumMeals(meals) {
      meals = meals.slice();
      let dates = new Set();
      meals.forEach((element) => {
        dates.add(element.date);
      });
      let summedCalories = [];
      dates.forEach((date) => {
        let caloriesSum = 0;
        let proteinSum = 0;
        let fatsSum = 0;
        let carbsSum = 0;
        for (let meal of meals) {
          if (meal.date === date) {
            caloriesSum += +meal.calories;
            proteinSum += +meal.protein;
            fatsSum += +meal.fats;
            carbsSum += +meal.carbs;
          }
        }
        summedCalories.push({
          calories: caloriesSum,
          date: date,
          protein: proteinSum,
          carbs: carbsSum,
          fats: fatsSum,
        });
      });
      let result = summedCalories.sort(function (a, b) {
        var dateA = new Date(a.date);
        var dateB = new Date(b.date);

        return dateA - dateB;
      });

      return result;
    },
    formatDate(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    },
    filterArray(msg) {
      this.datesbundle = msg;
    },
    randomMealsGenerator() {
      this.dataSet = false;
      this.randomMeals = [];
      for (let i = 0; i < 10; i++) {
        for (let k = 0; k < 3; k++) {
          this.randomMeals.push({
            food: "food" + k,
            calories: Math.floor(Math.random() * (1000 - 300 + 1) + 300),
            protein: Math.floor(Math.random() * 200),
            carbs: Math.floor(Math.random() * 300),
            fats: Math.floor(Math.random() * 100),
            date: this.formatDate(new Date(2020, 0, i + 1)),
          });
        }
      }

      this.randomMeals = this.sumMeals(this.randomMeals);
    },

    async getMeals() {
      let response = await axios.get("http://localhost:3000/meals/");
      this.meals = response.data;
    },
    async getUserPreferences() {
      let response = await axios.get("http://localhost:3000/userPreferences/");
      this.userPreferences = response.data;
    },
  },
  watch: {
    datesbundle() {
      if (this.datesbundle[0] > this.datesbundle[1]) {
        [this.datesbundle[0], this.datesbundle[1]] = [
          this.datesbundle[1],
          this.datesbundle[0],
        ];
      }
    },
  },
};
</script>

<style scoped>
.dataControl {
  display: flex;
  justify-content: space-around;
}
.buttonClass {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
