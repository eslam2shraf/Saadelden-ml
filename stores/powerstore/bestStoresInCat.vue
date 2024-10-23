<template>
  <div class="">
    <seller-card
      :sellerData="bestStoresInCategory.data"
      :isLoading="isLoading"
      cardType="store"
    >
      <template #title>
        <h3>
          <span class="gradient-text">{{$t('best_5')}}</span> {{$t('stores')}} {{$t('in')}} {{$t('store_category')}}          {{ storecatId }}
          <span v-if="storecatId">{{ storecatId }}</span>
        </h3>
      </template>
      <template #filter>
        <div class="d-flex align-items-center flex_gap mb-2">
          <FilterIcon />
          <div class="select-wrapper select-filter sellersSelect">
            <BaseSelect
              class="sellerSelect__inner"
              @input="storecatId = $event.target.value"
              :title="$t('store_category')"
              :options="storCategories"
              :key-id="'value'"
              :key-name="'name'"
            >
            </BaseSelect>
          </div>

          <BaseButton
            :clickedFunction="getBestStoresInCategory"
            class="button button--xs search-btn d-inline"
          >
            {{ $t("Done") }}
          </BaseButton>
        </div>
        <h4 class="text-center" v-if="!isLoading && !bestStoresInCategory.data">
          {{ $t("select_data") }}
        </h4>
      </template>
    </seller-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FilterIcon from "../../icon/Filter.vue";
import SellerCard from "../../seller/powerseller/SellerCard.vue";
import Reset from "../../icon/Reset.vue";
export default {
  name: "MLBestStoresInCat",

  data() {
    return {
      storecatId: "",
      isLoading: false,
      currentPage: 1,
      storCategories: [
        { name: "a", value: "a" },
        { name: "b", value: "b" },
        { name: "c", value: "c" },
        { name: "d", value: "d" },
      ],
    };
  },

  computed: {
    ...mapGetters("stores/stores", ["bestStoresInCategory"]),
  },
  mounted() {},
  methods: {
    getBestStoresInCategory() {
      const data = {};
      if (this.storecatId !== "") {
        this.isLoading = true;
        data.category = this.storecatId;
      }

      this.$store
        .dispatch("stores/stores/fetchBestStoresInCategory", data)
        .then(() => {
          this.isLoading = false;
        });
    },
    Reset() {
      this.storecatId = "";
    },
  },
  components: { SellerCard, FilterIcon, Reset },
};
</script>

<style lang="scss" scoped></style>

