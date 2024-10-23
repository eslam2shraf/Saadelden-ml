<template>
  <div class="container p-2 min-height--46 min-height--lg">
    <div class="d-flex justify-content-space-between flex_gap">
      <h3>
        {{ $t("Customer_Analysis") }}
      </h3>
      <base-bread-crumbs :Links="Links" />
    </div>
    <BaseCard class="p-2 d-flex flex_gap row">
      <BaseCard class="bg-L_D_Yellow-50 p-2 h-auto col-sm-5 col-12">
        <BaseCard class="bg_NORDIC d-flex flex_gap--lg p-1">
          <img
            src="@/assets/images/icons/profile_picture.png"
            alt="CustomerPicture"
            class="customer-img"
          />
          <div
            class="d-flex flex-column align-items-center justify-content-center"
            v-if="Analysis"
          >
            <h4 class="mb-0" v-if="Analysis && Analysis.customer">
              {{ Analysis.customer.name }}
            </h4>
            <p class="text-OROCHIMARU" v-if="Analysis && Analysis.customer">
              {{ Analysis.customer.phone }}
            </p>
          </div>
          <IcCheckIcon class="mt-2" />
        </BaseCard>

        <img src="@/assets/images/cuate.png" class="img-sm mt-3" />
        <p class="text-grey text-center font-weight-bold">
          {{ $t("last_date_a_purchase_was_made") }}
        </p>
        <p class="text-orange text-center" v-if="Analysis && Analysis.customer">
          {{ Analysis.customer.last_purchase_date }}
        </p>
      </BaseCard>
      <BaseCard class="d-flex flex-column flex_gap--md col-sm-6">
        <BaseCard class="bg-L_D_Yellow-50 p-2 h-auto">
          <p class="text-center text-orange h5 font-weight-bold">
            {{ $t("customerFav_category") }}
          </p>
          <p
            class="text-center h4"
            v-if="Analysis && !Analysis.most_fav_category"
          >
            {{ $t("nodata") }}
          </p>
          <h4 class="text-center" v-if="Analysis && Analysis.most_fav_category">
            {{ Analysis.most_fav_category.name }}
          </h4>
          <p
            v-if="Analysis && Analysis.most_fav_category"
            class="d-flex flex_gap--md justify-content-space-between align-items-center"
          >
            <span>
              {{ $t("category_nums") }}
            </span>
            <span class="d-flex flex_gap">
              <span class="font-weight-bold">
                {{ Analysis.most_fav_category.products_count }}
              </span>
              <span v-if="Analysis.most_fav_category.products_count <= 10">
                {{ $t("items") }}
              </span>
              <span
                v-if="
                  Analysis.most_fav_category.products_count === 0 ||
                  Analysis.most_fav_category.products_count > 10
                "
              >
                {{ $t("item") }}
              </span>
            </span>
          </p>
        </BaseCard>
        <BaseCard class="bg-L_D_Yellow-50 p-2 h-auto">
          <p class="text-center text-orange h5 font-weight-bold">
            {{ $t("favCustomer_product") }}
          </p>
          <p
            class="text-center h4"
            v-if="Analysis && !Analysis.most_fav_product"
          >
            {{ $t("nodata") }}
          </p>
          <h4 class="text-center" v-if="Analysis && Analysis.most_fav_product">
            {{ Analysis.most_fav_product.name }}
          </h4>
          <p
            v-if="Analysis && Analysis.most_fav_product"
            class="d-flex justify-content-space-between align-items-center"
          >
            <span>
              {{ $t("purchased_units") }}
            </span>
            <span class="d-flex flex_gap">
              <span class="font-weight-bold">
                {{ Analysis.most_fav_product.units }}
              </span>
              <span v-if="Analysis.most_fav_product.units <= 10">
                {{ $t("items") }}
              </span>
              <span
                v-if="
                  Analysis.most_fav_product.units === 0 ||
                  Analysis.most_fav_product.units > 10
                "
              >
                {{ $t("item") }}
              </span>
            </span>
          </p>
        </BaseCard>
      </BaseCard>
      <BaseCard class="p-2 bg-L_D_Yellow-50 col-12 col-lg-6 col-md-5">
        <h4 class="mb-0">
          {{ $t("Visited_Stores") }}
        </h4>
        <store-visited />
        <span class="mt-0 text-center">
          {{ $t("Visited_StoresDesc") }}
        </span>
      </BaseCard>
      <BaseCard
        class="col-md-6 p-2 bg_NORDIC p-2 card-tiny d-flex flex-column justify-content-center"
      >
        <p
          class="d-flex flex-column flex_gap"
          v-if="Analysis && Analysis.customer_sales"
        >
          <span>
            {{ $t("Total_sales") }}
          </span>
          <span class="h4 font_weight_bold text-orange">
            {{ Analysis.customer_sales.total_sales }} {{ $t("LE") }}
          </span>
        </p>
        <p
          class="d-flex flex-column flex_gap"
          v-if="Analysis && Analysis.customer_sales"
        >
          <span>
            {{ $t("Number_of_purchases") }}
          </span>
          <span class="h4 font_weight_bold text-orange">
            {{ Analysis.customer_sales.num_of_purchases }}
            <span v-if="Analysis.customer_sales.num_of_purchases <= 10">
              {{ $t("Receipts") }}
            </span>
            <span
              v-if="
                Analysis.customer_sales.num_of_purchases > 10 ||
                Analysis.customer_sales.num_of_purchases === 0
              "
            >
              {{ $t("Receipt") }}
            </span>
          </span>
        </p>
        <p
          class="d-flex flex-column flex_gap"
          v-if="Analysis && Analysis.customer_sales"
        >
          <span>
            {{ $t("refunded_items") }}
          </span>
          <span class="h4 font_weight_bold text-orange">
            {{ Analysis.customer_sales.refunded_products }}
            <span
              v-if="
                Analysis.customer_sales.refunded_products === 0 ||
                Analysis.customer_sales.refunded_products > 10
              "
            >
              {{ $t("item") }}
            </span>
            <span
              v-if="
                Analysis.customer_sales.refunded_products <= 10 &&
                Analysis.customer_sales.refunded_products !== 0
              "
            >
              {{ $t("items") }}
            </span>
          </span>
        </p>
        <p
          class="d-flex flex-column flex_gap"
          v-if="Analysis && Analysis.customer_sales"
        >
          <span>
            {{ $t("purchased_item") }}
          </span>
          <span class="h4 font_weight_bold text-orange">
            {{ Analysis.customer_sales.sales_products }}
            <span
              v-if="
                Analysis.customer_sales.sales_products === 0 ||
                Analysis.customer_sales.sales_products > 10
              "
            >
              {{ $t("item") }}
            </span>
            <span
              v-if="
                Analysis.customer_sales.sales_products <= 10 &&
                Analysis.customer_sales.sales_products !== 0
              "
            >
              {{ $t("items") }}
            </span>
          </span>
        </p>
      </BaseCard>
    </BaseCard>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import IcCheckIcon from "../../icon/IcCheck.vue";
import storeVisited from "./storeVisited.vue";
export default {
  components: { storeVisited, IcCheckIcon },
  name: "CustomerAnalysisComponent",
  data() {
    return {
      customerId: this.$route.params.id,
      Links: [
        {
          name: `${this.$t("Dashboard")}`,
          url: "/dashboard",
        },
        {
          name: `${this.$t("CustomerList")}`,
          url: "/customer/List",
        },
        {
          name: `${this.$t("Customer_Analysis")}`,
          url: "",
        },
      ],
    };
  },
  computed: {
    ...mapGetters("customers", ["loading", "success", "error", "Analysis"]),
  },
  created() {
    this.$store.dispatch("customers/fetchCustomerAnalysis", {
      customer_id: this.customerId,
    });
  },
};
</script>

<style>
</style>