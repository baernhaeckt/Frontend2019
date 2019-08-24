<template>
  <block-box>
    <h3>Deine Umgebung</h3>
    <div class="google-maps-container">
      <img src="/assets/static_map.png" class="static-map" />
    </div>
  </block-box>
</template>

<script>
export default {
  name: "GoogleMap",
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
  .google-maps-container {
    .static-map {
      width: 100%;
    }
  }
</style>