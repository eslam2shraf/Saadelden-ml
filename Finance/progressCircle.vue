<template>
  <div class="progress">
    <div class="chart">
      <div class="outer" :style="{ '--val': outerPercentage }">
        <svg width="200" height="200" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#254642"
            stroke-width="1.738px"
            stroke-opacity="0.2"
          />
          <circle
            class="percent"
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#254642"
            stroke-width="5"
            pathLength="100"
          />
        </svg>
      </div>
      <div class="inner" :style="{ '--val': innerPercentage }">
        <svg width="160" height="160" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#D961D4"
            stroke-width="1.738px"
            stroke-opacity="0.2"
          />
          <circle
            class="percent"
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#D961D4"
            stroke-width="5"
            pathLength="100"
          />
        </svg>
      </div>
    </div>

    <div class="label">
      <h3>{{ outerPercentage }}%</h3>
      <span>{{ innerPercentage }}%</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["outerPercentage", "innerPercentage"],
};
</script>

<style lang="scss" scoped>
.progress {
  width: 200px;
  height: 150px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  --val: 0;

  .chart {
    transform: rotate(-90deg);
  }

  svg {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .percent {
    stroke-dasharray: 100;
    stroke-dashoffset: calc(100 - var(--val));
    transition: all 1.5s;
  }

  .label {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: 4px;
    text-align: center;
    transform: translate(-50%, -50%);

    h3 {
      margin: 0;
      color: #254642;
      font-size: 17.383px;
      font-style: normal;
      font-weight: 800;
      line-height: 1;
    }

    span {
      color: #d961d4;
      font-size: 13.037px;
      font-style: normal;
      font-weight: 800;
      line-height: 1;
    }
  }
}
</style>
