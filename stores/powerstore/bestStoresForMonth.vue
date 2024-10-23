<template>
  <div class="">
    <seller-card
      :sellerData="bestStoresForMonth.data"
      :isLoading="isLoading"
      cardType="store"
    >
      <template #title>
        <h3>
          <span class="gradient-text">{{$t('best_5')}}</span> {{$t('stores')}} {{$t('in')}} {{$t('month')}} {{ month }}, {{ $t('year') }}
          {{ year }}
        </h3>
      </template>
      <template #filter>
        <div class="d-flex align-items-center flex_gap mb-2">
          <FilterIcon />
          <base-year-picker @year="getSelectedYear" :startYear="2021" />
          <base-month-picker @month="getSelectedMonth" />
          <BaseButton
            :clickedFunction="getBestStoresForMonth"
            class="button button--xs search-btn d-inline"
          >
            {{ $t("Done") }}
          </BaseButton>
        </div>
        <h4 class="text-center" v-if="!isLoading && !bestStoresForMonth.data">
          {{ $t("select_data") }}
        </h4>
      </template>
    </seller-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FilterIcon from "../../icon/Filter.vue";
import SellerCard from "../../seller/powerseller/SellerCard.vue";
import Reset from "../../icon/Reset.vue";
export default {
  name: "MLBestStoresForMonth",

  data() {
    return {
      sellerActiveSlide: 0,
      year: "",
      month: "",
      isLoading: false,
    };
  },

  computed: {
    ...mapGetters("stores/stores", ["bestStoresForMonth"]),
  },

  methods: {
    getSelectedYear(year) {
      this.year = year;
    },
    getSelectedMonth(mon) {
      this.month = mon;
    },
    getBestStoresForMonth() {
      const data = {};
      if (this.year !== "" && this.month !== "") {
        this.isLoading = true;
        data.year = this.year;
        data.month = this.month;
      }
      this.$store
        .dispatch("stores/stores/fetchBestStoresForMonth", data)
        .then(() => {
          this.isLoading = false;
        });
    },
    Reset() {
      this.year = "";
      this.month = "";
      this.isLoading = true;
      this.getBestStoresForMonth();
    },
  },
  components: { SellerCard, FilterIcon, Reset },
};
</script>

<style lang="scss" scoped></style>

