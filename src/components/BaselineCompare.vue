<template>
  <block-box class="baseline-box">
    <h3>Du im Vergleich zum Durchschnitt</h3>
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
      const baseLine = this.getBaseline()
      const personal = this.getPersonal()

      const data = baseLine.map(item => {
        const sufficientTypeTitle = this.getTitleForSufficientType(item.type)
        const personalItemIndex = personal.findIndex(
          pItem => pItem.type === item.type
        )
        const personalPoints =
          personalItemIndex !== -1 ? personal[personalItemIndex].points || 0 : 0
        const personalSavings =
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
      var header = haveCo2Data ? ['Name', 'Ø Punkte', 'Deine Punkte', 'Ø CO2 Einsparung', 'Deine CO2 Einsparung'] : ['Name', 'Ø Punkte', 'Deine Punkte']
      const result = [
        header,
        ...data
      ]

      return result
    },
    userDataVsBaseLineWithoutCo2Column () {
      const userData = this.userDataVsBaseLine
      const userDataWithoutCo2Column = userData.map(data => [data[0], data[1], data[2]])
      return userDataWithoutCo2Column
    },
    chartDataHaveCo2Data () {
      const userData = this.userDataVsBaseLine
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

      const chartOptions = this.chartsLib.charts.Bar.convertOptions({
        chart: {
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
        case 'Knowledge': return 'Wissen'
        case 'Energy': return 'Energie'
        case 'Packing': return 'Verpackungen'
        case 'FoodWaste': return 'Food-Waste'
        case 'Share': return 'Teilen'
        case 'Support': return 'Unterstützung'
        default: return `Unbekannt (${sufficientType})`
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
