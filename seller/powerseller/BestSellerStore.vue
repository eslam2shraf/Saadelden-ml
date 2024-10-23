<template>
  <div class="">
    
    <seller-card :sellerData="bestSellerStore.data" :isLoading="isLoading">
      <template #title>
        <h3>
            <span class="gradient-text">{{$t('best_5')}}</span> {{$t('sellers')}} {{$t('in_this')}} {{$t('store')}}
        </h3>
      </template>
      <template #filter>
        <div class="d-flex align-items-center flex_gap mb-2">
          <FilterIcon />
          <div
              v-if="allStores && allStores.data"
              class="select-wrapper select-filter sellersSelect"
            >
              <BaseSelect
                class="sellerSelect__inner"
                @input="storeId = $event.target.value"
                :title="$t('store')"
                :options="allStores.data"
                :key-id="'id'"
                :key-name="'name'"
                @change="getBestSellersStore"
              >
              </BaseSelect>
            </div>

       
        </div>
        <h4 class="text-center" v-if="!isLoading && !bestSellerStore.data">
          {{ $t("select_data") }}
        </h4>
      </template>
    </seller-card>
  </div>
</template>
    
    <script>
import { mapGetters } from "vuex";
import FilterIcon from "../../icon/Filter.vue";
import SellerCard from "./SellerCard.vue";
import Reset from "../../icon/Reset.vue";
export default {
  name: "FrontendMlBestSellerStore",
  data() {
    return {
      storeId: "",
      isLoading: false,
      currentPage:1,
    };
  },
  computed: {
    ...mapGetters("employees/sellers", ["bestSellerStore","allStores"]),
  },
  mounted() {
    this.getAllStores(this.currentPage);
  },
  methods: {
    getAllStores(page) {
      this.currentPage = page;
      this.$store.dispatch("employees/sellers/fetchAllStores", {
        page: this.currentPage,
        per_page: 20,
      });
    },
    getBestSellersStore() {
      const data = {};
      if (this.storeId !== "") {
        this.isLoading = true;
        data.id = this.storeId;
      }

      this.$store
        .dispatch("employees/sellers/fetchBestSellersStore", data)
        .then(() => {
          this.isLoading = false;
        });
    },
    Reset() {
      this.storeId = "";
    },
  },
  components: { SellerCard, FilterIcon, Reset },
};
</script>
    
    <style lang="scss" scoped>
</style>