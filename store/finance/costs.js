import Costs from "@/services/finance/costs";

export const state = () => ({
  expenses: [],
  directAndIndirectCosts: [],
  calcGenerateFinancialsCost: "",
  latestFinancialsCost: [],
  profitCost: [],
  generateProfitCost: [],
  anomaliesStoresTargets: [],
  abnormalMaterialOrderCost: [],
  logsProfitCost: [],
  abnormalProductionLineCost: [],
  anomaliesTradesMen: [],
  heighestProducts:[],
  lowestProducts:[],
  error: [],
});
export const getters = {
  expenses: (state) => {
    return state.expenses;
  },
  directAndIndirectCosts: (state) => {
    return state.directAndIndirectCosts;
  },
  calcGenerateFinancialsCost: (state) => {
    return state.calcGenerateFinancialsCost;
  },
  latestFinancialsCost: (state) => {
    return state.latestFinancialsCost;
  },

  profitCost: (state) => {
    return state.profitCost;
  },
  generateProfitCost: (state) => {
    return state.generateProfitCost;
  },
  anomaliesStoresTargets: (state) => {
    return state.anomaliesStoresTargets;
  },
  abnormalMaterialOrderCost: (state) => {
    return state.abnormalMaterialOrderCost;
  },
  logsProfitCost(state) {
    return state.logsProfitCost;
  },
  abnormalProductionLineCost: (state) => {
    return state.abnormalProductionLineCost;
  },
  anomaliesTradesMen: (state) => {
    return state.anomaliesTradesMen;
  },
  heighestProducts: (state) => {
    return state.heighestProducts;
  },
  lowestProducts: (state) => {
    return state.lowestProducts;
  },
};
export const mutations = {
  fetchAllExpenses(state, { type, response }) {
    switch (type) {
      case "SUCCESS":
        state.loading = false;
        state.expenses = response;
        state.success = response;
        break;
      case "FAIL":
        state.loading = false;
        state.expenses = response;
        break;
      default:
        break;
    }
  },
  fetchDirectAndIndirectCosts(state, { type, response }) {
    switch (type) {
      case "SUCCESS":
        state.loading = false;
        state.directAndIndirectCosts = response;
        state.success = response;
        break;
      case "FAIL":
        state.loading = false;
        state.directAndIndirectCosts = response;
        break;
      default:
        break;
    }
  },

  fetchCalcGenerate(state, { type, response }) {
    switch (type) {
      case "SUCCESS":
        state.loading = false;
        state.expenses = response;
        state.success = response;
        break;
      case "FAIL":
        state.loading = false;
        state.expenses = response;
        break;
      default:
        break;
    }
  },
  fetchLatestFinancialsCost(state, { type, response }) {
    switch (type) {
      case "SUCCESS":
        state.loading = false;
        state.latestFinancialsCost = response;
        state.success = response;
        break;
      case "FAIL":
        state.loading = false;
        state.latestFinancialsCost = response;
        break;
      default:
        break;
    }
  },

  fetchProfitCost(state, { type, response }) {
    switch (type) {
      case "SUCCESS":
        state.loading = false;
        state.profitCost = response;
        state.success = response;
        break;
      case "FAIL":
        state.loading = false;
        state.profitCost = response;
        break;
      default:
        break;
    }
  },
  fetchGenerateProfitCost(state, { type, response }) {
    switch (type) {
      case "SUCCESS":
        state.loading = false;
        state.generateProfitCost = response;
        state.success = response;
        break;
      case "FAIL":
        state.loading = false;
        state.generateProfitCost = response;
        break;
      default:
        break;
    }
  },
  fetchAnomaliesStoresTargets(state, { type, response }) {
    switch (type) {
      case "SUCCESS":
        state.loading = false;
        state.anomaliesStoresTargets = response;
        state.success = response;
        break;
      case "FAIL":
        state.loading = false;
        state.anomaliesStoresTargets = response;
        break;
      default:
        break;
    }
  },
  fetchAbnormalMaterialOrderCost(state, { type, response }) {
    switch (type) {
      case "SUCCESS":
        state.loading = false;
        state.abnormalMaterialOrderCost = response;
        state.success = response;
        break;
      case "FAIL":
        state.loading = false;
        state.abnormalMaterialOrderCost = response;
        break;
      default:
        break;
    }
  },
  fetchLogsProfitCost(state, { type, response }) {
    switch (type) {
      case "SUCCESS":
        state.loading = false;
        state.logsProfitCost = response;
        state.success = response;
        break;
      case "FAIL":
        state.loading = false;
        state.logsProfitCost = response;
        break;
      default:
        break;
    }
  },
  fetchAbnormalProductionLineCost(state, { type, response }) {
    switch (type) {
      case "SUCCESS":
        state.loading = false;
        state.abnormalProductionLineCost = response;
        state.success = response;
        break;
      case "FAIL":
        state.loading = false;
        state.abnormalProductionLineCost = response;
        break;
      default:
        break;
    }
  },
  fetchAnomaliesTradesMen(state, { type, response }) {
    switch (type) {
      case "SUCCESS":
        state.loading = false;
        state.anomaliesTradesMen = response;
        state.success = response;
        break;
      case "FAIL":
        state.loading = false;
        state.anomaliesTradesMen = response;
        break;
      default:
        break;
    }
  },
  fetchHeighestProducts(state, { type, response }) {
    switch (type) {
      case "SUCCESS":
        state.loading = false;
        state.heighestProducts = response;
        state.success = response;
        break;
      case "FAIL":
        state.loading = false;
        state.heighestProducts = response;
        break;
      default:
        break;
    }
  },
  fetchLowestProducts(state, { type, response }) {
    switch (type) {
      case "SUCCESS":
        state.loading = false;
        state.lowestProducts = response;
        state.success = response;
        break;
      case "FAIL":
        state.loading = false;
        state.lowestProducts = response;
        break;
      default:
        break;
    }
  },
};
export const actions = {
  async fetchAllExpenses({ commit }, data) {
    try {
      const request = Costs(this.$axios);
      const response = await request.expenses(data);
      commit("fetchAllExpenses", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchAllExpenses", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchDirectAndIndirectCosts({ commit }, data) {
    try {
      const request = Costs(this.$axios);
      const response = await request.directAndIndirectCosts(data);
      commit("fetchDirectAndIndirectCosts", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchDirectAndIndirectCosts", {
        type: "FAIL",
        response: error,
      });
    }
  },

  async fetchCalcGenerate({ commit }, data) {
    try {
      const request = Costs(this.$axios);
      const response = await request.calcGenerateFinancialsCost(data);
      commit("fetchCalcGenerate", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchCalcGenerate", {
        type: "FAIL",
        response: error,
      });
    }
  },

  async fetchLatestFinancialsCost({ commit }, data) {
    try {
      const request = Costs(this.$axios);
      const response = await request.latestFinancialsCost(data);
      commit("fetchLatestFinancialsCost", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchLatestFinancialsCost", {
        type: "FAIL",
        response: error,
      });
    }
  },

  async fetchProfitCost({ commit }, data) {
    try {
      const request = Costs(this.$axios);
      const response = await request.profitCost(data);
      commit("fetchProfitCost", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchProfitCost", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchGenerateProfitCost({ commit }, data) {
    try {
      const request = Costs(this.$axios);
      const response = await request.calcGenerateProfitCost(data);
      commit("fetchGenerateProfitCost", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchGenerateProfitCost", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchAnomaliesStoresTargets({ commit }, data) {
    try {
      const request = Costs(this.$axios);
      const response = await request.anomaliesStoresTarget(data);
      commit("fetchAnomaliesStoresTargets", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchAnomaliesStoresTargets", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchAbnormalMaterialOrderCost({ commit }, data) {
    try {
      const request = Costs(this.$axios);
      const response = await request.abnormalMaterialOrderCost(data);
      commit("fetchAbnormalMaterialOrderCost", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchAbnormalMaterialOrderCost", {
        type: "FAIL",
        response: error,
      });
    }
  },

  async fetchLogsProfitCost({ commit }, data) {
    try {
      const request = Costs(this.$axios);
      const response = await request.logsProfitCost(data);
      commit("fetchLogsProfitCost", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchLogsProfitCost", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchAbnormalProductionLineCost({ commit }, data) {
    try {
      const request = Costs(this.$axios);
      const response = await request.abnormalProductionLineCost(data);
      commit("fetchAbnormalProductionLineCost", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchAbnormalProductionLineCost", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchAnomaliesTradesMen({ commit }) {
    try {
      const request = Costs(this.$axios);
      const response = await request.abnormalTradesMen();
      commit("fetchAnomaliesTradesMen", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchAnomaliesTradesMen", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchHeighestProducts({ commit },data) {
    try {
      const request = Costs(this.$axios);
      const response = await request.heighestProducts(data);
      commit("fetchHeighestProducts", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchHeighestProducts", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchLowestProducts({ commit },data) {
    try {
      const request = Costs(this.$axios);
      const response = await request.lowstProducts(data);
      commit("fetchLowestProducts", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchLowestProducts", {
        type: "FAIL",
        response: error,
      });
    }
  },
};

