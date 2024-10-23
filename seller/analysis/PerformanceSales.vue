<template>
  <BaseCard class="sales-performance">
    <LayoutsFilter
      @fromDate="getFromDate"
      @toDate="getToDate"
      :filter="getSellerPerformance"
      class="input-date--lg"
      :Msg="errorMessage"
      @resetErrorMsg="setErrorMsg"
    />
    <div class="sales-performance__head mb-2">
      <h4>
        {{ $t("sales_performance_trend") }}[{{ sellerName }}]
        {{ $t("period_time") }}
      </h4>
      <p>
        {{ $t("line_chart_represents") }}
      </p>
    </div>
    <div class="sales-performance__chart">
      <h4 v-if="isLoading" class="text-center">{{ $t("loading") }}</h4>
    
      <ChartsChartLine
        :chartdata="chartData"
        :options="options"
        v-if="chartData"
      />
     
    </div>
  </BaseCard>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "SellerPerformance",
  props: {
    sellerName: {
      type: String,
    },
  },
  data() {
    return {
      sellerId: this.$route.params.id,
      filterFrom: "",
      filterTo: "",
      isLoading: false,
      errorMessage: "",
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
              scaleLabel: {
                display: true,
                labelString: `${this.$t("sales")} ${this.$t("LE")}`,
              },
            },
          ],
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: `${this.$t("time")} ${this.$t("months")}`,
              },
            },
          ],
        },
      },
    };
  },
  computed: {
    ...mapGetters("employees/sellers", ["sellerPerformance"]),
  },
  mounted() {
    this.getSellerPerformance();
  },
  methods: {
    setErrorMsg(msg) {
      this.errorMessage = msg;
    },
    getSellerPerformance() {
      this.isLoading = true;
      const data = {
        seller_id: this.sellerId,
      };
      if (this.filterFrom !== "" && this.filterTo !== "") {
        data.from = this.filterFrom;
        data.to = this.filterTo;
      }
      this.$store
        .dispatch("employees/sellers/fetchSellerPerformance", data)
        .then(() => {
          this.isLoading = false;
          if (
            this.sellerPerformance &&
            this.sellerPerformance.errors &&
            this.sellerPerformance.errors.to &&
            this.sellerPerformance.errors.to[0]
          ) {
            this.errorMessage = this.sellerPerformance.errors.to[0];
          }
          this.chartData = null;
          let len = 0;
          if (
            this.sellerPerformance &&
            this.sellerPerformance.data &&
            this.sellerPerformance.data.dates
          ) {
            len = this.sellerPerformance.data.dates.length;
          }
          let labels = new Array(len).fill(0),
            data = new Array(len).fill(0);

          if (this.sellerPerformance && this.sellerPerformance.data) {
            labels = this.sellerPerformance.data.dates;
            Object.entries(
              this.sellerPerformance.data.seller_performance
            ).forEach(([key, value], j) => {
              for (let i = 0; i < labels.length; i++) {
                let date = "";
                if (value.month < 10) {
                  date = `${value.year}-0${value.month}`;
                } else {
                  date = `${value.year}-${value.month}`;
                }
                if (labels[i] === date) {
                  data[i] = value.total_revenue;
                }
              }
            });
          }
          this.chartData = {
            datasets: [
              {
                label: `${this.$t("sales_amount")} (${this.$t("LE")})`,
                data: data,
                pointBackgroundColor: "#033043",
                borderColor: "#033043",
                pointHoverBackgroundColor: "#033043",
                pointHoverBorderColor: "#F1A87F",
                pointHoverBorderWidth: 3,
                pointHoverRadius: 10,
                backgroundColor: (ctx) => {
                  const canvas = ctx.chart.ctx;
                  const gradient = canvas.createLinearGradient(0, 0, 0, 450);

                  gradient.addColorStop(0, "rgba(3,48,67, 0.7)");
                  gradient.addColorStop(0.5, "rgba(3,48,67, 0.25)");
                  gradient.addColorStop(1, "rgba(3,48,67, 0)");

                  return gradient;
                },
                pointStyle: false,
              },
            ],
            labels: labels,
          };
        });
    },
    getFromDate(from) {
      this.filterFrom = from;
    },
    getToDate(to) {
      this.filterTo = to;
    },
  },
};
</script>

<style></style>
