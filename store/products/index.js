import Products from '@/services/products/index'
export const state = () => ({
  productList: [],
  allProducts: [],
  meta: [],
  Demand: [],
  expectedDemand: [],
  productAnalysis: [],
  loading: false,
  error: null,
  success: null
})
export const getters = {
  productList: (state) => {
    return state.productList
  },
  productAnalysis: (state) => {
    return state.productAnalysis
  },
  allProducts: (state) => {
    return state.allProducts
  },
  Demand: (state) => {
    return state.Demand
  },
  expectedDemand: (state) => {
    return state.expectedDemand
  },
  meta: (state) => {
    return state.meta
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
  fetchProductsList(state, {
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
        state.productList = response
        state.meta = response.meta
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
  fetchAllProducts(state, {
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
        state.allProducts = response.data
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
  fetchProductAnalysis(state, {
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
        state.productAnalysis = response.data
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
  fetchDemand(state, {
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
        state.Demand = response.data
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
  fetchexpectedDemand(state, {
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
        state.expectedDemand = response.data
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
  async fetchProductsList({
    commit
  }, {
    category_id,
    sub_category_id,
    supplier_id,
    page,
    per_page,
    search
  }) {
    commit('fetchProductsList', {
      type: 'LOADING'
    })
    try {
      const request = Products(this.$axios)
      const response = await request.productsList({
        category_id,
        sub_category_id,
        supplier_id,
        page,
        per_page,
        search
      })
      commit('fetchProductsList', {
        type: 'SUCCESS',
        response: response
      })
    } catch (error) {
      commit('fetchProductsList', {
        type: 'FAIL',
        response: error
      })
    }
  },
  async fetchAllProducts({
    commit
  }) {
    commit('fetchAllProducts', {
      type: 'LOADING'
    })
    try {
      const request = Products(this.$axios)
      const response = await request.allProductsList()
      commit('fetchAllProducts', {
        type: 'SUCCESS',
        response: response
      })
    } catch (error) {
      commit('fetchAllProducts', {
        type: 'FAIL',
        response: error
      })
    }
  },
  async fetchProductAnalysis({
    commit
  }, {
    product_id
  }) {
    commit('fetchProductAnalysis', {
      type: 'LOADING'
    })
    try {
      const request = Products(this.$axios)
      const response = await request.productAnalysis({
        product_id
      })
      commit('fetchProductAnalysis', {
        type: 'SUCCESS',
        response: response
      })
    } catch (error) {
      commit('fetchProductAnalysis', {
        type: 'FAIL',
        response: error
      })
    }
  },
  async fetchDemand({
    commit
  }, {
    product_id
  }) {
    commit('fetchDemand', {
      type: 'LOADING'
    })
    try {
      const request = Products(this.$axios)
      const response = await request.mlDemand({
        product_id
      })
      commit('fetchDemand', {
        type: 'SUCCESS',
        response: response
      })
    } catch (error) {
      commit('fetchDemand', {
        type: 'FAIL',
        response: error
      })
    }
  },
  async fetchexpectedDemand({
    commit
  }, {
    product_id
  }) {
    commit('fetchexpectedDemand', {
      type: 'LOADING'
    })
    try {
      const request = Products(this.$axios)
      const response = await request.mlExpectedDemand({
        product_id
      })
      commit('fetchexpectedDemand', {
        type: 'SUCCESS',
        response: response
      })
    } catch (error) {
      commit('fetchexpectedDemand', {
        type: 'FAIL',
        response: error
      })
    }
  },
}
