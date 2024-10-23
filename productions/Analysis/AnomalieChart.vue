<template>
  <ChartsChartLine :chartdata="chartData" :options="options" />
</template>

<script>
export default {
  name: "AnomalieChart",
  data() {
    return {
      chartData: {
        labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09"],
        datasets: [
          {
            label: "Anomalie Alertation",
            fill: false,
            data: [1, 2, 1, 5, 1, 2, 1],
            pointHoverBackgroundColor: "grey",
            pointHoverBorderColor: "rgba(3,48,67,100)",
            pointHoverBorderWidth: 3,
            pointHoverRadius: 10,
            tension: 0.5,
            borderWidth: 5,
            borderColor: (ctx) => {
              const canvas = ctx.chart.ctx;
              const gradient = canvas.createLinearGradient(0, 0, 0, 450);

              gradient.addColorStop(0, "rgba(3, 48, 67, 0.8)");
              gradient.addColorStop(0.5, "rgba(3, 48, 67, 0.9)");
              gradient.addColorStop(1, "rgba(3, 48, 67, 0)");

              return gradient;
            },
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          backgroundColor: "#ffffff",
          padding: 30,
          enabled: false,
        },

        legend: {
          display: false,
          labels: {
            usePointStyle: true,
            boxWidth: 10,
            color: "white",
          },
          position: "bottom",
        },

        scales: {
          yAxes: [
            {
              display: false,
              ticks: {
                beginAtZero: true,
                suggestedMin: 5,
                suggestedMax: 10,
              },
              gridLines: {
                display: false,
              },
            },
          ],
          xAxes: [
            {
              display: false,
              gridLines: {
                display: false,
              },
            },
          ],
        },
      },
    };
  },
};
</script>

<style>
</style>