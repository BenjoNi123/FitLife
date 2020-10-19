<template>
  <v-data-table
    :hide-default-footer="true"
    :headers="headers"
    :items="mealsArray"
    sort-by="date"
    class="tableClass elevation-10 primary lighten-1"
  >
    <template v-slot:top>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="editedItem.food"
                    label="Food"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="editedItem.calories"
                    label="Calories"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="editedItem.fats"
                    label="Fat (g)"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="editedItem.carbs"
                    label="Carbs (g)"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="editedItem.protein"
                    label="Protein (g)"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary lighten-1" text @click="close">Cancel</v-btn>
            <v-btn color="primary lighten-1" text @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-tooltip left>
        <template v-slot:activator="{ on: tooltip }">
          <v-icon v-on="tooltip" small class="mr-2" @click="editItem(item)"
            >mdi-pencil</v-icon
          >
        </template>
        <span>Edit Item</span>
      </v-tooltip>
      <v-tooltip right>
        <template v-slot:activator="{ on: tooltip }">
          <v-icon v-on="tooltip" small @click="deleteItem(item)"
            >mdi-delete</v-icon
          >
        </template>
        <span>Delete Item</span>
      </v-tooltip>
    </template>
    <template v-slot:no-data>
      <v-alert
        >You are seeing this because there is no data for this date.</v-alert
      >
    </template>
  </v-data-table>
</template>
<script>
import axios from "axios";
export default {
  props: ["tableData", "showDate"],
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Meal name",
        align: "start",
        sortable: false,
        value: "food",
      },
      { text: "Calories", value: "calories" },
      { text: "Protein (g)", value: "protein" },
      { text: "Carbs (g)", value: "carbs" },

      { text: "Fats (g)", value: "fats" },

      { text: "Actions", value: "actions", sortable: false },
    ],

    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fats: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: "",
      calories: 0,
      fats: 0,
      carbs: 0,
      protein: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },

    mealsArray: {
      get: function() {
        return this.tableData;
      },
      set: function() {
        return this.tableData;
      },
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.mealsArray = [];
    },

    editItem(item) {
      this.editedIndex = this.mealsArray.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.item = item;
      axios.delete(window.baseUrl + "meals/" + this.item.id);
      this.$emit("onSaveComplete", true);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    async save() {
      await axios.put(
        window.baseUrl + "meals/" + this.editedItem.id,
        {
          meal: this.editedItem
        }
      );
      this.dialog = false;
      this.$emit("onSaveComplete", true);
    },
  },
};
</script>

<style>
.tableClass {
  border-radius: 8px;
}

.tableClass tbody tr:nth-of-type(even) {
  background-color: rgba(126, 153, 214, 0.3);
}

.tableClass tbody tr:nth-of-type(odd) {
  background-color: primary;
}

.tableClass tr:hover:not(.v-table__expanded__content) {
  background: transparent !important;
}
</style>
