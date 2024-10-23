import Products from '@/services/products/classifications'
export const state = () => ({

  suppliersAmount: [],
  customerCategoriesAmount: [],
  producCategories: [],
  producSubCategories: [],
  producIncomeCategories: [],
  producrefundCategories: [],
  categoriesSubCategory: [],
  loading: false,
  error: null,
  success: null
})
export const getters = {
  suppliersAmount: (state) => {
    return state.suppliersAmount
  },
  customerCategoriesAmount: (state) => {
    return state.customerCategoriesAmount
  },
  producCategories: (state) => {
    return state.producCategories
  },
  producIncomeCategories: (state) => {
    return state.producIncomeCategories
  },
  producrefundCategories: (state) => {
    return state.producrefundCategories
  },
  categoriesSubCategory: (state) => {
    return state.categoriesSubCategory
  },
  producSubCategories: (state) => {
    return state.producSubCategories
  },
  loading: (state) => {
    return state.loading
  },
  error: (state) => {
    return state.error
  },
  success: (state) => {
    return state.success
  },
}
export const mutations = {
  fetchSuppliersAmount(state, {
    type,
    response
  }) {
    switch (type) {
      case 'LOADING':
        state.loading = true
        state.success = null
        state.error = null
        break
      case 'SUCCESS':
        state.loading = false
        state.suppliersAmount = response.data
        state.success = true
        break
      case 'FAIL':
        state.loading = false
        state.error = response.message
        break
      default:
        break
    }
  },
  fetchCustomerCategoriesAmount(state, {
    type,
    response
  }) {
    switch (type) {
      case 'LOADING':
        state.loading = true
        state.success = null
        state.error = null
        break
      case 'SUCCESS':
        state.loading = false
        state.customerCategoriesAmount = response.data
        state.success = response
        break
      case 'FAIL':
        state.loading = false
        state.error = response.message
        break
      default:
        break
    }
  },
  fetchProducCategories(state, {
    type,
    response
  }) {
    switch (type) {
      case 'LOADING':
        state.loading = true
        state.success = null
        state.error = null
        break
      case 'SUCCESS':
        state.loading = false
        state.producCategories = response.data
        state.success = response
        break
      case 'FAIL':
        state.loading = false
        state.error = response.message
        break
      default:
        break
    }
  },
  fetchProducIncomeCategories(state, {
    type,
    response
  }) {
    switch (type) {
      case 'LOADING':
        state.loading = true
        state.success = null
        state.error = null
        break
      case 'SUCCESS':
        state.loading = false
        state.producIncomeCategories = response.data
        state.success = response
        break
      case 'FAIL':
        state.loading = false
        state.error = response.message
        break
      default:
        break
    }
  },
  fetchProducrefundCategories(state, {
    type,
    response
  }) {
    switch (type) {
      case 'LOADING':
        state.loading = true
        state.success = null
        state.error = null
        break
      case 'SUCCESS':
        state.loading = false
        state.producrefundCategories = response.data
        state.success = response
        break
      case 'FAIL':
        state.loading = false
        state.error = response.message
        break
      default:
        break
    }
  },
  fetchCategoriesSubCategory(state, {
    type,
    response
  }) {
    switch (type) {
      case 'LOADING':
        state.loading = true
        state.success = null
        state.error = null
        break
      case 'SUCCESS':
        state.loading = false
        state.categoriesSubCategory = response.data
        state.success = response
        break
      case 'FAIL':
        state.loading = false
        state.error = response.message
        break
      default:
        break
    }
  },
  fetchproducSubCategories(state, {
    type,
    response
  }) {
    switch (type) {
      case 'LOADING':
        state.loading = true
        state.success = null
        state.error = null
        break
      case 'SUCCESS':
        state.loading = false
        state.producSubCategories = response.data
        state.success = response
        break
      case 'FAIL':
        state.loading = false
        state.error = response.message
        break
      default:
        break
    }
  },
}
export const actions = {
  async fetchSuppliersAmount({
    commit
  }) {
    commit('fetchSuppliersAmount', {
      type: 'LOADING'
    })
    try {
      const request = Products(this.$axios)
      const response = await request.suppliersAmount()
      commit('fetchSuppliersAmount', {
        type: 'SUCCESS',
        response: response
      })
    } catch (error) {
      commit('fetchSuppliersAmount', {
        type: 'FAIL',
        response: error
      })
    }
  },
  async fetchCustomerCategoriesAmount({
    commit
  }) {
    commit('fetchCustomerCategoriesAmount', {
      type: 'LOADING'
    })
    try {
      const request = Products(this.$axios)
      const response = await request.customerCategoriesAmount()
      commit('fetchCustomerCategoriesAmount', {
        type: 'SUCCESS',
        response: response
      })
    } catch (error) {
      commit('fetchCustomerCategoriesAmount', {
        type: 'FAIL',
        response: error
      })
    }
  },
  async fetchProducCategories({
    commit
  }) {
    commit('fetchProducCategories', {
      type: 'LOADING'
    })
    try {
      const request = Products(this.$axios)
      const response = await request.producCategories()
      commit('fetchProducCategories', {
        type: 'SUCCESS',
        response: response
      })
    } catch (error) {
      commit('fetchProducCategories', {
        type: 'FAIL',
        response: error
      })
    }
  },
  async fetchProducIncomeCategories({
    commit
  }) {
    commit('fetchProducIncomeCategories', {
      type: 'LOADING'
    })
    try {
      const request = Products(this.$axios)
      const response = await request.producIncomeCategories()
      commit('fetchProducIncomeCategories', {
        type: 'SUCCESS',
        response: response
      })
    } catch (error) {
      commit('fetchProducIncomeCategories', {
        type: 'FAIL',
        response: error
      })
    }
  },
  async fetchProducrefundCategories({
    commit
  }) {
    commit('fetchProducrefundCategories', {
      type: 'LOADING'
    })
    try {
      const request = Products(this.$axios)
      const response = await request.producrefundCategories()
      commit('fetchProducrefundCategories', {
        type: 'SUCCESS',
        response: response
      })
    } catch (error) {
      commit('fetchProducrefundCategories', {
        type: 'FAIL',
        response: error
      })
    }
  },
  async fetchCategoriesSubCategory({
    commit
  }, ) {
    commit('fetchCategoriesSubCategory', {
      type: 'LOADING'
    })
    try {
      const request = Products(this.$axios)
      const response = await request.categoriesSubCategory()
      commit('fetchCategoriesSubCategory', {
        type: 'SUCCESS',
        response: response
      })
    } catch (error) {
      commit('fetchCategoriesSubCategory', {
        type: 'FAIL',
        response: error
      })
    }
  },
  async fetchproducSubCategories({
    commit
  }, ) {
    commit('fetchproducSubCategories', {
      type: 'LOADING'
    })
    try {
      const request = Products(this.$axios)
      const response = await request.producSubCategories()
      commit('fetchproducSubCategories', {
        type: 'SUCCESS',
        response: response
      })
    } catch (error) {
      commit('fetchproducSubCategories', {
        type: 'FAIL',
        response: error
      })
    }
  },
}
