<template>
  <b-container>
    <b-row class="justify-content-md-center vh-100 overflow-hidden">
      <b-col cols="12" md="auto" class="m-auto auth-page">
        <div class="text-white clearfix">
          <div
            class="email-form auth-page-content"
            v-if="!needPassword && !isNewUser"
            key="emailform"
          >
            <div class="logo"></div>
            <h1>Identifikation</h1>
            <p>Bitte gib hier Deine E-Mail-Adresse an um fortzufahren</p>
            <b-form @submit.prevent="checkEmail">
              <b-input-group>
                <b-form-input
                  id="email"
                  name="email"
                  v-model="email"
                  type="email"
                  required
                  placeholder="E-Mail"
                  ref="emailInput"
                />
                <b-button
                  slot="append"
                  variant="success"
                  type="submit"
                  class="next-button"
                  :disabled="isLoading"
                >
                  <b-spinner small v-if="isLoading" />Weiter
                </b-button>
              </b-input-group>
            </b-form>
          </div>
          <div class="password-form auth-page-content" v-if="needPassword" key="passwordform">
            <div class="logo"></div>
            <h1>Wilkommen zurück</h1>
            <p>Bitte bestätige Deinen Account mit Deinem persönlichen Passwort.</p>
            <b-form @submit.prevent="login">
              <b-input-group>
                <b-form-input
                  id="password"
                  name="password"
                  v-model="password"
                  type="password"
                  required
                  placeholder="Passwort"
                  ref="passwordInput"
                />
                <b-button
                  slot="append"
                  variant="success"
                  type="submit"
                  class="next-button"
                  :disabled="isLoading"
                >
                  <b-spinner small v-if="isLoading" />Einloggen
                </b-button>
              </b-input-group>
            </b-form>
          </div>
          <div class="welcome-new-user auth-page-content" v-if="isNewUser" key="welcomenewuser">
            <div class="logo"></div>
            <h1>Herzlich willkommen</h1>
            <p>Danke hast Du Dich angemeldet. Wir haben Dir eine Email gesendet, damit Du Dein Profil vervollständigen kannst.</p>
            <b-button
              variant="success"
              class="float-right"
              @click="acceptNewUserScreen"
            >Jetzt Loslegen</b-button>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { AUTH_REQUEST, AUTH_CHECK } from '@/store/actions/auth'

export default {
  name: 'Login',
  mounted () {
    this.$refs.emailInput.$el.focus()
  },
  data () {
    return {
      email: '',
      password: '',
      needPassword: false,
      isNewUser: false,
      isLoading: false
    }
  },
  methods: {
    checkEmail () {
      this.isLoading = true
      this.$store
        .dispatch(AUTH_CHECK, this.email)
        .then(() => {
          this.isNewUser = true
          this.isLoading = false
        })
        .catch(error => {
          if (error.unauthorized) {
            this.needPassword = true
            this.isLoading = false
            this.$nextTick(() => {
              this.$refs.passwordInput.$el.focus()
            })
          } else {
            this.isLoading = false
            this.$snack.danger({
              title: 'Es ist ein Fehler aufgetreten',
              text: error.message
            })
          }
        })
    },
    login () {
      this.isLoading = true
      const { email, password } = this
      this.$store
        .dispatch(AUTH_REQUEST, { email, password })
        .then(() => {
          this.isLoading = false
          this.$router.push('/')
        })
        .catch(error => {
          this.isLoading = false
          this.needPassword = false
          this.email = ''
          this.password = ''
          this.$snack.danger({
            text: error.message
          })
        })
    },
    acceptNewUserScreen () {
      this.$router.push('/profile')
    }
  }
}
</script>

<style lang="scss">
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/mixins";

.auth-page {
  .auth-page-content {
    max-width: 50vw;
    padding: 30px;
    border: 1px solid rgb(148, 89, 0);
    border-radius: 20px;
    background-image: url("/assets/cardboard_background.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    box-shadow: 4px 5px 20px 0px #333;

    @include media-breakpoint-down(sm) {
      max-width: 100vw;
    }
  }

  .logo {
    background-image: url("/assets/logo.svg");
    background-size: contain;
    background-repeat: no-repeat;
    margin-bottom: 30px;
    min-height: 55px;
  }

  .input-group {
    .input-group-append {
      .next-button {
        @include border-right-radius($input-border-radius);
      }
    }
  }

  .email-form,
  .password-form,
  .welcome-new-user {
    float: left;
  }
}
</style>
