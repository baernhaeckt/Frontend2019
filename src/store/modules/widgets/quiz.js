/* eslint-disable promise/param-names */
import {
    QUIZ_GET_QUESTION,
    QUIZ_ANSWER_QUESTION
  } from "@/store/actions/widgets/quiz";
  import { apiCall, api_routes } from "@/utils/api";

const state = {
    questionId: "",
    question: "",
    answers: [],

    points: 0,
    answered: false,
    correct_answer: false,
    detailed_answer: ""
}
const getters = {
    question: state => state.question,
    answers: state => state.answers,
    points: state => state.points,

    answered: state => state.answered,
    isCorrectAnswer: state => state.correct_answer,
    detailedAnswer: state => state.detailed_answer 
}

const actions = {
    [QUIZ_GET_QUESTION]: ({commit, dispatch} ) => {
        return new Promise((resolve, reject) => {
            apiCall({ url: api_routes.widgets.quiz.get_question, method: "get"})
                .then(resp => {
                    commit(QUIZ_GET_QUESTION, resp)
                    resolve(resp); 
                })
                .catch(err => { reject(err); });
        })
    },
    [QUIZ_ANSWER_QUESTION]: ({commit, dispatch}, answer ) => {
        return new Promise((resolve, reject) => {
  
            apiCall({ url: api_routes.widgets.quiz.answer_question, data: answer, method: "post" })
            .then(resp => { 
                commit(QUIZ_ANSWER_QUESTION);  
                resolve(resp); })
            .catch(err => { reject(err) });
        });
    }
}

const mutations = {
    [QUIZ_GET_QUESTION]: (state, resp) => {
      state.points = 0;
      state.answered = false;
      state.questionId = resp.id;
      state.question = resp.question;
      state.answers = resp.answers;
    },
    [QUIZ_ANSWER_QUESTION]: (state, resp) => {
        state.points = resp.awardedPoints;
        state.correct_answer = resp.isCorrect;
        state.detailedAnswer = resp.DetailedAnswer;
        state.answered = true;      
    } 
  };

export default {
    state,
    getters,
    actions,
    mutations
  };
  