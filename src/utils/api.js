import axios from 'axios'
import { settings } from '@/settings'
import { handleError } from '@/utils/errorhandling'
import { AUTH_LOGOUT } from '../store/actions/auth'

const ApiServer = settings.API_SERVER

export const ApiRoutes = {
  user: {
    login: ApiServer + 'api/users/Login',
    check: ApiServer + 'api/users/Register',
    me: ApiServer + 'api/profile',
    update: ApiServer + 'api/profile'
  },
  friends: {
    list: ApiServer + 'api/friends',
    add: ApiServer + 'api/friends',
    remove: ApiServer + 'api/friends'
  },
  points: {
    list: ApiServer + 'api/points'
  },
  rankings: {
    list_global: ApiServer + 'api/rankings/global',
    list_local: ApiServer + 'api/rankings/local',
    list_friends: ApiServer + 'api/rankings/friends',
    summary: ApiServer + 'api/rankings/summary'
  },
  tokens: {
    claim: ApiServer + 'api/tokens'
  },
  awards: {
    list_awards: ApiServer + 'api/awards'
  },
  sufficient_types: {
    list_baseline: ApiServer + 'api/sufficienttype/baseline',
    list_personal: ApiServer + 'api/sufficienttype/user'
  },
  widgets: {
    quiz: {
      get_question: ApiServer + 'api/quiz',
      answer_question: ApiServer + 'api/quiz'
    }
  }
}

const urlReplace = (url, urlData) => {
  for (let prop in urlData) {
    url = url.replace(`{${prop}}`, urlData[prop])
  }
  return url
}

export const apiCall = ({ url, method, urlData, dispatch, ...args }) =>
  new Promise((resolve, reject) => {
    let token = localStorage.getItem('user-token') || ''

    if (token) { axios.defaults.headers.common['Authorization'] = 'Bearer ' + token }

    try {
      if (urlData) {
        url = urlReplace(url, urlData)
      }

      axios({
        method: method || 'get',
        url: url,
        ...args
      })
        .then(resp => {
          resolve(resp.data)
        })
        .catch(error => {
          let result = handleError(error)
          if (result.unauthorized && dispatch) {
            dispatch(AUTH_LOGOUT)
          }

          reject(result)
        })
    } catch (err) {
      reject(new Error(err))
    }
  })
