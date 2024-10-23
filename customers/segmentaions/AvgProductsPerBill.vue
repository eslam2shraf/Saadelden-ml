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
  name: "AvgProductsPerBillChart",
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
  computed: {
    ...mapGetters("customers/segmentaion", [
      "loading",
      "success",
      "error",
      "segments_characteristics",
    ]),
  },
  created() {
    this.$store.dispatch("customers/segmentaion/fetchSegmentaions").then(() => {
      let data = [],
        label = [],
        colors = [],
        unit = "";
      Object.entries(this.segments_characteristics).forEach(([key, value]) => {
        data.push(parseInt(value.avg_products_quantity_per_bill.mean));
        colors = ["#673F69", "#D961D4", "#D74B76", "#254642"];
        if (parseInt(value.avg_products_quantity_per_bill.mean) <= 10) {
          unit = `${this.$t("Products")}`;
        } else if (
          parseInt(value.avg_products_quantity_per_bill.mean) == 0 ||
          parseInt(value.avg_products_quantity_per_bill.mean) > 10
        ) {
          unit = `${this.$t("Product")}`;
        }
        label.push(
          this.convertSegmentName(key) +
            "   " +
            `${parseInt(value.avg_products_quantity_per_bill.mean)}` +
            "  " +
            unit
        );
      });

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
