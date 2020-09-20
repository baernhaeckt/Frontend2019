/* eslint-disable promise/param-names */
import {
  RANKINGS_LIST_GLOBAL,
  RANKINGS_LIST_FRIENDS,
  RANKINGS_LIST_LOCAL,
  RANKINGS_LIST_GENERIC,
  RANKINGS_SUMMARY
} from '@/store/actions/rankings'
import { apiCall, ApiRoutes } from '@/utils/api'

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
  getGlobal: state => state.rankings.global.users,
  isGlobalInited: state => state.rankings.global.inited,
  lastRefreshGlobal: state => state.rankings.global.lastRefresh,
  getLocal: state => state.rankings.local.users,
  isLocalInited: state => state.rankings.local.inited,
  lastRefreshLocal: state => state.rankings.local.lastRefresh,
  getFriends: state => state.rankings.friends.users,
  isFriendsInited: state => state.rankings.friends.inited,
  lastRefreshFriends: state => state.rankings.friends.lastRefresh,
  getSummary: state => state.summary,
  isSummaryInited: state => state.summaryInited
}

const actions = {
  [RANKINGS_LIST_GLOBAL]: ({ commit, dispatch }) => {
    dispatch(RANKINGS_LIST_GENERIC, 'global')
  },
  [RANKINGS_LIST_FRIENDS]: ({ commit, dispatch }) => {
    dispatch(RANKINGS_LIST_GENERIC, 'friends')
  },
  [RANKINGS_LIST_LOCAL]: ({ commit, dispatch }, zip) => {
    return new Promise((resolve, reject) => {
      const axioParams = new URLSearchParams()
      axioParams.append('zip', zip)
      apiCall({ url: ApiRoutes.rankings.list_local, method: 'get', params: axioParams, dispatch: dispatch })
        .then(resp => {
          commit(RANKINGS_LIST_GENERIC, ['local', resp])
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  [RANKINGS_LIST_GENERIC]: ({ commit, dispatch }, identifier) => {
    return new Promise((resolve, reject) => {
      apiCall({ url: ApiRoutes.rankings['list_' + identifier], method: 'get', dispatch: dispatch })
        .then(resp => {
          commit(RANKINGS_LIST_GENERIC, [identifier, resp])
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  [RANKINGS_SUMMARY]: ({ commit, dispatch }) => {
    return new Promise((resolve, reject) => {
      apiCall({ url: ApiRoutes.rankings.summary, method: 'get', dispatch: dispatch })
        .then(resp => {
          commit(RANKINGS_SUMMARY, resp)
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

const mutations = {
  [RANKINGS_LIST_GENERIC]: (state, d) => {
    state.rankings[d[0]].users = d[1]
    state.rankings[d[0]].lastRefresh = new Date()
    state.rankings[d[0]].inited = true
  },
  [RANKINGS_SUMMARY]: (state, resp) => {
    state.summary = {
      local: resp.localRank,
      global: resp.globalRank,
      friends: resp.friendRank
    }
    state.summaryInited = true
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
