import Demand from '@/services/productionlines/Demand'
export const state = () => ({
  demandAllProducts: [],
  productsProductionPlan: [],
  productsPriorities:[],
  loading: false,
  error: null,
  success: null
})
export const getters = {
  demandAllProducts: (state) => {
    return state.demandAllProducts
  },
  productsProductionPlan: (state) => {
    return state.productsProductionPlan
  },
  productsPriorities: (state) => {
    return state.productsPriorities
  },
  loading: (state) => {
    return state.loading
  },
  success: (state) => {
    return state.success
  },
  error: (state) => {
    return state.error
  }
}
export const mutations = {
  fetchDemandAllProducts(state, {
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
        state.demandAllProducts = response.data
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
  fetchProductsProductionPlan(state, {
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
        state.productsProductionPlan = response.data
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
  fetchProductionProductsPiriority(state, {
    type,
    response
  }) {
    switch (type) {
      case 'LOADING':
        state.loading = true
        break
      case 'SUCCESS':
        state.loading = false
        state.productsPriorities = response.data
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
  async fetchDemandAllProducts({
    commit
  }) {
    commit('fetchDemandAllProducts', {
      type: 'LOADING'
    })
    try {
      const request = Demand(this.$axios)
      const response = await request.demandAllProducts()
      commit('fetchDemandAllProducts', {
        type: 'SUCCESS',
        response: response
      })
    } catch (error) {
      commit('fetchDemandAllProducts', {
        type: 'FAIL',
        response: error
      })
    }
  },
  async fetchProductsProductionPlan({
    commit
  }) {
    commit('fetchProductsProductionPlan', {
      type: 'LOADING'
    })
    try {
      const request = Demand(this.$axios)
      const response = await request.productsProductionPlan()
      commit('fetchProductsProductionPlan', {
        type: 'SUCCESS',
        response: response
      })
    } catch (error) {
      commit('fetchProductsProductionPlan', {
        type: 'FAIL',
        response: error
      })
    }
  },
  async fetchProductionProductsPiriority({
    commit
  }) {
    commit('fetchProductionProductsPiriority', {
      type: 'LOADING'
    })
    try {
      const request = Demand(this.$axios)
      const response = await request.productsPriority()
      commit('fetchProductionProductsPiriority', {
        type: 'SUCCESS',
        response: response
      })
    } catch (error) {
      commit('fetchProductionProductsPiriority', {
        type: 'FAIL',
        response: error
      })
    }
  },
}
