<template>
  <div
    class="container p-2 justify-content-center min-height--lg min-height--46"
  >
    <div class="d-flex justify-content-space-between flex_gap">
      <h3>
        {{ $t("ProductClassifications") }}
      </h3>
      <base-bread-crumbs :Links="Links" />
    </div>
    <h4 v-if="isLoading" class="text-center">{{ $t("loading") }}</h4>
    <template v-if="categoriesSubCategory">
      <div
        class="d-flex flex-row flex_gap justify-content-space-between"
        v-for="(category, i) in categoriesSubCategory"
        :key="i"
      >
        <BaseCard class="card-xxs bg-L_D_Yellow p-2 mb-1">
          <h4 class="text-center">
            {{ category[i + 1].category_name }}
          </h4>
          <p class="d-flex flex-column flex_gap align-items-center">
            <span
              class="card-title font-weight-bold"
              v-if="
                category[i + 1].products_count &&
                category[i + 1].products_count > 0
              "
            >
              {{ category[i + 1].products_count }}
            </span>
            <span class="card-title font-weight-bold" v-else> 0 </span>
            <span
              v-if="
                category[i + 1].products_count &&
                category[i + 1].products_count <= 10
              "
            >
              {{ $t("Products") }}
            </span>
            <span
              v-if="
                (category[i + 1].products_count &&
                  category[i + 1].products_count === 0) ||
                (category[i + 1].products_count &&
                  category[i + 1].products_count > 10)
              "
            >
              {{ $t("Product") }}
            </span>
          </p>

          <div class="d-flex justify-content-space-between">
            <p class="d-flex flex-column flex_gap align-items-center">
              <img
                src="@/assets/images/icons/selling.png"
                alt="selling"
                class="icon-md-sm"
              />
              <span
                class="card-title font-weight-bold"
                v-if="category[i + 1].selling_amount"
              >
                {{ category[i + 1].selling_amount }}
              </span>
              <span> {{ $t("Selling") }} ({{ $t("LE") }}) </span>
            </p>
            <p class="d-flex flex-column flex_gap align-items-center">
              <img
                src="@/assets/images/icons/refunded.png"
                alt="refunded"
                class="icon-md-sm"
              />
              <span
                class="card-title font-weight-bold"
                v-if="category[i + 1].refunded_amount"
              >
                {{ category[i + 1].refunded_amount }}
              </span>
              <span class="card-title font-weight-bold" v-else> 0 </span>
              <span> {{ $t("Refunded") }} ({{ $t("LE") }}) </span>
            </p>
          </div>
        </BaseCard>
        <BaseCard class="card-lg bg-L_D_Yellow-50 mb-1 p-2">
          <h4>
            {{ $t("subcategory_Selling_refunded") }}
            {{ category[i + 1].category_name }}
          </h4>
          <sub-categories :Data="category[i + 1].sub_categories" />
        </BaseCard>
        <BaseCard class="card-tiny bg-L_D_Yellow p-2 mb-1">
          <p class="card-title font-weight-bold text-center">
            {{ $t("Most_selling_subcategory") }}
          </p>
          <p
            class="mt-1 d-flex flex-column mt-3 align-items-center"
            v-if="category[i + 1].most_selling.length !== 0"
          >
            <span class="font-weight-bold h4">
              {{ category[i + 1].most_selling.name }}
            </span>
            <span class="card-title font-weight-bold h4">
              {{ category[i + 1].most_selling.selling_sum }} {{ $t("LE") }}
            </span>
          </p>
          <p
            class="card-title font-weight-bold mt-4 text-center"
            v-if="category[i + 1].most_refunded.refunded_sum"
          >
            {{ $t("Most_Refunded_subcategory") }}
          </p>
          <p
            class="mt-1 d-flex flex-column mt-3 align-items-center"
            v-if="category[i + 1].most_refunded.length !== 0"
          >
            <span
              class="font-weight-bold h4"
              v-if="category[i + 1].most_refunded.name"
            >
              {{ category[i + 1].most_refunded.name }}
            </span>
            <span
              class="card-title font-weight-bold"
              v-if="category[i + 1].most_refunded.refunded_sum"
            >
              {{ category[i + 1].most_refunded.refunded_sum }} {{ $t("LE") }}
            </span>
          </p>
        </BaseCard>
      </div>
    </template>

    <div class="mt-3 d-flex flex_gap">
      <BaseCard class="card-lg bg-L_D_Yellow p-2">
        <h5 class="card-title mb-2">
          {{ $t("Selling_amount_of_suppliers") }}
        </h5>
        <div class="card-body">
          <SellingAmountSuppliers />
        </div>
      </BaseCard>

      <BaseCard class="card-lg bg-L_D_Yellow p-2">
        <h5 class="card-title mb-2">
          {{ $t("Selling_amount_of_customers") }}
        </h5>
        <div class="card-body">
          <SellingValueOfCustomers />
        </div>
      </BaseCard>
    </div>
  </div>
</template>

<script>
import SellingValueOfCustomers from "./SellingValueOfCustomers.vue";
import SellingAmountSuppliers from "./sellingAmountSuppliers.vue";
import { mapGetters } from "vuex";
import SubCategories from "./SubCategories.vue";
export default {
  name: "ProductsClassifications",
  data() {
    return {
      result: [],
      Links: [
        {
          name: `${this.$t("Dashboard")}`,
          url: "/dashboard",
        },
        {
          name: `${this.$t("ProductClassifications")}`,
          url: "/products/ProductsClassifications",
        },
      ],
      isLoading: false,
    };
  },
  async fetch() {
    this.getCategoriesSubCategory();
  },
  computed: {
    ...mapGetters("products/classifications", [
      "loading",
      "success",
      "error",
      "categoriesSubCategory",
    ]),
  },
  methods: {
    async getCategoriesSubCategory() {
      this.isLoading = true;
      await this.$store
        .dispatch("products/classifications/fetchCategoriesSubCategory")
        .then(() => {
          this.isLoading = false;
        });
    },
  },
  components: {
    SellingAmountSuppliers,
    SellingValueOfCustomers,
    SubCategories,
  },
};
</script>

<style>
</style>