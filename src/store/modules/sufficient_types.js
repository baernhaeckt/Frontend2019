/* eslint-disable promise/param-names */
import {
  LIST_SUFFICIENTS_BASELINE,
  LIST_SUFFICIENTS_PERSONAL
} from '@/store/actions/sufficient_types'
import { apiCall, ApiRoutes } from '@/utils/api'

const state = {
  baseline: [],
  baselineInited: false,
  personal: [],
  personalInited: false
}

const getters = {
  getBaseline: state => state.baseline,
  isBaselineInited: state => state.baselineInited,
  getPersonal: state => state.personal,
  isPersonalInited: state => state.personalInited
}

const actions = {
  [LIST_SUFFICIENTS_BASELINE]: ({ commit, dispatch }) => {
    return new Promise((resolve, reject) => {
      apiCall({ url: ApiRoutes.sufficient_types.list_baseline, method: 'get', dispatch: dispatch })
        .then(resp => {
          commit(LIST_SUFFICIENTS_BASELINE, resp)
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  [LIST_SUFFICIENTS_PERSONAL]: ({ commit, dispatch }) => {
    return new Promise((resolve, reject) => {
      apiCall({ url: ApiRoutes.sufficient_types.list_personal, method: 'get', dispatch: dispatch })
        .then(resp => {
          commit(LIST_SUFFICIENTS_PERSONAL, resp)
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

const mutations = {
  [LIST_SUFFICIENTS_BASELINE]: (state, resp) => {
    state.baseline = resp
    state.baselineInited = true
  },
  [LIST_SUFFICIENTS_PERSONAL]: (state, resp) => {
    state.personal = resp
    state.personalInited = true
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
