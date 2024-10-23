export default $axios => ({
  async productsList({
    category_id,
    sub_category_id,
    supplier_id,
    page,
    per_page,
    search
  }) {
    try {
      const response = await $axios.$get(`/product/list?category_id=${category_id}&sub_category_id=${sub_category_id}&supplier_id=${supplier_id}&page=${page}&per_page=${per_page}&search=${search}`)

      return response
    } catch (error) {
      return error
    }
  },
  async allProductsList() {
    try {
      const response = await $axios.$get('/product/list')

      return response
    } catch (error) {
      return error
    }
  },
  async productAnalysis({
    product_id
  }) {
    try {
      const response = await $axios.$get(`/product/analyze?product_id=${product_id}`)

      return response
    } catch (error) {
      return error
    }
  },
  async mlExpectedDemand({
    product_id
  }) {
    try {
      const response = await $axios.$get(`/product/expected/demand-forecast?product_id=${product_id}`)

      return response
    } catch (error) {
      return error
    }
  },
  async mlDemand({
    product_id
  }) {
    try {
      const response = await $axios.$get(`/product/demand-forecast?product_id=${product_id}`)

      return response
    } catch (error) {
      return error
    }
  },
})
