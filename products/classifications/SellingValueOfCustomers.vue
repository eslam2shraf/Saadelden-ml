<template>
  <div class="chart-md mt-6 position--relative" v-if="chartData">
    <span class="chart-title--down">({{ $t("LE") }})</span>
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
  name: "CustomerCategoriesAmount",
  data() {
    return {
      chartData: null,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",
        legend: {
          display: true,
          position: "bottom",
          labels: {
            usePointStyle: true,
            boxWidth: 10,
          },
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
        },
      },
    };
  },
  computed: {
    ...mapGetters("products/classifications", [
      "loading",
      "success",
      "error",
      "customerCategoriesAmount",
    ]),
  },
  async fetch() {
    await this.$store
      .dispatch("products/classifications/fetchCustomerCategoriesAmount")
      .then(() => {
        let data = [],
          label = [];
        if (this.customerCategoriesAmount) {
          this.customerCategoriesAmount.forEach((amount) => {
            data.push(Number(amount.orders_price.split(",").join("")));
            label.push(amount.name);
          });
        }

        this.chartData = {
          datasets: [
            {
              label: `${this.$t("Customers_Selling_Amont")} (${this.$t("LE")})`,
              backgroundColor: (ctx) => {
                const canvas = ctx.chart.ctx;
                const gradient = canvas.createLinearGradient(0, 0, 0, 450);

                gradient.addColorStop(0, "rgba(3, 48, 67, 1)");
                gradient.addColorStop(0.5, "rgba(3, 48, 67, 0.5)");
                gradient.addColorStop(1, "rgba(3, 48, 67, 0.3)");

                return gradient;
              },
              barThickness: 25,
              data: data,
            },
          ],
          labels: label,
        };
      });
  },
  mounted() {
    if (window.innerWidth <= 800) {
      this.options.legend.position = "bottom";
    }
  },
};
</script>

<style>
</style>