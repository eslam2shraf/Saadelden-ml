<template>
  <ChartsChartBar :chartdata="chartData" :options="options" v-if="chartData" />
</template>

<script>
export default {
  name: "AreaBills",
  data() {
    return {
      chartData: null,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
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

  created() {
    let data = [
        10, 11, 12, 15, 20, 30, 25, 45, 5, 30, 32, 70, 80, 19, 60, 50, 70, 33,
        80, 15, 10, 5,
      ],
      label = [
        "B1",
        "B2",
        "B3",
        "B4",
        "B5",
        "B6",
        "B7",
        "B8",
        "B9",
        "B10",
        "B11",
        "B12",
        "B13",
        "B14",
        "B15",
        "B16",
        "B17",
        "B18",
        "B19",
        "B20",
        "B21",
      ],
      colors = [];
    label.forEach((label) => {
      colors.push("#033043");
    });

    this.chartData = {
      datasets: [
        {
          label: "Area Bills",
          backgroundColor: colors,
          data: data,
          barThickness: 20,
          borderRadius: 50,
        },
      ],
      labels: label,
    };
  },
};
</script>

<style></style>
