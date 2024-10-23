<template>
  <div>
    <LayoutsNavbar />
    <CustomersAnalysis />
    <LayoutsFooter />
  </div>
</template>

<script>
export default {
  name: "CustomerAnalysis",
  middleware: "authenticated",
};
</script>

<style>
</style>