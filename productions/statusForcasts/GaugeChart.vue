<template>
  <ChartsChartDoughnut :chartdata="chartData" :options="options" />
</template>

<script>
export default {
  name: "ProductionEfficiencyChart",
  data() {
    return {
      chartData: {
        datasets: [
          {
            label: "ProductionEfficiency",
            data: [80],
            circumference: 80,
            backgroundColor: (ctx) => {
              const canvas = ctx.chart.ctx;
              const gradient = canvas.createLinearGradient(0, 0, 0, 500);

              gradient.addColorStop(0.5, "rgba(255, 255, 255, 1)");
              gradient.addColorStop(0, "rgba(165, 212, 220, 0.5)");
              gradient.addColorStop(1, "rgba(165, 212, 220, 0.3)");

              return gradient;
            },
            hoverOffset: 4,
          },
        ],
      },

      options: {
        rotation: -1.0 * Math.PI,
        circumference: Math.PI,
        cutoutPercentage: 80,
        tooltips: {
          enabled: false,
        },
        needle: {
          // Needle circle radius as the percentage of the chart area width
          radiusPercentage: 2,
          // Needle width as the percentage of the chart area width
          widthPercentage: 3.2,
          // Needle length as the percentage of the interval between inner radius (0%) and outer radius (100%) of the arc
          lengthPercentage: 50,
          // The color of the needle
          color: "rgba(0, 0, 100, 1)",
        },
      },
    };
  },
};
</script>

<style>
</style>