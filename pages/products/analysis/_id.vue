<template>
  <div>
    <LayoutsNavbar />
    <ProductsAnalysis />
    <LayoutsFooter />
  </div>
</template>
  
  <script>
export default {
  name: "ProductsAnalysisPage",
  middleware: "authenticated",
};
</script>
  
  <style>
</style>