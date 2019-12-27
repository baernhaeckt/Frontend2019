import {
  FRIENDS_LIST,
  FRIENDS_ADD,
  FRIENDS_REMOVE
} from '@/store/actions/friends'
import { apiCall, api_routes } from '@/utils/api'

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
      apiCall({ url: api_routes.friends.list, method: 'get' })
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
        url: api_routes.friends.add,
        params: axioParams,
        method: 'post'
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
        url: api_routes.friends.remove,
        params: axioParams,
        method: 'delete'
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
