<template>
  <div class="container-fluid--50 min-height--46 min-height--lg mt-2">
    <div
      class="row d-flex flex_gap--xl justify-content-space-between align-items-center m-auto"
    >
      <h3 class="mb-0">
        {{ $t("ai_powerStore") }}
      </h3>
      <base-bread-crumbs :Links="Links" />
    </div>
    <seller-card
      :sellerData="bestStoresEver.data"
      :isLoading="isLoading"
      cardType="store"
    >
      <template #title>
        <h3><span class="gradient-text">{{$t('best_5')}}</span> {{$t('stores')}}</h3>
      </template>
    </seller-card>
    <BaseTabs
      :tabList="tabshead"
      :sideTitle="true"
      class="container-fluid--50"
      :tabName="'filterSeller'"
    >
      <template v-slot:filterSeller-0>
        <StoresPowerstoreBestStoresForYear />
      </template>
      <template v-slot:filterSeller-1>
        <StoresPowerstoreBestStoresForMonth />
      </template>
      <template v-slot:filterSeller-2>
        <StoresPowerstoreBestStoresForYearCat />
      </template>
      <template v-slot:filterSeller-3>
        <StoresPowerstoreBestStoreForMonthCat />
      </template>
      <template v-slot:filterSeller-4>
        <StoresPowerstoreBestStoresInCat />
      </template>
    </BaseTabs>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "MLIndex",

  data() {
    return {
      isLoading: false,
      Links: [
        {
          name: `${this.$t("Dashboard")}`,
          url: "/dashboard",
        },
        {
          name: `${this.$t("stores")}`,
        },
        {
          name: `${this.$t("ai_powerStore")}`,
          url: "/stores/AiPowerStore",
        },
      ],
      tabshead: [
        `${this.$t("theyear")}`,
        `${this.$t("themonth")}${this.$t("and")} ${this.$t("theyear")}`,
        `${this.$t("store_category")}${this.$t("and")} ${this.$t("theyear")}`,
        `${this.$t("store_category")}${this.$t("and")} ${this.$t(
          "themonth"
        )}${this.$t("and")} ${this.$t("theyear")}`,
        `${this.$t("store_category")}`,
      ],
    };
  },

  mounted() {},
  computed: {
    ...mapGetters("stores/stores", ["bestStoresEver"]),
  },
  created() {
    this.getBestStores();
  },

  methods: {
    getBestStores() {
      this.isLoading = true;
      this.$store.dispatch("stores/stores/fetchBestStores").then(() => {
        this.isLoading = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>

