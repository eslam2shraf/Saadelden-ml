<template>
  <div class="container-fluid p-2">
    <div class="d-flex justify-content-space-between flex_gap">
      <h3>
        {{ $t("CustomerSegmentaion") }}
      </h3>
      <base-bread-crumbs :Links="Links" />
    </div>
    <div class="d-flex flex_gap--md justify-content-center">
      <BaseCard class="card-372 p-2 bg-L_D_Yellow-50">
        <h4>{{ $t("Types_of_customers") }} ({{ $t('live_time') }})</h4>
        <customers-types />
        <p class="text-center h5">
          {{ $t("customertypes_desc") }} 
        </p>
      </BaseCard>
      <BaseCard class="card-lg p-2 card-lg-xxs bg-L_D_Yellow-50">
        <h4>
          {{ $t("Customers_segmentation_types") }} ({{ $t('live_time') }})
        </h4>
        <customer-segmentaion-types />
        <p class="text-center h5">
          {{ $t("customertypes_segm_desc") }}
        </p>
      </BaseCard>
      <BaseCard class="card-xxs card-lg-xxs p-2 bg-L_D_Yellow-50">
        <h4>{{ $t("Average_products_quantity_per_bill") }} ({{ $t('live_time') }})</h4>
        <avg-products-per-bill />
        <p class="text-center h5 mt-12">
          {{ $t("avg_product_perBill_desc") }}
        </p>
      </BaseCard>
    </div>
    <div class="d-flex flex_gap--lg-xl justify-content-center mt-3">
      <BaseCard
        class="card-xxs p-2 segmentas"
        v-for="(segChars, key, i) in segments_characteristics"
        :key="i"
      >
        <h4>
          <span v-if="key === 'segment_0'">
            {{ $t("Premium_pluse") }}
          </span>
          <span v-if="key === 'segment_1'">
            {{ $t("Standard") }}
          </span>
          <span v-if="key === 'segment_2'">
            {{ $t("Premium") }}
          </span>
          <span v-if="key === 'segment_3'">
            {{ $t("Elite") }}
          </span>
        </h4>
        <div class="d-flex flex-row align-items-center flex_gap">
          <img src="@/assets/images/icons/selling.png" class="icon-md-sm" />
          <p class="d-flex flex-column flex_gap">
            <span class="h3 font_weight_bold">
              {{ getInteger(segChars.customer_purchased_products_prices.mean) }}
              {{ $t("LE") }}
            </span>
            <span class="text-black">
              {{ $t("Average_purchase_price") }}
            </span>
          </p>
        </div>
        <div class="d-flex flex-row align-items-center flex_gap">
          <ProductsIcon class="icon-md-sm product_icon" />
          <p class="d-flex flex-column flex_gap">
            <span class="h4 font_weight_bold">
              {{ getInteger(segChars.unique_products.mean) }}
              {{ $t("Products") }}
            </span>
            <span class="text-black">
              {{ $t("Average_unique_Products") }}
            </span>
          </p>
        </div>
      </BaseCard>
    </div>
    <div class="d-flex flex_gap--md justify-content-center mt-3">
      <BaseCard class="card-md card-lg-xxs p-2 bg-L_D_Yellow-50">
        <h4>{{ $t("Average_selling_amount") }}</h4>
        <avg-selling />
        <p class="text-center h5">
          {{ $t("avg_selling_desc") }}
        </p>
      </BaseCard>
      <BaseCard class="card-xxs card-lg-xxs p-2 bg-L_D_Yellow-50">
        <h4>{{ $t("Average_Customer_Frequency") }}</h4>
        <customers-visits />
        <p class="text-center h5 mt-15">
          {{ $t("customers_visits_desc") }}
        </p>
      </BaseCard>
      <BaseCard class="card-497 card-lg-xxs p-2 bg-L_D_Yellow-50">
        <h4>{{ $t("Customer_absences_days") }}</h4>
        <frequency />
        <p class="text-center h5">
          {{ $t("frequency_desc") }}
        </p>
      </BaseCard>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProductsIcon from "../../icon/ProductsIcon.vue";
import AreaBills from "./AreaBills.vue";
import AvgProductsPerBill from "./AvgProductsPerBill.vue";
import AvgSelling from "./AvgSelling.vue";
import CustomerSegmentaionTypes from "./CustomerSegmentaionTypes.vue";
import CustomersTypes from "./CustomersTypes.vue";
import CustomersVisits from "./CustomersVisits.vue";
import Frequency from "./Frequency.vue";
export default {
  components: {
    AvgProductsPerBill,
    CustomersTypes,
    AvgSelling,
    Frequency,
    CustomerSegmentaionTypes,
    AreaBills,
    CustomersVisits,
    ProductsIcon,
  },
  name: "Segmentaion",
  data() {
    return {
      currentPage: 1,
      Links: [
        {
          name: `${this.$t("Dashboard")}`,
          url: "/dashboard",
        },
        {
          name: `${this.$t("CustomerSegmentaion")}`,
          url: "/customer/Segmentaion",
        },
      ],
      chartData: null,
      options: {
        cutoutPercentage: 70,
        responsive: true,
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
      },
    };
  },
  computed: {
    ...mapGetters("customers/segmentaion", [
      "loading",
      "success",
      "error",
      "segments_stats",
      "segments_characteristics",
    ]),
  },
  created() {
    this.$store.dispatch("customers/segmentaion/fetchSegmentaions");
    let data = [30, 70],
      label = ["Customer1"],
      colors = ["#033043", "#FFFFFF"];

    this.chartData = {
      datasets: [
        {
          backgroundColor: colors,
          data: data,
        },
      ],
      labels: label,
    };
  },
  methods: {
    getInteger(num) {
      return num.toFixed(0);
    },
  },
};
</script>

<style>
</style>