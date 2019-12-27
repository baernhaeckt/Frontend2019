import { AWARDS_LIST } from '@/store/actions/awards'
import { apiCall, ApiRoutes } from '@/utils/api'

const state = {
  awards: [],
  inited: false
}

const getters = {
  allAwards: state => state.awards,
  isInited: state => state.inited
}

const actions = {
  [AWARDS_LIST]: ({ commit, dispatch }) => {
    return new Promise((resolve, reject) => {
      apiCall({ url: ApiRoutes.awards.list_awards, method: 'get', dispatch: dispatch })
        .then(resp => {
          commit(AWARDS_LIST, resp)
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

const mutations = {
  [AWARDS_LIST]: (state, resp) => {
    state.awards = resp
    state.inited = true
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
