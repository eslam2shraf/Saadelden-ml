<template>
  <BaseCard class="seller-products">
    <LayoutsFilter
      @fromDate="getFromDate"
      @toDate="getToDate"
      :filter="getSellerProducts"
      class="input-date--sm"
      :Msg="errorMessage"
      @resetErrorMsg="setErrorMsg"
    />

    <h4 v-if="isLoading" class="text-center">{{ $t("loading") }}</h4>
    <div
      v-if="sellerProducts && sellerProducts.data && !isLoading"
      class="d-flex flex-column align-items-flex-start seller-products__items"
    >
      <div class="seller-products__items__item">
        <p class="seller-products__items__item__title m-0">
          <products-icon />
          {{ $t("number_of") }}
          <span class="font-weight--600">{{ $t("items") }}</span>
          {{ $t("sold_by_seller") }}
        </p>
        <div class="seller-products__items__item__values">
          <p class="m-0">
            <span>{{ sellerProducts.data.sold_items }} </span>
            <span> {{ $t("items") }}</span>
          </p>
        </div>
      </div>
      <hr class="w-80 mt-2 mb-2" />
      <div class="seller-products__items__item">
        <p class="seller-products__items__item__title m-0">
          <container-with-product />
          {{ $t("number_of") }}
          <span class="font-weight--600"> {{ $t("Retail_products") }}</span>
          {{ $t("sold_by_seller") }}
        </p>
        <div class="seller-products__items__item__values">
          <p class="m-0">
            <span>{{ sellerProducts.data.retail_items }} </span>
            <span> {{ $t("items") }}</span>
          </p>
        </div>
      </div>
      <hr class="w-80 mt-2 mb-2" />
      <div class="seller-products__items__item">
        <p class="seller-products__items__item__title m-0">
          <container-with-products />
          {{ $t("number_of") }}
          <span class="font-weight--600">{{ $t("un_retail_products") }}</span>
          {{ $t("sold_by_seller") }}
        </p>
        <div class="seller-products__items__item__values">
          <p class="m-0">
            <span>{{ sellerProducts.data["non retail items"] }} </span>
            <span> {{ $t("items") }}</span>
          </p>
        </div>
      </div>
    </div>
  </BaseCard>
</template>

<script>
import { mapGetters } from "vuex";
import ContainerWithProduct from "../../icon/ContainerWithProduct.vue";
import ContainerWithProducts from "../../icon/ContainerWithProducts.vue";
import ProductsIcon from "../../icon/ProductsIcon.vue";
export default {
  components: { ProductsIcon, ContainerWithProducts, ContainerWithProduct },
  name: "SellerProducts",
  data() {
    return {
      sellerId: this.$route.params.id,
      chartData: null,
      isLoading: false,
      filterFrom: "",
      filterTo: "",
      errorMessage: "",
    };
  },
  computed: {
    ...mapGetters("employees/sellers", ["sellerProducts"]),
  },
  mounted() {
    this.getSellerProducts();
  },

  methods: {
    setErrorMsg(msg) {
      this.errorMessage = msg;
    },
    getSellerProducts() {
      this.isLoading = true;
      const data = {
        id: this.sellerId,
      };
      if (this.filterFrom !== "" && this.filterTo) {
        data.from = this.filterFrom;
        data.to = this.filterTo;
      }
      this.$store
        .dispatch("employees/sellers/fetchSellerProducts", data)
        .then(() => {
          this.isLoading = false;
          if (
            this.sellerProducts &&
            this.sellerProducts.errors &&
            this.sellerProducts.errors.to &&
            this.sellerProducts.errors.to[0]
          ) {
            this.errorMessage = this.sellerProducts.errors.to[0];
          }
        });
    },
    getFromDate(from) {
      this.filterFrom = from;
    },
    getToDate(to) {
      this.filterTo = to;
    },
  },
};
</script>

<style></style>

