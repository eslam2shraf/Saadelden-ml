<template>
  <div class="container-fluid p-2 min-height--46 min-height--lg">
    <div class="d-flex justify-content-space-between flex_gap">
      <h3 class="ml-15">{{ $t("DemandForcasting") }}</h3>
      <base-bread-crumbs :Links="Links" />
    </div>
    <BaseCard class="bg-L_D_Yellow-50 p-3">
      <div class="d-flex justify-content-space-between flex_gap p-2 mb-1">
        <h3 class="mb-0">
          {{ $t("demand_forcasting_title") }}
        </h3>
      </div>
      <div class="d-flex mt-3 flex_gap">
        <BaseButton
          :clickedFunction="requestPlan"
          class="request-to-download"
          :disabled="clicked"
        >
          {{ $t("Prepare_the_production_plan") }}
        </BaseButton>
        <!-- <BaseButton :clickedFunction="getPlans" class="request-to-download" :disabled="!clicked">
                    Get the production plan
                </BaseButton> -->
      </div>
      <div class="mt-3">
        <h3 v-if="loading" class="text-center">
          {{ $t("loading") }}
        </h3>
        <BaseTable
          v-if="productsProductionPlan && !loading"
          class="responsive_table table_raduis_bottom"
          :data="sortedProductIds"
          :headings="planHead"
          :prevents="[
            'Actual Demand',
            'last_year_Demand',
            'base_current_interval',
            'base_prev_interval',
            'ratio',
          ]"
        />
      </div>
    </BaseCard>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ProductionsDemandForcasting",
  data() {
    return {
      clicked: false,
      Links: [
        {
          name: `${this.$t("Dashboard")}`,
          url: "/dashboard",
        },
        {
          name: `${this.$t("DemandForcasting")}`,
          url: "",
        },
      ],
      planHead: [
        { id: 1, name: "#" },
        { id: 2, name: `${this.$t("Product_code")}` },
        { id: 3, name: `${this.$t("Product_name")}` },

        { id: 4, name: `${this.$t("Availabl_amount")}` },
        { id: 5, name: `${this.$t("Expected_amount")}` },
      ],
    };
  },
  computed: {
    ...mapGetters("productions/demand", [
      "loading",
      "success",
      "error",
      "demandAllProducts",
      "productsProductionPlan",
      "productsPriorities",
    ]),
    sortedProductIds: function () {
      const productDict = {};
      this.productsProductionPlan.forEach((product) => {
        productDict[product["Product ID"]] = product;
      });

      // Map the product IDs from the second array to corresponding objects using the dictionary
      return this.productsPriorities
        .map((id) => productDict[id])
        .filter((item) => item && item !== null);
    },
  },
  created() {
    this.$store.dispatch("productions/demand/fetchProductsProductionPlan");
    if (this.clicked) {
      setInterval(function () {
        this.clicked = false;
      }, 900000);
    }
    this.productsPriority();
  },
  methods: {
    getPlans() {
      this.$store.dispatch("productions/demand/fetchProductsProductionPlan");
    },
    requestPlan() {
      this.clicked = true;
      this.$store.dispatch("productions/demand/fetchDemandAllProducts");
    },
    productsPriority() {
      this.$store.dispatch(
        "productions/demand/fetchProductionProductsPiriority"
      );
    },
  },
};
</script>

<style>
</style>