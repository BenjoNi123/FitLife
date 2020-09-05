<template>
  <v-app class="homeCss">
    <v-container class="container"></v-container>
    <diet-settings v-if="loginStatus" :loginInfo="loginInfo" class="homeCss"></diet-settings>
    <div v-else>
      <v-alert prominent type="warning">
        <v-row align="center">
          <v-col
            class="grow"
          >It looks like you are not logged in. Please do that in order to see Profile data.</v-col>
          <v-col class="shrink">
            <v-btn to="/login">Login</v-btn>
          </v-col>
        </v-row>
      </v-alert>
    </div>
  </v-app>
</template>

<script>
import DietSettings from "../../components/DietSettings";
export default {
  props: ["loginInfo", "loginStatus"],
  components: { DietSettings },
};
</script>

<style scoped>
.homeCss {
  background-color: #f9f9f9;
}
</style>