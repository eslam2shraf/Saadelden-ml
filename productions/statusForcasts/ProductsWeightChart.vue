<template>
  <ChartsChartBar :chartdata="chartData" :options="options" />
</template>
 
 <script>
export default {
  name: "ProductsWeightChart",
  data() {
    return {
      chartData: {
        labels: [
          "P1",
          "P2",
          "P3",
          "P4",
          "P5",
          "P6",
          "P7",
          "P8",
          "P9",
          "P10",
          "P11",
          "P12",
        ],
        datasets: [
          {
            label: "Refunded",
            borderRadius: 30,
            barPercentage: 0.5,
            barThickness: 30,
            data: [79, 40, 20, 35, 60, 65, 39, 38, 40, 10, 9, 30],

            borderWidth: 1,
            backgroundColor: (ctx) => {
              const canvas = ctx.chart.ctx;
              const gradient = canvas.createLinearGradient(0, 0, 0, 450);

              gradient.addColorStop(0, "rgba(3, 48, 67, 1)");
              gradient.addColorStop(0.5, "rgba(3, 48, 67, 0.5)");
              gradient.addColorStop(1, "rgba(3, 48, 67, 0.3)");

              return gradient;
            },
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,

        legend: {
          labels: {
            usePointStyle: true,
          },
          position: "bottom",
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                suggestedMax: 4,
              },
            },
          ],
          xAxes: [
            {
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