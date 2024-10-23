<template>
  <BaseCard class="card-lg bg-L_D_Yellow">
    <div class="p-2 b-1">
      <LayoutsFilter
        @fromDate="getFromDate"
        @toDate="getToDate"
        :filter="() => LessProductQuantity()"
        class="input-date--lg"
        :Msg="errorMessage"
        @resetErrorMsg="setErrorMsg"
      />
      <h5 class="card-title mb-0">
        {{ $t("less_quantity_products_title") }}
      </h5>
      <span class="card-subtitle">
        {{ $t("less_quantity_products_desc") }}
      </span>
    </div>
    <div class="card-body mt-1">
      <h4 class="m-auto text-center" v-if="isLoading">
        {{ $t("loading") }}
      </h4>
      <template v-else>
        <BaseTable
          v-if="!lessProductQuantity.response"
          class="responsive_table table_raduis_bottom"
          :data="lessProductQuantity"
          :headings="productsHead"
          :orderedArray="['id', 'unique_id', 'name', 'order_quantity']"
        />
        <h4 v-if="lessProductQuantity.length === 0" class="m-auto">
          {{ $t("nodataAvailable") }}
        </h4>
        <h4
          v-if="
            lessProductQuantity &&
            lessProductQuantity.response &&
            lessProductQuantity.response.data &&
            lessProductQuantity.response.data.errors &&
            lessProductQuantity.response.data.errors.to
          "
          class="text-center"
        >
          {{ $t("invaild_range") }}
        </h4>
      </template>
    </div>
  </BaseCard>
</template>

<script>
import { mapGetters } from "vuex";
import Reset from "../../icon/Reset.vue";
export default {
  components: { Reset },
  name: "LessProductQuantity",
  data() {
    return {
      filterTo: "",
      filterFrom: "",
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
      "lessProductQuantity",
    ]),
  },
  mounted() {
    this.LessProductQuantity();
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
    LessProductQuantity() {
      this.isLoading = true;
      this.$store
        .dispatch("products/segmentaion/fetchLessProductQuantity", {
          from: this.filterFrom,
          to: this.filterTo,
        })
        .then(() => {
          this.isLoading = false;
          if (
            this.lessProductQuantity &&
            this.lessProductQuantity.response &&
            this.lessProductQuantity.response.data &&
            this.lessProductQuantity.response.data.errors &&
            this.lessProductQuantity.response.data.errors.to
          ) {
            this.errorMessage =
              this.lessProductQuantity.response.data.errors.to[0];
          }
        });
    },
  },
};
</script>

<style>
</style>