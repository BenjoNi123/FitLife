<template>
  <div>
    <div v-if="loginStatus">
      <v-app class="homeCss">
        <v-container class="containerClass">
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <new-item @onSaveComplete="getMeals" class="mt-4"></new-item>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <div class="dateRow">
                <v-menu
                  v-model="menu2"
                  color="primary lighten-3"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template
                    v-slot:activator="{ on, attrs }"
                    class="dateTemplate"
                  >
                    <v-btn
                      color="primary lighten-2"
                      dark
                      class="dateTextField"
                      v-model="date"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      rounded
                      >Select Date</v-btn
                    >
                  </template>
                  <v-date-picker
                    color="primary lighten-3"
                    v-model="date"
                    @input="menu2 = false"
                  ></v-date-picker>
                </v-menu>
              </div>
            </v-col>
          </v-row>

          <v-row class="progressRow">
            <progress-component
              :meals="meals"
              :preferences="userPreferences"
            ></progress-component>
          </v-row>
          <v-row>
            <div class="tableComponent">
              <table-component
                class="tableCss"
                :showDate="date"
                @onSaveComplete="getMeals"
                :tableData="meals"
              ></table-component>
            </div>
          </v-row>
        </v-container>
      </v-app>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import newItem from "../../components/NewItem";
import tableComponent from "../../components/TableComponent";
import progressComponent from "../../components/ProgressComponent";

export default {
  components: {
    newItem,
    tableComponent,
    progressComponent,
  },
  props: ["loginStatus"],
  data() {
    return {
      meals: [],
      userPreferences: [],
      date: new Date().toISOString().substr(0, 10),
      menu2: false,
    };
  },

  created() {
    this.getUserPreferences();
    this.getMeals();
  },

  methods: {
    async getMeals() {
      let response = await axios.get(
        "http://localhost:3000/meals/?date=" + this.date
      );
      this.meals = response.data;
      this.$emit("progressUpdate", true);
    },
    async getUserPreferences() {
      let response = await axios.get(
        "http://localhost:3000/userPreferences/?username=" +
          localStorage.getItem("userName")
      );
      this.userPreferences = response.data;

      if (this.userPreferences.length < 1) {
        this.$router.push({ path: `/myprofile` });
      }
    },
  },

  watch: {
    date() {
      this.getMeals();
    },
  },
};
</script>

<style scoped>
.homeCss {
  background-color: #f9f9f9;
}

.firstRow {
  display: flex;
  max-width: 75vw;
  justify-content: space-around;
}

.dateRow {
  display: flex;
  justify-content: center;

  width: 100%;
}
.progressRow {
  display: flex;
  justify-content: center;
}
.tableComponent {
  display: flex;
  justify-content: center;
  width: 100%;
  padding-left: 3%;
  padding-right: 3%;
  padding-top: 5%;
  padding-bottom: 5%;
}
.containerClass {
  max-width: 75vw;
}
.dateLabel .v-text-field .v-label--active {
  max-width: 120%;
  top: 0px;
}
.dateTextField {
  margin-top: 16px;
}
.tableCss {
  width: 94vw;
}
.alertClass {
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 600px) {
  .tableCss {
    width: 100vw;
  }
  .tableComponent {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
