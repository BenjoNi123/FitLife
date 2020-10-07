<template>
  <v-row justify="center">
    <v-col lg="4" cols="6" sm="6" md="6" class="dateButtonRow">
      <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="date"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            justify="center"
            v-model="date"
            readonly
            rounded
            v-bind="attrs"
            v-on="on"
            >Select Date</v-btn
          >
        </template>
        <v-date-picker v-model="dates" multiple no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="cancelDate()"> Cancel </v-btn>
          <v-btn text color="primary" @click="sendDates()"> OK </v-btn>
        </v-date-picker>
      </v-dialog>
    </v-col>
  </v-row>
</template>




<script>
export default {
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    dates: [],
    modal: false,
  }),
  methods: {
    cancelDate() {
      if (this.dates) {
        this.modal = false;
      }
    },
    sendDates() {
      if (this.dates.length > 2) {
        this.dates.splice(0, this.dates.length - 2);
      }
      this.$emit("datesArray", this.dates);
      this.modal = false;
    },
  },
};
</script>

<style  scoped>
.dateButtonRow {
  display: flex;
  justify-content: center;
}
</style>
