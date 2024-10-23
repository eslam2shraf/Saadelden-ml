<template>
  <ChartsChartLine :chartdata="chartData" :options="options" />
</template>
 
 <script>
export default {
  name: "AvgLeadTimeChart",
  data() {
    return {
      chartData: {
        labels: [
          "Day 01",
          "Day 02",
          "Day 03",
          "Day 04",
          "Day 05",
          "Day 06",
          "Day 07",
          "Day 08",
          "Day 09",
          "Day 10",
        ],
        datasets: [
          {
            label: "Spendings",
            fill: true,

            data: [79, 40, 20, 35, 60, 65, 39, 38, 40, 10],
            pointBackgroundColor: "#F1A87F",
            borderColor: "#F1A87F",
            pointHoverBackgroundColor: "#F1A87F",
            pointHoverBorderColor: "#033043",
            pointHoverBorderWidth: 3,
            pointHoverRadius: 10,
            backgroundColor: (ctx) => {
              const canvas = ctx.chart.ctx;
              const gradient = canvas.createLinearGradient(0, 0, 0, 450);

              gradient.addColorStop(0, "rgba(241, 168, 127, 0.5)");
              gradient.addColorStop(0.5, "rgba(241, 168, 127, 0.25)");
              gradient.addColorStop(1, "rgba(241, 168, 127, 0)");

              return gradient;
            },
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          point: {
            radius: 0,
          },
        },
        legend: {
          labels: {
            usePointStyle: true,
            boxWidth: 10,
          },
          position: "bottom",
          shapeHeight: 15,
          shapeWidth: 15,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                suggestedMax: 10,
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