<template>
  <div class="profile-page">
    <block-box>
      <h1>Vervollständige jetzt Dein Profil</h1>
      <b-form @submit.prevent="storeProfile" class="position-relative">
        <div v-if="loading" class="loader centered-spinner">
          <b-spinner class="large-spinner text-success" />
        </div>
        <b-form-group label="E-Mail Adresse (privat)">
          <b-input id="email" name="email" v-model="updatedProfile.email" placeholder="E-Mail" :state="validationState.email" readonly />
          <b-form-invalid-feedback id="input-live-feedback">
            {{ errors.email }}
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group label="Nickname (sichtbar für alle Benutzer)">
          <b-input id="displayname" name="nickname" v-model="updatedProfile.displayName" :state="validationState.nickname" placeholder="Nickname" />
          <b-form-invalid-feedback id="input-live-feedback">
            {{ errors.nickname }}
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group label="Strasse (nur sichtbar für Deine Freunde)">
          <b-input id="street" name="street" v-model="updatedProfile.street" :state="validationState.street" placeholder="Strasse" />
          <b-form-invalid-feedback id="input-live-feedback">
            {{ errors.street }}
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group label="Postleitzahl (nur sichtbar für Deine Freunde)">
        <b-input id="postalCode" name="postalCode" v-model="updatedProfile.postalCode" :state="validationState.postalCode" placeholder="Postleitzahl" />
          <b-form-invalid-feedback id="input-live-feedback">
            {{ errors.postalCode }}
          </b-form-invalid-feedback>
          </b-form-group>
        <b-form-group label="Ort (nur sichtbar für Deine Freunde)">
          <b-input id="city" name="city" v-model="updatedProfile.city" :state="validationState.city" placeholder="Ort" />
          <b-form-invalid-feedback id="input-live-feedback">
            {{ errors.city }}
          </b-form-invalid-feedback>
        </b-form-group>
        <b-button type="submit" variant="success" :disabled="loading">Profil aktualisieren</b-button>
      </b-form>
    </block-box>
  </div>
</template>

<script>
import { USER_REQUEST, USER_UPDATE } from '@/store/actions/user'
import { mapGetters } from 'vuex'

export default {
  name: 'Profile',
  mounted () {
    this.loadProfile()
  },
  data () {
    return {
      updatedProfile: {
        email: '',
        displayName: '',
        street: '',
        postalCode: '',
        city: ''
      },
      loading: false,
      errors: {
        email: null,
        nickname: null,
        street: null,
        postalCode: null,
        city: null
      }
    }
  },
  computed: {
    ...mapGetters(['getProfile']),
    validationState () {
      return {
        email: this.errors.email && this.errors.email.length === 0,
        nickname: this.errors.nickname && this.errors.nickname.length === 0,
        street: this.errors.street && this.errors.street.length === 0,
        postalCode: this.errors.postalCode && this.errors.postalCode.length === 0,
        city: this.errors.city && this.errors.city.length === 0
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
      if (errorFields.DisplayName && errorFields.DisplayName.length > 0) {
        this.errors.nickname = errorFields.DisplayName.join(', ')
      }
      if (errorFields.Street && errorFields.Street.length > 0) {
        this.errors.street = errorFields.Street.join(', ')
      }
      if (errorFields.PostalCode && errorFields.PostalCode.length > 0) {
        this.errors.postalCode = errorFields.PostalCode.join(', ')
      }
      if (errorFields.City && errorFields.City.length > 0) {
        this.errors.city = errorFields.City.join(', ')
      }
    },
    loadProfile () {
      this.loading = true
      this.$store.dispatch(USER_REQUEST).then(() => {
        this.profile = JSON.parse(
          JSON.stringify(this.$store.getters.getProfile))
        this.loading = false
      })
    },
    storeProfile () {
      this.loading = true
      let profile = {
        displayName: this.updatedProfile.displayName,
        street: this.updatedProfile.street,
        postalCode: this.updatedProfile.postalCode,
        city: this.updatedProfile.city
      }

      this.$store.dispatch(USER_UPDATE, profile).then(() => {
        this.loading = false
        this.$bvToast.toast('Dein Profil wurde erfolgreich aktualisiert.', {
          title: 'Profil gespeichert',
          variant: 'success',
          solid: true,
          autoHideDelay: 5000
        })
      }).catch(err => {
        this.loading = false
        if (Object.keys(err.errorFields).length > 0) {
          this.updateValidation(err.errorFields)
        }

        this.$bvToast.toast('Beim speichern ist ein Fehler aufgetreten, bitte überprüfe die Meldungen bei den Eingabefeldern.', {
          title: 'Fehler beim speichern des Profils',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000
        })
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
