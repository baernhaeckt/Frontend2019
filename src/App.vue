<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { AUTH_LOGOUT } from "@/store/actions/auth";
export default {
  methods: {
    logout() {
      this.$store.dispatch(AUTH_LOGOUT).then(() => this.$router.push("/login"));
    }
  }
};
</script>
