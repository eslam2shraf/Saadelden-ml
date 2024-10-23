import Analysis from "@/services/productionlines/Analysis";
export const state = () => ({
  mostUsedMaterials: [],
  lessUsedMaterials: [],
  fatestProductionLine: [],
  slowestProductionLine: [],
  smallestWorkersNums: [],
  largestWorkersNums: [],
  highestcost: [],
  lowestcost: [],
  lowestWastage: [],
  highestWastage: [],
  loading: false,
  error: null,
  success: null,
});
export const getters = {
  mostUsedMaterials: (state) => {
    return state.mostUsedMaterials;
  },
  lessUsedMaterials: (state) => {
    return state.lessUsedMaterials;
  },
  fatestProductionLine: (state) => {
    return state.fatestProductionLine;
  },
  slowestProductionLine: (state) => {
    return state.slowestProductionLine;
  },
  smallestWorkersNums: (state) => {
    return state.smallestWorkersNums;
  },
  largestWorkersNums: (state) => {
    return state.largestWorkersNums;
  },
  highestcost: (state) => {
    return state.highestcost;
  },
  lowestcost: (state) => {
    return state.lowestcost;
  },
  lowestWastage: (state) => {
    return state.lowestWastage;
  },
  highestWastage: (state) => {
    return state.highestWastage;
  },
  loading: (state) => {
    return state.loading;
  },
  success: (state) => {
    return state.success;
  },
  error: (state) => {
    return state.error;
  },
};
export const mutations = {
  fetchMostUsedMaterials(state, { type, response }) {
    switch (type) {
      case "LOADING":
        state.loading = true;
        state.success = null;
        state.error = null;
        break;
      case "SUCCESS":
        state.loading = false;
        state.mostUsedMaterials = response.data ? response.data.slice(0, 10) :response ;
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
  fetchLessUsedMaterials(state, { type, response }) {
    switch (type) {
      case "LOADING":
        state.loading = true;
        state.success = null;
        state.error = null;
        break;
      case "SUCCESS":
        state.loading = false;
        state.lessUsedMaterials =response.data ? response.data.slice(0, 10) : response;
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
  fetchSlowestProductionLine(state, { type, response }) {
    switch (type) {
      case "LOADING":
        state.loading = true;
        state.success = null;
        state.error = null;
        break;
      case "SUCCESS":
        state.loading = false;
        state.slowestProductionLine =response.data ?  response.data.slice(0, 10) : response;
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
  fetchFatestProductionLine(state, { type, response }) {
    switch (type) {
      case "LOADING":
        state.loading = true;
        state.success = null;
        state.error = null;
        break;
      case "SUCCESS":
        state.loading = false;
        state.fatestProductionLine =response.data ? response.data.slice(0, 10) : response;
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
  fetchSmallestWorkersNums(state, { type, response }) {
    switch (type) {
      case "LOADING":
        state.loading = true;
        state.success = null;
        state.error = null;
        break;
      case "SUCCESS":
        state.loading = false;
        state.smallestWorkersNums =response.data ? response.data.slice(0, 10) : response;
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
  fetchLargestWorkersNums(state, { type, response }) {
    switch (type) {
      case "LOADING":
        state.loading = true;
        state.success = null;
        state.error = null;
        break;
      case "SUCCESS":
        state.loading = false;
        state.largestWorkersNums = response.data ? response.data.slice(0, 10) : response;
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
  fetchHighestCost(state, { type, response }) {
    switch (type) {
      case "LOADING":
        state.loading = true;
        state.success = null;
        state.error = null;
        break;
      case "SUCCESS":
        state.loading = false;
        state.highestcost = response.data ? response.data.slice(0, 10) : response;
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
  fetchLowestCost(state, { type, response }) {
    switch (type) {
      case "LOADING":
        state.loading = true;
        state.success = null;
        state.error = null;
        break;
      case "SUCCESS":
        state.loading = false;
        state.lowestcost = response.data ? response.data.slice(0, 10): response;
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
  fetchLowestWastage(state, { type, response }) {
    switch (type) {
      case "LOADING":
        state.loading = true;
        state.success = null;
        state.error = null;
        break;
      case "SUCCESS":
        state.loading = false;
        state.lowestWastage =response.data ? response.data.slice(0, 10) : response;
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
  fetchHighestWastage(state, { type, response }) {
    switch (type) {
      case "LOADING":
        state.loading = true;
        state.success = null;
        state.error = null;
        break;
      case "SUCCESS":
        state.loading = false;
        state.highestWastage = response.data ? response.data.slice(0, 10) :response;
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
  async fetchMostUsedMaterials({ commit }, data) {
    commit("fetchMostUsedMaterials", {
      type: "LOADING",
    });
    try {
      const request = Analysis(this.$axios);
      const response = await request.materialsMostUsed(data);
      commit("fetchMostUsedMaterials", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchMostUsedMaterials", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchLessUsedMaterials({ commit }, data) {
    commit("fetchLessUsedMaterials", {
      type: "LOADING",
    });
    try {
      const request = Analysis(this.$axios);
      const response = await request.materialsLessUsed(data);
      commit("fetchLessUsedMaterials", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchLessUsedMaterials", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchSlowestProductionLine({ commit }, data) {
    commit("fetchSlowestProductionLine", {
      type: "LOADING",
    });
    try {
      const request = Analysis(this.$axios);
      const response = await request.slowestProductionLine(data);
      commit("fetchSlowestProductionLine", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchSlowestProductionLine", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchFatestProductionLine({ commit }, data) {
    commit("fetchFatestProductionLine", {
      type: "LOADING",
    });
    try {
      const request = Analysis(this.$axios);
      const response = await request.fatestProductionLine(data);
      commit("fetchFatestProductionLine", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchFatestProductionLine", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchSmallestWorkersNums({ commit }, data) {
    commit("fetchSmallestWorkersNums", {
      type: "LOADING",
    });
    try {
      const request = Analysis(this.$axios);
      const response = await request.smallestWorkersNums(data);
      commit("fetchSmallestWorkersNums", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchSmallestWorkersNums", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchLargestWorkersNums({ commit }, data) {
    commit("fetchLargestWorkersNums", {
      type: "LOADING",
    });
    try {
      const request = Analysis(this.$axios);
      const response = await request.largestWorkersNums(data);
      commit("fetchLargestWorkersNums", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchLargestWorkersNums", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchHighestCost({ commit }, data) {
    commit("fetchHighestCost", {
      type: "LOADING",
    });
    try {
      const request = Analysis(this.$axios);
      const response = await request.highestCost(data);
      commit("fetchHighestCost", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchHighestCost", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchLowestCost({ commit }, data) {
    commit("fetchLowestCost", {
      type: "LOADING",
    });
    try {
      const request = Analysis(this.$axios);
      const response = await request.lowestCost(data);
      commit("fetchLowestCost", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchLowestCost", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchLowestWastage({ commit }, data) {
    commit("fetchLowestWastage", {
      type: "LOADING",
    });
    try {
      const request = Analysis(this.$axios);
      const response = await request.lowestWastage(data);
      commit("fetchLowestWastage", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchLowestWastage", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchHighestWastage({ commit }, data) {
    commit("fetchHighestWastage", {
      type: "LOADING",
    });
    try {
      const request = Analysis(this.$axios);
      const response = await request.highestWastage(data);
      commit("fetchHighestWastage", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchHighestWastage", {
        type: "FAIL",
        response: error,
      });
    }
  },
};
