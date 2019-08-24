<template>
  <div class="profile-page">
    <h1>Vervollständige jetzt Dein Profil</h1>
    <b-form @submit.prevent="updateProfile">
      <b-form-group label="E-Mail Adresse">
        <b-input id="email" name="email" v-model="updatedProfile.email" placeholder="E-Mail" readonly />
      </b-form-group>
      <b-form-group label="Nickname (sichtbar für alle Benutzer)">
        <b-input id="displayname" name="nickname" v-model="updatedProfile.displayName" placeholder="Nickname" />
      </b-form-group>

      <b-button type="submit" variant="success">Profil aktualisieren</b-button>
    </b-form>
  </div>
</template>

<script>
import { USER_REQUEST, USER_UPDATE } from "@/store/actions/user.js";
import { mapGetters } from 'vuex';

export default {
  name: "Profile",
  mounted() {
    this.$store.dispatch(USER_REQUEST)
      .then(() => {
        this.profile = JSON.parse(JSON.stringify(this.$store.getters.getProfile))
      })
  },
  data() {
    return {
      updatedProfile: {}
    }
  },
  computed: {
    ...mapGetters(['getProfile'])
  },
  watch: {
    getProfile(newValue, oldValue) {
      this.updatedProfile = JSON.parse(JSON.stringify(this.getProfile))
    }
  },
  methods: {
    updateProfile () {
      let displayName = this.updatedProfile.displayName
      this.$store.dispatch(USER_UPDATE, displayName)
        .then(() => {
          this.$snack.success({
            text: 'Dein Profil wurde erfolgreich aktualisiert.'
          });
        })
    }
  }
};
</script>
