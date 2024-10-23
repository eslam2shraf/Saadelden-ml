<template>
  <div class="container-fluid--50 mt-1 min-height--46 min-height--lg">
    <div
      class="d-flex justify-content-space-between align-items-center flex_gap"
    >
      <h3 class="mb-0">
        {{ $t("ProductsList") }}
      </h3>
      <base-bread-crumbs :Links="Links" />
    </div>

    <div class="row flex_gap flex-wrap">
      <div class="col-md-4 col-lg-2 col-sm-8 col-11">
        <BaseCard class="bg-L_D_Yellow-50">
          <div
            class="d-flex justify-content-space-between flex_gap p-2 border-bottom align-items-center"
          >
            <h4 class="mb-0">{{ $t("filter") }}</h4>
            <FilterIcon />
          </div>
          <div class="card-body p-3">
            <BaseCard class="border-darkBlue">
              <div class="input select-wrapper select-filter">
                <select class="select input__field" v-model="categoryId">
                  <option value="">
                    {{ $t("Categories") }}
                  </option>
                  <option
                    v-for="option in producCategories"
                    :key="option.id"
                    :value="option.id"
                  >
                    <span v-if="option.name">
                      {{ option.name }}
                    </span>
                  </option>
                </select>
              </div>
            </BaseCard>
            <BaseCard class="border-darkBlue mt-3">
              <div class="input select-wrapper select-filter">
                <select class="select input__field" v-model="subCatId">
                  <option value="">
                    {{ $t("Subcategories") }}
                  </option>
                  <option
                    v-for="option in producSubCategories"
                    :key="option.id"
                    :value="option.id"
                  >
                    <span v-if="option.name">
                      {{ option.name }}
                    </span>
                  </option>
                </select>
              </div>
            </BaseCard>
            <BaseCard class="border-darkBlue mt-3">
              <div class="input select-wrapper select-filter">
                <select class="select input__field" v-model="supplierId">
                  <option value="">
                    {{ $t("Suppliers") }}
                  </option>
                  <option
                    v-for="option in suppliersAmount"
                    :key="option.id"
                    :value="option.id"
                  >
                    <span v-if="option.name">
                      {{ option.name }}
                    </span>
                  </option>
                </select>
              </div>
            </BaseCard>
          </div>
        </BaseCard>
      </div>
      <div class="col-md-7 col-lg-9 col-sm-9 col-11">
        <BaseCard class="bg-L_D_Yellow-50">
          <div class="d-flex justify-content-space-between flex_gap p-2 mb-1">
            <h3 class="mb-0">
              {{ $t("allProducts") }}
            </h3>
            <div class="d-flex flex_gap align-items-flex-start">
              <BaseInput
                :placeholder="`${$t('search_here')}`"
                type="text"
                class="d-inline search_input"
                v-model="search_word"
                @keyup.enter="getProductsList"
              />
              <BaseButton
                :clickedFunction="getProductsList"
                class="button button--xs search-btn d-inline"
              >
                {{ $t("Done") }}
              </BaseButton>
            </div>
          </div>

          <p class="p-2">
            <span
              class="h4"
              v-if="CategoryName || SubCategoryNAme || SupplierName"
              >{{ $t("Results_of") }} (
            </span>
            <span class="breadcrumbs__item__active h4" v-if="CategoryName">
              {{ CategoryName }}
            </span>
            <span v-if="SubCategoryNAme && CategoryName"> , </span>
            <span class="breadcrumbs__item__active h4" v-if="SubCategoryNAme">
              {{ SubCategoryNAme }}
            </span>
            <span v-if="SupplierName && SubCategoryNAme && CategoryName">
              ,
            </span>
            <span class="breadcrumbs__item__active h4" v-if="SupplierName">
              {{ SupplierName }}
            </span>
            <span v-if="CategoryName || SubCategoryNAme || SupplierName"
              >)</span
            >
          </p>
          <h3 class="text-center p-11" v-if="loading">
            {{ $t("loading") }}
          </h3>
          <div class="card-body p-2" v-if="!loading">
            <div
              class="d-flex flex-wrap flex_gap justify-content-center"
              v-if="
                productList && productList.data && productList.data.length !== 0
              "
            >
              <div v-for="product in productList.data" :key="product.id">
                <BaseCard class="bg-L_D_Yellow product-list">
                  <div class="card-body pl-1 pt-3">
                    <p>
                      <span class="key"> {{ $t("Product_name") }} : </span>
                      <span class="key"> # {{ $t("Product_id") }} : </span>
                    </p>
                    <p>
                      <span class="value">
                        {{ product.name }}
                      </span>
                      <span class="value">
                        {{ product.unique_id }}
                      </span>
                    </p>
                  </div>

                  <NuxtLink
                    :to="localePath(`/products/analysis/${product.id}`)"
                    class="product-list_link"
                  >
                    {{ $t("See_more_details") }}
                    <component
                      :is="`${
                        $i18n.locale == 'ar'
                          ? 'CircleCheveronLeft'
                          : 'CircleCheveronRight'
                      }`"
                      :key="`${
                        $i18n.locale == 'ar'
                          ? 'CircleCheveronLeft'
                          : 'CircleCheveronRight'
                      }`"
                    />
                  </NuxtLink>
                </BaseCard>
              </div>
            </div>
            <div v-else>
              <h3 class="text-center p-11">
                {{ $t("noProducts") }}
              </h3>
            </div>
          </div>

          <div class="card-footer m-auto w-80" v-if="productList">
            <BasePagenation
              v-if="productList && productList.meta"
              :totalPages="
                Math.ceil(productList.meta.total / productList.meta.per_page)
              "
              :perPage="productList.meta.per_page"
              :currentPage="currentPage"
              :getData="paginatedProducts"
            />
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import InputsSelect from "../base/BaseSelect.vue";
import CircleCheveronRight from "../icon/CircleCheveronRight.vue";
import CircleCheveronLeft from "../icon/CircleCheveronLeft.vue";
import FilterIcon from "../icon/Filter.vue";
export default {
  components: {
    InputsSelect,
    CircleCheveronRight,
    CircleCheveronLeft,
    FilterIcon,
  },
  name: "ProductsList",
  middleware: "authenticated",
  data() {
    return {
      search_word: "",
      currentPage: 1,
      categoryId: "",
      subCatId: "",
      supplierId: "",
      CategoryName: "",
      SubCategoryNAme: "",
      SupplierName: "",
      Links: [
        {
          name: `${this.$t("Dashboard")}`,
          url: "/dashboard",
        },
        {
          name: `${this.$t("ProductsList")}`,
          url: "/",
        },
      ],
    };
  },
  computed: {
    ...mapGetters("products", [
      "loading",
      "success",
      "error",
      "productList",
      "meta",
    ]),
    ...mapGetters("products/classifications", [
      "producCategories",
      "producSubCategories",
      "suppliersAmount",
    ]),
  },
  watch: {
    categoryId(newCategory) {
      this.currentPage = 1;
      this.categoryId = newCategory;
      let selectedCat = this.producCategories.filter(
        (item) => item.id == newCategory
      );
      if (selectedCat.length !== 0) {
        this.CategoryName = selectedCat[0].name.en;
      } else {
        this.CategoryName = "";
      }

      this.$store.dispatch("products/fetchProductsList", {
        category_id: this.categoryId,
        sub_category_id: this.subCatId,
        supplier_id: this.supplierId,
        page: this.currentPage,
        per_page: 15,
        search: this.search_word,
      });
    },
    subCatId(newSubCategory) {
      this.currentPage = 1;
      this.subCatId = newSubCategory;
      let selectedSubCat = this.producSubCategories.filter(
        (item) => item.id == newSubCategory
      );
      if (selectedSubCat.length !== 0) {
        this.SubCategoryNAme = selectedSubCat[0].name.en;
      } else {
        this.SubCategoryNAme = "";
      }
      this.$store.dispatch("products/fetchProductsList", {
        category_id: this.categoryId,
        sub_category_id: this.subCatId,
        supplier_id: this.supplierId,
        page: this.currentPage,
        per_page: 15,
        search: this.search_word,
      });
    },
    supplierId(newSupplier) {
      this.currentPage = 1;
      this.supplierId = newSupplier;
      let selectedSupplier = this.suppliersAmount.filter(
        (item) => item.id == newSupplier
      );
      if (selectedSupplier.length !== 0) {
        this.SupplierName = selectedSupplier[0].name;
      } else {
        this.SupplierName = "";
      }
      this.$store.dispatch("products/fetchProductsList", {
        category_id: this.categoryId,
        sub_category_id: this.subCatId,
        supplier_id: this.supplierId,
        page: this.currentPage,
        per_page: 15,
        search: this.search_word,
      });
    },
    search_word(newWord) {
      if (newWord === "") {
        this.getProductsList();
      }
    },
  },
  mounted() {
    this.paginatedProducts(this.currentPage);
    this.$store.dispatch("products/classifications/fetchProducCategories");
    this.$store.dispatch("products/classifications/fetchproducSubCategories");
    this.$store.dispatch("products/classifications/fetchSuppliersAmount");
  },
  methods: {
    paginatedProducts(page) {
      this.currentPage = page;
      this.$store.dispatch("products/fetchProductsList", {
        category_id: this.categoryId,
        sub_category_id: this.subCatId,
        supplier_id: this.supplierId,
        page: page,
        per_page: 15,
        search: this.search_word,
      });
    },
    getProductsList() {
      this.$store.dispatch("products/fetchProductsList", {
        category_id: this.categoryId,
        sub_category_id: this.subCatId,
        supplier_id: this.supplierId,
        page: this.currentPage,
        per_page: 15,
        search: this.search_word,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/styles/modules/_productslist.scss";
</style>
