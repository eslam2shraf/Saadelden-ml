<template>
  <div class="container-fluid p-2 min-height--46 min-height--lg">
    <div
      class="row d-flex flex_gap--xl justify-content-space-between align-items-center m-auto"
    >
      <h3 class="ml-15">{{ $t("Products_Analysis") }}</h3>
      <base-bread-crumbs :Links="Links" />
    </div>

    <div class="row d-flex flex_gap--xl justify-content-center">
      <div>
        <BaseCard class="card-sm-80 card-sm bg-L_D_Yellow-50 b-2 m-auto">
          <div class="card-header p-0">
            <img src="@/assets/images/default.png" class="img-lg" />
          </div>
          <div class="card-body p-2">
            <p class="d-flex flex_gap--lg align-items-center">
              <span
                v-if="productAnalysis && productAnalysis.product"
                class="h3"
              >
                {{ productAnalysis.product.product_name }}
              </span>
            </p>
            <p
              v-if="productAnalysis && productAnalysis.product"
              v-html="productAnalysis.product.description"
              class="word-break"
            ></p>
            <fieldset v-if="productAnalysis && productAnalysis.product">
              <legend>
                <h4 class="mb-0">
                  {{ $t("Details") }}
                </h4>
              </legend>
              <p>
                <span class="h4 captalize"> {{ $t("Product_code") }}: </span>
                <span v-if="productAnalysis && productAnalysis.product">
                  {{ productAnalysis.product.unique_id }}
                </span>
              </p>
              <p>
                <span class="h4 captalize"> {{ $t("Supplier_by") }}: </span>
                <span v-if="productAnalysis && productAnalysis.product">
                  {{ productAnalysis.product.supplier_name }}
                </span>
              </p>
              <p>
                <span class="h4 captalize"> {{ $t("Date_Added") }}: </span>
                <span v-if="productAnalysis && productAnalysis.product">
                  {{ productAnalysis.product.create_date }}
                </span>
              </p>
              <p>
                <span class="h4 captalize"> {{ $t("Category") }}: </span>
                <span v-if="productAnalysis && productAnalysis.product">
                  {{ productAnalysis.product.category_name }}
                </span>
              </p>
            </fieldset>

            <fieldset v-if="productAnalysis && productAnalysis.product">
              <legend>
                <h4 class="mb-0">
                  {{ $t("Prices") }}
                </h4>
              </legend>
              <p
                v-for="(prices, i) in productAnalysis.product.product_prices"
                :key="i"
              >
                <span class="h4 captalize">
                  {{ prices.name }} {{ $t("Price") }}:
                </span>
                <span class="h4 font-weight-normal">
                  {{ prices.price }}
                  <span class="font-weight-normal">
                    {{ $t("LE") }}
                  </span>
                </span>
              </p>
            </fieldset>
          </div>
        </BaseCard>
      </div>

      <div class="col-sm-11 col-md-10 col-lg-7 col-11">
        <BaseCard
          class="d-flex flex_gap--md mb-3"
          v-if="productAnalysis && productAnalysis.last_outcome"
        >
          <BaseCard class="w-md-45 bg-MIDWINTER_MIST card-sm p-2">
            <h3>{{ $t("Last_Production_line_Details") }}</h3>
            <div class="d-flex flex_gap justify-content-space-between">
              <p
                class="d-flex flex-column flex_gap align-items-flex-start"
                v-if="productAnalysis.last_outcome"
              >
                <span class="card-title font-weight-bold">
                  {{ $t("Date") }}
                </span>
                <span>
                  {{ productAnalysis.last_outcome.created_at }}
                </span>
              </p>
              <p
                class="d-flex flex-column flex_gap align-items-flex-start"
                v-if="productAnalysis.last_outcome"
              >
                <span class="card-title font-weight-bold">
                  {{ $t("Process_Number") }}
                </span>
                <span>
                  {{ productAnalysis.last_outcome.process_number }}
                </span>
              </p>
              <p v-else>
                <span class="card-title font-weight-bold text-center">
                  {{ $t("nodetails") }}
                </span>
              </p>
            </div>
          </BaseCard>
          <BaseCard
            class="w-md-45 bg-MIDWINTER_MIST card-sm p-2"
            v-if="productAnalysis && productAnalysis.num_of_outcomes"
          >
            <h3>{{ $t("Numsproductionlines") }}</h3>
            <p
              class="h4 font-weight-bold"
              v-if="productAnalysis && productAnalysis.num_of_outcomes"
            >
              <span>
                {{ productAnalysis.num_of_outcomes }}
              </span>
              <span
                class="font-weight-normal"
                v-if="productAnalysis && productAnalysis.num_of_outcomes <= 10"
              >
                {{ $t("Production_lines") }}
              </span>
              <span
                class="font-weight-normal"
                v-if="
                  (productAnalysis && productAnalysis.num_of_outcomes === 0) ||
                  (productAnalysis && productAnalysis.num_of_outcomes > 10)
                "
              >
                {{ $t("Production_line") }}
              </span>
            </p>
            <p v-else>
              <span class="card-title font-weight-bold text-center">
                {{ $t("nodetails") }}
              </span>
            </p>
          </BaseCard>
        </BaseCard>
        <BaseCard class="d-flex flex_gap--md">
          <BaseCard
            v-if="productAnalysis && productAnalysis.available_quantities > 0"
            class="w-md-45 bg-orange card-tiny p-2 d-flex flex-column justify-content-center"
          >
            <h4>{{ $t("inventory_ava_qnty") }}</h4>
            <p class="h4 font-weight-bold">
              <span v-if="productAnalysis.available_quantities > 0">
                {{ productAnalysis.available_quantities }}
              </span>
              <span v-if="productAnalysis.available_quantities === 0"> 0 </span>
              <span
                class="font-weight-normal"
                v-if="
                  (productAnalysis &&
                    productAnalysis.available_quantities === 0) ||
                  (productAnalysis && productAnalysis.available_quantities > 10)
                "
              >
                {{ $t("item") }}
              </span>
              <span
                class="font-weight-normal"
                v-if="
                  productAnalysis && productAnalysis.available_quantities <= 10
                "
              >
                {{ $t("items") }}
              </span>
            </p>
          </BaseCard>
          <BaseCard
            class="bg-PRAIRIE_DUST card-tiny p-2 d-flex flex-column justify-content-center w-md-45"
          >
            <h4>{{ $t("salesAmount6Months") }}</h4>
            <p
              class="h4 font-weight-normal"
              v-if="productAnalysis && productAnalysis.sales_amount"
            >
              <span class="font-weight-bold">
                {{ productAnalysis.sales_amount }}
              </span>
              <span>
                {{ $t("LE") }}
              </span>
            </p>
            <p class="h4 font-weight-normal" v-else>
              <span class="font-weight-bold">0</span>
              <span>
                {{ $t("LE") }}
              </span>
            </p>
          </BaseCard>
          <BaseCard
            class="w-md-45 bg-MIDWINTER_MIST card-tiny p-2 d-flex flex-column justify-content-center"
          >
            <h4>{{ $t("refundAmount6Months") }}</h4>
            <p
              class="h4 font-weight-bold"
              v-if="productAnalysis && productAnalysis.refunded_amount"
            >
              <span>
                {{ productAnalysis.refunded_amount }}
              </span>
              <span class="font-weight-normal">
                {{ $t("LE") }}
              </span>
            </p>
            <p class="h4" v-else>
              0
              <span class="font-weight-normal">
                {{ $t("LE") }}
              </span>
            </p>
          </BaseCard>
        </BaseCard>
        <BaseCard class="p-2 bg-L_D_Yellow-50 mt-3">
          <div class="d-flex justify-content-space-between">
            <h4>
              {{ $t("refunds_and_sales_movements_chartTitle") }}
            </h4>
            <span>{{ $t("monthly") }}</span>
          </div>

          <refund-sales-chart />
        </BaseCard>
        <BaseCard
          class="bg-L_D_Yellow-50 mt-3 min-h--auto"
          v-if="
            productAnalysis &&
            productAnalysis.most_customers_buy &&
            productAnalysis.most_customers_buy.length !== 0
          "
        >
          <div class="p-2 b-1">
            <h4 class="mb-2">
              {{ $t("Top_5_customerstitle") }}
            </h4>
          </div>
          <div class="card-body mt-1">
            <BaseTable
              v-if="productAnalysis"
              class="responsive_table table_raduis_bottom"
              :data="productAnalysis.most_customers_buy"
              :headings="customerHead"
              :orderedArray="['user_id','name','phone','sum']"
            />
          </div>
        </BaseCard>
        <BaseCard class="bg-L_D_Yellow-50 mt-3 p-2">
          <div class="d-flex flex_gap flex-column mb-3">
            <h3 class="mb-0">
              {{ $t("forecasting_Title2months") }}
            </h3>
            <p class="card-subtitle">
              {{ $t("forecasting_desc") }}
            </p>
          </div>
          <ProductionsStatusForcastsForcastedChart :product_id="productId" />
        </BaseCard>
        <BaseCard class="bg-L_D_Yellow-50 mt-3 p-2">
          <div class="d-flex flex_gap flex-column mb-3">
            <h3 class="mb-0">
              {{ $t("actual_foreasting_title") }}
            </h3>
            <span class="card-subtitle">
              {{ $t("actual_foreasting_desc") }}
            </span>
          </div>
          <ProductionsStatusForcastsActualProduction :product_id="productId" />
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import RefundSalesChart from "./RefundSalesChart.vue";
export default {
  components: { RefundSalesChart },
  name: "ProductAnalysis",
  data() {
    return {
      productId: Number(this.$route.params.id),
      customerHead: [
        { id: 1, name: "#" },
        { id: 2, name: `${this.$t("Name")}` },
        { id: 3, name: `${this.$t("Mobile")}` },
        { id: 4, name: `${this.$t("Total_of_purchases")} (${this.$t("LE")})` },
      ],
      Links: [
        {
          name: `${this.$t("Dashboard")}`,
          url: "/dashboard",
        },
        {
          name: `${this.$t("ProductsList")}`,
          url: "/products/productlist",
        },
        {
          name: `${this.$t("Products_Analysis")}`,
          url: "",
        },
      ],
    };
  },
  computed: {
    ...mapGetters("products", [
      "loading",
      "success",
      "error",
      "productAnalysis",
    ]),
  },
  created() {
    this.$store.dispatch("products/fetchProductAnalysis", {
      product_id: this.productId,
    });
  },
};
</script>

<style>
</style>