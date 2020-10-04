/* eslint-disable no-console */
<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on: dialog }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn
              active
              large
              rounded
              color="primary"
              dark
              v-on="{ ...dialog, ...tooltip }"
              >Add Meal</v-btn
            >
          </template>
          <span>Click to add a meal</span></v-tooltip
        >
      </template>
      <v-card>
        <v-card-title class="justify-center">
          <span class="mx-5">Add a Meal</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-form ref="form" class="ma-3 px-2">
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  :rules="inputRules"
                  label="Meal"
                  v-model="foodName"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  :rules="inputRules"
                  label="Calories"
                  v-model="calories"
                  hint="kg"
                  type="number"
                  persistent-hint
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  :rules="inputRules"
                  label="Protein"
                  v-model="protein"
                  hint="cc"
                  type="number"
                  persistent-hint
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  :rules="inputRules"
                  label="Carbs"
                  v-model="carbs"
                  hint="cc"
                  type="number"
                  persistent-hint
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  :rules="inputRules"
                  label="Fats"
                  v-model="fats"
                  hint="cc"
                  type="number"
                  persistent-hint
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-menu
                  v-model="menu2"
                  color="secondary lighten-3"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      color="secondary lighten-3"
                      v-model="date"
                      label="Date"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    color="secondary lighten-3"
                    v-model="date"
                    @input="menu2 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" text @click="dialog = false"
            >Close</v-btn
          >
          <v-btn color="primary darken-1" text @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    dialog: false,
    date: new Date().toISOString().substr(0, 10),
    // eslint-disable-next-line no-undef
    menu2: false,
    foodName: "",
    calories: null,
    protein: null,
    carbs: null,
    fats: null,
    inputRules: [(v) => !!v || "No empty entries"],
  }),

  methods: {
    async save() {
      if (this.$refs.form.validate()) {
        await axios.post("http://localhost:3000/meals", {
          food: this.foodName,
          calories: this.calories,
          protein: this.protein,
          carbs: this.carbs,
          fats: this.fats,

          date: this.date,
        });

        this.dialog = false;
        this.$emit("onSaveComplete", true);
        (this.foodName = ""),
          (this.calories = ""),
          (this.protein = ""),
          (this.carbs = ""),
          (this.fats = "");
      }
    },
  },
};
</script>

