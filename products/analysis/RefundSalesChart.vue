<template>
  <div class="mt-3" v-if="chartData">
    <span class="chart-title">({{ $t("LE") }})</span>
    <ChartsChartLine
      :chartdata="chartData"
      :options="options"
      v-if="chartData"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ReFundSalesChart",
  data() {
    return {
      productId: this.$route.params.id,
      chartData: null,
      options: {
        cutoutPercentage: 70,
        responsive: true,
        maintainAspectRatio: false,

        legend: {
          align: "right",
          labels: {
            usePointStyle: true,
            boxWidth: 10,
          },
          position: "bottom",
          maxWidth: 100,
        },
        scales: {
          yAxes: {
            ticks: {
              callback: function (value, index, ticks) {
                return "LE" + value;
              },
            },
          },
        },
      },
    };
  },
  computed: {
    ...mapGetters("products", [
      "loading",
      "success",
      "error",
      "productAnalysis",
    ]),
  },
  created() {
    this.$store
      .dispatch("products/fetchProductAnalysis", { product_id: this.productId })
      .then(() => {
        let sales = [],
          refund = [],
          label = [];
        if (this.productAnalysis) {
          Object.entries(this.productAnalysis.monthly_sales).forEach(
            ([key, value]) => {
              sales.push(value.sales);
              refund.push(value.refund);
              label.push(value.date);
            }
          );
        }
        this.chartData = {
          datasets: [
            {
              label: `${this.$t("sales")} (${this.$t("LE")})`,
              data: sales,
              pointBackgroundColor: "#033043",
              borderColor: "#033043",
              pointHoverBackgroundColor: "#033043",
              pointHoverBorderColor: "#F1A87F",
              pointHoverBorderWidth: 4,
              pointHoverRadius: 10,
            },
            {
              label: `${this.$t("refund")} (${this.$t("LE")})`,
              data: refund,
              pointBackgroundColor: "#A5D4DC",
              borderColor: "#A5D4DC",
              pointHoverBackgroundColor: "#A5D4DC",
              pointHoverBorderColor: "#033043",
              pointHoverBorderWidth: 4,
              pointHoverRadius: 10,
            },
          ],
          labels: label,
        };
      });
  },
};
</script>

<style>
</style>