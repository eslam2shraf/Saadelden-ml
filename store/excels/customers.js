import Customer from '@/services/excels/customers'
export const state = () => ({

  allCustomers: [],
  allCustomersReport: [],
  loading: false,
  error: null,
  success: null
})
export const getters = {
  allCustomers: (state) => {
    return state.allCustomers
  },
  allCustomersReport: (state) => {
    return state.allCustomersReport
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
  fetchAllCustomersReport(state, {
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
        state.allCustomersReport = response.data
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
  fetchAllCustomers(state, {
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
        state.allCustomers = response.data
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
  async fetchAllCustomersReport({
    commit
  }, {
    from,
    to
  }) {
    commit('fetchAllCustomersReport', {
      type: 'LOADING'
    })
    try {
      const request = Customer(this.$axios)
      const response = await request.allCustomersReport({
        from,
        to
      })
      commit('fetchAllCustomersReport', {
        type: 'SUCCESS',
        response: response
      })
    } catch (error) {
      commit('fetchAllCustomersReport', {
        type: 'FAIL',
        response: error
      })
    }
  },
  async fetchAllCustomers({
    commit
  }) {
    commit('fetchAllCustomers', {
      type: 'LOADING'
    })
    try {
      const request = Customer(this.$axios)
      const response = await request.allCustomers()
      commit('fetchAllCustomers', {
        type: 'SUCCESS',
        response: response
      })
    } catch (error) {
      commit('fetchAllCustomers', {
        type: 'FAIL',
        response: error
      })
    }
  },
}
