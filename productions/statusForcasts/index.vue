<template>
  <div class="container p-2 min-height--46 min-height--lg">
    <h3>{{ $t("StatusandForecasts") }}</h3>
    <div class="row">
      <BaseCard class="border-darkBlue">
        <div class="input select-wrapper select-filter">
          <select class="select input__field" v-model="product_id">
            <option value="">
              {{ $t("choose_product") }}
            </option>
            <option
              v-for="option in allProducts"
              :key="option.id"
              :value="option.id"
            >
              <span v-if="option.name">
                {{ option.name }} / {{ option.unique_id }}
              </span>
            </option>
          </select>
        </div>
      </BaseCard>
    </div>
    <div class="row">
      <div class="col-md-12 col-sm-10 col-12">
        <BaseCard class="bg-L_D_Yellow mt-4 p-2">
          <BaseCard class="bg-white p-3">
            <div class="d-flex flex-row justify-content-space-between mb-3">
              <div>
                <h3 class="mb-0">
                  {{ $t("forecasting_Title2months") }}
                </h3>
                <p class="card-subtitle">
                  {{ $t("forecasting_desc") }}
                </p>
              </div>
            </div>

            <ProductionsStatusForcastsForcastedChart
              :key="product_id"
              :product_id="product_id"
            />
          </BaseCard>
          <BaseCard class="bg-white mt-2 p-3">
            <div class="d-flex flex-row justify-content-space-between mb-3">
              <div>
                <h3 class="mb-0">
                  {{ $t("actual_foreasting_title") }}
                </h3>
                <span class="card-subtitle">
                  {{ $t("actual_foreasting_desc") }}
                </span>
              </div>
            </div>

            <ProductionsStatusForcastsActualProduction
              :key="product_id"
              :product_id="product_id"
            />
          </BaseCard>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import InputsSelect from "../../base/BaseSelect.vue";
export default {
  components: { InputsSelect },
  name: "StatusAndForcasts",
  data() {
    return {
      product_id: "",
      selectOptions: [
        {
          label: "This Month",
          value: "1",
        },
        {
          label: "Last Month",
          value: "2",
        },
      ],
      productionOptions: [
        {
          label: "Production line 1",
          value: "1",
        },
        {
          label: "Production line 2",
          value: "2",
        },
      ],
    };
  },
  watch: {
    product_id(newId) {
      this.product_id = newId;
      this.changeId(newId);
    },
  },
  computed: {
    ...mapGetters("products", ["loading", "success", "error", "allProducts"]),
  },
  created() {
    this.$store.dispatch("products/fetchAllProducts");
  },
  methods: {
    changeId(id) {
      this.product_id = id;
    },
  },
};
</script>

<style>
</style>