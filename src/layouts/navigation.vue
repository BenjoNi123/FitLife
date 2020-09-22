<template>
  <div class="mainDiv">
    <v-toolbar color="primary" absolute width="100%" dense>
      <v-toolbar-title>
        Welcome to FitLife
        <span style="margin-left: 32px">
          <b>{{ userName }}</b>
        </span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn text to="/">
          <v-icon>home</v-icon>Home
        </v-btn>

        <v-btn v-if="loginStatus" text to="/charts">
          <v-icon>mdi-chart-areaspline</v-icon>Charts
        </v-btn>

        <v-btn v-if="loginStatus" text to="/myProfile">
          <v-icon>mdi-account</v-icon>My Profile
        </v-btn>

        <v-btn v-if="!loginStatus" text to="/register">Register</v-btn>
        <v-btn v-if="!loginStatus" text to="/login">
          <v-icon>mdi-login</v-icon>Login
        </v-btn>

        <v-btn @click="logOut" v-if="loginStatus" text>
          <v-icon>logout</v-icon>LogOut
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userName: "",
    };
  },
  props: ["loginStatus"],

  computed: {
    logindata: function () {
      return localStorage.getItem("login");
    },
  },
  methods: {
    getUsername() {
      this.userName = localStorage.getItem("userName");
    },
    logOut() {
      this.$emit("loggedOut");
      this.userName = "";
      localStorage.userName = "";
      localStorage.removeItem("token");
      this.$router.push({ path: `/login` });
    },
  },
  watch: {
    loginStatus() {
      this.getUsername();
    },
  },
};
</script>

<style  scoped>
.mainDiv {
  padding-bottom: 50px;
}
</style>