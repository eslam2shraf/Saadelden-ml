<template>
  <ChartsChartBar :chartdata="chartData" :options="options" v-if="chartData" />
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "AvgSelling",
  data() {
    return {
      chartData: null,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",
        legend: {
          labels: {
            usePointStyle: true,
            boxWidth: 7,
            padding: 20,
          },
          position: "bottom",
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
                callback: function (value, index, values) {
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
    this.$store.dispatch("customers/segmentaion/fetchSegmentaions").then(() => {
      let data1 = [,],
        data2 = [],
        data3 = [],
        label = [
          "Jan 2023",
          "Feb 2023",
          "Mar 2023",
          "Apr 2023",
          "May 2023",
          "Jun 2023",
          "Jul 2023",
          "Aug 2023",
          "Sep 2023",
          "Oct 2023",
          "Nov 2023",
          "Dec 2023",
        ],
        colors1 = [],
        colors2 = [],
        colors3 = [];
      if (this.segments_characteristics) {
        Object.entries(this.segments_characteristics).forEach(
          ([key, value]) => {
            data1.push(value.customer_spending.mean.toFixed(2));
            data2.push(value.customer_avg_bill_spending.mean.toFixed(2));
            data3.push(value.customer_avg_bill_spending.mean.toFixed(2));
            colors1.push("#033043");
            colors2.push("#F1A87F");
            colors3.push("#A5D4DC");
          }
        );
      }

      this.chartData = {
        datasets: [
          {
            label: `${this.$t("revenue")}`,
            backgroundColor: colors1,
            data: data1,
            barThickness: 10,
            order: 1,
          },
          {
            label: `${this.$t("cogs")}`,
            backgroundColor: colors2,
            data: data2,
            barThickness: 10,
            order: 2,
          },
          {
            label: `${this.$t("profit")}`,
            backgroundColor: colors3,
            data: data3,
            barThickness: 10,
            order: 3,
          },
        ],
        labels: label,
      };
    });
  },
};
</script>

<style></style>
