<template>
  <div class="container">
    <v-row style="padding-bottom: 10%; text-align: center">
      Welcome to Register
      <br />PLease fill in your information
    </v-row>
    <v-alert v-if="error" type="error"
      >Username: {{ userName }} is taken</v-alert
    >
    <v-row class="inputRow">
      <v-text-field
        label="Username"
        v-model="userName"
        @change="error = false"
      ></v-text-field>

      <v-text-field
        label="Password"
        v-model="password"
        type="password"
      ></v-text-field>

      <v-btn @click="getUsers">Submit</v-btn>
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
      error: false,
      apiTest: [],
    };
  },

  methods: {
    async getUsers() {
      let response = await axios.get(
        "http://localhost:3000/Users/?username=" + this.userName
      );
      let userTest = response.data;
      if (userTest == "") {
        this.submitForm();
      } else {
        this.error = true;
      }
    },
    async submitForm() {
      let token = Math.random()
        .toString(36)
        .substring(2, 10);
      this.token = token;
      await axios.post("http://localhost:3000/Users", {
        username: this.userName,
        password: this.password,
        token: this.token,
      });
      localStorage.token = this.token;

      this.$emit("loginInfo", this.userName, this.password);
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
