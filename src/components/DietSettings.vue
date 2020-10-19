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
    <v-form ref="form">
      <v-container>
        <v-row class="formrow">
          <v-col class="col1" v-if="preferenceExists === false">
            <v-col class="inputCol" cols="12" sm="6" md="6">
              <v-text-field
                :rules="inputRules"
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
                :rules="inputRules"
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
                :rules="inputRules"
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
                :rules="inputRules"
                label="Fat"
                v-model="fats"
                hint="grams"
                type="number"
                outlined
                persistent-hint
              ></v-text-field>
            </v-col>

            <v-row justify="center">
              <v-btn @click="postOrPatch(); snackbar=true" >Submit</v-btn>
            </v-row>
          </v-col>
          <v-col class="col2" v-else-if="preferenceExists === true">
            <v-row class="mx-5 px-5 justify-center">
              <h2 class="title">
                Your daily intake should not exceed following:
              </h2>
            </v-row>

            <v-row class="scsr">
              <v-card class="cardClass">
                <v-card-title class="titleClass">Calories</v-card-title>
                <v-card-text class="subClass"
                  >Daily limit: {{ preferences.calories }}</v-card-text
                >
              </v-card>
              <v-card class="cardClass proteinCard">
                <v-card-title class="titleClass">Protein</v-card-title>
                <v-card-text class="subClass"
                  >Daily limit: {{ preferences.protein }}</v-card-text
                >
              </v-card>
              <v-card class="cardClass carbsCard">
                <v-card-title class="titleClass">Carbs</v-card-title>
                <v-card-text class="subClass"
                  >Daily limit: {{ preferences.carbs }}</v-card-text
                >
              </v-card>
              <v-card class="cardClass fatsCard">
                <v-card-title class="titleClass">Fats</v-card-title>
                <v-card-text class="subClass"
                  >Daily limit: {{ preferences.fats }}</v-card-text
                >
              </v-card>
            </v-row>
          </v-col>
        </v-row>
      </v-container></v-form
    >
    <v-row class="mx-5 px-5 justify-center" v-if="preferenceExists === true">
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
    <v-snackbar
      v-model="snackbar"
    
      :timeout="timeout"
    >
      {{ snackText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="primary"
          text
          v-bind="attrs"
          @click="snackbar = false; doReroute()"
        >
          Dashboard
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      inputRules: [(v) => !!v || "No empty entries"],
      preferences: {},
      snackbar: false,
      calories: "",
      protein: "",
      carbs: "",
      fats: "",
      timeout: 10000,
      preferenceExists: false,
      countUpdate: "",
      snackText:"You should now proceed to Dashboard"
    };
  },
  computed: {
    userName: function() {
      return localStorage.getItem("userName");
    },
  },

  methods: {
    doReroute(){
      this.$router.push("/dashboard")
    },
    postOrPatch() {
      if (this.preferenceExists == true) {
        this.putData();
      } else this.uploadData();
    },

    async putData() {
      if (this.$refs.form.validate()) {
        await axios.put(
          window.baseUrl + "user_preference",
          {
            user_preference: {
              calories: this.calories,
              protein: this.protein,
              carbs: this.carbs,
              fats: this.fats,
            }
          }
        ),
          this.countUpdate++;
      }
    },

    async uploadData() {
      if (this.$refs.form.validate()) {
        await axios.post(
          window.baseUrl + "user_preference",
          {
            user_preference: {
              calories: this.calories,
              protein: this.protein,
              carbs: this.carbs,
              fats: this.fats,
            }
          }
        ),
          this.countUpdate++;
      }
    },
    async getPreferences() {
      let response = await axios.get(
        window.baseUrl + "user_preference"
      );
      this.preferences = response.data;
      if (this.preferences) {
        this.preferenceExists = true;
      }
    },

    dumpData() {
      axios.delete(
        window.baseUrl + "user_preference"
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
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.scsr {
  display: flex;
  flex-grow: 1 1 auto;
  justify-content: space-around;
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
