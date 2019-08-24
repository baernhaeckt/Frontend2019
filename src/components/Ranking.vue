<template>
  <block-box class="ranking-box">
    <h3>Dein Ranking</h3>
    <ul class="list-unstyled">
      <li><font-awesome-icon icon="medal" class="mr-2 color-gold" /> 1. Rang unter Deinen Freunden</li>
      <li><font-awesome-icon icon="medal" class="mr-2 color-bronze" /> 3. In Deinem Quartier</li>
      <li><font-awesome-icon icon="medal" class="mr-2 color-silver" /> 1. Schweizweit</li>
    </ul>
  </block-box>
</template>

<script>
export default {
  name: "Ranking",
  mounted() {
  },
  data() {
    return {
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
  },
  components: {
  }
};
</script>

<style lang="scss">
  .ranking-box {
  }
</style>