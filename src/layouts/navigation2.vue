<template>
  <nav>
    <v-app-bar app>
      <v-app-bar-nav-icon
        v-if="loginStatus"
        @click="drawer = !drawer"
        class="grey--text"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Fit</span>
        <span>Life</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="loginStatus" color="grey" @click="logOut">
        <span>Sign Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>

      <v-btn v-if="!loginStatus" to="/login" raised color="grey">
        <span text--darken-4>Log In</span>
        <v-icon right>mdi-login</v-icon>
      </v-btn>

      <v-btn v-if="!loginStatus" to="/register" raised color="grey">
        <span text--darken-4>Register</span>
        <v-icon right>mdi-account-plus</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-if="loginStatus"
      app
      v-model="drawer"
      temporary
      class="primary"
    >
      <v-list
        ><v-list-item
          v-for="item in items"
          :key="item.title"
          router
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item></v-list
      >
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      userName: "",
      items: [
        {
          title: "Dashboard",
          icon: "mdi-view-dashboard",
          route: "/",
        },
        {
          title: "Charts",
          icon: "mdi-chart-areaspline",
          route: "/charts",
        },
        {
          title: "My Profile",
          icon: "mdi-account",
          route: "/myProfile",
        },
      ],
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

<style>
</style>