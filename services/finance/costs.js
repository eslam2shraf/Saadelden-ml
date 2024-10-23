export default ($axios) => ({
  async expenses(data) {
    if (data.from !== "" && data.to !== "") {
      var params = data;
    }
    return await $axios.$get("costs/expenses", {
      params,
    });
  },
  async directAndIndirectCosts(data) {
    if (data.from !== "" && data.to !== "") {
      var params = data;
    }
    return await $axios.$get("costs/directAndIndirectConst", {
      params,
    });
  },

  async calcGenerateFinancialsCost() {
    return await $axios.$get("costs/generate_financials_cost");
  },
  async latestFinancialsCost() {
    return await $axios.$get("costs/latest_financials_cost");
  },

  async calcGenerateProfitCost(data) {
    return await $axios.$post("costs/generate_profit_cost", data);
  },

  async profitCost(data) {
    try {
      const response = await $axios.$get("costs/profit_cost", {
        params: data,
      });
      return response;
    } catch (error) {
      return error;
    }
  },
  async anomaliesStoresTarget(data) {
    return await $axios.$get("anomaly/anomalies-stores-targets", {
      params: data,
    });
  },
  async abnormalMaterialOrderCost(data) {
    return await $axios.$get("anomaly/abnormal-material-order-cost", {
      params: data,
    });
  },

  async logsProfitCost(data) {
    return await $axios.$post("costs/log_profit_cost", data);
  },
  async abnormalProductionLineCost(data) {
    return await $axios.$get("anomaly/abnormal-production-lines", {
      params: data,
    });
  },
  async abnormalTradesMen() {
    return await $axios.$get(
      "anomaly/anomalies-tradesmen-financial-collection"
    );
  },
  async heighestProducts(data) {
    console.log(data);
    return await $axios.$get("costs/highest_products", {
      params: data,
    });
  },
  async lowstProducts(data) {
    return await $axios.$get("costs/lowest_products", {
      params: data,
    });
  },
});
