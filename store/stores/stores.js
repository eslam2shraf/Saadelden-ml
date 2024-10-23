import Stores from "@/services/stores/stores";
export const state = () => ({
  bestStoresEver: [],
  bestStoresForYear: [],
  bestStoresForMonth: [],
  bestStoresForYearInCategory: [],
  bestStoresForMonthInCategory: [],
  getStorePerformance: [],
  bestStoresInCategory: [],
  allSellersByStore: [],
  storesSales: [],
  allStores: [],
});
export const getters = {
  bestStoresEver: (state) => {
    return state.bestStoresEver;
  },
  bestStoresForYear: (state) => {
    return state.bestStoresForYear;
  },
  bestStoresForMonth: (state) => {
    return state.bestStoresForMonth;
  },
  bestStoresForYearInCategory: (state) => {
    return state.bestStoresForYearInCategory;
  },
  bestStoresForMonthInCategory: (state) => {
    return state.bestStoresForMonthInCategory;
  },
  getStorePerformance: (state) => {
    return state.getStorePerformance;
  },
  bestStoresInCategory: (state) => {
    return state.bestStoresInCategory;
  },
  AllSellersByStore: (state) => {
    return state.allSellersByStore;
  },
  StoresSales: (state) => {
    return state.storesSales;
  },
  allStores: (state) => {
    return state.allStores;
  },
};
export const mutations = {
  fetchBestStores(state, { type, response }) {
    switch (type) {
      case "SUCCESS":
        state.loading = false;
        state.bestStoresEver = response;
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
  fetchBestStoresForYear(state, { type, response }) {
    switch (type) {
      case "SUCCESS":
        state.loading = false;
        state.bestStoresForYear = response;
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
  fetchBestStoresForMonth(state, { type, response }) {
    switch (type) {
      case "SUCCESS":
        state.loading = false;
        state.bestStoresForMonth = response;
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
  fetchBestStoresForYearInCategory(state, { type, response }) {
    switch (type) {
      case "SUCCESS":
        state.loading = false;
        state.bestStoresForYearInCategory = response;
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
  fetchBestStoresForMonthInCategory(state, { type, response }) {
    switch (type) {
      case "SUCCESS":
        state.loading = false;
        state.bestStoresForMonthInCategory = response;
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
  fetchStorePerformance(state, { type, response }) {
    switch (type) {
      case "SUCCESS":
        state.loading = false;
        state.getStorePerformance = response;
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
  fetchBestStoresInCategory(state, { type, response }) {
    switch (type) {
      case "SUCCESS":
        state.loading = false;
        state.bestStoresInCategory = response;
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
  fetchAllSellersByStore(state, { type, response }) {
    switch (type) {
      case "SUCCESS":
        state.loading = false;
        state.allSellersByStore = response;
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
  fetchStoresSales(state, { type, response }) {
    switch (type) {
      case "SUCCESS":
        state.loading = false;
        state.storesSales = response;
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
};
export const actions = {
  async fetchBestStores({ commit }) {
    try {
      const request = Stores(this.$axios);
      const response = await request.bestStoresEver();
      commit("fetchBestStores", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchBestStores", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchBestStoresForYear({ commit }, data) {
    try {
      const request = Stores(this.$axios);
      const response = await request.bestStoresForYear(data);
      commit("fetchBestStoresForYear", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchBestStoresForYear", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchBestStoresForMonth({ commit }, data) {
    try {
      const request = Stores(this.$axios);
      const response = await request.bestStoresForMonth(data);
      commit("fetchBestStoresForMonth", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchBestStoresForMonth", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchBestStoresForYearInCategory({ commit }, data) {
    try {
      const request = Stores(this.$axios);
      const response = await request.bestStoresForYearInCategory(data);
      commit("fetchBestStoresForYearInCategory", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchBestStoresForYearInCategory", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchBestStoresForMonthInCategory({ commit }, data) {
    try {
      const request = Stores(this.$axios);
      const response = await request.bestStoresForMonthInCategory(data);
      commit("fetchBestStoresForMonthInCategory", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchBestStoresForMonthInCategory", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchStorePerformance({ commit }, data) {
    try {
      const request = Stores(this.$axios);
      const response = await request.getStorePerformance(data);
      commit("fetchStorePerformance", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchStorePerformance", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchBestStoresInCategory({ commit }, data) {
    try {
      const request = Stores(this.$axios);
      const response = await request.bestStoresInCategory(data);
      commit("fetchBestStoresInCategory", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchBestStoresInCategory", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchAllSellersByStore({ commit }, data) {
    try {
      const request = Stores(this.$axios);
      const response = await request.allSellersByStore(data);
      commit("fetchAllSellersByStore", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchAllSellersByStore", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchStoresSales({ commit }, data) {
    try {
      const request = Stores(this.$axios);
      const response = await request.storesSales(data);
      commit("fetchStoresSales", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchStoresSales", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchAllStores({ commit }, data) {
    try {
      const request = Stores(this.$axios);
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
};
