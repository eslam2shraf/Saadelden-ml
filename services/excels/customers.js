export default $axios => ({
  async allCustomersReport({
    from,
    to
  }) {
    try {
      const response = await $axios.$get(`/excels/allCustomersReport?from=${from}&to=${to}`)

      return response
    } catch (error) {
      return error
    }
  },
  async allCustomers() {
    try {
      const response = await $axios.$get('/excels/allCustomers')

      return response
    } catch (error) {
      return error
    }
  },
})
