<template>
  <div>
    <google-map />
    <widget-quiz />
  </div>
</template>

<script>
import GoogleMap from './../../components/GoogleMap'
import WidgetQuiz from './../../components/WidgetQuiz'

export default {
  name: "Home",
  components: {
    GoogleMap,
    WidgetQuiz
  }
};
</script>
