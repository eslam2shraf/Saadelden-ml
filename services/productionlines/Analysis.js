export default ($axios) => ({
  async materialsMostUsed(data) {
    try {
      if (data.from !== "" && data.to !== "") {
        var params = data;
      }
      const response = await $axios.$get(
        "/production_lines/materials/most_used",
        {
          params,
        }
      );

      return response;
    } catch (error) {
      return error;
    }
  },
  async materialsLessUsed(data) {
    try {
      if (data.from !== "" && data.to !== "") {
        var params = data;
      }
      const response = await $axios.$get(
        "/production_lines/materials/less_used",
        {
          params,
        }
      );

      return response;
    } catch (error) {
      return error;
    }
  },
  async fatestProductionLine(data) {
    try {
      if (data.from !== "" && data.to !== "") {
        var params = data;
      }
      const response = await $axios.$get("/production_lines/duration/fastest", {
        params,
      });

      return response;
    } catch (error) {
      return error;
    }
  },
  async slowestProductionLine(data) {
    try {
      if (data.from !== "" && data.to !== "") {
        var params = data;
      }
      const response = await $axios.$get("/production_lines/duration/slowest", {
        params,
      });

      return response;
    } catch (error) {
      return error;
    }
  },
  async largestWorkersNums(data) {
    try {
      if (data.from !== "" && data.to !== "") {
        var params = data;
      }
      const response = await $axios.$get("/production_lines/workers/largest", {
        params,
      });

      return response;
    } catch (error) {
      return error;
    }
  },
  async smallestWorkersNums(data) {
    try {
      if (data.from !== "" && data.to !== "") {
        var params = data;
      }
      const response = await $axios.$get("/production_lines/workers/smallest", {
        params,
      });

      return response;
    } catch (error) {
      return error;
    }
  },
  async lowestCost(data) {
    try {
      if (data.from !== "" && data.to !== "") {
        var params = data;
      }
      const response = await $axios.$get("/production_lines/cost/lowest", {
        params,
      });

      return response;
    } catch (error) {
      return error;
    }
  },
  async highestCost(data) {
    try {
      if (data.from !== "" && data.to !== "") {
        var params = data;
      }
      const response = await $axios.$get("/production_lines/cost/highest", {
        params,
      });

      return response;
    } catch (error) {
      return error;
    }
  },
  async highestWastage(data) {
    try {
      if (data.from !== "" && data.to !== "") {
        var params = data;
      }
      const response = await $axios.$get("/production_lines/wastage/highest", {
        params,
      });

      return response;
    } catch (error) {
      return error;
    }
  },
  async lowestWastage(data) {
    try {
      if (data.from !== "" && data.to !== "") {
        var params = data;
      }
      const response = await $axios.$get("/production_lines/wastage/lowest", {
        params,
      });

      return response;
    } catch (error) {
      return error;
    }
  },
});
