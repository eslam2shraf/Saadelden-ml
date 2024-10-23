
<template>
  <div>  
    <LayoutsNavbar />
    <FinanceCost />
    <LayoutsFooter />
  </div>
</template>
<script>
export default {
  name: 'FinanceIndex',
  middleware: "authenticated",
}
</script>