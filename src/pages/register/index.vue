<template>
  <div class="container">
    <v-card
      min-width="45vw"
      class="mx-auto px-10"
      elevation="2"
      outlined
      shaped
    >
      <v-card-title class="justify-center">Register</v-card-title>
      <v-divider></v-divider>
      <v-alert text dense v-if="error" type="error"
        >Username: {{ userName }} is taken</v-alert
      >

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

      <v-btn rounded block class="my-5" @click="getUsers">Submit</v-btn>
    </v-card>
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
        "https://fit-life-data.herokuapp.com/Users/?username=" + this.userName
      );
      let userTest = response.data;
      if (userTest == "") {
        this.submitForm();
      } else {
        this.error = true;
      }
    },
    async submitForm() {
      let token = Math.random().toString(36).substring(2, 10);
      this.token = token;
      let dataPost = await axios.post(
        "https://fit-life-data.herokuapp.com/Users",
        {
          username: this.userName,
          password: this.password,
          token: this.token,
        }
      );
      this.apiTest = [dataPost.data];


      localStorage.token = this.token;
      localStorage.userName = this.userName;
      this.$emit("registerLogin", this.apiTest);
    },
  },
};
</script>

<style scoped>
.container {
  height: 80vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
</style>
