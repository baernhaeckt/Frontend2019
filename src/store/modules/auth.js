/* eslint-disable promise/param-names */
import {
  AUTH_CHECK,
  AUTH_REQUEST,
  AUTH_SIGNUP,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT
} from "@/store/actions/auth";
import { USER_REQUEST } from "../actions/user";
import { apiCall, api_routes } from "@/utils/api";
import router from "./../../router";
import axios from "axios";

const state = {
  token: localStorage.getItem("user-token") || "",
  status: "",
  hasLoadedOnce: false
};

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
  accessToken: state => state.token
};

const actions = {
  [AUTH_CHECK]: ({ commit, dispatch }, email) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST);
      let axioParams = new URLSearchParams();
      axioParams.append("email", email);

      apiCall({
        url: api_routes.user.check,
        params: axioParams,
        method: "post"
      })
        .then(resp => {
          if (resp.token && resp.token.length > 0) {
            localStorage.setItem("user-token", resp.token);
            // Here set the header of your ajax library to the token value.
            // example with axios
            axios.defaults.headers.common["Authorization"] = resp.token;
            commit(AUTH_SUCCESS, resp);
            dispatch(USER_REQUEST);
            resolve(resp);
          } else {
            commit(AUTH_ERROR, resp);
            localStorage.removeItem("user-token");
            reject(resp);
          }
        })
        .catch(err => {
          commit(AUTH_ERROR, err);
          localStorage.removeItem("user-token");
          reject(err);
        });
    });
  },
  [AUTH_REQUEST]: ({ commit, dispatch }, user) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST);
      let axioParams = new URLSearchParams();
      axioParams.append("email", user.email);
      axioParams.append("password", user.password);

      apiCall({
        url: api_routes.user.login,
        params: axioParams,
        method: "post"
      })
        .then(resp => {
          localStorage.setItem("user-token", resp.token);
          // Here set the header of your ajax library to the token value.
          // example with axios
          // axios.defaults.headers.common['Authorization'] = resp.token
          commit(AUTH_SUCCESS, resp);
          dispatch(USER_REQUEST);
          resolve(resp);
        })
        .catch(err => {
          commit(AUTH_ERROR, err);
          localStorage.removeItem("user-token");
          reject(err);
        });
    });
  },
  [AUTH_SIGNUP]: ({ commit }, user) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST);
      apiCall({ url: api_routes.user.signup, data: user, method: "post" })
        .then(resp => {
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  [AUTH_LOGOUT]: ({ commit }) => {
    return new Promise(resolve => {
      commit(AUTH_LOGOUT);
      localStorage.removeItem("user-token");
      router.push("/login");
      resolve();
    });
  }
};

const mutations = {
  [AUTH_REQUEST]: state => {
    state.status = "loading";
  },
  [AUTH_SUCCESS]: (state, resp) => {
    state.status = "success";
    state.token = resp.token;
    state.hasLoadedOnce = true;
  },
  [AUTH_ERROR]: state => {
    state.status = "error";
    state.hasLoadedOnce = true;
  },
  [AUTH_LOGOUT]: state => {
    state.token = "";
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
