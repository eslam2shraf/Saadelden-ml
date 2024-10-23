<template>
  <div class="sales-revenue">
    <h4 v-if="isLoading" class="text-center text-neutral_White">
      {{ $t("loading") }}
    </h4>
    <div class="sales-revenue__body" v-if="sellerRevenue && sellerRevenue.data">
      <div class="sales-revenue__body__details">
        <p class="m-0">
          <span> {{ $t("Seller_Revenue_Percentage") }} </span>
          <span v-if="sellerRevenue.data.seller_revenue_percentage">
            {{ firstTwoDigit(sellerRevenue.data.seller_revenue_percentage) }} %
          </span>
        </p>
        <p class="m-0">
          <span>{{ $t('Seller_Revenue_this_year') }}</span>
          <span v-if="sellerRevenue.data.seller_revenue">
            {{ sellerRevenue.data.seller_revenue }} {{ $t("LE") }}
          </span>
        </p>
        <p class="m-0">
          <span>{{ $t('Total_Income_of_this_year') }} </span>
          <span v-if="sellerRevenue.data.total_revenue">
            {{ sellerRevenue.data.total_revenue }} {{ $t("LE") }}
          </span>
        </p>
      </div>
      <div class="sales-revenue__body__chart">
        <base-year-picker
          class="bg_NORDIC"
          @year="getSelectedYear"
          :startYear="2018"
          v-model="selectedYear"
        />
        <div class="sales-revenue__body__chart__canvas">
          <h4
           
            class="sales-revenue__body__chart__canvas__prec"
           
            v-if="sellerRevenue.data.seller_revenue_percentage && chartData"
          
          >
            {{ firstTwoDigit(sellerRevenue.data.seller_revenue_percentage) }} %
          </h4>
          <ChartsChartDoughnut
            :chartdata="chartData"
            :options="options"
            v-if="chartData"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "FrontendMlSellerRevenue",

  data() {
    return {
      sellerId: this.$route.params.id,
      selectedYear: "2023",
      chartData: null,
      isLoading: false,
      options: {
        cutoutPercentage: 70,
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          enabled: false,
        },
        legend: {
          align: "center",
          labels: {
            usePointStyle: true,
            boxWidth: 10,
          },
          display: false,
          position: "bottom",
        },
      },
    };
  },
  computed: {
    ...mapGetters("employees/sellers", ["sellerRevenue"]),
  },
  mounted() {
    this.getRevenue();
  },
  watch: {
    selectedYear() {
      this.getRevenue();
    },
  },
  methods: {
    getSelectedYear(year) {
      this.selectedYear = year;
    },
    getRevenue() {
      this.isLoading = true;
      const data = {
        seller_id: this.sellerId,
      };
      if (this.selectedYear !== "") {
        data.year = this.selectedYear;
      }
      this.$store
        .dispatch("employees/sellers/fetchSellerRevenue", data)
        .then(() => {
          this.isLoading = false;
          if (
            this.sellerRevenue &&
            this.sellerRevenue.data &&
            this.sellerRevenue.data.seller_revenue_percentage
          ) {
            const restPtrcentage =
              1 - this.sellerRevenue.data.seller_revenue_percentage;
            const progressValue = [
              restPtrcentage,
              this.sellerRevenue.data.seller_revenue_percentage,
            ];
            this.chartData = {
              labels: ["Revenue"],
              datasets: [
                {
                  labels: "Progress",
                  data: progressValue,
                  backgroundColor: ["rgba(233, 227, 213, 0.30)", "#FFF"],
                },
              ],
            };
          }
        });
    },
    firstTwoDigit(num) {
      return Number(String(num).substring(0, 4));
    },
  },
};
</script>

<style lang="scss" scoped></style>
