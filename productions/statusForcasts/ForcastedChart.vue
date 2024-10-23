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
  name: "ForcastedChart",
  data() {
    return {
      message: "",
      chartData: null,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          backgroundColor: "#033043",
          padding: 30,
        },
        elements: {
          point: {
            radius: 3,
          },
        },
        legend: {
          labels: {
            usePointStyle: true,
            boxWidth: 10,
            color: "white",
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
  props: {
    product_id: {
      type: [Number, String],
    },
  },
  computed: {
    ...mapGetters("products", ["loading", "success", "error", "Demand"]),
  },
  created() {
    if (this.product_id !== "") {
      this.$store
        .dispatch("products/fetchDemand", { product_id: this.product_id })
        .then(() => {
          if (
            this.success &&
            this.success.data &&
            this.success.data.hasOwnProperty("errors")
          ) {
            this.message = this.success.data.errors.product_id[0];
          }
          let data = [],
            label = [];
          if (this.Demand && this.Demand.data && this.Demand.data.forecasts) {
            Object.entries(this.Demand.data.forecasts).forEach(
              ([key, value]) => {
                data.push(value.demand_forecast);
                label.push(
                  "[ " + value.start_date + " : " + value.end_date + " ]"
                );
              }
            );
          }
          this.chartData = {
            datasets: [
              {
                label: `${this.$t("Expected_demand")} (${this.$t("items")})`,
                data: data,
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
                pointStyle: false,
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