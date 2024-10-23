<template>
  <div>
    <LayoutsNavbar />
    <CustomersSegmentaions />
    <LayoutsFooter />
  </div>
</template>

<script>
export default {
  name: "CustomerSegmantaions",
  middleware: "authenticated",
};
</script>

<style>
</style>