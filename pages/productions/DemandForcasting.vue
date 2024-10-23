<template>
  <div>
    <LayoutsNavbar />
    <ProductionsDemandforcasting />
    <LayoutsFooter />
  </div>
</template>

<script>
export default {
  name: "DemandForcastingPage",
  middleware: "authenticated",
};
</script>

<style>
</style>