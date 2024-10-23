<template>
  <ChartsChartBar :chartdata="chartData" :options="options" v-if="chartData" />
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ProfitLossChart",

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
            boxWidth: 7,
            padding: 20,
          },
          position: "bottom",
          maxWidth: 100,
        },
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Price(LE)",
              },
              ticks: {
                beginAtZero: true,
                suggestedMax: 4,
              },
            },
          ],
          xAxes: [
            {
              scaleLabel: {
                display: true,
                padding: {
                  top: 15,
                  bottom: 0,
                },
                labelString: "Time(Months)",
              },
              gridLines: {
                display: false,
              },
              ticks: {
                callback: function (value) {
                  return value?.split(" ");
                },
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
      "segments_characteristics",
    ]),
  },
  methods: {
    convertSegmentName(name) {
      let newName = "";
      if (name === "segment_0") {
        newName = `${this.$t("Premium_pluse")}`;
      }
      if (name === "segment_1") {
        newName = `${this.$t("Standard")}`;
      }
      if (name === "segment_2") {
        newName = `${this.$t("Premium")}`;
      }
      if (name === "segment_3") {
        newName = `${this.$t("Elite")}`;
      }
      return newName;
    },
  },
  created() {
    let positiveData = [0, 0, 0, 0, 43, 45, 30, 70, 80, 60, 50, 70],
      negativeData = [-10, -5, -15, -19, 0, 0, 0, 0, 0, 0, 0, 0],
      label = [
        "Jan 2023",
        "Feb 2023",
        "Mar 2023",
        "Apr 2023",
        "May 2023",
        "Jun 2023",
        "July 2023",
        "Aug 2023",
        "Sep 2023",
        "Oct 2023",
        "Nov 2023",
        "Dec 2023",
      ],
      profitColors = [],
      lossColors = [];

    // for (var i = 0; i < positiveData.length; i++) {
    //   if (data[i] > 0) {
    //     profitColors.push("#033043");
    //   } else {
    //     lossColors.push("#B21C1C");
    //   }
    // }
    positiveData.forEach((data) => {
      profitColors.push("#033043");
    });
    negativeData.forEach((data) => {
      lossColors.push("#B21C1C");
    });

    this.chartData = {
      datasets: [
        {
          label: "Profit",
          backgroundColor: profitColors,
          data: positiveData,
          barThickness: 10,
          borderRadius: 50,
        },
        {
          label: "Loss",
          backgroundColor: lossColors,
          data: negativeData,
          barThickness: 10,
          borderRadius: 50,
        },
      ],
      labels: label,
    };
  },
};
</script>

<style lang="scss" scoped></style>
