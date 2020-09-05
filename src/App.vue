<template>
  <v-app>
    <navigation @loggedOut="loggedOut" :loginInfo="loginInfo" :loginStatus="loginStatus"></navigation>

    <v-main>
      <v-container class="maincss" fluid>
        <router-view @loginInfo="checkLogin" :loginInfo="loginInfo" :loginStatus="loginStatus"></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import navigation from "../src/layouts/navigation";
export default {
  components: {
    navigation,
  },
  data() {
    return {
      loginInfo: [],
      loginStatus: false,

      //apiTest: [],
    };
  },
  computed: {
    myItem: function () {
      return localStorage.getItem("token");
    },
  },
  methods: {
    checkLogin(msg) {
      this.loginInfo = msg;
      if (this.loginInfo[0].token == this.myItem) {
        this.$router.push({ path: `/` });
        this.loginStatus = true;
        localStorage.login = this.loginStatus;
      }
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
