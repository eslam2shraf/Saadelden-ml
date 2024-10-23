<template>
  <div class="">
    <seller-card
      :sellerData="bestStoresForYear.data"
      :isLoading="isLoading"
      cardType="store"
    >
      <template #title>
        <h3>
          <span class="gradient-text">{{$t('best_5')}}</span> {{$t('stores')}} {{$t('in')}} {{$t('year')}}
          {{ year }}
        </h3>
      </template>
      <template #filter>
        <div class="d-flex align-items-center flex_gap mb-2">
          <FilterIcon />
          <base-year-picker
            @year="getSelectedYear"
            :startYear="2023"
            @change="getBestStoresForYear"
          />
        </div>
        <h4 class="text-center" v-if="!isLoading && !bestStoresForYear.data">
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
  name: "MLBestStoresForYear",

  data() {
    return {
      isLoading: false,
      year: "",
    };
  },
  components: { SellerCard, FilterIcon, Reset },

  computed: {
    ...mapGetters("stores/stores", ["bestStoresForYear"]),
  },

  methods: {
    getSelectedYear(year) {
      this.year = year;
    },
    getBestStoresForYear() {
      const data = {};
      if (this.year !== "") {
        this.isLoading = true;
        data.year = this.year;
      }

      this.$store
        .dispatch("stores/stores/fetchBestStoresForYear", data)
        .then(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
