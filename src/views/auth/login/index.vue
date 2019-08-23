<template>
  <div class="auth-page loading">
    <h1>Login</h1>
  </div>
</template>

<script>
import { AUTH_REQUEST } from "@/store/actions/auth";
export default {
  name: "Login",
  data() {
    return {
      email: "johndoe@example.com",
      password: "securepassword",
    };
  },
  methods: {
    login() {
      this.$refs.loadingButton.startLoading();
      const { email, password } = this;
      this.$store
        .dispatch(AUTH_REQUEST, { email, password })
        .then(() => {
          this.$refs.loadingButton.stopLoading();
          this.$router.push("/");
        })
        .catch(error => {
          this.$refs.loadingButton.stopLoading();
          this.$snack.danger({
            text: error.message
          });
        });
    }
  }
};
</script>

<style lang="scss">

</style>
