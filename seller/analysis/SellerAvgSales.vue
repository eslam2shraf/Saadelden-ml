<template>
  <div class="seller-avgsales">
    <LayoutsFilter
      @fromDate="getFromDate"
      @toDate="getToDate"
      :filter="getAvgSales"
      class="input-date--lg"
      :Msg="errorMessage"
      @resetErrorMsg="setErrorMsg"
    />
    <div class="seller-avgsales__head mb-2">
      <h4>
        {{ $t("Average_Price") }} [{{ sellerName }}] {{ $t("period_time") }}
      </h4>
      <p>
        {{ $t("chartFor_Avg_Price_per_Receipt") }}
      </p>
    </div>
    <div class="seller-avgsales__chartDetails">
      <div class="seller-avgsales__chartDetails__chart">
        <h4 v-if="isLoading" class="text-center">{{ $t("loading") }}</h4>

        <ChartsChartBar
          :chartdata="chartData"
          :options="options"
          v-if="chartData"
        />
      </div>
      <hr class="hr" />
      <div
        class="seller-avgsales__chartDetails__details"
        v-if="AvgSales && AvgSales.data"
      >
        <p class="m-0">
          <span> {{ $t("avg_transactions") }} </span>
          <span v-if="AvgSales.data.average_of_all_revenue">
            {{ AvgSales.data.average_of_all_revenue }}
          </span>
          <span v-else>
            {{ $t("nodataAvailable") }}
          </span>
        </p>
        <hr class="w-80" />
        <p class="m-0">
          <span> {{ $t("Best_selling_day") }} </span>
          <span
            v-if="
              AvgSales.data.max_revenue_day.day &&
              AvgSales.data.max_revenue_day.month &&
              AvgSales.data.max_revenue_day.year
            "
          >
            {{ AvgSales.data.max_revenue_day.day }}/
            {{ AvgSales.data.max_revenue_day.month }}/
            {{ AvgSales.data.max_revenue_day.year }}
          </span>
          <span v-else>
            {{ $t("nodataAvailable") }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "FrontendMlSellerAvgSales",
  props: {
    sellerName: {
      type: String,
    },
  },
  data() {
    return {
      sellerId: this.$route.params.id,
      chartData: null,
      isLoading: false,
      filterFrom: "",
      filterTo: "",
      errorMessage: "",
      options: {
        responsive: true,
        maintainAspectRatio: false,

        legend: {
          align: "right",
          labels: {
            usePointStyle: true,
            boxWidth: 10,
          },
          position: "bottom",
          maxWidth: 100,
        },
        scales: {
          yAxes: [
            {
              ticks: { stepSize: 500 },
              grid: { borderDash: [300, 500] },
              scaleLabel: {
                display: true,
                labelString: `${this.$t("Avg_price")} ${this.$t("LE")}`,
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
    ...mapGetters("employees/sellers", ["AvgSales"]),
  },
  mounted() {
    this.getAvgSales();
  },

  methods: {
    setErrorMsg(msg) {
      this.errorMessage = msg;
    },
    getFromDate(from) {
      this.filterFrom = from;
    },
    getToDate(to) {
      this.filterTo = to;
    },
    getAvgSales() {
      this.isLoading = true;
      const data = {
        seller_id: this.sellerId,
      };
      if (this.filterFrom !== "" && this.filterTo) {
        data.from = this.filterFrom;
        data.to = this.filterTo;
      }
      this.$store.dispatch("employees/sellers/fetchAvgSales", data).then(() => {
        this.isLoading = false;
        if (
          this.AvgSales &&
          this.AvgSales.errors &&
          this.AvgSales.errors.to &&
          this.AvgSales.errors.to[0]
        ) {
          this.errorMessage = this.AvgSales.errors.to[0];
        }
        let len = 0;
        if (this.AvgSales && this.AvgSales.data && this.AvgSales.data.dates) {
          len = this.AvgSales.data.dates.length;
        }
        let data = new Array(len).fill(0),
          labels = [],
          colors = [];
        if (this.AvgSales && this.AvgSales.data) {
          labels = this.AvgSales.data.dates;
          Object.entries(this.AvgSales.data.average_seller_sales).forEach(
            ([key, value], j) => {
              for (let i = 0; i < labels.length; i++) {
                let date = "";
                if (value.month < 10) {
                  date = `${value.year}-0${value.month}`;
                } else {
                  date = `${value.year}-${value.month}`;
                }
                if (labels[i] === date) {
                  data[i] = value.average_revenue;
                }
                colors.push("#F1A87F");
              }
            }
          );
        }

        this.chartData = {
          datasets: [
            {
              label: `${this.$t("Avg_price_receipts_of_Month")}`,
              backgroundColor: colors,
              data: data,
              barThickness: 22,
              borderRadius: 50,
            },
          ],
          labels: labels,
        };
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>

