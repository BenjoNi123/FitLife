<template>
  <v-row>
    <v-col cols="12" sm="12" class="mainRow">
      <v-date-picker v-model="dates" range></v-date-picker>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    dates: [],
  }),
  methods: {
    sendDates() {
      this.$emit("datesArray", this.dates);
    },
  },
  watch: {
    dates: function () {
      if (this.dates.length == 2) {
        this.sendDates();
      }
    },
  },
};
</script>
<style  scoped>
.mainRow {
  display: flex;
  justify-content: center;
}
</style>