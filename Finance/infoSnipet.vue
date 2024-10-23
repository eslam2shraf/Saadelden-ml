<template>
  <div class="info-snippet d-flex">
    <div class="costs d-flex align-items-baseline">
      <div class="pill" :style="{ backgroundColor: color }"></div>
      <h4 class="title">{{ title }}</h4>
    </div>

    <p class="text">
      {{ text }}
    </p>

    <p v-if="examples" class="m-0 examples-label">{{$t('Like')}}:</p>

    <p class="m-0 examples">
      {{ examples }}
    </p>
  </div>
</template>
<script>
export default {
  props: ["title", "color", "text", "examples"],
};
</script>
<style lang="scss" scoped>
.pill {
  width: 35px;
  height: 13px;
  border-radius: 7px;
  margin-right: 14px;
}
.info-snippet {
  flex-direction: column;

  .title {
    margin: 0;
    font-size: 20px;
    font-style: normal;
    font-weight: bold;
    line-height: normal;
  }

  .text {
    color: rgba(0, 0, 0, 0.5);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .examples-label {
    font-size: 10px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  .examples {
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
}
</style>
