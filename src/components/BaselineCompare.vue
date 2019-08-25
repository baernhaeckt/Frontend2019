<template>
  <block-box class="baseline-box">
    <h3>Du im Vergleich zum Durchschnitts-Schweizer</h3>
    <div class="chart-outer-container">
      <GChart class="chart-container" type="ColumnChart"
            :settings="{packages: ['bar']}"
            :data="userDataVsBaseLine"
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
} from "@/store/actions/sufficient_types";
import { mapGetters } from "vuex";

export default {
  name: "BaselineCompare",
  mounted() {
    this.$store.dispatch(LIST_SUFFICIENTS_BASELINE).then(() => {
      this.baseLineLoaded = true;
    });
    this.$store.dispatch(LIST_SUFFICIENTS_PERSONAL).then(() => {
      this.personalLoaded = true;
    });
  },
  data() {
    return {
      baseLineLoaded: false,
      personalLoaded: false,
      chartsLib: null
    };
  },
  computed: {
    allDataLoaded() {
      return this.baseLineLoaded && this.personalLoaded;
    },
    userDataVsBaseLine() {
      let baseLine = this.getBaseline();
      let personal = this.getPersonal();

      let data = baseLine.map(item => {
        let personalItemIndex = personal.findIndex(
          pItem => pItem.title === item.title
        );
        let personalPoints =
          personalItemIndex !== -1 ? personal[personalItemIndex].point || 0 : 0;
        let personalSavings =
          personalItemIndex !== -1
            ? personal[personalItemIndex].co2Saving || 0
            : 0;
        return [
          item.title,
          item.baseLinePoint,
          personalPoints,
          item.baselineCo2Saving,
          personalSavings
        ];
      });

      let result = [
        [
          "Name",
          "Ø Punkte",
          "Deine Punkte",
          "Ø CO2 Einsparung",
          "Deine CO2 Einsparung"
        ],
        ...data
      ];
      return result;
    },
    chartOptions() {
      if (!this.chartsLib) {
        return null;
      }

      return this.chartsLib.charts.Bar.convertOptions({
        chart: {
          title: "Durchschnitts-Vergleich",
          subtitle:
            "Deine Werte verglichen zum durchschnittlichen Schweizer Bürger."
        },
        series: {
          0: { axis: "points" },
          1: { axis: "points" },
          2: { axis: "savings" },
          3: { axis: "savings" }
        },
        axes: {
          y: {
            points: { label: "Gesammelte Punkte", minValue: 0, maxValue: 1000 }, // Left y-axis.
            savings: {
              side: "right",
              label: "CO2 Einsparung",
              minValue: 0,
              maxValue: 15
            } // Right y-axis.
          }
        }
      });
    }
  },
  watch: {},
  methods: {
    ...mapGetters(["getBaseline", "getPersonal"]),
    onChartReady(chart, google) {
      this.chartsLib = google;
    }
  },
  components: {}
};
</script>

<style lang="scss">
.baseline-box {
  .chart-outer-container {
    .chart-container {
      width: 100%;
      height: 50vh;
      background: $white;
      padding: 20px;
    }
  }
}
</style>
