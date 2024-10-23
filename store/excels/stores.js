import Stores from '@/services/excels/stores'
export const state = () => ({

  storesTargetExcel: [],
  allStores: [],
  storesSettles: [],
  storesTransfers: [],
  storesRefunds: [],
  storesShippedOrders: [],
  storesFactoryShippedOrders: [],
  storesPurchases: [],
  loading: false,
  error: null,
  success: null
})
export const getters = {
  storesTargetExcel: (state) => {
    return state.storesTargetExcel
  },
  allStores: (state) => {
    return state.allStores
  },
  storesSettles: (state) => {
    return state.storesSettles
  },
  storesTransfers: (state) => {
    return state.storesTransfers
  },
  storesTransfers: (state) => {
    return state.storesTransfers
  },
  storesRefunds: (state) => {
    return state.storesRefunds
  },
  storesShippedOrders: (state) => {
    return state.storesShippedOrders
  },
  storesFactoryShippedOrders: (state) => {
    return state.storesFactoryShippedOrders
  },
  storesPurchases: (state) => {
    return state.storesPurchases
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
  storesTargetExcel(state, {
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
        state.storesTargetExcel = response.data
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
  allStores(state, {
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
        state.allStores = response.data
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
  storesSettles(state, {
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
        state.storesSettles = response.data
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
  storesTransfers(state, {
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
        state.storesTransfers = response.data
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
  storesRefunds(state, {
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
        state.storesRefunds = response.data
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
  storesShippedOrders(state, {
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
        state.storesShippedOrders = response.data
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
  storesFactoryShippedOrders(state, {
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
        state.storesFactoryShippedOrders = response.data
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
  storesPurchases(state, {
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
        state.storesPurchases = response.data
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
  async storesTargetExcel({
    commit
  }, {
    from,
    to
  }) {
    commit('storesTargetExcel', {
      type: 'LOADING'
    })
    try {
      const request = Stores(this.$axios)
      const response = await request.storesTargetExcel({
        from,
        to
      })
      commit('storesTargetExcel', {
        type: 'SUCCESS',
        response: response
      })
    } catch (error) {
      commit('storesTargetExcel', {
        type: 'FAIL',
        response: error
      })
    }
  },
  async allStores({
    commit
  }) {
    commit('allStores', {
      type: 'LOADING'
    })
    try {
      const request = Stores(this.$axios)
      const response = await request.allStores()
      commit('allStores', {
        type: 'SUCCESS',
        response: response
      })
    } catch (error) {
      commit('allStores', {
        type: 'FAIL',
        response: error
      })
    }
  },
  async storesSettles({
    commit
  }, {
    from,
    to
  }) {
    commit('storesSettles', {
      type: 'LOADING'
    })
    try {
      const request = Stores(this.$axios)
      const response = await request.storesSettles({
        from,
        to
      })
      commit('storesSettles', {
        type: 'SUCCESS',
        response: response
      })
    } catch (error) {
      commit('storesSettles', {
        type: 'FAIL',
        response: error
      })
    }
  },
  async storesTransfers({
    commit
  }, {
    from,
    to
  }) {
    commit('storesTransfers', {
      type: 'LOADING'
    })
    try {
      const request = Stores(this.$axios)
      const response = await request.storesTransfers({
        from,
        to
      })
      commit('storesTransfers', {
        type: 'SUCCESS',
        response: response
      })
    } catch (error) {
      commit('storesTransfers', {
        type: 'FAIL',
        response: error
      })
    }
  },
  async storesRefunds({
    commit
  }, {
    from,
    to
  }) {
    commit('storesRefunds', {
      type: 'LOADING'
    })
    try {
      const request = Stores(this.$axios)
      const response = await request.storesRefunds({
        from,
        to
      })
      commit('storesRefunds', {
        type: 'SUCCESS',
        response: response
      })
    } catch (error) {
      commit('storesRefunds', {
        type: 'FAIL',
        response: error
      })
    }
  },
  async storesShippedOrders({
    commit
  }, {
    from,
    to
  }) {
    commit('storesShippedOrders', {
      type: 'LOADING'
    })
    try {
      const request = Stores(this.$axios)
      const response = await request.storesShippedOrders({
        from,
        to
      })
      commit('storesShippedOrders', {
        type: 'SUCCESS',
        response: response
      })
    } catch (error) {
      commit('storesShippedOrders', {
        type: 'FAIL',
        response: error
      })
    }
  },
  async storesFactoryShippedOrders({
    commit
  }, {
    from,
    to
  }) {
    commit('storesFactoryShippedOrders', {
      type: 'LOADING'
    })
    try {
      const request = Stores(this.$axios)
      const response = await request.storesFactoryShippedOrders({
        from,
        to
      })
      commit('storesFactoryShippedOrders', {
        type: 'SUCCESS',
        response: response
      })
    } catch (error) {
      commit('storesFactoryShippedOrders', {
        type: 'FAIL',
        response: error
      })
    }
  },
  async storesPurchases({
    commit
  }, {
    from,
    to
  }) {
    commit('storesPurchases', {
      type: 'LOADING'
    })
    try {
      const request = Stores(this.$axios)
      const response = await request.storesPurchases({
        from,
        to
      })
      commit('storesPurchases', {
        type: 'SUCCESS',
        response: response
      })
    } catch (error) {
      commit('storesPurchases', {
        type: 'FAIL',
        response: error
      })
    }
  },
}
