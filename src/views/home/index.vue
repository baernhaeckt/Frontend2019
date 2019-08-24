<template>
  <div>
    <google-map />
    <baseline-compare />
  </div>
</template>

<script>
import GoogleMap from './../../components/GoogleMap'
import BaselineCompare from './../../components/BaselineCompare'

export default {
  name: "Home",
  components: {
    GoogleMap,
    BaselineCompare
  }
};
</script>
