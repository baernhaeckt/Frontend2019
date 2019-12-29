<template>
  <block-box class="baseline-box">
    <h3>Du im Vergleich zum Durchschnitts-Schweizer</h3>
    <div class="chart-outer-container">
      <GChart class="chart-container" type="ColumnChart"
            :settings="{packages: ['bar']}"
            :data="chartData"
            :options="chartOptions"
            :createChart="(el, google) => new google.charts.Bar(el)"
            @ready="onChartReady" />
    </div>

  </block-box>
</template>

<script>
import {
  LIST_SUFFICIENTS_BASELINE,
  LIST_SUFFICIENTS_PERSONAL
} from '@/store/actions/sufficient_types'
import { mapGetters } from 'vuex'

export default {
  name: 'BaselineCompare',
  mounted () {
    this.$store.dispatch(LIST_SUFFICIENTS_BASELINE).then(() => {
      this.baseLineLoaded = true
    })
    this.$store.dispatch(LIST_SUFFICIENTS_PERSONAL).then(() => {
      this.personalLoaded = true
    })
  },
  data () {
    return {
      baseLineLoaded: false,
      personalLoaded: false,
      chartsLib: null
    }
  },
  computed: {
    allDataLoaded () {
      return this.baseLineLoaded && this.personalLoaded
    },
    userDataVsBaseLine () {
      let baseLine = this.getBaseline()
      let personal = this.getPersonal()

      let data = baseLine.map(item => {
        let sufficientTypeTitle = this.getTitleForSufficientType(item.type)
        let personalItemIndex = personal.findIndex(
          pItem => pItem.type === item.type
        )
        let personalPoints =
          personalItemIndex !== -1 ? personal[personalItemIndex].points || 0 : 0
        let personalSavings =
          personalItemIndex !== -1
            ? personal[personalItemIndex].co2Savings || 0
            : 0
        return [
          sufficientTypeTitle,
          item.points,
          personalPoints,
          item.co2Savings,
          personalSavings
        ]
      })

      return data
    },
    chartData () {
      var haveCo2Data = this.chartDataHaveCo2Data
      var data = haveCo2Data ? this.userDataVsBaseLine : this.userDataVsBaseLineWithoutCo2Column
      var header = haveCo2Data ? [ 'Name', 'Ø Punkte', 'Deine Punkte', 'Ø CO2 Einsparung', 'Deine CO2 Einsparung' ] : [ 'Name', 'Ø Punkte', 'Deine Punkte' ]
      let result = [
        header,
        ...data
      ]

      console.log(result)

      return result
    },
    userDataVsBaseLineWithoutCo2Column () {
      let userData = this.userDataVsBaseLine
      let userDataWithoutCo2Column = userData.map(data => [data[0], data[1], data[2]])
      console.log(userDataWithoutCo2Column)
      return userDataWithoutCo2Column
    },
    chartDataHaveCo2Data () {
      let userData = this.userDataVsBaseLine
      return userData.some(val => val[3] > 0 || val[4] > 0)
    },
    chartOptions () {
      if (!this.chartsLib) {
        return null
      }

      let chartSeries = {}
      let chartAxesY = {}

      // if we have CO2 data, plot full chart, otherwise only points chart
      if (this.chartDataHaveCo2Data) {
        chartSeries = {
          0: { axis: 'points' },
          1: { axis: 'points' },
          2: { axis: 'savings' },
          3: { axis: 'savings' }
        }
        chartAxesY = {
          points: {
            label: 'Gesammelte Punkte'
          }, // Left y-axis.
          savings: {
            side: 'right',
            label: 'CO2 Einsparung'
          } // Right y-axis.
        }
      } else {
        chartSeries = {
          0: { axis: 'points' },
          1: { axis: 'points' }
        }
        chartAxesY = {
          points: {
            label: 'Gesammelte Punkte'
          }
        }
      }

      let chartOptions = this.chartsLib.charts.Bar.convertOptions({
        chart: {
          title: 'Durchschnitts-Vergleich',
          subtitle: 'Deine Werte verglichen zum durchschnittlichen leaf Benutzer.'
        },
        series: chartSeries,
        axes: {
          y: chartAxesY
        }
      })

      return chartOptions
    }
  },
  watch: {},
  methods: {
    ...mapGetters(['getBaseline', 'getPersonal']),
    onChartReady (chart, google) {
      this.chartsLib = google
    },
    getTitleForSufficientType (sufficientType) {
      switch (sufficientType) {
        case 1: return 'Wissen'
      }
    }
  },
  components: {}
}
</script>

<style lang="scss">
@import '~bootstrap/scss/functions';
@import '~bootstrap/scss/variables';
@import '~bootstrap/scss/mixins';

.baseline-box {
  .chart-outer-container {
    position: relative;
    padding-bottom: 50vh;
    height: 0;
    overflow: hidden;

    .chart-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 50vh;
      background: $white;
      padding: 20px;
    }
  }
}
</style>
