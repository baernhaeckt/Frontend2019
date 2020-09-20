import { TOKEN_STORE, TOKEN_PROCESS } from '../actions/token'
import { apiCall, ApiRoutes } from '@/utils/api'

const state = {
  unprocessedTokens: JSON.parse(localStorage.getItem('unprocessedTokens')) || []
}

const getters = {
  haveUnprocessedTokens: state =>
    state.unprocessedToken && state.unprocessedToken.lengt > 0
}

const actions = {
  [TOKEN_STORE]: ({ commit, dispatch }, newToken) => {
    commit(TOKEN_STORE, newToken)
    commit('TOKEN_UPDATELOCALSTORAGE')
  },
  [TOKEN_PROCESS]: ({ commit, dispatch }) => {
    return new Promise((resolve, reject) => {
      const promises = []
      const maxRetries = state.unprocessedTokens.length + 1
      let retries = 0
      while (state.unprocessedTokens.length > 0 && retries < maxRetries) {
        const token = state.unprocessedTokens[0]
        commit('TOKEN_REMOVE', token)
        commit('TOKEN_UPDATELOCALSTORAGE')
        promises.push(
          apiCall({
            url: ApiRoutes.tokens.claim,
            data: { tokenGuid: token },
            method: 'post',
            dispatch: dispatch
          })
        )
        retries++
      }

      Promise.all(promises)
        .then(() => {
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

const mutations = {
  [TOKEN_STORE]: (state, newToken) => {
    state.unprocessedTokens.push(newToken)
  },
  TOKEN_REMOVE: (state, token) => {
    state.unprocessedTokens.splice(state.unprocessedTokens.indexOf(token), 1)
  },
  TOKEN_UPDATELOCALSTORAGE: state => {
    localStorage.setItem(
      'unprocessedTokens',
      JSON.stringify(state.unprocessedTokens)
    )
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
