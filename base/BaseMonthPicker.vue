<template>
  <select
    id="year-picker"
    class="select-year"
    @change="setMonth($event)"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <option value="0">{{$t('month')}}</option>
    <option v-for="month in months" :value="month" :key="month">
      {{ month }}
    </option>
  </select>
</template>
  
  <script>
export default {
  name: "MonthPicker",
  props: {
    endMonth: {
      type: Number,
    },
  },
  data() {
    return {};
  },
  computed: {
    months() {
      const month = new Date().getMonth();
      console.log(month, "Month");
      return Array.from(
        { length: month  },
        (value, index) => month - index
      );
    },
  },
  methods: {
    setMonth(e) {
      this.$emit("month", e.target.value);
    },
  },
};
</script>
  
  <style>
</style>