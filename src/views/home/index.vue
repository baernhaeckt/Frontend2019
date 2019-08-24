<template>
  <div>
    <b-button variant="danger" @click="logout">Logout</b-button>

    <h1>Welcome to your home screen!</h1>
  </div>
</template>

<script>
import { AUTH_LOGOUT } from "@/store/actions/auth.js";
export default {
  name: "Home",
  methods: {
    logout: function() {
      this.$store.dispatch(AUTH_LOGOUT).then(() => this.$router.push("/login"));
    }
  }
};
</script>
