<template>
  <div class="d-flex flex_gap flex-column seller-transactions-container">
    <BaseCard class="seller-transactions-container__total">
      <LayoutsFilter
        @fromDate="getFromDate"
        @toDate="getToDate"
        :filter="getSellerTransactions"
        class="input-date--sm"
        :Msg="errorMessage"
        @resetErrorMsg="setErrorMsg"
      />
      <div class="seller-transactions-container__total__body">
        <p class="m-0 seller-transactions-container__total__body__title">
          <span>
            {{ $t("numof_transactions") }}
          </span>
          <span>
            {{ $t("performedbyseller") }}
          </span>
        </p>
        <h5 v-if="isTransactionLoading" class="text-center mb-0">
          {{ $t("loading") }}
        </h5>
        <p
          v-if="
            sellerTransactions &&
            sellerTransactions.data &&
            sellerTransactions.data[0] &&
            sellerTransactions.data[0].total_transactions &&
            !isTransactionLoading
          "
          class="m-0 seller-transactions-container__total__body__details"
        >
          <span v-if="sellerTransactions.data[0].total_transactions">
            {{ sellerTransactions.data[0].total_transactions }}
          </span>

          <span>
            {{ $t("transactions") }}
          </span>
        </p>
        <p
          v-if="
            sellerTransactions &&
            sellerTransactions.data &&
            sellerTransactions.data.length === 0 &&
            !isTransactionLoading
          "
          class="m-0 seller-transactions-container__total__body__details"
        >
          <span> 0 </span>
          <span>
            {{ $t("transactions") }}
          </span>
        </p>
      </div>
    </BaseCard>

    <BaseCard
      class="d-flex flex_gap seller-transactions-container__categorized"
    >
      <BaseCard class="seller-transactions-container__categorized__details">
        <p
          class="m-0 seller-transactions-container__categorized__details__title"
        >
          <span class="text_status--green">
            {{ $t("sale") }}
          </span>
          <span>
            {{ $t("transctions_from_total") }}
          </span>
        </p>
        <h5 v-if="isTransactionLoading" class="text-center mb-0">
          {{ $t("loading") }}
        </h5>
        <p
          v-if="
            sellerTransactions &&
            sellerTransactions.data &&
            sellerTransactions.data[0] &&
            sellerTransactions.data[0].delivered_products &&
            !isTransactionLoading
          "
          class="m-0 seller-transactions-container__categorized__details__transactions"
        >
          <span v-if="sellerTransactions.data[0].delivered_products">
            {{ sellerTransactions.data[0].delivered_products }}
          </span>

          <span>
            {{ $t("transactions") }}
          </span>
        </p>
        <p
          v-if="
            sellerTransactions &&
            sellerTransactions.data &&
            sellerTransactions.data.length === 0 &&
            !isTransactionLoading
          "
          class="m-0 seller-transactions-container__categorized__total__body__details"
        >
          <span> 0 </span>
          <span>
            {{ $t("transactions") }}
          </span>
        </p>
      </BaseCard>
      <BaseCard class="seller-transactions-container__categorized__details">
        <p
          class="m-0 seller-transactions-container__categorized__details__title"
        >
          <span class="text_status--red">
            {{ $t("refunded") }}
          </span>
          <span>
            {{ $t("transctions_from_total") }}
          </span>
        </p>
        <h5 v-if="isTransactionLoading" class="text-center m-0">
          {{ $t("loading") }}
        </h5>
        <p
          v-if="
            sellerTransactions &&
            sellerTransactions.data &&
            sellerTransactions.data[0] &&
            sellerTransactions.data[0].refunded_products &&
            !isTransactionLoading
          "
          class="m-0 seller-transactions-container__categorized__details__transactions"
        >
          <span v-if="sellerTransactions.data[0].refunded_products">
            {{ sellerTransactions.data[0].refunded_products }}
          </span>

          <span>
            {{ $t("transactions") }}
          </span>
        </p>
        <p
          v-if="
            sellerTransactions &&
            sellerTransactions.data &&
            sellerTransactions.data.length === 0 &&
            !isTransactionLoading
          "
          class="m-0 seller-transactions-container__total__body__details"
        >
          <span> 0 </span>
          <span>
            {{ $t("transactions") }}
          </span>
        </p>
      </BaseCard>
    </BaseCard>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "SellerTransactions",
  data() {
    return {
      sellerId: this.$route.params.id,
      filterFrom: "",
      filterTo: "",
      isTransactionLoading: false,
      errorMessage: "",
    };
  },
  computed: {
    ...mapGetters("employees/sellers", ["sellerTransactions"]),
  },
  mounted() {
    this.getSellerTransactions();
  },
  methods: {
    setErrorMsg(msg) {
      this.errorMessage = msg;
    },
    getSellerTransactions() {
      this.isTransactionLoading = true;
      const data = {
        id: this.sellerId,
      };
      if (this.filterFrom !== "" && this.filterTo !== "") {
        data.from = this.filterFrom;
        data.to = this.filterTo;
      }
      this.$store
        .dispatch("employees/sellers/fetchSellerTransactions", data)
        .then(() => {
          this.isTransactionLoading = false;
          if (
            this.sellerTransactions &&
            this.sellerTransactions.errors &&
            this.sellerTransactions.errors.to &&
            this.sellerTransactions.errors.to[0]
          ) {
            this.errorMessage = this.sellerTransactions.errors.to[0];
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

