<template>
  <div class="profile-page">
    <block-box class="position-relative">
      <h1>Passwort ändern</h1>
      <div v-if="loading" class="loader centered-spinner">
        <b-spinner class="large-spinner text-success" />
      </div>
      <b-form @submit.prevent="storeNewPassword">
        <b-form-group label="Altes Passwort">
          <b-input type="password" id="oldPassword" name="oldPassword" v-model="oldPassword" :state="validationState.oldPassword" />
          <b-form-invalid-feedback id="input-live-feedback">
            {{ errors.oldPassword }}
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group label="Neues Passwort">
          <b-input type="password" id="newPassword" name="newPassword" v-model="newPassword" :state="validationState.newPassword" />
          <b-form-invalid-feedback id="input-live-feedback">
            {{ errors.newPassword }}
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group label="Neues Passwort wiederholen">
          <b-input type="password" id="newPasswordRepeat" name="newPasswordRepeat" v-model="newPasswordRepeat" :state="validationState.newPasswordRepeat" />
          <b-form-invalid-feedback id="input-live-feedback">
            {{ errors.newPasswordRepeat }}
          </b-form-invalid-feedback>
        </b-form-group>
        <b-button type="submit" variant="success" :disabled="loading">neues Passwort setzen</b-button>
      </b-form>
    </block-box>
  </div>
</template>

<script>
import { USER_PASSWORD_CHANGE } from '@/store/actions/user'
import { mapGetters } from 'vuex'

export default {
  name: 'Profile',
  mounted () {
  },
  data () {
    return {
      oldPassword: '',
      newPassword: '',
      newPasswordRepeat: '',
      loading: false,
      errors: {
        oldPassword: null,
        newPassword: null,
        newPasswordRepeat: null
      }
    }
  },
  computed: {
    ...mapGetters(['getProfile']),
    validationState () {
      return {
        oldPassword: this.errors.oldPassword && this.errors.oldPassword.length === 0,
        newPassword: this.errors.newPassword && this.errors.newPassword.length === 0,
        newPasswordRepeat: this.errors.newPasswordRepeat && this.errors.newPasswordRepeat.length === 0
      }
    }
  },
  watch: {
    getProfile (newValue, oldValue) {
      this.updatedProfile = JSON.parse(JSON.stringify(this.getProfile))
    }
  },
  methods: {
    updateValidation (errorFields) {
      if (errorFields.oldPassword && errorFields.oldPassword.length > 0) {
        this.errors.oldPassword = errorFields.oldPassword.join(', ')
      }
      if (errorFields.newPassword && errorFields.newPassword.length > 0) {
        this.errors.newPassword = errorFields.newPassword.join(', ')
      }
      if (errorFields.newPasswordRepeat && errorFields.newPasswordRepeat.length > 0) {
        this.errors.newPasswordRepeat = errorFields.newPasswordRepeat.join(', ')
      }
    },
    storeNewPassword () {
      if (this.newPassword !== this.newPasswordRepeat) {
        this.updateValidation({ newPasswordRepeat: ['Die Passwortwiederholung stimmt nicht mit dem neuen Passwort überein.'] })
        return
      }

      this.loading = true
      this.$store.dispatch(USER_PASSWORD_CHANGE, { oldPassword: this.oldPassword, newPassword: this.newPassword }).then(() => {
        this.loading = false
        this.oldPassword = ''
        this.newPassword = ''
        this.newPasswordRepeat = ''
        this.$bvToast.toast('Dein Passwort wurde erfolgreich aktualisiert.', {
          title: 'Passwort gespeichert',
          variant: 'success',
          solid: true,
          autoHideDelay: 5000
        })
      }).catch(err => {
        this.loading = false
        if (Object.keys(err.errorFields).length > 0) {
          this.updateValidation(err.errorFields)
        }

        if (!err.unauthorized) {
          this.$bvToast.toast('Beim speichern ist ein Fehler aufgetreten, bitte überprüfe die Meldungen bei den Eingabefeldern.', {
            title: 'Fehler beim speichern des neuen Passworts',
            variant: 'danger',
            solid: true,
            autoHideDelay: 5000
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
.centered-spinner {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0,0,0,.5);

  .large-spinner {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -1rem;
    margin-top: -1rem;
  }
}
</style>
