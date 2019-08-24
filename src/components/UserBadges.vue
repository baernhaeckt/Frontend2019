<template>
  <block-box class="award-box">
    <h3>Auszeichnungen</h3>
    <div v-if="isLoading" class="loader text-center">
      <b-spinner class="large-spinner text-success" />
    </div>
    <ul class="list-unstyled" v-for="award in allAwards" v-bind:key="award.title" v-else>
      <li>
        <font-awesome-icon :icon="getIconForAwardKind(award.kind)" class="mr-2 color-green" />
        {{award.title}}
      </li>
    </ul>
  </block-box>
</template>

<script>
import { AWARDS_LIST } from "@/store/actions/awards";
import { mapGetters } from 'vuex';

export default {
  name: "UserBadges",
  mounted() {
    this.isLoading = true
    this.$store.dispatch(AWARDS_LIST)
      .then(() => {
        this.isLoading = false
      })
      .catch(() => {
        this.isLoading = false
      })
  },
  data() {
    return {
      isLoading: false,
      iconMap: {
        'Onboarding': 'door-open',
        'TrashHero': 'trash-alt'
      }
    };
  },
  computed: {
    ...mapGetters(['allAwards']),
  },
  watch: {},
  methods: {
    getIconForAwardKind(awardKind) {
      return this.iconMap[awardKind]
    }
  },
  components: {}
};
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
