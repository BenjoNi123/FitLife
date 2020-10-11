<template>
  <v-app id="app" class="scrollControl">
    <v-app-bar app></v-app-bar>
    <v-main style="background-color: #f9f9f9">
      <v-container style="padding-top: 0" fluid>
        <navigation2
          @loggedOut="loggedOut"
          :loginInfo="loginInfo"
          :loginStatus="loginStatus"
        ></navigation2>

        <router-view
          @loginInfo="checkLogin"
          @registerLogin="checkLogin"
          :loginStatus="loginStatus"
        ></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import navigation2 from "../src/layouts/navigation2";

import axios from "axios";

axios.interceptors.request.use(function(config) {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["access-token"] = token;
  }
  return config;
});

export default {
  components: {
    navigation2,
  },
  data() {
    return {
      loginInfo: [],
      loginStatus: false,
    };
  },
  mounted() {
    this.loginRefresh();
  },

  methods: {
    loginRefresh() {
      this.loginStatus = JSON.parse(localStorage.getItem("login"));
    },
    checkLogin(msg) {
      this.loginInfo = msg;
      this.loginStatus = true;
      localStorage.login = this.loginStatus;
      localStorage.userName = this.loginInfo[0].username;
      localStorage.setItem("token", this.loginInfo[0].token);
      this.$router.push({ path: `/dashboard` });
    },
    loggedOut() {
      this.loginStatus = false;
      localStorage.login = false;
    },
  },
};
</script>

<style>
.scrollControl .v-application--wrap {
  min-height: 91.9vh;
}
.maincss {
  padding-top: 0px;
}
html {
  overflow: auto !important;
  scrollbar-width: none;
  -ms-overflow-style: none;
  background-color: #f9f9f9;
}

html::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>
