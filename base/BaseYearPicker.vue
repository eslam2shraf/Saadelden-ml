<template>
  <select
    id="year-picker"
    class="select-year"
    @change="setYear($event)"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <option value="0">{{$t('year')}}</option>
    <option v-for="year in years" :value="year" :key="year">
      {{ year }}
    </option>
  </select>
</template>

<script>
export default {
  name: "YearPicker",
  props: {
    startYear: {
      type: Number,
    },
  },
  data() {
    return {};
  },
  computed: {
    years() {
      const year = new Date().getFullYear();
        return Array.from(
          { length: year - (this.startYear - 1) },
          (value, index) => this.startYear + index
        );
    
    },
  },
  methods: {
    setYear(e) {
      this.$emit("year", e.target.value);
    },
  },
};
</script>

<style>
</style>