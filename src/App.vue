<template>
  <v-app
    ><v-app-bar app></v-app-bar>
    <v-main>
      <v-container class="maincss" fluid>
        <navigation2
          @loggedOut="loggedOut"
          :loginInfo="loginInfo"
          :loginStatus="loginStatus"
        ></navigation2>

        <!-- <navigation
      @loggedOut="loggedOut"
      :loginInfo="loginInfo"
      :loginStatus="loginStatus"
    ></navigation> -->

        <router-view
          @loginInfo="checkLogin"
          :loginStatus="loginStatus"
        ></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
//import navigation from "../src/layouts/navigation";
import navigation2 from "../src/layouts/navigation2";

import axios from "axios";

axios.interceptors.request.use(function (config) {
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

      this.$router.push({ path: `/` });
      this.loginStatus = true;
      localStorage.login = this.loginStatus;
      localStorage.userName = this.loginInfo[0].username;
      localStorage.setItem("token", this.loginInfo[0].token);
    },
    loggedOut() {
      this.loginStatus = false;
      localStorage.login = false;
    },
  },
};
</script>

<style scoped>
.maincss {
  padding: 0;
}
</style>
