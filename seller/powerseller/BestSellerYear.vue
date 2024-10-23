<template>
  <div class="">
    <seller-card :sellerData="bestSellerYear.data" :isLoading="isLoading">
      <template #title>
        <h3>
            <span class="gradient-text">{{ $t("best_5") }}</span>
          {{ $t("sellers") }} {{ $t("in_this") }} {{ $t('year') }} {{ year }}
        </h3>
      </template>
      <template #filter>
        <div class="d-flex align-items-center flex_gap mb-2">
          <FilterIcon />
          <base-year-picker @year="getSelectedYear" :startYear="2023"  @change="getBestSellersYear"/>
          
        
        </div>
        <h4 class="text-center" v-if="!isLoading && !bestSellerYear.data">
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
  name: "FrontendMlBestSellerYear",
  data() {
    return {
      sellerActiveSlide: 0,
      year: "",
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters("employees/sellers", ["bestSellerYear"]),
  },
  mounted() {},
  methods: {
    getSelectedYear(year) {
      this.year = year;
    },
    getBestSellersYear() {
      const data = {};
      if (this.year !== "") {
        this.isLoading = true;
        data.year = this.year;
      }

      this.$store
        .dispatch("employees/sellers/fetchBestSellersYear", data)
        .then(() => {
          this.isLoading = false;
        });
    },
    Reset() {
      this.year = "";
    },
  },
  components: { SellerCard, FilterIcon, Reset },
};
</script>
  
  <style lang="scss" scoped>
</style>