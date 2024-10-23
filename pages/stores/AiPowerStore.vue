<template>
  <div>
    <LayoutsNavbar />
    <StoresPowerstore />
    <LayoutsFooter />
  </div>
</template>

<script>
export default {
  name: "MLAiPowerStore",
  middleware: "authenticated",
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>
