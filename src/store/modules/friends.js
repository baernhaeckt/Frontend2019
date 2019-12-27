import {
  FRIENDS_LIST,
  FRIENDS_ADD,
  FRIENDS_REMOVE
} from '@/store/actions/friends'
import { apiCall, ApiRoutes } from '@/utils/api'

const state = {
  friends: [],
  lastRefresh: new Date(),
  inited: false
}
const getters = {
  allFriends: state => state.friends
}

const actions = {
  [FRIENDS_LIST]: ({ commit, dispatch }) => {
    return new Promise((resolve, reject) => {
      apiCall({ url: ApiRoutes.friends.list, method: 'get', dispatch: dispatch })
        .then(resp => {
          commit(FRIENDS_LIST, resp)
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  [FRIENDS_ADD]: ({ commit, dispatch }, email) => {
    return new Promise((resolve, reject) => {
      let axioParams = new URLSearchParams()
      axioParams.append('friendEmail', email)

      apiCall({
        url: ApiRoutes.friends.add,
        params: axioParams,
        method: 'post',
        dispatch: dispatch
      })
        .then(resp => {
          dispatch(FRIENDS_LIST)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  [FRIENDS_REMOVE]: ({ commit, dispatch }, userId) => {
    return new Promise((resolve, reject) => {
      let axioParams = new URLSearchParams()
      axioParams.append('friendUserId', userId)

      apiCall({
        url: ApiRoutes.friends.remove,
        params: axioParams,
        method: 'delete',
        dispatch: dispatch
      })
        .then(resp => {
          dispatch(FRIENDS_LIST)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

const mutations = {
  [FRIENDS_LIST]: (state, resp) => {
    state.friends = resp
    state.lastRefresh = new Date()
    state.inited = true
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
