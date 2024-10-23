<template>
  <ChartsChartDoughnut :chartdata="chartData" :options="options" />
</template>

<script>
export default {
  name: "ScrapRateChart",
  data() {
    return {
      chartData: {
        backgroundColor: "white",
        labels: ["quality issues", "production errors ", "Type3"],
        datasets: [
          {
            label: "Scrap Rate",
            data: [60, 20, 10, 10],
            backgroundColor: ["#033043", "#A5D4DC", "#F1A87F", "white"],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        cutoutPercentage: 80,
        responsive: true,
        maintainAspectRatio: false,

        legend: {
          align: "center",
          labels: {
            usePointStyle: true,
            boxWidth: 10,
          },
          position: "bottom",
        },
      },
    };
  },
};
</script>

<style>
</style>