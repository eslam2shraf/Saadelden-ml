<template>
  <div class="chart-md mt-6 position--relative" v-if="chartData">
    <span class="chart-title">({{ $t("Price") }}{{ $t("LE") }})</span>
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
  name: "SuppliersAmount",
  data() {
    return {
      amount: [],
      mychart: [],
      chartData: null,
      options: {
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
      },
    };
  },
  computed: {
    ...mapGetters("products/classifications", [
      "loading",
      "success",
      "error",
      "suppliersAmount",
    ]),
  },
  async fetch() {
    await this.$store
      .dispatch("products/classifications/fetchSuppliersAmount")
      .then(() => {
        let data = [],
          label = [],
          colors = [];
        if (this.suppliersAmount) {
          this.suppliersAmount.forEach((amount) => {
            data.push(amount.orders_price);
            label.push(amount.name);
            colors.push("#254642");
          });
        }

        this.chartData = {
          datasets: [
            {
              label: `${this.$t("Suppliers_Selling_Amont")} (${this.$t("LE")})`,
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
  mounted() {
    if (window.innerWidth <= 800) {
      this.options.legend.position = "bottom";
    }
  },
};
</script>

<style></style>
