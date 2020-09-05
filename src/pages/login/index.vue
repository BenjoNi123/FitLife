<template>
  <div class="container">
    <v-row style="padding-bottom: 10%; text-align: center">
      Welcome to Login
      <br />PLease fill in your information
    </v-row>
    <v-alert v-if="showAlert" type="error">Username or password are wrong</v-alert>
    <v-row class="inputRow">
      <v-text-field label="Username" v-model="userName" @change="showAlert=false"></v-text-field>

      <v-text-field label="Password" v-model="password" type="password" @change="showAlert=false"></v-text-field>

      <v-btn @click="submitForm">Submit</v-btn>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      userName: "",
      password: "",
      token: "",
      apiTest: [],
      showAlert: false,
    };
  },

  methods: {
    async submitForm() {
      let response = await axios.get("http://localhost:3000/Users/", {
        params: {
          username: this.userName,
          password: this.password,
        },
      });

      this.apiTest = response.data;
      if (this.apiTest.length == 0) {
        this.showAlert = true;
      } else {
        this.$emit("loginInfo", this.apiTest);
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.inputRow {
  flex-direction: column;
  width: 30%;
  align-items: çenter;
  height: 30vh;
}
</style>
