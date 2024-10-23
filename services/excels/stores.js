export default $axios => ({
  async storesTargetExcel({
    from,
    to
  }) {
    try {
      const response = await $axios.$get(`/excels/stores/target-excel?from=${from}&to=${to}`)

      return response
    } catch (error) {
      return error
    }
  },
  async allStores() {
    try {
      const response = await $axios.$get('/excels/all-stores-excel')

      return response
    } catch (error) {
      return error
    }
  },
  async storesSettles({
    from,
    to
  }) {
    try {
      const response = await $axios.$get(`/excels/stores-settles-excel?from=${from}&to=${to}`)

      return response
    } catch (error) {
      return error
    }
  },
  async storesTransfers({
    from,
    to
  }) {
    try {
      const response = await $axios.$get(`/excels/stores-transfers-excel?from=${from}&to=${to}`)

      return response
    } catch (error) {
      return error
    }
  },
  async storesRefunds({
    from,
    to
  }) {
    try {
      const response = await $axios.$get(`/excels/stores-refunds-excel?from=${from}&to=${to}`)

      return response
    } catch (error) {
      return error
    }
  },
  async storesShippedOrders({
    from,
    to
  }) {
    try {
      const response = await $axios.$get(`/excels/stores-shipped-orders-excel?from=${from}&to=${to}`)

      return response
    } catch (error) {
      return error
    }
  },
  async storesFactoryShippedOrders({
    from,
    to
  }) {
    try {
      const response = await $axios.$get(`/excels/stores-factory-shipped-orders-excel?from=${from}&to=${to}`)

      return response
    } catch (error) {
      return error
    }
  },
  async storesPurchases({
    from,
    to
  }) {
    try {
      const response = await $axios.$get(`/excels/stores-purchases-excel?from=${from}&to=${to}`)

      return response
    } catch (error) {
      return error
    }
  },

})
