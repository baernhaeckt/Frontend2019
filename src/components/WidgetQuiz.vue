<template>
  <block-box>
    <h3>Quiz</h3>
    <p id="quiz-question" v-model="question.question"></p>
    <ul class="list-unstyled">
        <li>
            <input type="checkbox"> 
        </li>
    </ul>
    <p id="quiz-detailed-answer">

    </p>
    <input type="button">Noch eine Frage</input>
  </block-box>
</template>

<script>
import { QUIZ_GET_QUESTION, QUIZ_ANSWER_QUESTION } from "@/store/actions/widgets/quiz.js";
import BlockBox from './BlockBox'

export default {
  name: "WidgetQuiz",
  mounted() {
      this.$store.dispatch(QUIZ_GET_QUESTION)
      .then(() => {
        this.question = JSON.parse(JSON.stringify(this.$store.getters.getQuestion))
      })
  },
  data() {
    return {
        quiz: {}
    }
  },
  computed: {
    ...mapGetters(['getQuiz'])
  },
  watch: {
    getProfile(newValue, oldValue) {
      this.quiz = JSON.parse(JSON.stringify(this.getProfile))
    }
  },
  methods: {
  },
  components: {
    BlockBox
  }
};
</script>
