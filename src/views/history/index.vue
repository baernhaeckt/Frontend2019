<template>
  <div class="history-page">
    <block-box>
      <h1>Deine Punkte Aktionen</h1>
      <div v-if="!isLoaded" class="loader text-center">
        <b-spinner class="large-spinner text-success" />
      </div>
      <template v-else>
        <b-table striped responsive hover :items="getPoints" :fields="tableFields" v-if="hasPoints">

        </b-table>
        <div v-else class="no-points">
          <font-awesome-icon :icon="['far', 'frown-open']" class="sad-user" />
          <div class="no-points-text">
            Du hast leider noch keine Punkte auf <img src="/assets/logo.svg" width="70" class="leaf-logo" />. Beantworte doch jetzt ein Quiz um Deine ersten Punkte zu verdienen!
          </div>
        </div>
      </template>
    </block-box>
  </div>
</template>

<script>
import { POINTS_LIST } from '@/store/actions/points'
import { USER_REQUEST } from '@/store/actions/user'
import { mapGetters } from 'vuex'

export default {
  name: 'History',
  mounted () {
    this.$store.dispatch(USER_REQUEST)
      .then(() => {
        this.$store
          .dispatch(POINTS_LIST, this.$store.getters.getProfile.id)
          .then(() => {
            this.isLoaded = true
          })
      })
  },
  data () {
    return {
      isLoaded: false,
      tableFields: [
        { key: 'text', sortable: true, label: 'Aktion' },
        { key: 'value', sortable: true, label: 'Punkte' },
        { key: 'date', sortable: true, label: 'Datum' },
        { key: 'co2Saving', label: 'CO2 Ersparnisse' }
      ]
    }
  },
  computed: {
    ...mapGetters(['getPoints']),
    hasPoints () {
      return this.isLoaded && this.getPoints.length > 0
    }
  },
  watch: {},
  methods: {}
}
</script>

<style lang="scss">
@import '~bootstrap/scss/functions';
@import '~bootstrap/scss/variables';
@import '~bootstrap/scss/mixins';

.history-page {
  .loader {
    margin: 50px 0;

    .large-spinner {
      width: 4rem;
      height: 4rem;
    }
  }

  .table {
    min-width: 700px;
  }

  .no-points {
    text-align: center;
    margin: 50px 0;

    .sad-user {
      color: $warning;
      font-size: 4rem;
    }

    .no-points-text {
      margin-top: 20px;

      .leaf-logo {
        width: 60px;
        height: 18px;
        object-fit: cover;
        object-position: left;
        margin-top: -4px;
      }
    }
  }
}
</style>
