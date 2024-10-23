import Seller from "@/services/employees/sellers";
export const state = () => ({
  allSellers: [],
  sellerDetails: [],
  sellerTransactions: [],
  sellerCost:[],
  sellerRevenue: [],
  sellerPerformance: [],
  AvgSales:[],
  sellerProducts:[],
  sellerDiscount:[],
  sellerstoreSales:[],
  allStores: [],
  bestSellers:[],
  bestSellerMonth:[],
  bestSellerYear:[],
  bestSellerStore:[],
  bestSellerStoreYear:[],
  bestSellerStoreCategory:[],
  bestSellerStoreCategoryMonth:[],
  bestSellerStoreCategoryYear:[],
  error: null,
  success: null,
});
export const getters = {
  allSellers: (state) => {
    return state.allSellers;
  },
  sellerDetails: (state) => {
    return state.sellerDetails;
  },
  sellerTransactions: (state) => {
    return state.sellerTransactions;
  },
  sellerCost: (state) => {
    return state.sellerCost;
  },
  sellerRevenue: (state) => {
    return state.sellerRevenue;
  },
  sellerPerformance: (state) => {
    return state.sellerPerformance;
  },
  AvgSales: (state) => {
    return state.AvgSales;
  },
  sellerProducts: (state) => {
    return state.sellerProducts;
  },
  allStores: (state) => {
    return state.allStores;
  },
  sellerDiscount: (state) => {
    return state.sellerDiscount;
  },
  sellerstoreSales: (state) => {
    return state.sellerstoreSales;
  },
  bestSellers: (state) => {
    return state.bestSellers;
  },
  bestSellerMonth: (state) => {
    return state.bestSellerMonth;
  },
  bestSellerYear: (state) => {
    return state.bestSellerYear;
  },
  bestSellerStore: (state) => {
    return state.bestSellerStore;
  },
  bestSellerStoreYear: (state) => {
    return state.bestSellerStoreYear;
  },
  bestSellerStoreCategory: (state) => {
    return state.bestSellerStoreCategory;
  },
  bestSellerStoreCategoryMonth: (state) => {
    return state.bestSellerStoreCategoryMonth;
  },
  bestSellerStoreCategoryYear: (state) => {
    return state.bestSellerStoreCategoryYear;
  },
  error: (state) => {
    return state.error;
  },
  success: (state) => {
    return state.success;
  },
};
export const mutations = {
  fetchAllSellers(state, { type, response }) {
    switch (type) {
      case "SUCCESS":
        state.loading = false;
        state.allSellers = response;
        state.success = response;
        break;
      case "FAIL":
        state.loading = false;
        state.error = response.message;
        break;
      default:
        break;
    }
  },
  fetchSellerDetails(state, { type, response }) {
    switch (type) {
      case "SUCCESS":
        state.loading = false;
        state.sellerDetails = response;
        state.success = response;
        break;
      case "FAIL":
        state.loading = false;
        state.sellerDetails = response.response.data;
        break;
      default:
        break;
    }
  },
  fetchSellerTransactions(state, { type, response }) {
    switch (type) {
      case "SUCCESS":
        state.loading = false;
        state.sellerTransactions = response;
        state.success = response;
        break;
      case "FAIL":
        state.loading = false;
        state.sellerTransactions = response.response.data;
        break;
      default:
        break;
    }
  },
  fetchSellerCost(state, { type, response }) {
    switch (type) {
      case "SUCCESS":
        state.loading = false;
        state.sellerCost = response;
        state.success = response;
        break;
      case "FAIL":
        state.loading = false;
        state.sellerCost = response.response.data;
        break;
      default:
        break;
    }
  },
  fetchSellerRevenue(state, { type, response }) {
    switch (type) {
      case "SUCCESS":
        state.loading = false;
        state.sellerRevenue = response;
        state.success = response;
        break;
      case "FAIL":
        state.loading = false;
        state.sellerRevenue = response.response.data;
        break;
      default:
        break;
    }
  },
  fetchSellerPerformance(state, { type, response }) {
    switch (type) {
      case "SUCCESS":
        state.loading = false;
        state.sellerPerformance = response;
        state.success = response;
        break;
      case "FAIL":
        state.loading = false;
        state.sellerPerformance = response.response.data;
        break;
      default:
        break;
    }
  },
  fetchAvgSales(state, { type, response }) {
    switch (type) {
      case "SUCCESS":
        state.loading = false;
        state.AvgSales = response;
        state.success = response;
        break;
      case "FAIL":
        state.loading = false;
        state.AvgSales = response.response.data;
        break;
      default:
        break;
    }
  },
  fetchSellerProducts(state, { type, response }) {
    switch (type) {
      case "SUCCESS":
        state.loading = false;
        state.sellerProducts = response;
        state.success = response;
        break;
      case "FAIL":
        state.loading = false;
        state.sellerProducts = response.response.data;
        break;
      default:
        break;
    }
  },
  fetchSellerDiscount(state, { type, response }) {
    switch (type) {
      case "SUCCESS":
        state.loading = false;
        state.sellerDiscount = response;
        state.success = response;
        break;
      case "FAIL":
        state.loading = false;
        state.sellerDiscount = response.response.data;
        break;
      default:
        break;
    }
  },
  fetchSellerstoreSales(state, { type, response }) {
    switch (type) {
      case "SUCCESS":
        state.loading = false;
        state.sellerstoreSales = response;
        state.success = response;
        break;
      case "FAIL":
        state.loading = false;
        state.sellerstoreSales = response.response.data;
        break;
      default:
        break;
    }
  },
  fetchAllStores(state, { type, response }) {
    switch (type) {
      case "SUCCESS":
        state.loading = false;
        state.allStores = response;
        state.success = response;
        break;
      case "FAIL":
        state.loading = false;
        state.error = response.message;
        break;
      default:
        break;
    }
  },
  fetchBestSellerMonth(state, { type, response }) {
    switch (type) {
      case "SUCCESS":
        state.loading = false;
        state.bestSellerMonth = response;
        state.success = response;
        break;
      case "FAIL":
        state.loading = false;
        state.bestSellerMonth = response.message;
        break;
      default:
        break;
    }
  },
  fetchBestSellers(state, { type, response }) {
    switch (type) {
      case "SUCCESS":
        state.loading = false;
        state.bestSellers = response;
        state.success = response;
        break;
      case "FAIL":
        state.loading = false;
        state.bestSellers = response.message;
        break;
      default:
        break;
    }
  },
  fetchBestSellersYear(state, { type, response }) {
    switch (type) {
      case "SUCCESS":
        state.loading = false;
        state.bestSellerYear = response;
        state.success = response;
        break;
      case "FAIL":
        state.loading = false;
        state.bestSellerYear = response.message;
        break;
      default:
        break;
    }
  },
  fetchBestSellersStore(state, { type, response }) {
    switch (type) {
      case "SUCCESS":
        state.loading = false;
        state.bestSellerStore = response;
        state.success = response;
        break;
      case "FAIL":
        state.loading = false;
        state.bestSellerStore = response.message;
        break;
      default:
        break;
    }
  },
  fetchBestSellersStoreYear(state, { type, response }) {
    switch (type) {
      case "SUCCESS":
        state.loading = false;
        state.bestSellerStoreYear = response;
        state.success = response;
        break;
      case "FAIL":
        state.loading = false;
        state.bestSellerStoreYear = response.message;
        break;
      default:
        break;
    }
  },
  fetchBestSellersStoreCat(state, { type, response }) {
    switch (type) {
      case "SUCCESS":
        state.loading = false;
        state.bestSellerStoreCategory = response;
        state.success = response;
        break;
      case "FAIL":
        state.loading = false;
        state.bestSellerStoreCategory = response.message;
        break;
      default:
        break;
    }
  },
  fetchBestSellersStoreCatMonth(state, { type, response }) {
    switch (type) {
      case "SUCCESS":
        state.loading = false;
        state.bestSellerStoreCategoryMonth = response;
        state.success = response;
        break;
      case "FAIL":
        state.loading = false;
        state.bestSellerStoreCategoryMonth = response.message;
        break;
      default:
        break;
    }
  },
  fetchBestSellersStoreCatYear(state, { type, response }) {
    switch (type) {
      case "SUCCESS":
        state.loading = false;
        state.bestSellerStoreCategoryYear = response;
        state.success = response;
        break;
      case "FAIL":
        state.loading = false;
        state.bestSellerStoreCategoryYear = response.message;
        break;
      default:
        break;
    }
  },
};
export const actions = {
  async fetchAllSellers({ commit }, data) {
    try {
      const request = Seller(this.$axios);
      const response = await request.allSellers(data);
      commit("fetchAllSellers", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchAllSellers", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchSellerDetails({ commit }, data) {
    try {
      const request = Seller(this.$axios);
      const response = await request.sellerDetails(data);
      commit("fetchSellerDetails", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchSellerDetails", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchSellerTransactions({ commit }, data) {
    try {
      const request = Seller(this.$axios);
      const response = await request.sellerTransactions(data);
      commit("fetchSellerTransactions", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchSellerTransactions", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchSellerCost({ commit }, data) {
    try {
      const request = Seller(this.$axios);
      const response = await request.sellerCost(data);
      commit("fetchSellerCost", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchSellerCost", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchSellerRevenue({ commit }, data) {
    try {
      const request = Seller(this.$axios);
      const response = await request.sellerRevenue(data);
      commit("fetchSellerRevenue", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchSellerRevenue", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchSellerPerformance({ commit }, data) {
    try {
      const request = Seller(this.$axios);
      const response = await request.sellerPerformance(data);
      commit("fetchSellerPerformance", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchSellerPerformance", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchAvgSales({ commit }, data) {
    try {
      const request = Seller(this.$axios);
      const response = await request.sellerAvgSales(data);
      commit("fetchAvgSales", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchAvgSales", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchSellerProducts({ commit }, data) {
    try {
      const request = Seller(this.$axios);
      const response = await request.sellerProducts(data);
      commit("fetchSellerProducts", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchSellerProducts", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchSellerDiscount({ commit }, data) {
    try {
      const request = Seller(this.$axios);
      const response = await request.sellerDiscount(data);
      commit("fetchSellerDiscount", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchSellerDiscount", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchSellerstoreSales({ commit }, data) {
    try {
      const request = Seller(this.$axios);
      const response = await request.sellerStoreSales(data);
      commit("fetchSellerstoreSales", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchSellerstoreSales", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchAllStores({ commit }, data) {
    try {
      const request = Seller(this.$axios);
      const response = await request.allStores(data);
      commit("fetchAllStores", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchAllStores", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchBestSellers({ commit }) {
    try {
      const request = Seller(this.$axios);
      const response = await request.bestSellers();
      commit("fetchBestSellers", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchBestSellers", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchBestSellerMonth({ commit }, data) {
    try {
      const request = Seller(this.$axios);
      const response = await request.bestSellerInMonth(data);
      commit("fetchBestSellerMonth", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchBestSellerMonth", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchBestSellersYear({ commit }, data) {
    try {
      const request = Seller(this.$axios);
      const response = await request.bestSellerInYear(data);
      commit("fetchBestSellersYear", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchBestSellersYear", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchBestSellersStore({ commit }, data) {
    try {
      const request = Seller(this.$axios);
      const response = await request.bestSellerInStore(data);
      commit("fetchBestSellersStore", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchBestSellersStore", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchBestSellersStoreYear({ commit }, data) {
    try {
      const request = Seller(this.$axios);
      const response = await request.bestSellerInMainStoreYear(data);
      commit("fetchBestSellersStoreYear", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchBestSellersStoreYear", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchBestSellersStoreCat({ commit }, data) {
    try {
      const request = Seller(this.$axios);
      const response = await request.bestSellerInStoreCategory(data);
      commit("fetchBestSellersStoreCat", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchBestSellersStoreCat", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchBestSellersStoreCatMonth({ commit }, data) {
    try {
      const request = Seller(this.$axios);
      const response = await request.bestSellerInStoreCategoryMonth(data);
      commit("fetchBestSellersStoreCatMonth", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchBestSellersStoreCatMonth", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchBestSellersStoreCatYear({ commit }, data) {
    try {
      const request = Seller(this.$axios);
      const response = await request.bestSellerInStoreCategoryYear(data);
      commit("fetchBestSellersStoreCatYear", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchBestSellersStoreCatYear", {
        type: "FAIL",
        response: error,
      });
    }
  },
};
