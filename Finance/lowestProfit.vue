<template>
  <FinanceGraphTables
    title="lowest_product_cost"
    :data="lowestProducts['lowest profit products']"
    :icon="'ArrowDecreaseIcon'"
    :orderedArray="[
      'product_id',
      'product_name',
      'product_code',
      'average_cost',
      'average_selling_price',
      'profit',
    ]"
    :labels="[
      'id',
      'Product_name',
      'Product_code',
      'Avg_Cost',
      'Avg_Selling_Price',
      'profit %',
    ]"
    :msg="lowestProducts.message"
    :loading="isLoading"
  >
    <template #filters>
      <LayoutsFilter
        @fromDate="getFromDate"
        @toDate="getToDate"
        :filter="() => getLowestProducts()"
        class="input-date--sm mb-2 mt-1 justify-content-flex-end"
        :Msg="
          lowestProducts &&
          lowestProducts.response &&
          lowestProducts.response.data &&
          lowestProducts.response.data.errors &&
          lowestProducts.response.data.errors.to
            ? lowestProducts.response.data.errors.to[0]
            : ''
        "
      />
    </template>
  </FinanceGraphTables>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "MLLowestProfit",

  data() {
    return {
      from: "",
      to: "",
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters("finance/costs", ["lowestProducts"]),
  },
  mounted() {
    this.getLowestProducts();
  },

  methods: {
    getFromDate(from) {
      this.from = from;
    },
    getToDate(to) {
      this.to = to;
    },
    getLowestProducts() {
      this.isLoading = true;

      this.$store
        .dispatch("finance/costs/fetchLowestProducts", {
          from: this.from,
          to: this.to,
        })
        .then(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
