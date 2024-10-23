import AUTH from '@/services/auth'

const inBrowser = typeof window !== 'undefined'
const opts = {
  path: '/',
  maxAge: 60 * 60 * 2
}
export const state = () => ({
  loading: false,
  error: null,
  success: null,
  token: null,
  messageSusbend: ''

})
export const getters = {

  loading: (state) => {
    return state.loading
  },
  success: (state) => {
    return state.success
  },
  error: (state) => {
    return state.error
  },
  token: (state) => {
    return state.token
  },
  messageSusbend: (state) => {
    return state.messageSusbend
  },
  isAuthenticated(state) {
    return !!state.token
  }
}
export const mutations = {
  SET_TOKEN: function (state, token) {
    state.token = token
    // Setup axios
    this.$axios.setToken(token, 'Bearer')
    // Store token in cookies
    if (inBrowser) {
      if (!token) {
        return this.$cookies.remove('token')
      }
      this.$axios.setToken(token, 'Bearer')
      this.$cookies.set('token', token, opts)
    }
  },
  logIn(state, {
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
        state.success = response

      case 'FAIL':
        state.loading = false
        state.error = response
        break
      default:
        break
    }
  },
}
export const actions = {
  async load_token({
    commit
  }, req) {
    // Try to extract token from cookies
    const cookieStr = inBrowser ? document.cookie : req.headers.cookie
    const cookies = this.$cookie.parse(cookieStr || '') || {}
    const token = cookies.token
    commit('SET_TOKEN', token)
  },
  async logIn({
    commit
  }, data) {
    commit('logIn', {
      type: 'LOADING'
    })
    try {
      const request = AUTH(this.$axios)
      const response = await request.login(data)
      if (response) {
        commit('SET_TOKEN', response.token)
        commit('logIn', {
          type: 'SUCCESS',
          response
        })
      }

    } catch (error) {
      commit('logIn', {
        type: 'FAIL',
        response: error && error.response ? error.response.data :''
      })
      if (error.response && error.response.status === 401) {
        commit('logIn', {
          type: 'FAIL',
          response: error.response.data
        })
      }
    }
  },
  async logout({
    commit
  }) {
    const request = AUTH(this.$axios)
    const response = await request.logout()
    commit('SET_TOKEN', null)
  },
}
