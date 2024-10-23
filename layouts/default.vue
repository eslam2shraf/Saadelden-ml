<template>
  <div>
    <!-- <spinner v-if="showHideSpinner"/>     -->
    <Nuxt />
  </div>
</template>

<script>
import Spinner from '../components/layouts/LoadingSpinner.vue';
export default {
  components: { Spinner },
  name: 'Default',
  beforeCreate() {
    this.showHideSpinner = true;
  },
  mounted() {
    this.showHideSpinner = false;
  },
  data() {
    return {
      showHideSpinner: true
    };
  }
}
</script>

<style>

</style>