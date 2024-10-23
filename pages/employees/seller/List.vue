<template>
  <div>
    <LayoutsNavbar />
    <Seller />
    <LayoutsFooter />
  </div>
</template>

<script>
export default {
  name: "MLSellersList",
  middleware: "authenticated",
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>
