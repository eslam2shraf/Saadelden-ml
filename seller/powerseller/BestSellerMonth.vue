<template>
  <div class="">
    <seller-card :sellerData="bestSellerMonth.data" :isLoading="isLoading">
      <template #title>
        <h3>
            <span class="gradient-text">{{$t('best_5')}}</span> {{$t('sellers')}} {{$t('in')}} {{$t('month')}} {{ month }}
        </h3>
      </template>
      <template #filter>
        <div class="d-flex align-items-center flex_gap mb-2">
          <FilterIcon />
          <base-year-picker @year="getSelectedYear" :startYear="2023" />
          <base-month-picker @month="getSelectedMonth" />
          <BaseButton
            :clickedFunction="getBestSellersMonth"
            class="button button--xs search-btn d-inline"
          >
            {{ $t("Done") }}
          </BaseButton>
        </div>
        <h4 class="text-center" v-if="!isLoading && !bestSellerMonth.data">
          {{ $t("select_data") }}
        </h4>
      </template>
    </seller-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FilterIcon from "../../icon/Filter.vue";
import SellerCard from "./SellerCard.vue";
import Reset from "../../icon/Reset.vue";
export default {
  name: "FrontendMlBestSellerMonth",
  data() {
    return {
      sellerActiveSlide: 0,
      year: "",
      month: "",
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters("employees/sellers", ["bestSellerMonth"]),
  },
  mounted() {},
  methods: {
    getSelectedYear(year) {
      this.year = year;
    },
    getSelectedMonth(mon) {
      this.month = mon;
    },
    getBestSellersMonth() {
      const data = {};
      if (this.year !== "" && this.month !== "") {
        this.isLoading = true;
        data.year = this.year;
        data.month = this.month;
      }

      this.$store
        .dispatch("employees/sellers/fetchBestSellerMonth", data)
        .then(() => {
          this.isLoading = false;
        });
    },
    Reset() {
      this.year = "";
      this.month = "";
    },
  },
  components: { SellerCard, FilterIcon, Reset },
};
</script>

<style lang="scss" scoped></style>
