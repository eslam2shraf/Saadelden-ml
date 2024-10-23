<template>
  <BaseCard class="bg-L_D_Yellow-50 p-2">
    <h4>
      {{ $t("week_abnormal_refunded_invoices_title") }}
    </h4>
    <LayoutsFilter
      @fromDate="getFromDate"
      @toDate="getToDate"
      :filter="() => paginatedRefundedInvoices(currentPage)"
      class="input-date--lg"
      :Msg="errorMessage"
      @resetErrorMsg="setErrorMsg"
    />

    <h4 v-if="isLoading" class="text-center">
      {{ $t("loading") }}
    </h4>

    <template v-else>
      <BaseTable
        v-if="
          refundedMoreWeekInvoices &&
          refundedMoreWeekInvoices.data &&
          refundedMoreWeekInvoices.data.length !== 0
        "
        class="responsive_table table_raduis_bottom"
        :data="refundedMoreWeekInvoices.data"
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
          refundedMoreWeekInvoices &&
          refundedMoreWeekInvoices.data &&
          refundedMoreWeekInvoices.data.length === 0
        "
        class="text-center"
      >
        {{ $t("nodataAvailable") }}
      </h4>
      <h4
        v-if="
          refundedMoreWeekInvoices &&
          refundedMoreWeekInvoices.response &&
          refundedMoreWeekInvoices.response.data &&
          refundedMoreWeekInvoices.response.data.errors &&
          refundedMoreWeekInvoices.response.data.errors.to
        "
        class="text-center"
      >
        {{ $t("invaild_range") }}
      </h4>
      <div class="card-footer m-auto w-80">
        <BasePagenation
          v-if="refundedMoreWeekInvoices && refundedMoreWeekInvoices.meta"
          :totalPages="
            Math.ceil(
              refundedMoreWeekInvoices.meta.total /
                refundedMoreWeekInvoices.meta.per_page
            )
          "
          :perPage="refundedMoreWeekInvoices.meta.per_page"
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
  name: "RefundedInvoicesMoreThanWeek",
  components: { CheveronRight, BaseModal, Reset },
  data() {
    return {
      currentPage: 1,
      activeModal: 0,
      isLoading: false,
      filterFrom: "",
      errorMessage: "",
      filterTo: "",
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
      "refundedMoreWeekInvoices",
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
      this.$store
        .dispatch("productions/Anomaly/fetchRefundedMoreWeekInvoices", {
          page: page,
          per_page: 15,
          from: this.filterFrom,
          to: this.filterTo,
        })
        .then(() => {
          this.isLoading = false;
          if (
            this.refundedMoreWeekInvoices &&
            this.refundedMoreWeekInvoices.response &&
            this.refundedMoreWeekInvoices.response.data &&
            this.refundedMoreWeekInvoices.response.data.errors &&
            this.refundedMoreWeekInvoices.response.data.errors.to
          ) {
            this.errorMessage =
              this.refundedMoreWeekInvoices.response.data.errors.to[0];
          }
        });
    },
    getFromDate(from) {
      this.filterFrom = from;
    },
    getToDate(to) {
      this.filterTo = to;
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
