<template>
  <FinanceGraphTables
    title="abnormal_production_line_cost"
    :data="abnormalProductionLineCost.data"
    :icon="'HexaWarningIcon'"
    :orderedArray="['Id', 'ProductionLineName', 'ProductionLineCode', 'cost']"
    :labels="['id', 'Production_line_Name', 'Production_line_code', 'cost']"
    :msg="abnormalProductionLineCost.message"
    :loading="isLoading"
  >
    <template #filters>
      <LayoutsFilter
        @fromDate="getFromDate"
        @toDate="getToDate"
        :filter="() => getAbnormalProductionCosts()"
        class="input-date--sm mt-1 mb-1 justify-content-flex-end"
        :Msg="
          abnormalProductionLineCost &&
          abnormalProductionLineCost.response &&
          abnormalProductionLineCost.response.data &&
          abnormalProductionLineCost.response.data.errors &&
          abnormalProductionLineCost.response.data.errors.to
            ? abnormalProductionLineCost.response.data.errors.to[0]
            : ''
        "
      />
    </template>
  </FinanceGraphTables>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "MLAbnormalProductionCost",

  data() {
    return {
      from: "",
      to: "",
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters("finance/costs", ["abnormalProductionLineCost"]),
  },
  mounted() {
    this.getAbnormalProductionCosts();
  },

  methods: {
    getAbnormalProductionCosts() {
      this.isLoading = true;
      this.$store
        .dispatch("finance/costs/fetchAbnormalProductionLineCost", {
          from: this.from,
          to: this.to,
        })
        .then(() => {
          this.isLoading = false;
        });
    },
    getFromDate(from) {
      this.from = from;
    },
    getToDate(to) {
      this.to = to;
    },
  },
};
</script>

<style lang="scss" scoped></style>
