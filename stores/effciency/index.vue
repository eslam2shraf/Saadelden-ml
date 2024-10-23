<template>
  <div class="container-fluid--50 min-height--46 min-height--lg mt-2">
    <div
      class="row d-flex flex_gap--xl justify-content-space-between align-items-center m-auto"
    >
      <h3 class="mb-0">
        {{ $t("stores_effciency") }}
      </h3>
      <base-bread-crumbs :Links="Links" />
    </div>
    <div
      class="d-flex flex-column align-items-center justify-content-center mt-3"
    >
      <BaseCard class="card efficiency-card p-2 bg-L_D_Yellow-50">
        <h4>{{ $t("Stores_Sales_Comparison_Chart") }}</h4>
        <p class="text-left h5">
          {{ $t("stores_comparison_desc") }}
        </p>
        <sales-comparison-chart />
      </BaseCard>

      <BaseCard class="wrapper__Anomally__Analytics__graphAnalysis__tables__table efficiency-card mt-3">
        <div
          class="wrapper__Anomally__Analytics__graphAnalysis__tables__table__header"
        >
          
          <p>
            {{ $t('Sellers_Analysis_per_store') }}
          </p>
        </div>
        <div class="d-flex align-items-flex-start flex-wrap position--relative efficiency-card__filters">
          <label class="filter-lable mt-1 mb-1 mr-1">
            {{ $t("store_name") }}
          </label>
          <div class="select-wrapper select-filter sellersSelect mt-1 mb-1 mr-3">
            <BaseSelect
              class="sellerSelect__inner"
              @change="storeId = $event.target.value"
              :title="$t('store_name')"
              :options="allStores.data"
              :key-id="'id'"
              :key-name="'name'"
            >
            </BaseSelect>
          </div>

          <LayoutsFilter
          @fromDate="getFromDate"
          @toDate="getToDate"
          :filter="() => getAllSellersByStore()"
          class="input-date--sm mt-1 mb-1 justify-content-flex-end"
          :Msg="
          AllSellersByStore &&
          AllSellersByStore.response &&
          AllSellersByStore.response.data &&
          AllSellersByStore.response.data.errors &&
          AllSellersByStore.response.data.errors.to
              ? AllSellersByStore.response.data.errors.to[0]
              : ''
          "
        />
        </div>
        
        <div
          class="wrapper__Anomally__Analytics__graphAnalysis__tables__table__line"
        ></div>
        <p v-if="!AllSellersByStore.data && !isLoading" class="text-center mt-2">
          {{ $t("response_message") }}
        </p>
        <p v-if="isLoading === true" class="text-center mt-2">{{ $t("loading") }}</p>
    
        <div
          class="wrapper__Anomally__Analytics__graphAnalysis__tables__table__body"
          v-if="AllSellersByStore.data && AllSellersByStore.data.length !== 0 && !isLoading"
        >
          <BaseTable
            class="responsive_table table_raduis_bottom"
            :data="sellersData"
            :orderedArray="['id', 'seller_name', 'avg_delivered','sum_of_sales', 'product_id', 'quantity', 'name']"
            :labels="['id', 'seller_name', 'average_bill_amount', 'Total_sales', 'Top_Selling_Products', 'quantity', 'product_category']"
            :isIndex="true"
          />
        </div>
        <h4 v-if="AllSellersByStore.data && AllSellersByStore.data.length === 0 && !isLoading" class="text-center">
          {{ $t('nodataAvailable') }}
        </h4>
      </BaseCard>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import salesComparisonChart from "./salesComparisonChart.vue";
export default {
  components: { salesComparisonChart },
  name: "MLIndex",

  data() {
    return {
      isLoading: false,
      ids: [],
      from: "",
      to: "",
      storeId: "",
      stores: [],
      sellersData: [],
      Links: [
        {
          name: `${this.$t("Dashboard")}`,
          url: "/dashboard",
        },
        {
          name: `${this.$t("stores")}`,
        },
        {
          name: `${this.$t("stores_effciency")}`,
          url: "/stores/StoresEffciency",
        },
      ],
    };
  },

  mounted() {
    // this.getAllSellersByStore();
  },
  computed: {
    ...mapGetters("stores/stores", ["AllSellersByStore", "allStores"]),
   
    
  },
  created() {
    
       this.getAllStores();
     
     
  },

  methods: {
    getStructuredData(){
      if(this.AllSellersByStore.data){
        for(var i=0;i<this.AllSellersByStore.data.length; i++){
            const newSeller = {
          
              seller_name: this.AllSellersByStore.data[i].seller_name ?? "-",
              avg_delivered: this.AllSellersByStore.data[i].avg_bill.avg_delivered ?? "-",
              sum_of_sales: this.AllSellersByStore.data[i].sum_of_sales,
              product_id: this.AllSellersByStore.data[i].top_selling_product.product_id,
              quantity: this.AllSellersByStore.data[i].top_selling_product.quantity,
              name: this.AllSellersByStore.data[i].category.name,
          };
          this.sellersData.push(newSeller);
        } 
      }
      
        console.log(this.sellersData);   
      },
    getAllSellersByStore() {
      const data = {};
      if (this.storeId !== "") {
        this.isLoading = true;
        data.store_id = this.storeId;
        data.from_month = this.from;
        data.to_month = this.to;
      }
      this.$store.dispatch("stores/stores/fetchAllSellersByStore", data).then(() => {
        this.getStructuredData();
        this.isLoading = false;
      });
    },
    getAllStores() {
      this.isLoading = true;
      this.$store.dispatch("stores/stores/fetchAllStores").then(() => {
        this.isLoading = false;
      });
    },
    getFromDate(from) {
      this.from = from;
    },
    getToDate(to) {
      this.to = to;
    },
    getIds(){
      for(var i=0;i<this.allStores.data.length; i++){
            this.ids[i] = i+1;
        }    
      }
  },
};
</script>

<style lang="scss" scoped></style>
