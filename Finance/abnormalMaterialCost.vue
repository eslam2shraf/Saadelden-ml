<template>
  <FinanceGraphTables
    title="abnormal_material_order_cost"
    :data="abnormalMaterialOrderCost.data"
    :icon="'HexaWarningIcon'"
    :orderedArray="['id', 'process_number', 'cost']"
    :labels="['id', 'order_number', 'cost']"
    :msg="abnormalMaterialOrderCost.message"
    :loading="isLoading"
  >
    <template #filters>
      <LayoutsFilter
        @fromDate="getFromDate"
        @toDate="getToDate"
        :filter="() => getAbnormalMaterialCosts()"
        class="input-date--sm mt-1 mb-1 justify-content-flex-end"
        :Msg="
          abnormalMaterialOrderCost &&
          abnormalMaterialOrderCost.response &&
          abnormalMaterialOrderCost.response.data &&
          abnormalMaterialOrderCost.response.data.errors &&
          abnormalMaterialOrderCost.response.data.errors.to
            ? abnormalMaterialOrderCost.response.data.errors.to[0]
            : ''
        "
      />
    </template>
  </FinanceGraphTables>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "MLAbnormalMaterialCost",

  data() {
    return {
      from: "",
      to: "",
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters("finance/costs", ["abnormalMaterialOrderCost"]),
  },
  mounted() {
    this.getAbnormalMaterialCosts();
  },

  methods: {
    getAbnormalMaterialCosts() {
      this.isLoading = true;
      this.$store
        .dispatch("finance/costs/fetchAbnormalMaterialOrderCost", {
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
