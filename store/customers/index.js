import Customer from "@/services/customers/index";
export const state = () => ({
  customerList: [],
  Analysis: [],
  loading: false,
  error: null,
  success: null,
});
export const getters = {
  customerList: (state) => {
    return state.customerList;
  },
  Analysis: (state) => {
    return state.Analysis;
  },
  loading: (state) => {
    return state.loading;
  },
  error: (state) => {
    return state.error;
  },
  success: (state) => {
    return state.success;
  },
};
export const mutations = {
  fetchCustomerList(state, { type, response }) {
    switch (type) {
      case "LOADING":
        state.loading = true;
        state.success = null;
        state.error = null;
        break;
      case "SUCCESS":
        state.loading = false;
        state.customerList = response;
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
  fetchCustomerAnalysis(state, { type, response }) {
    switch (type) {
      case "LOADING":
        state.loading = true;
        state.success = null;
        state.error = null;
        break;
      case "SUCCESS":
        state.loading = false;
        state.Analysis = response.data;
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
  async fetchCustomerList({ commit }, data) {
    commit("fetchCustomerList", {
      type: "LOADING",
    });
    try {
      const request = Customer(this.$axios);
      const response = await request.customerList(data);
      commit("fetchCustomerList", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchCustomerList", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchCustomerAnalysis({ commit }, { customer_id }) {
    commit("fetchCustomerAnalysis", {
      type: "LOADING",
    });
    try {
      const request = Customer(this.$axios);
      const response = await request.Analysis({
        customer_id,
      });
      commit("fetchCustomerAnalysis", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchCustomerAnalysis", {
        type: "FAIL",
        response: error,
      });
    }
  },
};
