<template>
  <div class="d-flex flex_gap analysis-table-container">
    <FinanceAnalysisTables
      title="unconventional_stores_targets"
      :data="anomaliesStoresTargets.data"
      :loading="isLoading"
      :message="'nodataAvaliable'"
      :orderedArray="['id', 'name', 'sales_amount', 'target', 'target_rate']"
      :labels="['id', 'store_name', 'Progress_Amount', 'target', 'Target_Rate']"
    >
      <template #filters>
        <div class="d-flex flex_gap flex_gap--xs">
          <base-year-picker
            @year="getSelectedYear"
            :startYear="2019"
            class="bg-white yearpicker--sm"
            
          />
          <base-month-picker @month="getSelectedMonth" class="bg-white" />
          <BaseButton
            :clickedFunction="getStoresTargets"
            class="button button--xs search-btn d-inline bg-white text-NORDIC"
            :disabled="year === '' && month === ''"
          >
            {{ $t("Done") }}
          </BaseButton>
        </div>
      </template>
    </FinanceAnalysisTables>
    <FinanceStoresCard
      :achieved="
        anomaliesStoresTargets &&
        anomaliesStoresTargets.max_record &&
        anomaliesStoresTargets.max_record.name
      "
      :achievedPercent="
        anomaliesStoresTargets &&
        anomaliesStoresTargets.max_record &&
        anomaliesStoresTargets.max_record.target_rate
      "
      :notAchieved="
        anomaliesStoresTargets &&
        anomaliesStoresTargets.min_record &&
        anomaliesStoresTargets.min_record.name
      "
      :notAchievedPercent="
        anomaliesStoresTargets &&
        anomaliesStoresTargets.min_record &&
        anomaliesStoresTargets.min_record.target_rate
      "
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "FrontendMlAnomaliesStoresTarget",

  data() {
    return {
      year: "",
      month: "",
      monthYear: "",
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters("finance/costs", ["anomaliesStoresTargets"]),
  },
  mounted() {},

  methods: {
    getSelectedYear(year) {
      this.year = year;
    },
    getSelectedMonth(mon) {
      this.month = mon;
    },
    getStoresTargets() {
      const data = {};
      if (this.year !== "" && this.month !== "") {
        this.isLoading = true;
        let month = "";
        if (this.month < 10) {
          month = `0${this.month}`;
        } else {
          month = this.month;
        }
        data.from_month = `${this.year}-${month}`;
      }
      this.$store
        .dispatch("finance/costs/fetchAnomaliesStoresTargets", data)
        .then(() => {
          this.isLoading = false;
        });
    },
    // Reset(){
    //     this.year = "";
    // }
  },
};
</script>

<style lang="scss" scoped>
</style>