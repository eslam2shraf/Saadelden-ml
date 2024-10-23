<template>
  <div class="p-2 min-height--46 min-height--lg">
    <div
      class="d-flex justify-content-space-between flex_gap container-fluid--50"
    >
      <h3 class="mb-0">
        {{ $t("ProductSegmentaion") }}
      </h3>
      <base-bread-crumbs :Links="Links" />
    </div>

    <BaseTabs
      :tabList="tabshead"
      :sideTitle="true"
      class="container-fluid--50"
      :tabName="'segmentaion'"
    >
      <template v-slot:segmentaion-1>
        <div class="d-flex flex_gap--lg justify-content-center">
          <BaseCard class="card-lg bg-L_D_Yellow">
            <div class="p-2 b-1">
              <h5 class="card-title mb-2">
                {{ $t("most_sold_products_title") }}
              </h5>
              <span class="card-subtitle">
                {{ $t("most_sold_products_desc") }}
              </span>
            </div>
            <div class="card-body mt-1">
              <h4 class="text-center" v-if="isProductsMostSoldLoading">
                {{ $t("loading") }}
              </h4>
              <template v-else>
                <BaseTable
                  v-if="productsMostSold"
                  class="responsive_table table_raduis_bottom"
                  :data="productsMostSold"
                  :headings="productsHead"
                  :orderedArray="['id', 'unique_id', 'name', 'orders_price']"
                />
                <h4 v-if="productsMostSold.length === 0" class="m-auto">
                  {{ $t("nodataAvailable") }}
                </h4>
              </template>
            </div>
          </BaseCard>

          <BaseCard class="card-lg bg-L_D_Yellow">
            <div class="p-2 b-1">
              <h5 class="card-title mb-2">
                {{ $t("least_sold_products_title") }}
              </h5>
              <span class="card-subtitle">
                {{ $t("least_sold_products_desc") }}
              </span>
            </div>
            <div class="card-body mt-1">
              <h4 class="text-center" v-if="isProductsLeastSoldLoading">
                {{ $t("loading") }}
              </h4>
              <template v-else>
                <BaseTable
                  v-if="productsLessSold"
                  class="responsive_table table_raduis_bottom"
                  :data="productsLessSold"
                  :headings="productsHead"
                  :orderedArray="['id', 'unique_id', 'name', 'orders_price']"
                />
                <h4 v-if="productsLessSold.length === 0" class="m-auto">
                  {{ $t("nodataAvailable") }}
                </h4>
              </template>
            </div>
          </BaseCard>
        </div>
        <div class="row mt-2 justify-content-center">
          <div class="col-md-12 col-12">
            <movement-most-sold />

          </div>
        </div>
        <div class="row mt-2 justify-content-center">
          <div class="col-md-12 col-12">
            <movement-less-sold />

          </div>
        </div>
      </template>
      <template v-slot:segmentaion-0>
        <div class="d-flex flex_gap--lg justify-content-center">
          <MostProductQuantity />
          <LessProductQuantity />
        </div>
        <div class="row mt-3 justify-content-center">
          <div class="col-md-12 col-12">
            <BaseCard class="bg-L_D_Yellow">
              <div class="p-2 b-1">
                <h5 class="card-title mb-2">
                  {{ $t("most_quantity_movement_products_title") }}
                </h5>
              </div>
              <div class="card-body mt-1">
                <MovementMostQuantity />
              </div>
            </BaseCard>
          </div>
        </div>
        <div class="row mt-3 justify-content-center">
          <div class="col-md-12 col-12">
            <BaseCard class="bg-L_D_Yellow">
              <div class="p-2 b-1">
                <h5 class="card-title mb-2">
                  {{ $t("least_quantity_movement_products_title") }}
                </h5>
              </div>
              <div class="card-body mt-1">
                <MovementLeastQuantity />
              </div>
            </BaseCard>
          </div>
        </div>
      </template>
    </BaseTabs>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BaseTabs from "../../base/BaseTabs.vue";
import Reset from "../../icon/Reset.vue";
import LessProductQuantity from "./LessProductQuantity.vue";
import MostProductQuantity from "./MostProductQuantity.vue";
import MovementLeastQuantity from "./MovementLeastQuantity.vue";
import MovementLessSold from "./MovementLessSold.vue";
import MovementMostQuantity from "./MovementMostQuantity.vue";
import MovementMostSold from "./MovementMostSold.vue";

export default {
  components: {
    MovementMostSold,
    MovementLessSold,
    BaseTabs,
    MostProductQuantity,
    LessProductQuantity,
    MovementMostQuantity,
    MovementLeastQuantity,
    Reset,
  },

  name: "ProductsSegmentaions",
  data() {
    return {
      currentPage: 1,
      filter_from: "",
      filter_to: "",

      Links: [
        {
          name: `${this.$t("Dashboard")}`,
          url: "/dashboard",
        },
        {
          name: `${this.$t("ProductSegmentaion")}`,
          url: "/products/ProductSegmentation",
        },
      ],
      tabshead: [`${this.$t("quantity")}`, `${this.$t("sold_amount")}`],
      productsHead: [
        { id: 1, name: `${this.$t("Product_id")}` },
        { id: 2, name: `${this.$t("Product_code")}` },
        { id: 3, name: `${this.$t("Name")}` },
        {
          id: 4,
          name: `${this.$t("Sold_Amount") + "(" + this.$t("LE") + ")"}`,
        },
      ],
      isProductsMostSoldLoading: false,
      isProductsLeastSoldLoading: false,
    };
  },
  computed: {
    productsMostSold() {
      return this.$store.getters["products/segmentaion/productsMostSold"];
    },
    productsLessSold() {
      return this.$store.getters["products/segmentaion/productsLessSold"];
    },

  },
  mounted() {
    this.getProductsMostSold();
    this.getProductsLeastSold();
  },
  methods: {
    
    getProductsMostSold() {
      this.isProductsMostSoldLoading = true;
      this.$store
        .dispatch("products/segmentaion/fetchProductsMostSold")
        .then(() => {
          this.isProductsMostSoldLoading = false;
        });
    },
    getProductsLeastSold() {
      this.isProductsLeastSoldLoading = true;
      this.$store
        .dispatch("products/segmentaion/fetchProductsLessSold")
        .then(() => {
          this.isProductsLeastSoldLoading = false;
        });
    },

  },
};
</script>

<style></style>