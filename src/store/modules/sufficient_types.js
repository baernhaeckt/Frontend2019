/* eslint-disable promise/param-names */
import {
    LIST_SUFFICIENTS_BASELINE,
    LIST_SUFFICIENTS_PERSONAL
  } from "@/store/actions/sufficient_types";
import { apiCall, api_routes } from "@/utils/api";

const state = {
    baseline: [],
    baselineInited: false,
    personal: [],
    personalInited: false
}

const getters = {
    baseline: state => state.baseline,
    isBaselineInited: state => state.baselineInited,
    personal: state => state.personal,
    isPersonalInited: state => state.personalInited
}

const actions = {
    [LIST_SUFFICIENTS_BASELINE]: ({commit, dispatch}) => {        
        return new Promise((resolve, reject) => {
            
            // as the baseline is changing slowly this doesn't need to refresh if it is inited
            if (baselineInited) {
                resolve(state.baseline);
            }

            apiCall({ url: api_routes.sufficient_types.list_personal, method: "get"})
                .then(resp => {
                    commit([LIST_SUFFICIENTS_BASELINE], resp)
                    resolve(resp); 
                })
                .catch(err => { reject(err); });
        })
    },
    [LIST_SUFFICIENTS_PERSONAL]: ({commit, dispatch}) => {        
        return new Promise((resolve, reject) => {
            apiCall({ url: api_routes.sufficient_types.list_personal, method: "get"})
                .then(resp => {
                    dispatch(LIST_SUFFICIENTS_BASELINE)
                    commit([LIST_SUFFICIENTS_PERSONAL], resp)
                    resolve(resp); 
                })
                .catch(err => { reject(err); });
        })
    }
}

const mutations = {
    [LIST_SUFFICIENTS_BASELINE]: (state, resp) => {
      state.baseline = resp;
      state.baselineInited = true;
    },
    [LIST_SUFFICIENTS_PERSONAL]: (state, resp) => {
        state.personal = resp;
        state.personalInited = true
    }
  };

export default {
    state,
    getters,
    actions,
    mutations
  };
  