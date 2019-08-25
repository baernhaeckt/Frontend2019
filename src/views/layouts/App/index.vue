<template>
  <div>
    <navbar ref="navigationBar" />
    <b-container fluid class="main">
      <b-row>
        <b-col md="3">
          <b-button size="sm" variant="info" block class="mb-4 d-block d-md-none" v-if="sidebarToggleable" v-b-toggle.collapse-sidebar>{{ sidebarVisible ? 'weniger...' : 'mehr...' }}</b-button>
          <b-collapse id="collapse-sidebar" v-model="sidebarVisible">
            <ranking />
            <user-badges />
            <widget-quiz />
          </b-collapse>
        </b-col>
        <b-col><router-view></router-view></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Navbar from "./../Modules/Navigation";
import Ranking from "./../../../components/Ranking";
import UserBadges from "./../../../components/UserBadges";
import WidgetQuiz from "./../../../components/WidgetQuiz";

export default {
  name: "App",
  mounted() {
    let toggler = this.$refs.navigationBar.$el.getElementsByClassName(
      "navbar-toggler"
    );
    let visibility =
      toggler !== undefined
        ? window.getComputedStyle(toggler[0], null).getPropertyValue("display")
        : "none";
    if (visibility !== "none") {
      if (this.$route.name === "home") {
        this.sidebarVisible = true;
        this.sidebarToggleable = false;
      } else {
        this.sidebarVisible = false;
        this.sidebarToggleable = true;
      }
    }
  },
  data() {
    return {
      sidebarVisible: true,
      sidebarToggleable: false
    };
  },
  methods: {},
  watch: {
    $route(to, from) {
      let toggler = this.$refs.navigationBar.$el.getElementsByClassName(
        "navbar-toggler"
      );
      let visibility =
        toggler !== undefined
          ? window
              .getComputedStyle(toggler[0], null)
              .getPropertyValue("display")
          : "none";
      if (visibility !== "none") {
        if (from.name === "home") {
          this.sidebarVisible = false;
          this.sidebarToggleable = true;
        } else if (to.name === "home") {
          this.sidebarVisible = true;
          this.sidebarToggleable = false;
        }
      }
    }
  },
  components: {
    Navbar,
    Ranking,
    UserBadges,
    WidgetQuiz
  }
};
</script>

<style lang="scss">
.main {
  margin-top: 30px;
  min-height: calc(100vh - 30px - 81px);
}
</style>
