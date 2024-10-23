<template>
  <div class="mt-6 position--relative">
    <span class="chart-title left-1">{{ $t("days") }}</span>
    <ChartsChartBar
      :chartdata="chartData"
      :options="options"
      v-if="chartData"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "FrequencyDaysChart",
  data() {
    return {
      chartData: null,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",
        legend: {
          labels: {
            usePointStyle: true,
          },
          position: "bottom",
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                suggestedMax: 4,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
      },
    };
  },
  computed: {
    ...mapGetters("customers/segmentaion", [
      "loading",
      "success",
      "error",
      "segments_characteristics",
    ]),
  },
  methods: {
    convertSegmentName(name) {
      let newName = "";
      if (name === "segment_0") {
        newName = `${this.$t("Premium_pluse")}`;
      }
      if (name === "segment_1") {
        newName = `${this.$t("Standard")}`;
      }
      if (name === "segment_2") {
        newName = `${this.$t("Premium")}`;
      }
      if (name === "segment_3") {
        newName = `${this.$t("Elite")}`;
      }
      return newName;
    },
  },
  created() {
    this.$store.dispatch("customers/segmentaion/fetchSegmentaions").then(() => {
      let data = [],
        label = [],
        colors = [];
      Object.entries(this.segments_characteristics).forEach(([key, value]) => {
        data.push(parseInt(value["customer_recency[days]"].mean));
        colors.push("#254642 ");
        label.push(this.convertSegmentName(key));
      });

      this.chartData = {
        datasets: [
          {
            label: `${this.$t("Average_customer_recency")} (${this.$t(
              "days"
            )})`,
            backgroundColor: colors,
            data: data,
            barThickness: 25,
            borderRadius: 50,
          },
        ],
        labels: label,
      };
    });
  },
};
</script>

<style></style>
