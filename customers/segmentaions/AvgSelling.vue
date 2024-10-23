<template>
  <div class="mt-9 position--relative">
    <span class="chart-title">{{ $t("LE") }}</span>
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
  name: "AvgSelling",
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
      let data1 = [],
        data2 = [],
        label = [],
        colors1 = [],
        colors2 = [];
      if (this.segments_characteristics) {
        Object.entries(this.segments_characteristics).forEach(
          ([key, value]) => {
            data1.push(value.customer_spending.mean.toFixed(2));
            data2.push(value.customer_avg_bill_spending.mean.toFixed(2));
            colors1.push("#254642");
            colors2.push("#D961D4");
            label.push(this.convertSegmentName(key));
          }
        );
      }

      this.chartData = {
        datasets: [
          {
            label: `${this.$t("Average_selling_amount")} (${this.$t("LE")})`,
            backgroundColor: colors1,
            data: data1,
            barThickness: 25,
            borderRadius: 50,
          },
          {
            label: `${this.$t("Average_selling_amount_in_one_bill")} (${this.$t(
              "LE"
            )})`,
            backgroundColor: colors2,
            data: data2,
            barThickness: 25,
          },
        ],
        labels: label,
      };
    });
  },
};
</script>

<style></style>
