<template>
  <div class="chart-lg" v-if="chartData">
    <ChartsChartBar
      :chartdata="chartData"
      :options="options"
      v-if="chartData"
    />
  </div>
</template>

<script>
export default {
  name: "SubCategories",
  data() {
    return {
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
          position: "right",
          maxWidth: 100,
        },
      },
    };
  },
  props: {
    Data: {
      type: [Object, Array],
    },
  },
  created() {
    let selling = [],
      refunded = [],
      label = [],
      colorSelling = [];
    if (this.Data) {
      Object.entries(this.Data).forEach(([key, value]) => {
        selling.push(Number(value.selling_sum.split(",").join("")));
        refunded.push(Number(value.refunded_sum.split(",").join("")));
        colorSelling.push("#033043");
        label.push(value.name);
      });
    }

    this.chartData = {
      datasets: [
        {
          label: `${this.$t("Selling")} ${this.$t("LE")}`,
          backgroundColor: colorSelling,
          data: selling,
          barThickness: 35,
          borderRadius: 50,
        },
        {
          label: `${this.$t("Refunded")} ${this.$t("LE")}`,
          backgroundColor: (ctx) => {
            const canvas = ctx.chart.ctx;
            const gradient = canvas.createLinearGradient(0, 0, 0, 450);

            gradient.addColorStop(0, "rgba(3, 48, 67, 1)");
            gradient.addColorStop(0.5, "rgba(3, 48, 67, 0.5)");
            gradient.addColorStop(1, "rgba(3, 48, 67, 0.3)");

            return gradient;
          },
          data: refunded,
          barThickness: 35,
        },
      ],
      labels: label,
    };
  },
  mounted() {
    if (window.innerWidth <= 1000) {
      this.options.legend.position = "bottom";
    }
  },
};
</script>

<style>
</style>