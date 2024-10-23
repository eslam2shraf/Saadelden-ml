<template>
  <div>
    <LayoutsNavbar />
    <ExcelExporting />
    <LayoutsFooter />
  </div>
</template>

<script>
export default {
  name: "ExcelExportingPage",
  middleware: "authenticated",
};
</script>

<style>
</style>