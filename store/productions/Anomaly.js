import Anomaly from "@/services/productionlines/Anomaly";
export const state = () => ({
  peakTime: [],
  billsPrice: [],
  billsTime: [],
  offHoursInvoices: [],
  offHoursCheckIn: [],
  refundedLastDayInvoices: [],
  refundedMoreWeekInvoices: [],
  invoicesWeekUser: [],
  invoicesWeekUserDetails: [],
  invoicesWitthoutCheckIn: [],
  stores:[],
  loading: false,
  error: null,
  success: null,
});
export const getters = {
  peakTime: (state) => {
    return state.peakTime;
  },
  billsPrice: (state) => {
    return state.billsPrice;
  },
  billsTime: (state) => {
    return state.billsTime;
  },
  offHoursInvoices: (state) => {
    return state.offHoursInvoices;
  },
  offHoursCheckIn: (state) => {
    return state.offHoursCheckIn;
  },
  refundedLastDayInvoices: (state) => {
    return state.refundedLastDayInvoices;
  },
  refundedMoreWeekInvoices: (state) => {
    return state.refundedMoreWeekInvoices;
  },
  invoicesWeekUser: (state) => {
    return state.invoicesWeekUser;
  },
  invoicesWeekUserDetails: (state) => {
    return state.invoicesWeekUserDetails;
  },
  invoicesWitthoutCheckIn: (state) => {
    return state.invoicesWitthoutCheckIn;
  },
  stores: (state) => {
    return state.stores;
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
  fetchPeakTime(state, { type, response }) {
    switch (type) {
      case "LOADING":
        state.loading = true;
        state.success = false;
        state.error = null;
        break;
      case "SUCCESS":
        state.loading = false;
        state.peakTime = response.data;
        state.success = true;
        break;
      case "FAIL":
        state.loading = false;
        state.error = response.message;
        break;
      default:
        break;
    }
  },
  fetchBillsPrice(state, { type, response }) {
    switch (type) {
      case "LOADING":
        state.loading = true;
        state.success = false;
        state.error = null;
        break;
      case "SUCCESS":
        state.loading = false;
        state.billsPrice = response.data;
        state.success = true;
        break;
      case "FAIL":
        state.loading = false;
        state.error = response.message;
        break;
      default:
        break;
    }
  },
  fetchBillsTime(state, { type, response }) {
    switch (type) {
      case "LOADING":
        state.loading = true;
        state.success = false;
        state.error = null;
        break;
      case "SUCCESS":
        state.loading = false;
        state.billsTime = response.data;
        state.success = true;
        break;
      case "FAIL":
        state.loading = false;
        state.error = response.message;
        break;
      default:
        break;
    }
  },
  fetchOffHoursInvoices(state, { type, response }) {
    switch (type) {
      case "LOADING":
        state.loading = true;
        state.success = false;
        state.error = null;
        break;
      case "SUCCESS":
        state.loading = false;
        state.offHoursInvoices = response;
        state.success = true;
        break;
      case "FAIL":
        state.loading = false;
        state.error = response.message;
        break;
      default:
        break;
    }
  },
  fetchOffHoursCheckIn(state, { type, response }) {
    switch (type) {
      case "LOADING":
        state.loading = true;
        state.success = false;
        state.error = null;
        break;
      case "SUCCESS":
        state.loading = false;
        state.offHoursCheckIn = response;
        state.success = true;
        break;
      case "FAIL":
        state.loading = false;
        state.error = response.message;
        break;
      default:
        break;
    }
  },
  fetchRefundedLastDayInvoices(state, { type, response }) {
    switch (type) {
      case "LOADING":
        state.loading = true;
        state.success = false;
        state.error = null;
        break;
      case "SUCCESS":
        state.loading = false;
        state.refundedLastDayInvoices = response;
        state.success = true;
        break;
      case "FAIL":
        state.loading = false;
        state.error = response.message;
        break;
      default:
        break;
    }
  },
  fetchRefundedMoreWeekInvoices(state, { type, response }) {
    switch (type) {
      case "LOADING":
        state.loading = true;
        state.success = false;
        state.error = null;
        break;
      case "SUCCESS":
        state.loading = false;
        state.refundedMoreWeekInvoices = response;
        state.success = true;
        break;
      case "FAIL":
        state.loading = false;
        state.error = response.message;
        break;
      default:
        break;
    }
  },
  fetchWeekInvoicesSameUser(state, { type, response }) {
    switch (type) {
      case "LOADING":
        state.loading = true;
        state.success = false;
        state.error = null;
        break;
      case "SUCCESS":
        state.loading = false;
        state.invoicesWeekUser = response;
        state.success = true;
        break;
      case "FAIL":
        state.loading = false;
        state.error = response.message;
        break;
      default:
        break;
    }
  },
  fetchWeekInvoicesSameUserDetails(state, { type, response }) {
    switch (type) {
      case "LOADING":
        state.loading = true;
        state.success = false;
        state.error = null;
        break;
      case "SUCCESS":
        state.loading = false;
        state.invoicesWeekUserDetails = response;
        state.success = true;
        break;
      case "FAIL":
        state.loading = false;
        state.error = response.message;
        break;
      default:
        break;
    }
  },
  fetchInvoicesWithoutCheckIn(state, { type, response }) {
    switch (type) {
      case "LOADING":
        state.loading = true;
        state.success = false;
        state.error = null;
        break;
      case "SUCCESS":
        state.loading = false;
        state.invoicesWitthoutCheckIn = response;
        state.success = true;
        break;
      case "FAIL":
        state.loading = false;
        state.error = response.message;
        break;
      default:
        break;
    }
  },
  fetchStores(state, { type, response }) {
    switch (type) {
      case "LOADING":
        state.loading = true;
        state.success = false;
        state.error = null;
        break;
      case "SUCCESS":
        state.loading = false;
        state.stores = response;
        state.success = true;
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
  async fetchPeakTime({ commit }) {
    commit("fetchPeakTime", {
      type: "LOADING",
    });
    try {
      const request = Anomaly(this.$axios);
      const response = await request.peakTime();
      commit("fetchPeakTime", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchPeakTime", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchBillsPrice({ commit }) {
    commit("fetchBillsPrice", {
      type: "LOADING",
    });
    try {
      const request = Anomaly(this.$axios);
      const response = await request.billsPrice();
      commit("fetchBillsPrice", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchBillsPrice", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchBillsTime({ commit }) {
    commit("fetchBillsTime", {
      type: "LOADING",
    });
    try {
      const request = Anomaly(this.$axios);
      const response = await request.billsTime();
      commit("fetchBillsTime", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchBillsTime", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchOffHoursInvoices({ commit }, { page, per_page }) {
    commit("fetchOffHoursInvoices", {
      type: "LOADING",
    });
    try {
      const request = Anomaly(this.$axios);
      const response = await request.offHoursInvoices({
        page,
        per_page,
      });
      commit("fetchOffHoursInvoices", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchOffHoursInvoices", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchOffHoursCheckIn({ commit }, data) {
    commit("fetchOffHoursCheckIn", {
      type: "LOADING",
    });
    try {
      const request = Anomaly(this.$axios);
      const response = await request.offHoursCheckIn(data);
      commit("fetchOffHoursCheckIn", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchOffHoursCheckIn", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchRefundedLastDayInvoices({ commit }, data) {
    commit("fetchRefundedLastDayInvoices", {
      type: "LOADING",
    });
    try {
      const request = Anomaly(this.$axios);
      const response = await request.refundLastDayInvoice(data);
      commit("fetchRefundedLastDayInvoices", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchRefundedLastDayInvoices", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchRefundedMoreWeekInvoices({ commit }, data) {
    commit("fetchRefundedMoreWeekInvoices", {
      type: "LOADING",
    });
    try {
      const request = Anomaly(this.$axios);
      const response = await request.moreWeekRefundedInvoices(data);
      commit("fetchRefundedMoreWeekInvoices", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchRefundedMoreWeekInvoices", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchWeekInvoicesSameUser({ commit }, { page, per_page }) {
    commit("fetchWeekInvoicesSameUser", {
      type: "LOADING",
    });
    try {
      const request = Anomaly(this.$axios);
      const response = await request.invoicesWeekUser({
        page,
        per_page,
      });
      commit("fetchWeekInvoicesSameUser", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchWeekInvoicesSameUser", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchWeekInvoicesSameUserDetails(
    { commit },
    { page, per_page, user_id }
  ) {
    commit("fetchWeekInvoicesSameUserDetails", {
      type: "LOADING",
    });
    try {
      const request = Anomaly(this.$axios);
      const response = await request.invoicesWeekUserDetails({
        page,
        per_page,
        user_id,
      });
      commit("fetchWeekInvoicesSameUserDetails", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchWeekInvoicesSameUserDetails", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchInvoicesWithoutCheckIn({ commit }, { page, per_page }) {
    commit("fetchInvoicesWithoutCheckIn", {
      type: "LOADING",
    });
    try {
      const request = Anomaly(this.$axios);
      const response = await request.invoicesWithoutCheckIn({
        page,
        per_page,
      });
      commit("fetchInvoicesWithoutCheckIn", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchInvoicesWithoutCheckIn", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchStores({ commit }, data) {
    commit("fetchStores", {
      type: "LOADING",
    });
    try {
      const request = Anomaly(this.$axios);
      const response = await request.stores(data);
      commit("fetchStores", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchStores", {
        type: "FAIL",
        response: error,
      });
    }
  },
};
