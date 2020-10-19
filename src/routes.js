import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./pages/home";
import MyProfile from "./pages/myprofile";
import Register from "./pages/register";
import Login from "./pages/login";
import Charts from "./pages/charts";
import axios from "axios";


Vue.use(VueRouter);

const router = new VueRouter({
  // mode: "history",
  routes: [{
      path: "/dashboard",
      name: "home",
      component: Home,
     
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

router.beforeEach(async (to, from, next) => {
  if (
    to.name !== 'Login' &&
    to.name !== 'Register' &&
    to.name !== 'myProfile'
  ) {
    if ((await axios.get(window.baseUrl + 'user_preference')).data) {
      next();
    } else {
      next('myProfile');
    }
  } else {
    next();
  }
});

router.beforeEach(async (to, from, next) => {
  if (
    to.name !== 'Login' &&
    to.name !== 'Register'
  ) {
    if (localStorage.getItem('token')) {
      next();
    } else {
      next('Login');
    }
  } else {
    next();
  }
});

export default router;