import Products from "@/services/products/segmentaion";
export const state = () => ({
  productsMostSold: [],
  productsLessSold: [],
  movementMostSold: [],
  movementLessSold: [],
  lessProductQuantity: [],
  mostProductQuantity: [],
  movementMostQuantity: [],
  movementLessQuantity: [],
  loading: false,
  error: null,
  success: null,
});
export const getters = {
  productsMostSold: (state) => {
    return state.productsMostSold;
  },
  productsLessSold: (state) => {
    return state.productsLessSold;
  },
  movementMostSold: (state) => {
    return state.movementMostSold;
  },
  movementLessSold: (state) => {
    return state.movementLessSold;
  },
  lessProductQuantity: (state) => {
    return state.lessProductQuantity;
  },
  mostProductQuantity: (state) => {
    return state.mostProductQuantity;
  },
  movementMostQuantity: (state) => {
    return state.movementMostQuantity;
  },
  movementLessQuantity: (state) => {
    return state.movementLessQuantity;
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
  fetchProductsMostSold(state, { type, response }) {
    switch (type) {
      case "LOADING":
        state.loading = true;
        state.success = null;
        state.error = null;
        break;
      case "SUCCESS":
        state.loading = false;
        state.productsMostSold = response.data;
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
  fetchProductsLessSold(state, { type, response }) {
    switch (type) {
      case "LOADING":
        state.loading = true;
        state.success = null;
        state.error = null;
        break;
      case "SUCCESS":
        state.loading = false;
        state.productsLessSold = response.data ? response.data  : response;
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
  fetchMovementMostSold(state, { type, response }) {
    switch (type) {
      case "LOADING":
        state.loading = true;
        state.success = null;
        state.error = null;
        break;
      case "SUCCESS":
        state.loading = false;
        state.movementMostSold = response;
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
  fetchMovementLessSold(state, { type, response }) {
    switch (type) {
      case "LOADING":
        state.loading = true;
        state.success = null;
        state.error = null;
        break;
      case "SUCCESS":
        state.loading = false;
        state.movementLessSold = response ;
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
  fetchLessProductQuantity(state, { type, response }) {
    switch (type) {
      case "LOADING":
        state.loading = true;
        state.success = null;
        state.error = null;
        break;
      case "SUCCESS":
        state.loading = false;
        state.lessProductQuantity = response.data ? response.data : response;
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
  fetchMostProductQuantity(state, { type, response }) {
    switch (type) {
      case "LOADING":
        state.loading = true;
        state.success = null;
        state.error = null;
        break;
      case "SUCCESS":
        state.loading = false;
        state.mostProductQuantity = response.data ? response.data : response; 
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
  fetchMostQuantityMovement(state, { type, response }) {
    switch (type) {
      case "LOADING":
        state.loading = true;
        state.success = null;
        state.error = null;
        break;
      case "SUCCESS":
        state.loading = false;
        state.movementMostQuantity = response;
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
  fetchLessQuantityMovement(state, { type, response }) {
    switch (type) {
      case "LOADING":
        state.loading = true;
        state.success = null;
        state.error = null;
        break;
      case "SUCCESS":
        state.loading = false;
        state.movementLessQuantity = response;
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
  async fetchProductsMostSold({ commit }) {
    commit("fetchProductsMostSold", {
      type: "LOADING",
    });
    try {
      const request = Products(this.$axios);
      const response = await request.productsMostSold();
      commit("fetchProductsMostSold", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchProductsMostSold", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchProductsLessSold({ commit }) {
    commit("fetchProductsLessSold", {
      type: "LOADING",
    });
    try {
      const request = Products(this.$axios);
      const response = await request.productsLessSold();
      commit("fetchProductsLessSold", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchProductsLessSold", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchMovementMostSold({ commit }, data) {
    commit("fetchMovementMostSold", {
      type: "LOADING",
    });
    try {
      const request = Products(this.$axios);
      const response = await request.movementMostSold(data);
      commit("fetchMovementMostSold", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchMovementMostSold", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchMovementLessSold({ commit }, data) {
    commit("fetchMovementLessSold", {
      type: "LOADING",
    });
    try {
      const request = Products(this.$axios);
      const response = await request.movementLessSold(data);
      commit("fetchMovementLessSold", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchMovementLessSold", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchLessProductQuantity({ commit }, data) {
    commit("fetchLessProductQuantity", {
      type: "LOADING",
    });
    try {
      const request = Products(this.$axios);
      const response = await request.lessProductQuantity(data);
      commit("fetchLessProductQuantity", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchLessProductQuantity", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchMostProductQuantity({ commit }, data) {
    commit("fetchMostProductQuantity", {
      type: "LOADING",
    });
    try {
      const request = Products(this.$axios);
      const response = await request.mostProductQuantity(data);
      commit("fetchMostProductQuantity", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchMostProductQuantity", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchMostQuantityMovement({ commit }) {
    commit("fetchMostQuantityMovement", {
      type: "LOADING",
    });
    try {
      const request = Products(this.$axios);
      const response = await request.movementMostQuantity();
      commit("fetchMostQuantityMovement", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchMostQuantityMovement", {
        type: "FAIL",
        response: error,
      });
    }
  },
  async fetchLessQuantityMovement({ commit }) {
    commit("fetchLessQuantityMovement", {
      type: "LOADING",
    });
    try {
      const request = Products(this.$axios);
      const response = await request.movementleastQuantity();
      commit("fetchLessQuantityMovement", {
        type: "SUCCESS",
        response: response,
      });
    } catch (error) {
      commit("fetchLessQuantityMovement", {
        type: "FAIL",
        response: error,
      });
    }
  },
};
