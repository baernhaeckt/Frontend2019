<template>
  <block-box class="statistics-page">
    <h1>Punkte Statistik mit Vorhersage</h1>
    <p>Nachfolgende Statistik zeigt den anhand der gesammelten Daten extrapolierten zeitlichen Verlauf.</p>
    <div class="image-container loading-container">
      <img class="stats-image" :src="forecastImageUrl" @load="isLoading = false" />
      <div class="loader text-center" v-if="isLoading">
        <b-spinner class="large-spinner text-success" />
      </div>
    </div>
  </block-box>
</template>

<script>
import { settings } from "@/settings";

export default {
  name: "Statistics",
  mounted() {},
  data() {
    return {
      isLoading: true
    };
  },
  computed: {
    forecastImageUrl() {
      console.log(settings);
      return settings.FORECAST_URL;
    }
  },
  watch: {},
  methods: {}
};
</script>

<style lang="scss">
.statistics-page {
  .image-container {
    padding: 30px;
    position: relative;
    min-height: 200px;

    .stats-image {
      width: 100%;
    }

    .loader {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      background: #444;
      opacity: 0.4;

      .large-spinner {
        width: 4rem;
        height: 4rem;

        position: absolute;
        top: calc(50% - 2rem);
        left: calc(50% - 2rem);
      }
    }
  }
}
</style>
