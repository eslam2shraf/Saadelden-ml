<template>
  <ChartsChartDoughnut
    :chartdata="chartData"
    :options="options"
    v-if="chartData"
  />
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "CustomersVisits",
  data() {
    return {
      chartData: null,
      options: {
        cutoutPercentage: 70,
        responsive: true,
        legend: {
          align: "right",
          labels: {
            usePointStyle: true,
            boxWidth: 10,
          },
          position: "bottom",
          maxWidth: 100,
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
      if (this.segments_characteristics) {
        Object.entries(this.segments_characteristics).forEach(
          ([key, value]) => {
            data.push(parseInt(value.customer_frequency.mean));
            colors = ["#673F69", "#D961D4", "#D74B76", "#254642"];
            label.push(
              this.convertSegmentName(key) +
                "         " +
                `${parseInt(value.customer_frequency.mean)} ${this.$t(
                  "visits"
                )}`
            );
          }
        );
      }

      this.chartData = {
        datasets: [
          {
            label: "AvgProductsPerBillChart",
            backgroundColor: colors,
            data: data,
          },
        ],
        labels: label,
      };
    });
  },
};
</script>

<style></style>
