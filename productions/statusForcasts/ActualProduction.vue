<template>
  <div>
    <ChartsChartLine
      :chartdata="chartData"
      :options="options"
      v-if="chartData && product_id !== '' && !message"
    />
    <h4 v-if="message" class="text-center">{{ message }}</h4>
  </div>
</template>
 
 <script>
import { mapGetters } from "vuex";
export default {
  name: "ActualProduction",
  data() {
    return {
      message: "",
      chartData: null,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          backgroundColor: "#033043",
          position: "average",
          bodyAlign: "center",
          padding: 9,
        },

        legend: {
          labels: {
            usePointStyle: true,
            boxWidth: 10,
            color: "white",
          },
          position: "bottom",
        },
        elements: {
          point: {
            radius: 3,
          },
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
  props: {
    product_id: {
      type: [Number, String],
    },
  },
  computed: {
    ...mapGetters("products", [
      "loading",
      "success",
      "error",
      "expectedDemand",
    ]),
  },
  created() {
    if (this.product_id !== "") {
      this.$store
        .dispatch("products/fetchexpectedDemand", {
          product_id: this.product_id,
        })
        .then(() => {
          if (
            this.success &&
            this.success.data &&
            this.success.data.hasOwnProperty("errors")
          ) {
            this.message = this.success.data.errors.product_id[0];
          }
          let forecast = [],
            actual = [],
            label = [];
          if (
            this.expectedDemand &&
            this.expectedDemand.data &&
            this.expectedDemand.data.forecasts
          ) {
            Object.entries(this.expectedDemand.data.forecasts).forEach(
              ([key, value]) => {
                forecast.push(value.demand_forecast);
                actual.push(value.actual_demand);
                label.push(
                  "[ " + value.start_date + " : " + value.end_date + " ]"
                );
              }
            );
          }
          this.chartData = {
            datasets: [
              {
                label: `${this.$t("Prediction")} (${this.$t("items")})`,
                fill: false,
                data: forecast,
                pointBackgroundColor: "#F1A87F",
                borderColor: "#F1A87F",
                pointHoverBackgroundColor: "#F1A87F",
                pointHoverBorderColor: "#033043",
                pointHoverBorderWidth: 3,
                pointHoverRadius: 10,
                pointStyle: false,
              },
              {
                label: `${this.$t("actual")} (${this.$t("items")})`,
                type: "bar",
                barThickness: 20,
                data: actual,
                fill: false,
                borderColor: "#A5D4DC",
                backgroundColor: "#A5D4DC",
              },
            ],
            labels: label,
          };
        });
    } else {
      this.message = `${this.$t("select_product_msg")}`;
    }
  },
};
</script>
 
 <style>
</style>