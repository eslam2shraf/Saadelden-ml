<template>
  <div class="chart-md mt-9 position--relative">
    <span class="chart-title left-1">{{ $t("Customer") }}</span>
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
  name: "CustomersTypesChart",
  data() {
    return {
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
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                suggestedMax: 4,
                max: 0,
                min: 0,
                stepSize: 1000,
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
      "customerCategories",
    ]),
  },
  created() {
    this.$store
      .dispatch("customers/segmentaion/fetchCustomerCategories")
      .then(() => {
        let data = [],
          label = [],
          colors = [];
        if (this.customerCategories) {
          this.customerCategories.forEach((value) => {
            data.push(value.count);
            colors.push("#254642");
            label.push(`${value.name} (${value.count})`);
          });
        }

        this.options.scales.yAxes[0].ticks.max = Math.max(...data);
        this.options.scales.yAxes[0].ticks.min = Math.min(...data);

        this.chartData = {
          datasets: [
            {
              label: `${this.$t("Number_of_customers")} (${this.$t(
                "Customer"
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
