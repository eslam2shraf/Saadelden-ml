<template>
  <div>
    <Dashboardcomponent />
  </div>
</template>

<script>
import Dashboardcomponent from "../../components/dashboard/Dashboard.vue";

export default {
  components: { Dashboardcomponent },
  name: "DashboardPage",
  middleware: "authenticated",
};
</script>

<style>
</style>