<template>
  <div class="mt-4" v-if="chartData">
    <!-- <span class="chart-title--down ">Customer</span> -->
    <ChartsChartHorizontalBar
      :chartdata="chartData"
      :options="options"
      v-if="chartData"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "CustomerSegmentaionTypes",
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
              gridLines: {
                display: false,
              },
            },
          ],
          xAxes: [{}],
        },
      },
    };
  },
  computed: {
    ...mapGetters("customers/segmentaion", [
      "loading",
      "success",
      "error",
      "segments_stats",
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
      if (this.segments_stats) {
        Object.entries(this.segments_stats).forEach(([key, value]) => {
          data.push(value.counts);
          colors.push("#D961D4");
          if (this.$i18n.locale === "ar") {
            label.push(
              `${this.$t("Customers_type")}` +
                " " +
                this.convertSegmentName(key)
            );
          }
          if (this.$i18n.locale === "en") {
            label.push(
              this.convertSegmentName(key) +
                " " +
                `${this.$t("Customers_type")}`
            );
          }
        });
      }

      this.chartData = {
        datasets: [
          {
            label: `${this.$t("Number_of_customers")} (${this.$t("Customer")})`,
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
