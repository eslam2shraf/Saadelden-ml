export default $axios => ({
  async allDowmloads() {
    try {
      const response = await $axios.$get(`/excels/all`)

      return response
    } catch (error) {
      return error
    }
  },
})
