<template>
  <div>
    <LayoutsNavbar />
    <ExcelAllDownloads />
    <LayoutsFooter />
  </div>
</template>

<script>
export default {
  name: "AllDownloadsPage",
  middleware: "authenticated",
};
</script>

<style>
</style>