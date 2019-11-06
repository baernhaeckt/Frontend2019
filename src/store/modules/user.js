import {
  USER_REQUEST,
  USER_UPDATE,
  USER_ERROR,
  USER_SUCCESS
} from "../actions/user";
import { apiCall, api_routes } from "@/utils/api";
import { AUTH_LOGOUT } from "../actions/auth";

const state = { status: "", profile: {} };

const getters = {
  getProfile: state => state.profile,
  isProfileLoaded: state => !!state.profile.displayName
};

const actions = {
  [USER_REQUEST]: ({ commit, dispatch }) => {
    return new Promise((resolve, reject) => {
      commit(USER_REQUEST);
      apiCall({ url: api_routes.user.me })
        .then(resp => {
          commit(USER_SUCCESS, resp);
          resolve();
        })
        .catch(err => {
          commit(USER_ERROR);
          if (err.response.status === 401) {
          dispatch(AUTH_LOGOUT);
          }
          reject();
        });
    });
  },
  [USER_UPDATE]: ({ commit, dispatch }, displayName, street, city, postalCode) => {
    return new Promise((resolve, reject) => {
      apiCall({
        url: api_routes.user.update,
        data: { displayName: displayName, street: street, city: city, postalCode: postalCode },
        method: "patch"
      })
        .then(resp => {
          dispatch(USER_REQUEST).then(() => {
            resolve();
          });
        })
        .catch(err => {
          commit(USER_ERROR);
          if (err.response.status === 401) {
          dispatch(AUTH_LOGOUT);
          }
          reject(err.response);
        });
    });
  }
};

const mutations = {
  [USER_REQUEST]: state => {
    state.status = "loading";
  },
  [USER_SUCCESS]: (state, resp) => {
    state.status = "success";
    state.profile = resp;
  },
  [USER_ERROR]: state => {
    state.status = "error";
  },
  [AUTH_LOGOUT]: state => {
    state.profile = {};
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
