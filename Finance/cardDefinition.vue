<template>
  <div class="sid-bar-info" :style="{ borderLeftColor: color }">
    <p class="title">{{ title }}</p>
    <p v-if="cost" class="cost">
      {{ getAproximateVal(cost) }}
    </p>
    <p v-else>0</p>
    <p v-if="caption" class="caption">
      {{ caption }}
    </p>
  </div>
</template>
<script>
export default {
  props: ["title", "cost", "color", "caption"],
  methods: {
    getAproximateVal(num) {
      return num ? num.toFixed(2) : "";
    },
  },
};
</script>
<style lang="scss" scoped>
.sid-bar-info {
  display: flex;
  flex-direction: column;
  border-left: solid 5px;
  margin: 27px 0 28px 41px;
  padding-left: 15px;
  stroke-width: 7px;
  @include rtl {
    border-left: 0;
    border-right: solid 5px;
    margin: 11px 12px 7px 17px;
    padding-right: 20px;
    padding-left: 0;
  }
  .title {
    margin: 0;
    color: rgba(0, 0, 0, 0.5);
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  .cost {
    color: #000;
    font-size: 16px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
  }
  .caption{
    font-size: toRem(11);
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    color: $disabled;
  }
}
</style>

