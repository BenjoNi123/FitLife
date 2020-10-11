import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./pages/home";
import MyProfile from "./pages/myprofile";
import Register from "./pages/register";
import Login from "./pages/login";
import Charts from "./pages/charts";


Vue.use(VueRouter);
import axios from "axios";
const router = new VueRouter({
  mode: "history",
  routes: [{
      path: "/dashboard",
      name: "home",
      component: Home,
      // eslint-disable-next-line no-unused-vars
      async beforeEnter(_to, _from, next) {
        let response = await axios.get(
          "https://fit-life-data.herokuapp.com/userPreferences/?username=" +
          localStorage.getItem("userName")
        );

        if (response.data.length < 1) {
          next({
            name: `myProfile`
          });
        } else {
          next();
        }
      }
    },
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/myProfile",
      name: "myProfile",
      component: MyProfile,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
    },

    {
      path: "/charts",
      name: "Charts",
      component: Charts,
    }

  ],
});

export default router;