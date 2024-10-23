<template>
  <button
    v-bind="$attrs"
    v-on="$listeners"
    type="button"
    @click="clickedFunction"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    clickedFunction: {
      type: Function,
    },
  },
};
</script>

