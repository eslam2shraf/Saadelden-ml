<template>
  <BaseCard class="bg-L_D_Yellow-50 p-2">
    <h4>
      {{ $t("lastday_abnormal_refunded_invoices_title") }}
    </h4>
    <div class="d-flex flex_gap align-items-flex-start flex-wrap mb-2">
      <BaseInput
        v-model="searchWord"
        :placeholder="`${$t('searh_invoices_last')}`"
        type="text"
        class="d-inline search_input"
        @input="searchWord = $event.target.value"
        @keyup.enter="() => paginatedRefundedInvoices(currentPage)"
      />

      <LayoutsFilter
        @fromDate="getFromDate"
        @toDate="getToDate"
        :reset="Reset"
        :filter="() => paginatedRefundedInvoices(currentPage)"
        class="input-date--lg"
        :Msg="errorMessage"
        @resetErrorMsg="setErrorMsg"
      />
    </div>
    <h4 v-if="isLoading" class="text-center">
      {{ $t("loading") }}
    </h4>

    <template v-else>
      <BaseTable
        v-if="
          refundedLastDayInvoices &&
          refundedLastDayInvoices.data &&
          refundedLastDayInvoices.data.length !== 0
        "
        class="responsive_table table_raduis_bottom"
        :data="refundedLastDayInvoices.data"
        :headings="invoicesHead"
        :orderedArray="[
          'id',
          'bill_id',
          'store_name',
          'seller_name',
          'checkout_date',
          'refunded_date',
        ]"
      >
        <template #options="{ item }">
          <td class="table__actions">
            <BaseModal :show="showModal(item.id)" @close="toggleModal(item.id)">
              <template v-slot:modal_body>
                <div>
                  <h4>{{ $t("invoice_details_of") }} {{ item.id }}</h4>
                  <hr />
                  <div
                    class="d-flex flex_gap--lg justify-content-center mt-4 modal-container__body"
                  >
                    <div
                      class="d-flex flex-column align-items-flex-start flex_gap"
                    >
                      <span class="font-weight-normal">
                        {{ $t("transaction_id") }}:
                      </span>
                      <span class="font-weight-normal">
                        {{ $t("bill_id") }}:
                      </span>
                      <span class="font-weight-normal">
                        {{ $t("status") }}:
                      </span>
                      <span class="font-weight-normal">
                        {{ $t("seller_name") }}:
                      </span>
                      <span class="font-weight-normal">
                        {{ $t("client_name") }}:
                      </span>
                      <span class="font-weight-normal">
                        {{ $t("store_name") }}:
                      </span>
                      <span class="font-weight-normal">
                        {{ $t("product_name") }}:
                      </span>
                      <span class="font-weight-normal">
                        {{ $t("product_UID") }}:
                      </span>
                      <span class="font-weight-normal">
                        {{ $t("item_price") }}:
                      </span>
                      <span class="font-weight-normal">
                        {{ $t("quantity") }}:
                      </span>
                      <span class="font-weight-normal">
                        {{ $t("total_price") }}:
                      </span>
                      <span class="font-weight-normal">
                        {{ $t("checkout_Date") }}:
                      </span>
                      <span class="font-weight-normal">
                        {{ $t("refunded_date") }}:
                      </span>
                    </div>
                    <div
                      class="d-flex flex-column align-items-flex-start flex_gap"
                    >
                      <span>
                        {{ item.id }}
                      </span>

                      <span>
                        {{ item.bill_id }}
                      </span>

                      <span>
                        {{ item.purchase_status }}
                      </span>

                      <span>
                        {{ item.seller_name }}
                      </span>

                      <span v-if="item.client_name">
                        {{ item.client_name }}
                      </span>

                      <span>
                        {{ item.store_name }}
                      </span>

                      <span>
                        {{ item.product_name }}
                      </span>

                      <span>
                        {{ item.product_unique_id }}
                      </span>

                      <span>
                        {{ item.item_price }}
                      </span>

                      <span>
                        {{ item.product_quantity }} {{ $t("items") }}
                      </span>

                      <span>
                        {{ item.total_price }}
                      </span>
                      <span>
                        {{ item.checkout_date }}
                      </span>
                      <span>
                        {{ item.refunded_date }}
                      </span>
                    </div>
                  </div>
                </div>
              </template>
            </BaseModal>

            <a
              class="table__actions__read_more"
              href="#"
              @click.stop="toggleModal(item.id)"
            >
              <CheveronRight />
            </a>
          </td>
        </template>
      </BaseTable>
      <h4
        v-if="
          refundedLastDayInvoices &&
          refundedLastDayInvoices.data &&
          refundedLastDayInvoices.data.length === 0
        "
        class="text-center"
      >
        {{ $t("nodataAvailable") }}
      </h4>
      <h4
        v-if="
          refundedLastDayInvoices &&
          refundedLastDayInvoices.response &&
          refundedLastDayInvoices.response.data &&
          refundedLastDayInvoices.response.data.errors &&
          refundedLastDayInvoices.response.data.errors.to
        "
        class="text-center"
      >
        {{ $t("invaild_range") }}
      </h4>
      <div class="card-footer m-auto w-80">
        <BasePagenation
          v-if="refundedLastDayInvoices && refundedLastDayInvoices.meta"
          :totalPages="
            Math.ceil(
              refundedLastDayInvoices.meta.total /
                refundedLastDayInvoices.meta.per_page
            )
          "
          :perPage="refundedLastDayInvoices.meta.per_page"
          :currentPage="currentPage"
          :getData="paginatedRefundedInvoices"
        />
      </div>
    </template>
   
  </BaseCard>
