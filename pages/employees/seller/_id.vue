<template>
  <div>
    <LayoutsNavbar />
    <SellerAnalysis />
    <LayoutsFooter />
  </div>
</template>

<script>
export default {
  name: "MLId",
  middleware: "authenticated",
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>
