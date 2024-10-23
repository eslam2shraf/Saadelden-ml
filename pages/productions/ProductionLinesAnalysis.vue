<template>
  <div>
    <LayoutsNavbar />
    <ProductionsAnalysis />
    <LayoutsFooter />
  </div>
</template>

<script>
export default {
  name: "ProductionLinesAnalysis",
  middleware: "authenticated",
};
</script>

<style>
</style>