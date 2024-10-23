export default ($axios) => ({
  async customerList({ type_id, perPage, search, joinDate, page, from, to }) {

    try {
      const params = {
        page: page,
        per_page: perPage,
      };
      if (type_id) {
        params.type_id = type_id;
      }
      if (search) {
        params.search = search;
      }
      if (joinDate) {
        params.join_date = joinDate;
      }
      if (from !== "" && to !== "") {
        params.from = from;
        params.to = to;
      }
      const response = await $axios.$get("/customer/list", {
        params,
      });

      return response;
    } catch (error) {
      return error;
    }
  },
  async Analysis({ customer_id }) {
    try {
      const response = await $axios.$get(
        `/customer/analyze?customer_id=${customer_id}`
      );

      return response;
    } catch (error) {
      return error;
    }
  },
});
