<template>
  <block-box class="statistics-page">
    <h1>Punkte Statistik mit Vorhersage</h1>
    <p>Nachfolgende Statistik zeigt den anhand der gesammelten Daten extrapolierten zeitlichen Verlauf.</p>
    <div class="image-container">
      <img class="stats-image" src="https://baernhaecktforecasting.azurewebsites.net/forecasting" />
    </div>
  </block-box>
</template>

<script>

export default {
  name: "Statistics",
  mounted() {
  },
  data() {
    return {
    };
  },
  computed: {
  },
  watch: {
  },
  methods: {
  }
};
</script>

<style lang="scss">
  .statistics-page {
    .image-container {
      padding: 30px;

      .stats-image {
        width: 100%;
      }
    }
  }
</style>