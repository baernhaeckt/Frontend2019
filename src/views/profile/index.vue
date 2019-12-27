<template>
  <div class="profile-page">
    <h1>Vervollständige jetzt Dein Profil</h1>
    <b-form @submit.prevent="storeProfile">
      <b-form-group label="E-Mail Adresse (privat)">
        <b-input id="email" name="email" v-model="updatedProfile.email" placeholder="E-Mail" readonly />
      </b-form-group>
      <b-form-group label="Nickname (sichtbar für alle Benutzer)">
        <b-input id="displayname" name="nickname" v-model="updatedProfile.displayName" placeholder="Nickname" />
      </b-form-group>
      <b-form-group label="Strasse (sichtbar für alle Benutzer)">
        <b-input id="street" name="street" v-model="updatedProfile.street" placeholder="Strasse" />
      </b-form-group>
      <b-form-group label="Postleitzahl (sichtbar für deine Freunde)">
      <b-input id="postalCode" name="postalCode" v-model="updatedProfile.postalCode" placeholder="Postleitzahl" />
        </b-form-group>
      <b-form-group label="Ort (sichtbar für deine Freunde)">
        <b-input id="city" name="city" v-model="updatedProfile.city" placeholder="Ort" />
      </b-form-group>
      <b-button type="submit" variant="success">Profil aktualisieren</b-button>
    </b-form>
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
      updatedProfile: {}
    }
  },
  computed: {
    ...mapGetters(['getProfile'])
  },
  watch: {
    getProfile (newValue, oldValue) {
      this.updatedProfile = JSON.parse(JSON.stringify(this.getProfile))
    }
  },
  methods: {
    loadProfile () {
      this.$store.dispatch(USER_REQUEST).then(() => {
        this.profile = JSON.parse(
          JSON.stringify(this.$store.getters.getProfile))
      })
    },
    storeProfile () {
      let profile = {
        displayName: this.updatedProfile.displayName,
        street: this.updatedProfile.street,
        postalCode: this.updatedProfile.postalCode,
        city: this.updatedProfile.city
      }

      this.$store.dispatch(USER_UPDATE, profile).then(() => {
        this.$bvToast.toast('Dein Profil wurde erfolgreich aktualisiert.', {
          title: 'Profil gespeichert',
          variant: 'success',
          solid: true,
          autoHideDelay: 5000
        })
      })
    }
  }
}
</script>
