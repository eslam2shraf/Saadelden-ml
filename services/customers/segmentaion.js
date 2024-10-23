export default $axios => ({
  async Segmentation_Update_Engine() {
    try {
      const response = await $axios.$get('/segmentation/update_engine')

      return response
    } catch (error) {
      return error
    }
  },
  async customerCategories() {
    try {
      const response = await $axios.$get('/product/customers/categories-amount')

      return response
    } catch (error) {
      return error
    }
  },
})