</template>

<script>
import { mapGetters } from "vuex";
import BaseModal from "../../base/BaseModal.vue";
import CheveronRight from "../../icon/CheveronRight.vue";
import Reset from "../../icon/Reset.vue";
export default {
  name: "RefundedInvoicesLastDay",
  components: { CheveronRight, BaseModal, Reset },
  data() {
    return {
      currentPage: 1,
      activeModal: 0,
      isLoading: false,
      errorMessage: "",
      filterFrom: "",
      filterTo: "",
      searchWord: "",
      invoicesHead: [
        { id: 1, name: `${this.$t("transaction_id")}` },
        { id: 2, name: `${this.$t("bill_id")}` },
        { id: 3, name: `${this.$t("store")}` },
        { id: 4, name: `${this.$t("seller_name")}` },
        { id: 5, name: `${this.$t("checkout_Date")}` },
        { id: 6, name: `${this.$t("refunded_date")}` },
        { id: 7, name: `${this.$t("more")}` },
      ],
    };
  },
  computed: {
    ...mapGetters("productions/Anomaly", [
      "loading",
      "success",
      "error",
      "refundedLastDayInvoices",
    ]),
  },
  mounted() {
    this.paginatedRefundedInvoices(this.currentPage);
  },
  methods: {
    setErrorMsg(msg) {
      this.errorMessage = msg;
    },
    paginatedRefundedInvoices(page) {
      this.isLoading = true;
      this.currentPage = page;
      const data = {
        page: page,
        per_page: 15,
        from: this.filterFrom,
        to: this.filterTo,
      };
      if(this.searchWord !== ""){
        data.search= this.searchWord
      }
      this.$store
        .dispatch("productions/Anomaly/fetchRefundedLastDayInvoices", data)
        .then(() => {
          this.isLoading = false;
          if (
            this.refundedLastDayInvoices &&
            this.refundedLastDayInvoices.response &&
            this.refundedLastDayInvoices.response.data &&
            this.refundedLastDayInvoices.response.data.errors &&
            this.refundedLastDayInvoices.response.data.errors.to
          ) {
            this.errorMessage = this.refundedLastDayInvoices.response.data.errors.to[0];
          }
        });
    },
    getFromDate(from) {
      this.filterFrom = from;
    },
    getToDate(to) {
      this.filterTo = to;
    },
    Reset() {
      this.searchWord = "";
      this.currentPage = 1;
    },
    showModal: function (id) {
      return this.activeModal === id;
    },
    toggleModal: function (id) {
      if (this.activeModal !== 0) {
        this.activeModal = 0;
        return false;
      }
      this.activeModal = id;
    },
  },
};
</script>

<style></style>
