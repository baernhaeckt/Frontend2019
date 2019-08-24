/* eslint-disable promise/param-names */
import {
    RANKINGS_LIST_GLOBAL,
    RANKINGS_LIST_FRIENDS,
    RANKINGS_LIST_LOCAL
  } from "@/store/actions/rankings";
import { apiCall, api_routes } from "@/utils/api";

const state = {
    rankings: {
        global: {
            users: [],
            lastRefresh: new Date(),
            inited: false
        },
        local: {
            users: [],
            lastRefresh: new Date(),
            inited: false
        },
        friends: {
            users: [],
            lastRefresh: new Date(),
            inited: false
        }
    },
    summary: {
        local: 0,
        global: 0,
        friends: 0
    },
    summaryInited: false
}
const getters = {
    global: state => state.rankings.global.users,
    isGlobalInited: state => state.rankings.global.inited,
    lastRefreshGlobal: state => state.rankings.global.lastRefresh,
    local: state => state.rankings.local.users,
    isLocalInited: state => state.rankings.local.inited,
    lastRefreshLocal: state => state.rankings.local.lastRefresh,
    friends: state => state.rankings.friends.users,
    isFriendsInited: state => state.rankings.friends.inited,
    lastRefreshFriends: state => state.rankings.friends.lastRefresh,
    getSummary: state => state.summary,
    isSummaryInited: state => state.summaryInited
}

const actions = {
    [RANKINGS_LIST_GLOBAL]: ({commit, dispatch}) => {
        dispatch("RANKINGS_LIST_GENERIC", "global");
    },
    [RANKINGS_LIST_FRIENDS]: ({commit, dispatch}) => {
        dispatch("RANKINGS_LIST_GENERIC", "friends");
    },
    [RANKINGS_LIST_LOCAL]: ({commit, dispatch}) => {
        dispatch("RANKINGS_LIST_GENERIC", "local");
    },
    "RANKINGS_LIST_GENERIC": ({commit, dispatch}, identifier) => {        
        return new Promise((resolve, reject) => {
            apiCall({ url: api_routes.rankings["list_" + identifier], method: "get"})
                .then(resp => {
                    commit("RANKINGS_LIST_GENERIC", identifier, resp)
                    resolve(resp); 
                })
                .catch(err => { reject(err); });
        })
    },
    [RANKINGS_SUMMARY]: () => {
        return new Promise((resolve, reject) => {
            apiCall({ url: api_routes.rankings.summary, method: "get"})
                .then(resp => {
                    commit(RANKINGS_SUMMARY, resp)
                    resolve(resp); 
                })
                .catch(err => { reject(err); });
        })
    }
}

const mutations = {
    "RANKINGS_LIST_GENERIC": (state, identifier, resp) => {
      state.rankings[identifier].users = resp;
      state.rankings[identifier].lastRefresh = new Date();
      state.rankings[identifier].inited = true
    },
    [RANKINGS_SUMMARY]: (state, resp) => {
        state.summary = {
            local: resp.localRank,
            global: resp.globalRank,
            friends: resp.friendRank
        }
        state.summaryInited = true
    }
  };

export default {
    state,
    getters,
    actions,
    mutations
  };
  