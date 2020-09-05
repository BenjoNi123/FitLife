<template>
  <div>
    <v-toolbar color="primary" dense>
      <v-toolbar-title>
        Welcome to FitLife
        <span style="margin-left: 32px">
          <b>{{username}}</b>
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
  props: ["loginInfo", "loginStatus"],
  data() {
    return {
      username: "",
    };
  },

  methods: {
    logOut() {
      localStorage.login = false;
      this.$router.push({ path: `/login` });
      this.$emit("loggedOut", localStorage.login);
      this.username = "";
    },
  },
  watch: {
    loginInfo() {
      this.username = this.loginInfo[0].username;
    },
  },
};
</script>
