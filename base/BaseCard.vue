<template>
  <div class="card" v-bind="$attrs" v-on="$listeners">
    <slot />
  </div>
</template>

<script>
export default {
  name: "BaseCard",
};
</script>

<style>
</style>