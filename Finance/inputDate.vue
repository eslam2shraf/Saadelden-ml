<template>
  <div class="d-flex align-items-center justify-content-flex-end">
    <div class="btn">
      <label for="">From</label>
      <BaseInput type="date" v-model="startDate" />
    </div>
    <div class="btn mr-1">
      <label for="">To</label>
      <BaseInput type="date" v-model="endDate" />
    </div>
    <button class="search-btn mt-1 mr-1">Done</button>
    <BaseButton
      :clickedFunction="() => highestReset()"
      class="button button--xs reset-btn mt-1 mr-1"
    >
      <ResetIcon />
      {{ $t("reset") }}
    </BaseButton>
  </div>
</template>
<script>
import ResetIcon from "../icon/Reset.vue";
export default {
  data() {
    return {
      startDate: "",
      endDate: "",
    };
  },

  components: {
    ResetIcon,
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
div .btn {
  display: flex;
  flex-direction: column;
  padding-left: 10px;
}
.btnDone {
  margin-left: 30px;
  padding: 9px 38px;
  border-radius: 8px;
  border: 0.576px solid rgba(0, 0, 0, 0.5);
  background: var(--color1, #033043);
  color: var(--white, #fff);
  font-size: 13.824px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
</style>
