import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import user from "./modules/user";
import friends from "./modules/friends";
import rankings from "./modules/rankings";
import awards from "./modules/awards";
import sufficient_types from "./modules/sufficient_types";
import token from "./modules/token";
import points from "./modules/points";
import widget_quiz from "./modules/widgets/quiz";
import settings from "./modules/settings";
Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    auth,
    user,
    friends,
    rankings,
    awards,
    sufficient_types,
    token,
    points,
    widget_quiz,
    settings
  },
  strict: debug
});
