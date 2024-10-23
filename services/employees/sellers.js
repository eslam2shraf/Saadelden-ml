export default ($axios) => ({
  async allSellers(data) {
    const params = data;
    return await $axios.$get("sellers/allSellers", {
      params: params,
    });
  },
  async sellerDetails(data) {
    return await $axios.$get("sellers/sellerDetails", {
      params: data,
    });
  },
  async sellerTransactions(data) {
    return await $axios.$get("sellers/sellerTransactions", {
      params: data,
    });
  },
  async sellerCost(data) {
    return await $axios.$get("sellers/seller-costs", {
      params: data,
    });
  },

  async sellerRevenue(data) {
    return await $axios.$get("sellers/seller-revenue", {
      params: data,
    });
  },
  async sellerPerformance(data) {
    return await $axios.$get("sellers/seller-performance", {
      params: data,
    });
  },
  async sellerAvgSales(data) {
    return await $axios.$get("sellers/average-seller-sales", {
      params: data,
    });
  },
  async sellerProducts(data) {
    return await $axios.$get("sellers/sellerProducts", {
      params: data,
    });
  },
  async sellerStoreSales(data) {
    return await $axios.$get("sellers/sellerSales", {
      params: data,
    });
  },
  async sellerDiscount(data) {
    return await $axios.$get("sellers/most-have-discount", {
      params: data,
    });
  },
  async allStores(data) {
    return await $axios.$get("sellers/allStores", {
      params: data,
    });
  },
  async bestSellers() {
    return await $axios.$get("sellers/best_sellers_ever");
  },
  async bestSellerInStore(data) {
    return await $axios.$get("sellers/best_sellers_in_store", {
      params: data,
    });
  },
  async bestSellerInMonth(data) {
    return await $axios.$get("sellers/best_sellers_for_month", {
      params: data,
    });
  },
  async bestSellerInYear(data) {
    return await $axios.$get("sellers/best_sellers_for_year", {
      params: data,
    });
  },
  async bestSellerInMainStoreYear(data) {
    return await $axios.$get("sellers/best_sellers_in_store_year", {
      params: data,
    });
  },
  async bestSellerInStoreCategory(data) {
    return await $axios.$get("sellers/best_sellers_in_store_category", {
      params: data,
    });
  },
  async bestSellerInStoreCategoryMonth(data) {
    return await $axios.$get("sellers/best_sellers_in_store_category_in_year_month", {
      params: data,
    });
  },
  async bestSellerInStoreCategoryYear(data) {
    return await $axios.$get("sellers/best_sellers_in_store_category_in_year", {
      params: data,
    });
  },
});
