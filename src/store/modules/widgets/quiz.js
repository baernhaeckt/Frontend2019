/* eslint-disable promise/param-names */
import {
  QUIZ_GET_QUESTION,
  QUIZ_ANSWER_QUESTION
} from '@/store/actions/widgets/quiz'
import { apiCall, ApiRoutes } from '@/utils/api'

const state = {
  question: {
    noMoreQuestions: false,
    questionId: '',
    question: '',
    answers: []
  },

  answer: {
    points: 0,
    answered: false,
    isCorrectAnswer: false,
    detailedAnswer: ''
  }
}
const getters = {
  getQuestion: state => state.question,
  getAnswer: state => state.answer
}

const actions = {
  [QUIZ_GET_QUESTION]: ({ commit, dispatch }) => {
    return new Promise((resolve, reject) => {
      apiCall({ url: ApiRoutes.widgets.quiz.get_question, method: 'get', dispatch: dispatch })
        .then(resp => {
          commit(QUIZ_GET_QUESTION, resp)
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  [QUIZ_ANSWER_QUESTION]: ({ commit, dispatch }, answer) => {
    return new Promise((resolve, reject) => {
      apiCall({
        url: ApiRoutes.widgets.quiz.answer_question,
        data: answer,
        method: 'post',
        dispatch: dispatch
      })
        .then(resp => {
          commit(QUIZ_ANSWER_QUESTION, resp)
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

const mutations = {
  [QUIZ_GET_QUESTION]: (state, resp) => {
    if (resp === null || resp === '') {
      state.question = {
        noMoreQuestions: true
      }
    } else {
      state.answer.answered = false
      state.question = {
        noMoreQuestions: false,
        questionId: resp.id,
        question: resp.question,
        answers: resp.answers
      }
    }
  },
  [QUIZ_ANSWER_QUESTION]: (state, resp) => {
    state.answer = {
      answered: true,
      points: resp.awardedPoints,
      detailedAnswer: resp.detailedAnswer,
      isCorrect: resp.isCorrect
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
