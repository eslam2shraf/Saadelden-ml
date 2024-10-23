export default $axios => ({
  login(data) {
    return $axios.$post('/auth/login', data);
  },
  async logout() {
    try {
      const response = await $axios.$post('/auth/logout')

      return response
    } catch (error) {
      return error
    }
  },
})
