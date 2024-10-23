<template>
  <div class="total-metric-card">
    <img
      style="width: 40px; height: 40px"
      src="../../assets/images/icons/selling.png"
      alt=""
    />
    <div class="total-metric-card-content">
      <p class="title m-0">{{ title }}</p>
      <p class="value m-0">{{ firstTwoDigit(value) }}</p>
      <p v-if="caption" class="caption m-0">
        {{ caption }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "value", "caption"],
  methods: {
    firstTwoDigit(num) {
      return num ? num.toFixed(2) : '';
    },
  },
};
</script>

<style lang="scss">
.total-metric-card {
  margin: 30px 30px;
  flex: 1;
  display: flex;
  align-items: flex-start;

  &-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 6px;

    img {
      margin-top: 8px;
      margin-right: 6px;
    }

    .title {
      margin: 0;
      margin-bottom: 8px;
      color: rgba(0, 0, 0, 0.5);
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }

    .value {
      margin: 0;
      color: #000;
      font-size: 20px;
      font-style: normal;
      font-weight: 800;
      line-height: normal;
    }
    .caption{
      font-size: toRem(11);
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      color: rgba(0, 0, 0, 0.50);
    }
  }
}
</style>
