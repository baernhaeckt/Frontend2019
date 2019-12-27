import { POINTS_LIST } from '@/store/actions/points'
import { apiCall, api_routes } from '@/utils/api'

const state = {
  points: [],
  inited: false
}
const getters = {
  getPoints: state => state.points
}

const actions = {
  [POINTS_LIST]: ({ commit, dispatch }, userId) => {
    return new Promise((resolve, reject) => {
      apiCall({
        url: api_routes.points.list,
        method: 'get'
      })
        .then(resp => {
          commit(POINTS_LIST, resp)
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

const mutations = {
  [POINTS_LIST]: (state, resp) => {
    state.points = resp
    state.inited = true
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
