<template>
  <div class="container">
    <v-card
      min-width="45vw"
      class="mx-auto px-10"
      elevation="2"
      outlined
      shaped
    >
      <v-card-title color="green" class="justify-center">Log In</v-card-title>
      <v-divider></v-divider>

      <v-text-field
        label="Username"
        v-model="userName"
        @change="showAlert = false"
      ></v-text-field>

      <v-text-field
        label="Password"
        v-model="password"
        type="password"
        @change="showAlert = false"
      ></v-text-field>
      <v-alert text dense v-if="showAlert" type="error"
        >Username or password are wrong</v-alert
      >
      <v-btn class="my-5" rounded block @click="submitForm">Submit</v-btn>
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
      apiTest: [],
      showAlert: false,
    };
  },

  methods: {
    async submitForm() {
      this.showAlert = false;
      try {
        let response = await axios.post(
          window.baseUrl + "user_token/",
          {
            auth: {
              username: this.userName,
              password: this.password,
            },
          }
        );
        this.apiTest = response.data;
        this.$emit("loginInfo", this.apiTest);
      } catch(err) {
        this.showAlert = true;
        console.log(err);
      }
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
