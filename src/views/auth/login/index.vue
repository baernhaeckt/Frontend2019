<template>
  <b-row class="justify-content-md-center vh-100 overflow-hidden">
    <b-col cols="12" md="auto" class="m-auto auth-page">
      <div class="logo"></div>
      <transition-group tag="div" class="text-white" name="slide-left">
        <div class="email-form" v-if="!needPassword && !isNewUser" key="emailform">
          <h1>Identifikation</h1>
          <p>Bitte gib hier Deine E-Mail-Adresse an um fortzufahren</p>
          <b-form @submit.prevent="checkEmail">
            <b-form-group>
              <b-form-input id="email" v-model="email" type="email" required placeholder="E-Mail" />
            </b-form-group>
            <b-button variant="primary" type="submit">Weiter</b-button>
          </b-form>
        </div>
        <div class="password-form" v-if="needPassword" key="passwordform">
          <h1>Wilkommen zurück</h1>
          <p>Bitte bestätige Deinen Account mit Deinem persönlichen Passwort.</p>
          <b-form @submit.prevent="login">
            <b-form-group>
              <b-form-input id="password" v-model="password" type="password" required placeholder="Passwort" />
            </b-form-group>
            <b-button variant="primary" type="submit">Login</b-button>
          </b-form>
        </div>
        <div class="welcome-new-user" v-if="isNewUser" key="welcomenewuser">
          <h1>Herzlich willkommen</h1>
          <p>Danke hast Du Dich angemeldet. Wir haben Dir eine Email gesendet, damit Du Dein Profil vervollständigen kannst.</p>
          <b-button variant="primary" @click="acceptNewUserScreen">Loslegen</b-button>
        </div>
      </transition-group>
    </b-col>
  </b-row>
</template>

<script>
import { AUTH_REQUEST, AUTH_CHECK } from "@/store/actions/auth";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      needPassword: false,
      isNewUser: false
    };
  },
  methods: {
    checkEmail() {
      this.$store
        .dispatch(AUTH_CHECK, this.email)
        .then(() => {
          this.isNewUser = true
        })
        .catch (error => {
          this.needPassword = true
        })
    },
    login() {
      const { email, password } = this;
      this.$store
        .dispatch(AUTH_REQUEST, { email, password })
        .then(() => {
          this.$router.push("/");
        })
        .catch(error => {
          this.$snack.danger({
            text: error.message
          });
        });
    },
    acceptNewUserScreen() {
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss">

.auth-page {
  padding: 30px;
  border: 1px solid rgb(148, 89, 0);
  border-radius: 20px;
  background-image: url('/assets/cardboard_background.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: 4px 5px 20px 0px #333;

  .logo {
    background-image: url('/assets/logo.svg');
    background-size: contain;
    background-repeat: no-repeat;
    margin-bottom: 30px;
    min-height: 55px;
  }

  .email-form,
  .password-form,
  .welcome-new-user {
    float:left;
  }

  .slide-left-enter-active,
  .slide-left-leave-active {
    transition: transform 500ms ease-out;
  }

  .slide-left-enter {
    transform: translateX(200%);
  }

  .slide-left-enter-to,
  .slide-left-leave {
    transform: translateX(0%);
  }

  .slide-left-leave-to {
    transform: translateX(-200%);
  }
}

</style>
