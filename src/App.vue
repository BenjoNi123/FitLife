<template>
  <v-app id="app" class="scrollControl">
    <v-app-bar app></v-app-bar>
    <v-main style="background-color: #f9f9f9">
      <v-container style="padding-top: 0" fluid>
        <navigation
          @loggedOut="loggedOut"
          :loginStatus="loginStatus"
        ></navigation>

        <router-view
          @loginInfo="checkLogin"
          @registerLogin="registerLogin"
          :loginStatus="loginStatus"
        ></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import navigation from "../src/layouts/navigation";

import axios from "axios";

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = token;
  }
  return config;
});

export default {
  components: {
    navigation,
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
    registerLogin() {
      this.$router.push({path: "/login"});
    },
    async checkLogin(msg) {

      this.loginInfo = msg;
    
      this.loginStatus = true;
      localStorage.login = this.loginStatus;
      localStorage.setItem("token", this.loginInfo.jwt);

      localStorage.userName = (await axios.get(window.baseUrl + 'user')).data.username;

      this.loginRedirect()
    },
    async loginRedirect(){
      this.$router.push({path: "/dashboard"});
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
