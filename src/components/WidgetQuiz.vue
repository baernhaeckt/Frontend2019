<template>
  <block-box class="quiz-widget">
    <h3>Quiz</h3>
    <div v-if="!quizReady" class="loader text-center">
      <b-spinner class="large-spinner text-success" />
    </div>
    <p v-else-if="getQuestion.noMoreQuestions">
      Es sind leider keine weiteren Fragen verfügbar.
    </p>
    <template v-else>
      <b-form @submit.prevent="checkAnswer">
        <b-form-group :label="getQuestion.question">
          <b-form-radio-group v-model="selectedAnswer" :options="answers" name="question-answer" stacked required :disabled="answerChecked" />
        </b-form-group>
        <div class="answer-container" v-if="answerChecked">
          <p v-if="getAnswer.isCorrect"><font-awesome-icon icon="smile" class="mr-1 text-success" />Richtig beantwortet, Du bist Super! Dafür erhälst Du {{ getAnswer.points }} Punkt(e) gutgeschrieben.</p>
          <p v-if="!getAnswer.isCorrect"><font-awesome-icon :icon="['far', 'frown-open']" class="mr-1 text-warning" /> Deine Antwort war leider falsch.</p>
          <p class="my-3">{{ getAnswer.detailedAnswer }}</p>
        </div>
        <b-button type="submit" variant="success" :disabled="isAnswerCheckLoading" v-if="!answerChecked">
          <b-spinner small v-if="isAnswerCheckLoading" />
          <font-awesome-icon icon="times" v-if="answerCheckError" class="mr-2" />
          Absenden
        </b-button>
        <b-button variant="success" @click="loadNextQuestion" v-if="answerChecked">
          <font-awesome-icon icon="sync" v-if="!isLoading" class="mr-2" />
          <b-spinner small v-if="isLoading" />
          Nächste Frage laden
        </b-button>
      </b-form>
    </template>
  </block-box>
</template>

<script>
import { QUIZ_GET_QUESTION, QUIZ_ANSWER_QUESTION } from "@/store/actions/widgets/quiz.js";
import BlockBox from './BlockBox'
import { mapGetters } from 'vuex';

export default {
  name: "WidgetQuiz",
  mounted() {
    this.loadQuestion()
  },
  data() {
    return {
      isLoading: false,
      initialized: false,
      isAnswerCheckLoading: false,
      answerChecked: false,
      answerCheckError: false,
      selectedAnswer: ''
    }
  },
  computed: {
    ...mapGetters(['getQuestion', 'getAnswer']),
    quizReady () {
      return !this.isLoading && this.initialized
    },
    answers () {
      return this.getQuestion.answers != null ? this.getQuestion.answers.map(answer => {
        return {
          text: answer,
          value: answer
        }
      }) : []
    }
  },
  methods: {
    loadQuestion() {
      this.answerChecked = false
      this.selectedAnswer = ''
      this.isLoading = true
      this.$store.dispatch(QUIZ_GET_QUESTION)
      .then(() => {
        this.isLoading = false
        this.initialized = true
      })
    },
    checkAnswer () {
      this.isAnswerCheckLoading = true
      this.answerChecked = false
      this.answerCheckError = false
      let answer = {
        questionId: this.getQuestion.questionId,
        answers: [this.selectedAnswer]
      }
      this.$store.dispatch(QUIZ_ANSWER_QUESTION, answer)
        .then(() => {
          this.isAnswerCheckLoading = false
          this.answerChecked = true
        })
        .catch((err) => {
          this.isAnswerCheckLoading = false
          this.answerCheckError = true
        })
    },
    loadNextQuestion () {
      this.loadQuestion()
    }
  },
  watch: {
  },
  components: {
    BlockBox
  }
};
</script>

<style lang="scss">
  .quiz-widget {
    .loader {
      margin: 50px 0;

      .large-spinner {
        width: 4rem;
        height: 4rem;
      }
    }
  }
</style>
