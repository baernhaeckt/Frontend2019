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
      apiCall({
        url: ApiRoutes.friends.add,
        data: { email: email },
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
      apiCall({
        url: ApiRoutes.friends.remove,
        data: { friendUserId: userId },
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
