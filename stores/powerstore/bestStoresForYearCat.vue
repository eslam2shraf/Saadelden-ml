<template>
  <div class="">
    <seller-card
      :sellerData="bestStoresForYearInCategory.data"
      :isLoading="isLoading"
      cardType="store"
    >
      <template #title>
        <h3>
          <span class="gradient-text">{{$t('best_5')}}</span> {{$t('stores')}} {{$t('in')}} {{$t('store_category')}}
          {{ storecatId }} {{ $t('in') }} {{ $t('year') }}
        </h3>
      </template>
      <template #filter>
        <div class="d-flex align-items-center flex_gap mb-2">
          <FilterIcon />
          <div class="select-wrapper select-filter sellersSelect">
            <BaseSelect
              class="sellerSelect__inner"
              @input="storecatId = $event.target.value"
              :title="$t('store_category')"
              :options="storCategories"
              :key-id="'value'"
              :key-name="'name'"
            >
            </BaseSelect>
          </div>
          <base-year-picker @year="getSelectedYear" :startYear="2023" />

          <BaseButton
            :clickedFunction="getBestStoresForYearInCategory"
            class="button button--xs search-btn d-inline"
          >
            {{ $t("Done") }}
          </BaseButton>
        </div>
        <h4
          class="text-center"
          v-if="!isLoading && !bestStoresForYearInCategory.data"
        >
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
  name: "MLBestStoresForYearCat",

  data() {
    return {
      storecatId: "",
      isLoading: false,
      storCategories: [
        { name: "a", value: "a" },
        { name: "b", value: "b" },
        { name: "c", value: "c" },
        { name: "d", value: "d" },
      ],
      year: "",
    };
  },
  computed: {
    ...mapGetters("stores/stores", ["bestStoresForYearInCategory"]),
  },
  mounted() {},
  methods: {
    getSelectedYear(year) {
      this.year = year;
    },
    getSelectedCatId(catId) {
      this.storecatId = catId;
    },
    getBestStoresForYearInCategory() {
      const data = {};
      if (this.year !== "" && this.storecatId !== "") {
        this.isLoading = true;
        data.year = this.year;
        data.category = this.storecatId;
      }

      this.$store
        .dispatch("stores/stores/fetchBestStoresForYearInCategory", data)
        .then(() => {
          this.isLoading = false;
        });
    },
    Reset() {
      this.storecatId = "";
    },
  },
  components: { SellerCard, FilterIcon, Reset },
};
</script>

<style lang="scss" scoped></style>

