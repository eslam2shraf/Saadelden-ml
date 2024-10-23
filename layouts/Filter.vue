<template>
  <div class="d-flex align-items-flex-start flex-wrap position--relative">
    <label class="filter-lable">
      {{ $t("from") }}
    </label>
    <BaseInput
      type="date"
      class="d-inline mb-0"
      v-model="filterFrom"
      @change="setFromDate($event)"
    />
    <label class="filter-lable">
      {{ $t("to") }}
    </label>
    <BaseInput
      type="date"
      class="d-inline mb-0"
      v-model="filterTo"
      @change="setToDate($event)"
    />
    <error-msg v-show="Msg !== ''" :errorMsg="Msg" class="filter__error" />
    <BaseButton
      :clickedFunction="filter"
      class="button button--xs search-btn d-inline"
    >
      {{ $t("Done") }}
    </BaseButton>
    <BaseButton :clickedFunction="Reset" class="button button--xs reset-btn">
      <reset />
      {{ $t("reset") }}
    </BaseButton>
  </div>
</template>

<script>
import Reset from "../icon/Reset.vue";
import ErrorMsg from "./ErrorMsg.vue";
export default {
  components: { Reset, ErrorMsg },
  name: "FrontendMlFilter",
  props: {
    filter: {
      type: Function,
    },
    reset: {
      type: Function,
    },
    Msg: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      filterFrom: "",
      filterTo: "",
      errorMsg: "",
    };
  },

  created() {
    this.defaultDate();
  },
  mounted() {
    this.errorMsg = this.Msg;
  },
  watch: {
    Msg() {
      if (this.Msg && this.Msg !== "") {
        setTimeout(() => {
          this.$emit("resetErrorMsg", "");
        }, 5000);
      }
      return this.Msg;
    },
  },
  methods: {
    defaultDate() {
      const date = new Date().toJSON().slice(0, 10);
      const SIX_MONTHS_AGO = new Date();
      SIX_MONTHS_AGO.setMonth(SIX_MONTHS_AGO.getMonth() - 6);
      this.filterTo = date;
      this.filterFrom = SIX_MONTHS_AGO.toJSON().slice(0, 10);
      this.$emit("fromDate", this.filterFrom);
      this.$emit("toDate", this.filterTo);
    },
    setFromDate(e) {
      this.$emit("fromDate", e.target.value);
    },
    setToDate(e) {
      this.$emit("toDate", e.target.value);
    },
    Reset() {
      this.resetValue();
      if (this.reset) {
        this.reset();
      }

      this.defaultDate();
      this.filter();
    },
    resetValue() {
      this.errorMsg = "";
    },
  },
};
</script>

<style lang="scss" scoped></style>
