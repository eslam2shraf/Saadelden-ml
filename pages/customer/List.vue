<template>
  <div>
    <LayoutsNavbar />
    <CustomersLists />
    <LayoutsFooter />
  </div>
</template>

<script>
export default {
  name: "CustomerList",
  middleware: "authenticated",
};
</script>

<style>
</style>