<template>
  <div>
    <ChartsChartDoughnut
      :chartdata="chartData"
      :options="options"
      v-if="
        chartData &&
        chartData.datasets &&
        chartData.datasets[0].data &&
        chartData.datasets[0].data.length !== 0
      "
    />
    <p v-else class="text-center h4">{{ $t("nodata") }}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "StoreVisited",
  data() {
    return {
      customerId: this.$route.params.id,
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
          position: "right",
          maxWidth: 100,
        },
      },
    };
  },
  computed: {
    ...mapGetters("customers", ["loading", "success", "error", "Analysis"]),
  },
  created() {
    this.$store
      .dispatch("customers/fetchCustomerAnalysis", {
        customer_id: this.customerId,
      })
      .then(() => {
        let data = [],
          label = [],
          colors = [],
          unit = "";
        Object.entries(this.Analysis.visited_stores).forEach(([key, value]) => {
          data.push(value.times);
          if (value.times <= 10 && value.times !== 0) {
            unit = `${this.$t("visits")}`;
          }
          if (value.times > 10 || value.times === 0) {
            unit = `${this.$t("visit")}`;
          }
          colors = [
            "rgb(3, 48, 67)",
            "rgb(241, 168, 127)",
            "#A5D4DC",
            "#BAAD8F",
          ];
          label.push(value.store_name + "  \n" + value.times + "   " + unit);
        });

        this.chartData = {
          datasets: [
            {
              label: "StoreVisited",
              backgroundColor: colors,
              data: data,
            },
          ],
          labels: label,
        };
      });
  },
  mounted() {
    if (window.innerWidth <= 850) {
      this.options.legend.position = "bottom";
    }
  },
};
</script>

<style>
</style>