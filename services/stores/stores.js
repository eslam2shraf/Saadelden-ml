export default ($axios) => ({
  async bestStoresEver() {
    return await $axios.$get("stores/best_stores_ever");
  },
  async bestStoresForYear(data) {
    return await $axios.$get("stores/best_stores_for_year", {
      params: data,
    });
  },
  async bestStoresForMonth(data) {
    return await $axios.$get("stores/best_stores_for_year_month", {
      params: data,
    });
  },
  async bestStoresForYearInCategory(data) {
    return await $axios.$get("stores/best_stores_for_year_in_store_category", {
      params: data,
    });
  },
  async bestStoresForMonthInCategory(data) {
    return await $axios.$get("stores/best_stores_for_month_in_store_category", {
      params: data,
    });
  },
  async getStorePerformance(data) {
    return await $axios.$get("stores/get_store_performance", {
      params: data,
    });
  },
  async bestStoresInCategory(data) {
    return await $axios.$get("stores/best_stores_ever_in_store_category", {
      params: data,
    });
  },
  async allSellersByStore(data) {
    return await $axios.$get("sellers/allBranchSellers", {
      params: data,
    });
  },
  async storesSales(data) {
    return await $axios.$get("sellers/storeSales", {
      params: data,
    });
  },
  async allStores(data) {
    return await $axios.$get("sellers/allStores", {
      params: data,
    });
  },
});
