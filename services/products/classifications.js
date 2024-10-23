export default $axios => ({
  async suppliersAmount() {
    try {
      const response = await $axios.$get('/product/suppliers-amount')

      return response
    } catch (error) {
      return error
    }
  },
  async customerCategoriesAmount() {
    try {
      const response = await $axios.$get('/product/customers/categories-amount')

      return response
    } catch (error) {
      return error
    }
  },
  async producCategories() {
    try {
      const response = await $axios.$get('/product/categories')
      return response
    } catch (error) {
      return error
    }
  },
  async producSubCategories() {
    try {
      const response = await $axios.$get('/product/sub-categories')
      return response
    } catch (error) {
      return error
    }
  },
  async producIncomeCategories() {
    try {
      const response = await $axios.$get('/product/income/categories')
      return response
    } catch (error) {
      return error
    }
  },
  async producrefundCategories() {
    try {
      const response = await $axios.$get('/product/refund/categories')
      return response
    } catch (error) {
      return error
    }
  },
  async categoriesSubCategory() {
    try {
      const response = await $axios.$get('/category/sub-categories')
      return response
    } catch (error) {
      return error
    }
  },
})
