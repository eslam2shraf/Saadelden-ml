<template>
  <div>
    <LayoutsNavbar />
    <ProductionsAnomaly />
    <LayoutsFooter />
  </div>
</template>

<script>
export default {
  name: "Anomaly",
  middleware: "authenticated",
};
</script>

<style>
</style>