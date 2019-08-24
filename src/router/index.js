import Vue from "vue";
import Router from "vue-router";
import store from "../store";
import Login from "@/views/auth/login";
import App from "@/views/layouts/App";
import Home from "@/views/home";
import History from "@/views/history";
import Rankings from "@/views/rankings";
import Profile from "@/views/profile";
import Token from "@/views/token";
import Friends from "@/views/friends";

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/");
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/login");
};

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/token/:token",
      name: "token",
      component: Token
    },
    {
      path: "/",
      name: "app",
      component: App,
      beforeEnter: ifAuthenticated,
      children: [
        {
          path: "/",
          name: "home",
          beforeEnter: ifAuthenticated,
          component: Home
        },
        {
          path: "/profile",
          name: "profile",
          beforeEnter: ifAuthenticated,
          component: Profile
        },
        {
          path: "/friends",
          name: "friends",
          beforeEnter: ifAuthenticated,
          component: Friends
        },
        {
          path: "/history",
          name: "history",
          beforeEnter: ifAuthenticated,
          component: History
        },
        {
          path: "/rankings",
          name: "rankings",
          beforeEnter: ifAuthenticated,
          component: Rankings
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      beforeEnter: ifNotAuthenticated
    }
  ]
});
