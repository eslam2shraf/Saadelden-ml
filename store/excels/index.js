import All from '@/services/excels/index'
export const state = () => ({

  allExcels: [],
  loading: false,
  error: null,
  success: null
})
export const getters = {
  allExcels: (state) => {
    return state.allExcels
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
  fetchallExcels(state, {
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
        state.allExcels = response.message
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
  async fetchallExcels({
    commit
  }) {
    commit('fetchallExcels', {
      type: 'LOADING'
    })
    try {
      const request = All(this.$axios)
      const response = await request.allDowmloads()
      commit('fetchallExcels', {
        type: 'SUCCESS',
        response: response
      })
    } catch (error) {
      commit('fetchallExcels', {
        type: 'FAIL',
        response: error
      })
    }
  },
}
