export default ($axios) => ({
  async productsMostSold() {
    try {
      const response = await $axios.$get("/product/most-sold");

      return response;
    } catch (error) {
      return error;
    }
  },
  async productsLessSold() {
    try {
      const response = await $axios.$get("/product/less-sold");

      return response;
    } catch (error) {
      return error;
    }
  },
  async movementLessSold(data) {
    try {
      if (data.from !== "" && data.to !== "") {
        var params = data;
      }
      const response = await $axios.$get("/product/movements/less-sold", {
        params,
      });

      return response;
    } catch (error) {
      return error;
    }
  },
  async movementMostSold(data) {
    try {
      if (data.from !== "" && data.to !== "") {
        var params = data;
      }
      const response = await $axios.$get("/product/movements/most-sold", {
        params,
      });

      return response;
    } catch (error) {
      return error;
    }
  },
  async lessProductQuantity(data) {
    try {
      if (data.from !== "" && data.to !== "") {
        var params = data;
      }
      const response = await $axios.$get("/product/less-quantity",{
        params
      });

      return response;
    } catch (error) {
      return error;
    }
  },
  async mostProductQuantity(data) {
    try {
      if (data.from !== "" && data.to !== "") {
        var params = data;
      }
      const response = await $axios.$get("/product/most-quantity", {
        params,
      });

      return response;
    } catch (error) {
      return error;
    }
  },
  async movementMostQuantity() {
    try {
      const response = await $axios.$get("/product/movements/most-quantity");

      return response;
    } catch (error) {
      return error;
    }
  },
  async movementleastQuantity() {
    try {
      const response = await $axios.$get("/product/movements/less-quantity");

      return response;
    } catch (error) {
      return error;
    }
  },
});
