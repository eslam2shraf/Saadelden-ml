<template>
  <div class="seller-avgsales seller-storesales">
    <LayoutsFilter
      @fromDate="getFromDate"
      @toDate="getToDate"
      :filter="getSellerStoreSales"
      class="input-date--lg"
      :Msg="errorMessage"
      @resetErrorMsg="setErrorMsg"
    />
    <div class="seller-avgsales__head mb-2">
      <h4>{{ $t("comparison_productivity") }}</h4>
      <p>
        {{ $t("chrtfor_greater_productivity") }}
      </p>
    </div>
    <div class="seller-storesales__chartData">
      <div class="seller-storesales__chartData__chart">
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
        v-if="sellerstoreSales && sellerstoreSales.data"
      >
        <p class="m-0">
          <span> {{ $t("Sales_amount_in_Main_Store") }} </span>
          <span v-if="sellerstoreSales.data.main_store_sales">
            {{ sellerstoreSales.data.main_store_sales }} {{ $t("LE") }}
          </span>
        </p>
        <hr class="w-80" />
        <p class="m-0">
          <span> {{ $t("Sales_amount_Across_other_stores") }} </span>
          <span v-if="sellerstoreSales.data.ather_stores_sales">
            {{ sellerstoreSales.data.ather_stores_sales }} {{ $t("LE") }}
          </span>
          <span v-else> 0 {{ $t("LE") }} </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "StoreSellerSales",
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
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: `${this.$t("sales_amount")} ${this.$t("LE")}`,
              },
            },
          ],
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: `${this.$t("stores")}`,
              },
            },
          ],
        },
        legend: {
          align: "right",
          labels: {
            usePointStyle: true,
            boxWidth: 10,
          },
          position: "bottom",
          maxWidth: 100,
        },
      },
      mainStoreId: "",
    };
  },
  computed: {
    ...mapGetters("employees/sellers", ["sellerstoreSales"]),
  },
  mounted() {
    this.getSellerStoreSales();
  },

  methods: {
    setErrorMsg(msg) {
      this.errorMessage = msg;
    },
    getSellerStoreSales() {
      this.isLoading = true;
      const data = {
        seller_id: this.sellerId,
      };
      if (this.filterFrom !== "" && this.filterTo) {
        data.from = this.filterFrom;
        data.to = this.filterTo;
      }
      this.$store
        .dispatch("employees/sellers/fetchSellerstoreSales", data)
        .then(() => {
          this.isLoading = false;
          if (
            this.sellerstoreSales &&
            this.sellerstoreSales.errors &&
            this.sellerstoreSales.errors.to &&
            this.sellerstoreSales.errors.to[0]
          ) {
            this.errorMessage = this.sellerstoreSales.errors.to[0];
          }
          let data = [],
            labels = [],
            colors = [];
          if (this.sellerstoreSales && this.sellerstoreSales.data) {
            this.mainStoreId =
              this.sellerstoreSales.data.mian_store.main_store_id;
            Object.entries(
              this.sellerstoreSales.data.seller_sales_foreach_store
            ).forEach(([key, value], j) => {
              data.push(value.total_revenue);
              if (value.id === this.mainStoreId) {
                labels.push(`${this.$t("main_store")} ${value.store_name}`);
              } else {
                labels.push(value.store_name);
              }

              colors.push("rgba(3, 48, 67, 1)");
            });
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

