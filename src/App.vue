<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { TOKEN_PROCESS } from "@/store/actions/token";
import { mapState } from "vuex";

export default {
  mounted() {
    if (this.$store.getters.isAuthenticated) {
      window.newsfeed.startConnection(this.$store.getters.accessToken);

      this.$store.dispatch(TOKEN_PROCESS)
      .catch(() => {
        this.$bvToast.toast("Das gewünschte Token wurde nicht gefunden oder wurde bereits eingelöst. Leider konnten wir Dir keine Punkte gutschreiben.", {
          title: "Fehler beim Einlesen des Tokens",
          variant: "warning",
          solid: true,
          autoHideDelay: 5000
        });
      });
    }
    this.$store.watch(
      (state, getters) => getters.isAuthenticated,
      (newValue, oldValue) => {
        if (newValue) {
          window.newsfeed.startConnection(this.$store.getters.accessToken);

          this.$store.dispatch(TOKEN_PROCESS)
            .catch(() => {
              this.$bvToast.toast("Das gewünschte Token wurde nicht gefunden oder wurde bereits eingelöst. Leider konnten wir Dir keine Punkte gutschreiben.", {
                title: "Fehler beim Einlesen des Tokens",
                variant: "warning",
                solid: true,
                autoHideDelay: 5000
              });
            });
        } else {
          window.newsfeed.stopConnection();
        }
      }
    );
  },
  methods: {}
};
</script>

<style lang="scss">
.color-green {
  color: $success;
}
.color-gold {
  color: gold;
}
.color-silver {
  color: silver;
}
.color-bronze {
  color: #cd7f32;
}
</style>
