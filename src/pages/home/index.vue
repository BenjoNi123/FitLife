<template>
  <div>
    <v-app class="homeCss">
      <v-container class="containerClass">
        <v-row class="firstRow">
          <v-col lg="4" cols="6" sm="6" md="4">
            <new-item @onSaveComplete="getMeals" class="mt-4"></new-item>
          </v-col>
          <v-col lg="4" cols="6" sm="6" md="4">
            <div class="dateRow">
              <v-menu
                v-model="menu2"
                color="primary lighten-1"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template
                  v-slot:activator="{ on: calendar }"
                  class="dateTemplate"
                >
                  <v-tooltip bottom
                    ><template v-slot:activator="{ on: tooltip }">
                      <v-btn
                        large
                        color="primary"
                        dark
                        class="dateTextField"
                        v-model="date"
                        readonly
                        v-on="{ ...calendar, ...tooltip }"
                        rounded
                        >Select Date</v-btn
                      >
                    </template>
                    <span>Select a date to view its data</span></v-tooltip
                  >
                </template>
                <v-date-picker
                  color="primary lighten-1"
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
  max-width: 100vw;
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
