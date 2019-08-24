<template>
  <block-box class="ranking-box">
    <h3>Dein Ranking</h3>
    <div v-if="isLoading" class="loader text-center">
      <b-spinner class="large-spinner text-success" />
    </div>
    <ul class="list-unstyled" v-if="!isLoading">
      <li>
        <font-awesome-icon :icon="['fas', 'trophy']" class="mr-2 color-gold" v-if="getSummary.global === 1"/> 
        <font-awesome-icon :icon="['fas', 'trophy']" class="mr-2 color-silver" v-if="getSummary.global === 2"/> 
        <font-awesome-icon :icon="['fas', 'trophy']" class="mr-2 color-bronze" v-if="getSummary.global === 3"/> 
        <font-awesome-icon :icon="['fas', 'medal']" class="mr-2 color-bronze" v-if="getSummary.global <= 10 && getSummary.global > 3"/> 
        <font-awesome-icon :icon="['fas', 'award']" class="mr-2 color-bronze" v-if="getSummary.global > 10"/> 
        {{ getSummary.global }}. in der Schweiz
      </li>
      <li>
        <font-awesome-icon :icon="['fas', 'trophy']" class="mr-2 color-gold" v-if="getSummary.local === 1"/> 
        <font-awesome-icon :icon="['fas', 'trophy']" class="mr-2 color-silver" v-if="getSummary.local === 2"/> 
        <font-awesome-icon :icon="['fas', 'trophy']" class="mr-2 color-bronze" v-if="getSummary.local === 3"/> 
        <font-awesome-icon :icon="['fas', 'medal']" class="mr-2 color-bronze" v-if="getSummary.local <= 10 && getSummary.local > 3"/> 
        <font-awesome-icon :icon="['fas', 'award']" class="mr-2 color-bronze" v-if="getSummary.local > 10"/>
        {{ getSummary.local }}. In Deinem Quartier
      </li>
      <li>
        <font-awesome-icon :icon="['fas', 'trophy']" class="mr-2 color-gold" v-if="getSummary.friends === 1"/> 
        <font-awesome-icon :icon="['fas', 'trophy']" class="mr-2 color-silver" v-if="getSummary.friends === 2"/> 
        <font-awesome-icon :icon="['fas', 'trophy']" class="mr-2 color-bronze" v-if="getSummary.friends === 3"/> 
        <font-awesome-icon :icon="['fas', 'medal']" class="mr-2 color-bronze" v-if="getSummary.friends <= 10 && getSummary.friends > 3"/> 
        <font-awesome-icon :icon="['fas', 'award']" class="mr-2 color-bronze" v-if="getSummary.friends > 10"/>
        {{ getSummary.friends }}. unter deinen Freunden
      </li>
    </ul>
  </block-box>
</template>

<script>
import { RANKINGS_SUMMARY } from "@/store/actions/rankings.js";
import BlockBox from './BlockBox'
import { mapGetters } from 'vuex';

export default {
  name: "Ranking",
  mounted() {
    this.$store.dispatch(RANKINGS_SUMMARY)
      .then(() => {
        this.isLoading = false
      })
  },
  data() {
    return {
      isLoading: true
    }
  },
  computed: {
    ...mapGetters(['getSummary']),
  },
  watch: {
  },
  methods: {
  },
  components: {
  }
};
</script>

<style lang="scss">
  .ranking-box {
  }
</style>