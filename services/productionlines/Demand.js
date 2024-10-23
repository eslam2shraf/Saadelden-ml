export default ($axios) => ({
  async demandAllProducts() {
    try {
      const response = await $axios.$get("/product/all/demand-forecast");

      return response;
    } catch (error) {
      return error;
    }
  },
  async productsProductionPlan() {
    try {
      const response = await $axios.$get("/product/production-plan");

      return response;
    } catch (error) {
      return error;
    }
  },
  async productsPriority() {
    return await $axios.$get(
      "/demand_forecasting/get_product_priorities"
    );
  },
});
