<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { TOKEN_PROCESS } from "@/store/actions/token";

export default {
  mounted() {
    this.$store.dispatch(TOKEN_PROCESS)
  },
  methods: {
  }
};
</script>
