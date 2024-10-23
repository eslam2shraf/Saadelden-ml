<template>
  <FinanceGraphTables
    title="highest_product_cost"
    :data="heighestProducts['highest profit products']"
    :icon="'ArrowIncreaseIcon'"
    :orderedArray="[
      'product_id',
      'product_name',
      'product_code',
      'average_cost',
      'average_selling_price',
      'profit',
    ]"
    :labels="[
      'id',
      'Product_name',
      'Product_code',
      'Avg_Cost',
      'Avg_Selling_Price',
      'profit %',
    ]"
    :msg="heighestProducts.message"
    :loading="isLoading"
  >
    <template #filters>
      <LayoutsFilter
          @fromDate="getFromDate"
          @toDate="getToDate"
          :filter="() => getHeighestProducts()"
          class="input-date--sm mb-2 mt-1 justify-content-flex-end"
          :Msg="
            heighestProducts &&
            heighestProducts.response &&
            heighestProducts.response.data &&
            heighestProducts.response.data.errors &&
            heighestProducts.response.data.errors.to
              ? heighestProducts.response.data.errors.to[0]
              : ''
          "
        />
    </template>
  </FinanceGraphTables>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "MLTopProfit",

  data() {
    return {
      from:'',
      to:'',
      isLoading:false,
    };
  },
  computed: {
    ...mapGetters("finance/costs", ["heighestProducts"]),
  },
  mounted() {
    this.getHeighestProducts()
  },

  methods: {
    getFromDate(from){
      this.from = from;
    },
    getToDate(to){
      this.to = to;
    },
    getHeighestProducts(){
      this.isLoading = true;
   
    
      this.$store
        .dispatch("finance/costs/fetchHeighestProducts", {
          from : this.from,
        to : this.to,
      
        }).then(()=>{
          this.isLoading = false;
        })
    }
  },
};
</script>

<style lang="scss" scoped></style>
