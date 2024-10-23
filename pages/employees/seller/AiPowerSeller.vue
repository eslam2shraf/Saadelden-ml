<template>
  <div>
    <LayoutsNavbar />
    <SellerPowerseller />
    <LayoutsFooter />
  </div>
</template>

<script>
export default {
  name: "FrontendMlAiPowerSeller",
  middleware: "authenticated",
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
</style>