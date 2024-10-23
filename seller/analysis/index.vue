<template>
  <div class="container-fluid--50 min-height--46 min-height--lg mt-2">
    <div
      class="row d-flex flex_gap--xl justify-content-space-between align-items-center m-auto"
    >
      <h3 class="mb-0">
        {{ $t("sellerAnalysis") }}
      </h3>
      <base-bread-crumbs :Links="Links" />
    </div>
    <div class="d-flex flex_gap flex-wrap details">
      <BaseCard class="seller-details">
        <h4 v-if="isDetailsLoading" class="text-center mb-0">
          {{ $t("loading") }}
        </h4>
        <template
          v-if="
            sellerDetails &&
            sellerDetails.data &&
            sellerDetails.data[0] &&
            !isDetailsLoading
          "
        >
          <div class="seller-details__title">
            <h3 class="mb-0">
              {{ sellerDetails.data[0].name }}
            </h3>
            <p
              v-if="sellerDetails.data[0].store_name"
              class="seller-details__title__store m-0"
            >
              {{ $t("sellerat") }} {{ sellerDetails.data[0].store_name }}
            </p>
          </div>
          <div class="seller-details__body">
            <p class="m-0 key">
              <span>{{ $t("main_store") }}: </span>
              <span>{{ $t("email") }}: </span>
              <span>{{ $t("hiring_date") }}: </span>
            </p>
            <p class="m-0 value">
              <span>{{ sellerDetails.data[0].main_store_name }}</span>
              <span>{{ sellerDetails.data[0].email }}</span>

              <span>{{ sellerDetails.data[0].Hiring_Date }}</span>
            </p>
          </div>
        </template>
      </BaseCard>
      <transactions />
      <seller-cost />
    </div>
    <div class="d-flex mt-2 flex_gap flex-wrap justify-content-center">
      <performance-sales :sellerName="sellerName" />
      <SellerRevenue />
    </div>
    <div class="d-flex mt-2 flex-wrap justify-content-center">
      <SellerAvgSales :sellerName="sellerName" />
    </div>
    <div class="flex_gap--1 sales-products">
      <store-seller-sales />
      <SellerProducts />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PerformanceSales from "./PerformanceSales.vue";
import Transactions from "./Transactions.vue";
import SellerRevenue from "./SellerRevenue.vue";
import StoreSellerSales from "./StoreSellerSales.vue";
import SellerCost from "./SellerCost.vue";
export default {
  components: {
    Transactions,
    PerformanceSales,
    SellerRevenue,
    StoreSellerSales,
    SellerCost,
  },
  name: "SellerAnalysis",
  data() {
    return {
      Links: [
        {
          name: `${this.$t("Dashboard")}`,
          url: "/dashboard",
        },
        {
          name: `${this.$t("employees")}`,
        },
        {
          name: `${this.$t("sellerList")}`,
          url: "/employees/seller/List",
        },
        {
          name: `${this.$t("sellerAnalysis")}`,
        },
      ],
      sellerName: "",
      sellerId: this.$route.params.id,
      isDetailsLoading: false,
    };
  },
  computed: {
    ...mapGetters("employees/sellers", ["sellerDetails"]),
  },
  mounted() {
    this.getSellerDetails();
  },
  methods: {
    getSellerDetails() {
      this.isDetailsLoading = true;
      this.$store
        .dispatch("employees/sellers/fetchSellerDetails", {
          id: this.sellerId,
        })
        .then(() => {
          this.isDetailsLoading = false;
          this.sellerName = this.sellerDetails.data[0].name;
        });
    },
  },
};
</script>

<style></style>

