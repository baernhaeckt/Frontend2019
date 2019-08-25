<template>
  <b-navbar toggleable="sm" type="dark" variant="success" class="text-white">
    <b-navbar-brand to="/">
      <div class="logo"></div>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-button to="/rankings" class="mr-md-2 mb-md-0 mb-2"><font-awesome-icon :icon="['fas', 'trophy']" class="mr-2" /> Rangliste</b-button>
        <b-button to="/history" class="mr-md-2 mb-md-0 mb-2"><font-awesome-icon :icon="['fas', 'landmark']" class="mr-2" /> Punkte</b-button>
        <b-button to="/friends" class="mr-md-2 mb-md-0 mb-2"><font-awesome-icon icon="users" class="mr-2" /> Freunde</b-button>
        <b-dropdown right href="#" variant="success">
          <template slot="button-content">
            <font-awesome-icon icon="user" class="mr-2" /> {{ userNameOrEmail }}
          </template>
          <b-dropdown-item to="profile"><font-awesome-icon icon="user-edit" class="mr-2" />Dein Profil</b-dropdown-item>
          <b-dropdown-item @click="logout" href="#"><font-awesome-icon icon="sign-out-alt" class="mr-2" />Logout</b-dropdown-item>
        </b-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { AUTH_LOGOUT } from "@/store/actions/auth.js";
import { USER_REQUEST } from "@/store/actions/user.js";
import { mapGetters } from 'vuex'

export default {
  name: "Navbar",
  mounted () {
    this.$store.dispatch(USER_REQUEST)
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(['getProfile']),
    userNameOrEmail () {
      let profile = this.getProfile
      return profile.displayName || profile.email
    }
  },
  methods: {
    logout: function() {
      this.$store.dispatch(AUTH_LOGOUT).then(() => this.$router.push("/login"));
    }
  }
};
</script>

<style lang="scss">
  .navbar {
    background-image: url('/assets/cardboard_background.jpg');
    background-repeat: repeat-x;

    .logo {
      background-image: url('/assets/logo.svg');
      background-size: contain;
      background-repeat: no-repeat;
      min-height: 55px;
      min-width: 215px;

      @include media-breakpoint-down(sm) {
        min-width: 250px;
        min-height: 45px;
      }
    }
  }
</style>
