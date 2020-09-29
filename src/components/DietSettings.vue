<template>
  <v-app>
    <v-row class="headTitle">
      <h1>
        Welcome
        <b>{{ this.userName }}</b>
      </h1>
      <p v-if="preferenceExists === false">
        Please fill the form below with information about your daily preference
        of
      </p>
    </v-row>
    <v-row class="formrow">
      <v-col class="col1" v-if="preferenceExists === false">
        <v-col class="inputCol" cols="12" sm="6" md="6">
          <v-text-field
            label="Calories"
            v-model="calories"
            hint="kcal"
            type="number"
            outlined
            persistent-hint
          ></v-text-field>
        </v-col>
        <v-col class="inputCol" cols="12" sm="6" md="6">
          <v-text-field
            label="Protein"
            v-model="protein"
            hint="grams"
            type="number"
            outlined
            persistent-hint
          ></v-text-field>
        </v-col>
        <v-col class="inputCol" cols="12" sm="6" md="6">
          <v-text-field
            label="Carbs"
            v-model="carbs"
            hint="grams"
            type="number"
            outlined
            persistent-hint
          ></v-text-field>
        </v-col>
        <v-col class="inputCol" cols="12" sm="6" md="6">
          <v-text-field
            label="Fat"
            v-model="fats"
            hint="grams"
            type="number"
            outlined
            persistent-hint
          ></v-text-field>
        </v-col>

        <v-row justify="center">
          <v-btn @click="postOrPatch">Submit</v-btn>
        </v-row>
      </v-col>
      <v-col class="col2" v-else-if="preferenceExists === true">
        <v-row class="scfr">
          <h2 class="title">Your daily intake should not exceed following:</h2>
        </v-row>

        <v-row class="scsr">
          <v-card class="cardClass">
            <v-card-title class="titleClass">Calories</v-card-title>
            <v-card-text class="subClass"
              >Daily limit: {{ preferences[0].calories }}</v-card-text
            >
          </v-card>
          <v-card class="cardClass proteinCard">
            <v-card-title class="titleClass">Protein</v-card-title>
            <v-card-text class="subClass"
              >Daily limit: {{ preferences[0].protein }}</v-card-text
            >
          </v-card>
          <v-card class="cardClass carbsCard">
            <v-card-title class="titleClass">Carbs</v-card-title>
            <v-card-text class="subClass"
              >Daily limit: {{ preferences[0].carbs }}</v-card-text
            >
          </v-card>
          <v-card class="cardClass fatsCard">
            <v-card-title class="titleClass">Fats</v-card-title>
            <v-card-text class="subClass"
              >Daily limit: {{ preferences[0].fats }}</v-card-text
            >
          </v-card>
        </v-row>
      </v-col>
    </v-row>
    <v-row justify="center" v-if="preferenceExists === true">
      <h4>
        If you wish to change your data please click on
        <b>Erase Data</b> button to delete it and then re-enter the data
      </h4>
    </v-row>
    <v-row justify="center">
      <v-btn v-if="preferenceExists" @click="dumpData" color="primary"
        >Erase Data</v-btn
      >
    </v-row>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      preferences: [],

      calories: "",
      protein: "",
      carbs: "",
      fats: "",

      preferenceExists: false,
      countUpdate: "",
    };
  },
  computed: {
    userName: function () {
      return localStorage.getItem("userName");
    },
  },

  methods: {
    postOrPatch() {
      if (this.preferenceExists == true) {
        this.putData();
      } else this.uploadData();
    },

    async putData() {
      await axios.put(
        "http://localhost:3000/userPreferences/?username=" + this.userName,
        {
          calories: this.calories,
          protein: this.protein,
          carbs: this.carbs,
          fats: this.fats,
        }
      ),
        this.countUpdate++;
    },

    async uploadData() {
      await axios.post("http://localhost:3000/userPreferences/", {
        username: this.userName,
        calories: this.calories,
        protein: this.protein,
        carbs: this.carbs,
        fats: this.fats,
      }),
        this.countUpdate++;
    },
    async getPreferences() {
      let response = await axios.get(
        "http://localhost:3000/userPreferences/?username=" + this.userName
      );
      this.preferences = response.data;
      if (this.preferences.length > 0) {
        this.preferenceExists = true;
      }
    },

    dumpData() {
      axios.delete(
        "http://localhost:3000/userPreferences/" + this.preferences[0].id
      ),
        (this.preferenceExists = false);
    },
  },

  created() {
    this.getPreferences();
  },
  watch: {
    countUpdate() {
      this.getPreferences();
    },
  },
};
</script>

<style>
.headTitle {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  text-align: center;
  max-height: 30%;
  margin: 5%;
  font-size: 0.8rem !important;
  line-height: 2.5rem;
}

.col1 {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.formrow {
  display: flex;
  justify-content: space-between;
}
.inputCol {
  flex: 1 1 auto;
}
.colcontrol {
  max-width: 50%;
  justify-content: center;
}

.scfr {
  display: flex;
  align-items: center;
  justify-content: center;
}
.scsr {
  display: flex;
  flex-grow: 1 1 auto;
  justify-content: space-around;
  /*display: flex;
  flex-grow: 1 1 auto;
  max-width: 70%;
  justify-content: space-between;*/
}

.cardClass {
  display: flex;
  justify-content: space-between;
  max-width: 75%;
  width: 100%;
  margin-top: 16px;
}

.titleClass {
  max-width: 50%;
  width: 100%;
}
.subClass {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  font-weight: 700;
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
</style>
