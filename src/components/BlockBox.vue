<template>
  <div class="block-box rounded">
    <slot />
  </div>
</template>

<script>

export default {
  name: "BlockBox",
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
  }
};
</script>

<style lang="scss">
  .block-box {
    padding: 10px;
    border: 1px solid lighten(#926649, 30%);
    background-color: lighten(#926649, 50%);

    margin-bottom: 20px;
  }
</style>