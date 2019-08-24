<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { TOKEN_PROCESS } from "@/store/actions/token";
import { mapState } from 'vuex';

export default {
  mounted() {
    this.$store.dispatch(TOKEN_PROCESS)
    if (this.$store.getters.isAuthenticated) {
      window.newsfeed.startConnection(this.$store.getters.accessToken)
    }
    this.$store.watch(
      (state, getters) => getters.isAuthenticated,
      (newValue, oldValue) => {
        if (newValue) {
          window.newsfeed.startConnection(this.$store.getters.accessToken)
        } else {
          window.newsfeed.stopConnection()
        }
      },
    );
  },
  methods: {
  },
};
</script>

<style lang="scss">
  .color-green { color: $success; }
  .color-gold { color: gold; }
  .color-silver { color: silver; }
  .color-bronze { color: #cd7f32; }

</style>