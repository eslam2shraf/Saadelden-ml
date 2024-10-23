<template>
  <div>
    <LayoutsNavbar />
    <ProductionsStatusForcasts />
    <LayoutsFooter />
  </div>
</template>

<script>
export default {
  name: "ProductionsStatusAndForcasts",
  middleware: "authenticated",
};
</script>

<style>
</style>