<template>
  <div class="">
    <seller-card :sellerData="bestSellerStoreYear.data" :isLoading="isLoading">
      <template #title>
        <h3>
            <span class="gradient-text">{{ $t("best_5") }}</span>
          {{ $t("sellers") }} {{ $t("in_this") }} {{ $t("store") }} {{ $t('in') }} {{ $t('year') }} {{ year }}
        </h3>
      </template>
      <template #filter>
        <div class="d-flex align-items-center flex_gap mb-2">
          <FilterIcon />
          <div
            v-if="allStores && allStores.data"
            class="select-wrapper select-filter sellersSelect"
          >
            <BaseSelect
              class="sellerSelect__inner"
              @input="storeId = $event.target.value"
              :title="$t('store')"
              :options="allStores.data"
              :key-id="'id'"
              :key-name="'name'"
            >
            </BaseSelect>
          </div>
          <base-year-picker @year="getSelectedYear" :startYear="2023" />
          <BaseButton
            :clickedFunction="getBestSellersStoreYear"
            class="button button--xs search-btn d-inline"
          >
            {{ $t("Done") }}
          </BaseButton>
        </div>
        <h4 class="text-center" v-if="!isLoading && !bestSellerStoreYear.data">
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
  name: "FrontendMlBestSellerStoreYear",
  data() {
    return {
      storeId: "",
      year: "",
      isLoading: false,
      currentPage: 1,
    };
  },
  computed: {
    ...mapGetters("employees/sellers", ["bestSellerStoreYear", "allStores"]),
  },
  mounted() {
    this.getAllStores(this.currentPage);
  },
  methods: {
    getSelectedYear(year) {
      this.year = year;
    },
    getAllStores(page) {
      this.currentPage = page;
      this.$store.dispatch("employees/sellers/fetchAllStores", {
        page: this.currentPage,
        per_page: 20,
      });
    },
    getBestSellersStoreYear() {
      const data = {};
      if (this.storeId !== "" && this.year !== "") {
        this.isLoading = true;
        data.id = this.storeId;
        data.year = this.year;
      }

      this.$store
        .dispatch("employees/sellers/fetchBestSellersStoreYear", data)
        .then(() => {
          this.isLoading = false;
        });
    },
    Reset() {
      this.storeId = "";
      this.year = "";
    },
  },
  components: { SellerCard, FilterIcon, Reset },
};
</script>

<style lang="scss" scoped></style>
