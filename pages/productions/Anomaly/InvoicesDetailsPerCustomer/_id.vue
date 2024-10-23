<template>
    <div>
        <LayoutsNavbar />
        <CustomerInvoicesDetails />
        <LayoutsFooter />
    </div>
</template>

<script>
import CustomerInvoicesDetails from '../../../../components/productions/Anomaly/CustomerInvoicesDetails.vue'
export default {
  components: { CustomerInvoicesDetails },
    name: 'InvoicesDetailsPerCustomer'
}
</script>

<style>

</style>