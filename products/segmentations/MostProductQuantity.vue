<template>
  <BaseCard class="card-lg bg-L_D_Yellow">
    <div class="p-2 b-1">
      <LayoutsFilter
        @fromDate="getFromDate"
        @toDate="getToDate"
        :filter="() => MostProductQuantity()"
        class="input-date--lg"
        :Msg="errorMessage"
        @resetErrorMsg="setErrorMsg"
      />
      <h5 class="card-title mb-0">
        {{ $t("most_quantity_products_title") }}
      </h5>
      <span class="card-subtitle">
        {{ $t("most_quantity_products_desc") }}
      </span>
    </div>
    <div class="card-body mt-1">
      <h4 class="m-auto text-center" v-if="isLoading">
        {{ $t("loading") }}
      </h4>
      <template v-else>
        <BaseTable
          v-if="!mostProductQuantity.response"
          class="responsive_table table_raduis_bottom"
          :data="mostProductQuantity"
          :headings="productsHead"
          :orderedArray="['id', 'unique_id', 'name', 'order_quantity']"
        />
        <h4 v-if="mostProductQuantity.length === 0" class="m-auto">
          {{ $t("nodataAvailable") }}
        </h4>
        <h4 v-if="mostProductQuantity &&
              mostProductQuantity.response &&
              mostProductQuantity.response.data &&
              mostProductQuantity.response.data.errors &&
              mostProductQuantity.response.data.errors.to" class=" text-center">
            {{ $t('invaild_range') }}
          </h4>
      </template>
    </div>
  </BaseCard>
</template>

<script>
import { mapGetters } from "vuex";
import Reset from "../../icon/Reset.vue";
export default {
  name: "MostProductQuantity",
  data() {
    return {
      filterFrom: "",
      filterTo: "",
      isLoading: false,
      errorMessage: "",
      productsHead: [
        { id: 1, name: `${this.$t("Product_id")}` },
        { id: 2, name: `${this.$t("Product_code")}` },
        { id: 3, name: `${this.$t("Name")}` },
        {
          id: 4,
          name: `${this.$t("quantity") + "(" + this.$t("item") + ")"}`,
        },
      ],
    };
  },
  computed: {
    ...mapGetters("products/segmentaion", [
      "loading",
      "success",
      "error",
      "mostProductQuantity",
    ]),
  },
  mounted() {

    this.MostProductQuantity();
  },
  methods: {
    getFromDate(from) {
      this.filterFrom = from;
    },
    getToDate(to) {
      this.filterTo = to;
    },
    setErrorMsg(msg){
      this.errorMessage = msg
    },
    MostProductQuantity() {
      this.isLoading = true;
      this.$store
        .dispatch("products/segmentaion/fetchMostProductQuantity", {
          from: this.filterFrom,
          to: this.filterTo,
        })
        .then(() => {
          this.isLoading = false;
          if (
            this.mostProductQuantity &&
              this.mostProductQuantity.response &&
              this.mostProductQuantity.response.data &&
              this.mostProductQuantity.response.data.errors &&
              this.mostProductQuantity.response.data.errors.to
          ) {
            this.errorMessage =
              this.mostProductQuantity.response.data.errors.to[0];
          }
        });
    },

  },
  components: { Reset },
};
</script>

<style>
</style>