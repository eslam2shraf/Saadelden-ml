<template>
  <div>
    <LayoutsNavbar />
    <ProductsClassifications />
    <LayoutsFooter />
  </div>
</template>
  
<script>
export default {
  name: "ProductClassifications",
  middleware: "authenticated",
};
</script>

<style>
</style>