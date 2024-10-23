<template>
  <div class="d-flex flex_gap analysis-table-container">
    <FinanceAnalysisTables
      title="exposing_the_financial_collection"
      :data="anomaliesTradesMen.data"
      :loading="isLoading"
      :message="'nodataAvaliable'"
      :orderedArray="[
        'id',
        'name',
        'collected',
        'totalStoreDebt',
        'total',
        'collection_rate',
      ]"
      :labels="[
        'id',
        'Brand_Name',
        'Collected_money',
        'Uncollected_money',
        'Total',
        'colection_rate',
      ]"
    />
    <FinanceTradesmenCard
      :leastDept="
        anomaliesTradesMen &&
        anomaliesTradesMen.min_record &&
        anomaliesTradesMen.min_record.name
      "
      :leastDeptPercent="
        anomaliesTradesMen &&
        anomaliesTradesMen.min_record &&
        anomaliesTradesMen.min_record.collection_rate
      "
      :mostDept="
        anomaliesTradesMen &&
        anomaliesTradesMen.max_record &&
        anomaliesTradesMen.max_record.name
      "
      :mostDeptPercent="
        anomaliesTradesMen &&
        anomaliesTradesMen.max_record &&
        anomaliesTradesMen.max_record.collection_rate
      "
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "FrontendMlAnomaliesTadesMen",

  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters("finance/costs", ["anomaliesTradesMen"]),
  },
  mounted() {
    this.getAnomaliesTradesMen();
  },

  methods: {
    getAnomaliesTradesMen() {
      this.isLoading = true;

      this.$store.dispatch("finance/costs/fetchAnomaliesTradesMen").then(() => {
        this.isLoading = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>