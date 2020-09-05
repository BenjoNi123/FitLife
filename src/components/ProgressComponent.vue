<template>
  <div>
    <div>
      <div class="progressComponent">
        <v-row class="progressRow1">
          <div class="progressCards proteinCard">
            <div class="cardTitle white--text">Protein</div>
            <v-progress-circular
              id="ProteinCircular"
              :value="proteinVal"
              :size="circSize"
              :width="circWidth"
              color="white"
            >{{ proteinVal }}%</v-progress-circular>
          </div>
          <div class="progressCards carbsCard">
            <div class="cardTitle white--text">Carbs</div>
            <v-progress-circular
              id="CarbCircular"
              :value="carbsVal"
              :size="circSize"
              :width="circWidth"
              color="white"
            >{{ carbsVal }}%</v-progress-circular>
          </div>
          <div class="progressCards fatsCard">
            <div class="cardTitle white--text">Fats</div>
            <v-progress-circular
              id="FatCircular"
              :value="fatsVal"
              :size="circSize"
              :width="circWidth"
              color="white"
            >{{ fatsVal }}%</v-progress-circular>
          </div>
        </v-row>
        <v-row class="progressRow2">
          <v-progress-linear
            class="progressLinear"
            color="secondary lighten-3"
            :height="height"
            :value="calVal"
          >{{ calVal }}% Calories</v-progress-linear>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["preferences", "meals"],
  data() {
    return {
      height: 20,
      circSize: 100,
      circWidth: 7,
      proteinVal: 0,
      carbsVal: 0,
      fatsVal: 0,

      calVal: 0,
    };
  },

  methods: {
    calculateProgress(sum, divisor) {
      let total = 0;
      let totalVal = 0;
      for (let i = 0; i < this.meals.length; i++) {
        let value = parseInt(this.meals[i][sum]);
        if (!isNaN(value)) {
          total += value;
        }
      }
      totalVal = (total / divisor) * 100;
      totalVal = totalVal.toFixed(2);
      return totalVal;
    },

    calculateCalories() {
      this.calVal = this.calculateProgress(
        "calories",
        this.preferences[0].calories
      );
    },
    calculateProtein() {
      this.proteinVal = this.calculateProgress(
        "protein",
        this.preferences[0].protein
      );
    },
    calculateCarbs() {
      this.carbsVal = this.calculateProgress(
        "carbs",
        this.preferences[0].carbs
      );
    },
    calculateFats() {
      this.fatsVal = this.calculateProgress("fats", this.preferences[0].fats);
    },
  },
  watch: {
    meals() {
      this.calculateProgress(),
        this.calculateCalories(),
        this.calculateProtein(),
        this.calculateCarbs(),
        this.calculateFats();
    },
  },
};
</script>
<style>
.progressCards {
  display: flex;
  padding: 24px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  border-radius: 16px;
  justify-content: center;
  width: 100%;
  max-width: 25%;
}

.proteinCard {
  background: #2193b0; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to bottom right,
    #6dd5ed,
    #2193b0
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to bottom right,
    #6dd5ed,
    #2193b0
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.carbsCard {
  background: #fdc830; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to bottom right,
    #f37335,
    #fdc830
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to bottom right,
    #f37335,
    #fdc830
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.fatsCard {
  background: #ee0979; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to bottom right,
    #ff6a00,
    #ee0979
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to bottom right,
    #ff6a00,
    #ee0979
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.progressRow1 {
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding-top: 5%;
  padding-bottom: 5%;
}
.progressComponent {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 75vw;
  justify-content: center;
  align-items: center;
}

.progressRow2 {
  display: flex;
  justify-content: center;
  width: 94%;
  padding-top: 5%;
  padding-bottom: 5%;
  max-width: 75vw;
}

.progressLinear {
  border-radius: 16px;
}
.cardTitle {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5%;
}
@media screen and (max-width: 1000px) {
  .progressCards {
    flex-direction: column;
    align-items: center;
  }
}
@media screen and (max-width: 600px) {
  .progressCards {
    max-width: 100%;
    margin-top: 16px;
    flex-direction: row;
  }
  .progressRow2 {
    width: 100%;
  }
}
</style>
