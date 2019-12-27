import {
  USER_REQUEST,
  USER_UPDATE,
  USER_ERROR,
  USER_SUCCESS
} from '../actions/user'
import { apiCall, ApiRoutes } from '@/utils/api'
import { AUTH_LOGOUT } from '../actions/auth'

const state = { status: '', profile: {} }

const getters = {
  getProfile: state => state.profile,
  isProfileLoaded: state => !!state.profile.displayName
}

const actions = {
  [USER_REQUEST]: ({ commit, dispatch }) => {
    return new Promise((resolve, reject) => {
      commit(USER_REQUEST)
      apiCall({ url: ApiRoutes.user.me, dispatch: dispatch })
        .then(resp => {
          commit(USER_SUCCESS, resp)
          resolve()
        })
        .catch(err => {
          commit(USER_ERROR)
          if (err.unauthorized) {
            dispatch(AUTH_LOGOUT)
          }
          reject(err)
        })
    })
  },
  [USER_UPDATE]: ({ commit, dispatch }, profile) => {
    return new Promise((resolve, reject) => {
      apiCall({
        url: ApiRoutes.user.update,
        data: profile,
        method: 'patch',
        dispatch: dispatch
      })
        .then(resp => {
          dispatch(USER_REQUEST).then(() => {
            resolve()
          })
        })
        .catch(err => {
          commit(USER_ERROR)
          if (err.unauthorized) {
            dispatch(AUTH_LOGOUT)
          }
          reject(err.response)
        })
    })
  }
}

const mutations = {
  [USER_REQUEST]: state => {
    state.status = 'loading'
  },
  [USER_SUCCESS]: (state, resp) => {
    state.status = 'success'
    state.profile = resp
  },
  [USER_ERROR]: state => {
    state.status = 'error'
  },
  [AUTH_LOGOUT]: state => {
    state.profile = {}
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
