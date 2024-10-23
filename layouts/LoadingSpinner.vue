<template lang="html">
    <div class="splash-screen" v-if="loading">
      <div class="loader-wrapper">
        <HoneyBeeUp class="loader-animated"/>
        <HoneyBee class="loader"/>
      </div>
    </div>
</template>

<script>
import HoneyBeeUp from "../icon/HoneyBeeUp.vue";
import HoneyBee from "../icon/HoneyBee.vue";
export default {
  name: "LoadingSpinner",
  data: () => ({
    loading: false,
  }),
  methods: {
    start() {
      this.loading = true;
    },
    finish() {
      this.loading = false;
    },
  },
  components: { HoneyBeeUp, HoneyBee },
};
</script>


<style lang="scss" scoped>
@import "~/assets/styles/layouts/_Loader.scss";
</style>