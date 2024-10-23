import Customer from '@/services/customers/segmentaion'
export const state = () => ({
  segments_stats: [],
  segments_characteristics: [],
  customerCategories: [],
  loading: false,
  error: null,
  success: null
})
export const getters = {
  segments_stats: (state) => {
    return state.segments_stats
  },
  segments_characteristics: (state) => {
    return state.segments_characteristics
  },
  customerCategories: (state) => {
    return state.customerCategories
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
  fetchSegmentaions(state, {
    type,
    response
  }) {
    switch (type) {
      case 'LOADING':
        state.loading = true
        state.success = false
        state.error = null
        break
      case 'SUCCESS':
        state.loading = false
        state.segments_characteristics = response.data.segments_info.segments_characteristics
        state.segments_stats = response.data.segments_info.segments_stats
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
  fetchCustomerCategories(state, {
    type,
    response
  }) {
    switch (type) {
      case 'LOADING':
        state.loading = true
        state.success = false
        state.error = null
        break
      case 'SUCCESS':
        state.loading = false
        state.customerCategories = response.data
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
}
export const actions = {
  async fetchSegmentaions({
    commit
  }) {
    commit('fetchSegmentaions', {
      type: 'LOADING'
    })
    try {
      const request = Customer(this.$axios)
      const response = await request.Segmentation_Update_Engine()
      commit('fetchSegmentaions', {
        type: 'SUCCESS',
        response: response
      })
    } catch (error) {
      commit('fetchSegmentaions', {
        type: 'FAIL',
        response: error
      })
    }
  },
  async fetchCustomerCategories({
    commit
  }) {
    commit('fetchCustomerCategories', {
      type: 'LOADING'
    })
    try {
      const request = Customer(this.$axios)
      const response = await request.customerCategories()
      commit('fetchCustomerCategories', {
        type: 'SUCCESS',
        response: response
      })
    } catch (error) {
      commit('fetchCustomerCategories', {
        type: 'FAIL',
        response: error
      })
    }
  },
}
