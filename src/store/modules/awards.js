/* eslint-disable promise/param-names */
import {
    AWARDS_LIST
  } from "@/store/actions/awards";
import { apiCall, api_routes } from "@/utils/api";

const state = {
    awards: [],
    inited: false
}

const getters = {
    awards: state => state.awards,
    isInited: state => state.inited
}

const actions = {
    [AWARDS_LIST]: ({commit, dispatch}) => {        
        return new Promise((resolve, reject) => {
            apiCall({ url: api_routes.awards.list_awards, method: "get"})
                .then(resp => {
                    commit([AWARDS_LIST], resp)
                    resolve(resp); 
                })
                .catch(err => { reject(err); });
        })
    }
}

const mutations = {
    [AWARDS_LIST]: (state, resp) => {
      state.awards = resp;
      state.inited = true
    }
  };

export default {
    state,
    getters,
    actions,
    mutations
  };
  