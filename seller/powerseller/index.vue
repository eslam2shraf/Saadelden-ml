<template>
  <div class="container-fluid--50 min-height--46 min-height--lg mt-2">
    <div
      class="row d-flex flex_gap--xl justify-content-space-between align-items-center m-auto"
    >
      <h3 class="mb-0">
        {{ $t("ai_powerSeller") }}
      </h3>
      <base-bread-crumbs :Links="Links" />
    </div>

    <seller-card :sellerData="bestSellers.data" :isLoading="isLoading">
      <template #title>
        <h3>
          <span class="gradient-text">{{ $t("best_5") }}</span>
          {{ $t("sellers_evers") }}
        </h3>
      </template>
    </seller-card>
    <BaseTabs
      :tabList="tabshead"
      :sideTitle="true"
      class="container-fluid--50 anomaly-tabs"
      :tabName="'filterSeller'"
    >
      <template v-slot:filterSeller-0>
        <best-seller-store />
      </template>
      <template v-slot:filterSeller-1>
        <best-seller-month />
      </template>
      <template v-slot:filterSeller-2>
        <best-seller-year />
      </template>
      <template v-slot:filterSeller-3>
        <best-seller-store-year />
      </template>
      <template v-slot:filterSeller-4>
        <best-seller-store-category />
      </template>
      <template v-slot:filterSeller-5>
        <best-seller-store-cat-month />
      </template>
      <template v-slot:filterSeller-6>
        <best-seller-store-cat-year />
      </template>
    </BaseTabs>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BestSellerMonth from "./BestSellerMonth.vue";
import BestSellerStore from "./BestSellerStore.vue";
import BestSellerStoreCategory from "./BestSellerStoreCategory.vue";
import BestSellerStoreCatMonth from "./BestSellerStoreCatMonth.vue";
import BestSellerStoreCatYear from "./BestSellerStoreCatYear.vue";
import BestSellerStoreYear from "./BestSellerStoreYear.vue";
import BestSellerYear from "./BestSellerYear.vue";
import SellerCard from "./SellerCard.vue";

export default {
  name: "AiSellerPower",
  data() {
    return {
      Links: [
        {
          name: `${this.$t("Dashboard")}`,
          url: "/dashboard",
        },
        {
          name: `${this.$t("employees")}`,
        },
        {
          name: `${this.$t("ai_powerSeller")}`,
          url: "/employees/seller/AiPowerSeller",
        },
      ],
      sellerActiveSlide: 0,
      isLoading: false,
      tabshead: [
        `${this.$t("store")}`,
        `${this.$t("themonth")}`,
        `${this.$t("theyear")}`,
        `${this.$t("store")}${this.$t("and")}  ${this.$t("theyear")}`,
        `${this.$t("store_category")}`,
        `${this.$t("store_category")}${this.$t("and")} ${this.$t(
          "themonth"
        )}${this.$t("and")} ${this.$t("theyear")}`,
        `${this.$t("store_category")}${this.$t("and")} ${this.$t("theyear")}`,
      ],
    };
  },
  computed: {
    ...mapGetters("employees/sellers", ["bestSellers"]),
  },
  mounted() {
    this.getBestSellers();
  },
  methods: {
    getBestSellers() {
      this.isLoading = true;
      this.$store.dispatch("employees/sellers/fetchBestSellers").then(() => {
        this.isLoading = false;
      });
    },
    setActivSlide(indx) {
      this.sellerActiveSlide = indx;
    },
  },
  components: {
    SellerCard,
    BestSellerMonth,
    BestSellerYear,
    BestSellerStore,
    BestSellerStoreYear,
    BestSellerStoreCategory,
    BestSellerStoreCatMonth,
    BestSellerStoreCatYear,
  },
};
</script>

<style lang="scss" scoped></style>

