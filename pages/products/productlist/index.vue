<template>
  <div>
    <LayoutsNavbar />
    <ProductsProductList />
    <LayoutsFooter />
  </div>
</template>

<script>
export default {
  name: "ProductList",
  middleware: "authenticated",
};
</script>

<style>
</style>