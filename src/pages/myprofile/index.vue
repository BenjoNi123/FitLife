<template>
  <v-app class="homeCss">
    <diet-settings class="homeCss"></diet-settings>
  </v-app>
</template>

<script>
import DietSettings from "../../components/DietSettings";
export default {
  components: { DietSettings },
};
</script>

<style scoped>
.homeCss {
  background-color: #f9f9f9;
}
</style>