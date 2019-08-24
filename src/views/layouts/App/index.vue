<template>
  <div>
    <navbar />
    <b-container fluid class="main">
      <b-row>
        <b-col md="3">
          <ranking />
          <user-badges />
        </b-col>
        <b-col><router-view></router-view></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Navbar from './../Modules/Navigation'
import Ranking from './../../../components/Ranking'
import UserBadges from './../../../components/UserBadges'

export default {
  name: "App",
  mounted() {
  },
  components: {
    Navbar,
    Ranking,
    UserBadges
  }
};
</script>

<style lang="scss">
  .main {
    margin-top: 30px;
    min-height: calc(100vh - 30px - 81px);
  }
</style>
