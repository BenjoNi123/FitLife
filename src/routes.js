import Vue from "vue";
import VueRouter from "vue-router";

import Home from "./pages/home";

import MyProfile from "./pages/myprofile";
import Register from "./pages/register";
import Login from "./pages/login";
import Charts from "./pages/charts";


Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [{
      path: "/",
      name: "home",
      component: Home,
    },

    {
      path: "/myProfile",
      name: "myProfile",
      component: MyProfile,
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/charts",
      name: "Charts",
      component: Charts,
    }

  ],
});

export default router;