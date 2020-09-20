<template>
  <block-box class="award-box">
    <h3>Auszeichnungen</h3>
    <div v-if="isLoading" class="loader text-center">
      <b-spinner class="large-spinner text-success" />
    </div>
    <ul class="list-unstyled" v-for="award in allAwards" v-bind:key="award.title" v-else-if="allAwards.length > 0">
      <li>
        <font-awesome-icon :icon="getIconForAwardKind(award.kind)" class="mr-2 color-green" />
        {{award.title}}
      </li>
    </ul>
    <p v-else>Du hast leider noch keine Auszeichnungen erhalten. Sammle weiter Punkte um bald eine Auszeichnung zu erhalten.</p>
  </block-box>
</template>

<script>
import { AWARDS_LIST } from '@/store/actions/awards'
import { mapGetters } from 'vuex'

export default {
  name: 'UserBadges',
  mounted () {
    this.isLoading = true
    this.$store
      .dispatch(AWARDS_LIST)
      .then(() => {
        this.isLoading = false
      })
      .catch(() => {
        this.isLoading = false
      })
  },
  data () {
    return {
      isLoading: false,
      iconMap: {
        Award: 'award',
        OnBoardingAward: 'door-open',
        TrashHeroAward: 'trash-alt'
      }
    }
  },
  computed: {
    ...mapGetters(['allAwards'])
  },
  watch: {},
  methods: {
    getIconForAwardKind (awardKind) {
      const icon = this.iconMap[awardKind]
      return icon !== undefined ? icon : 'award'
    }
  },
  components: {}
}
</script>

<style lang="scss">
.award-box {
  .loader {
    margin: 50px 0;

    .large-spinner {
      width: 4rem;
      height: 4rem;
    }
  }
}
</style>
