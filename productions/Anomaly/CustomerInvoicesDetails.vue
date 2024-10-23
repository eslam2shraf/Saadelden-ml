<template>
  <div class="p-2 min-height--46 min-height--lg">
    <div
      class="d-flex justify-content-space-between  flex_gap container-fluid--50 "
    >
      <h3 class="mb-0">{{ $t("invoices_details_per") }} 
        (<span v-if=" invoicesWeekUserDetails &&
              invoicesWeekUserDetails.histories &&
              invoicesWeekUserDetails.histories.data && invoicesWeekUserDetails.histories.data[0]">
             {{ invoicesWeekUserDetails.histories.data[0].client_name }}
        </span> )
      </h3>
      <base-bread-crumbs :Links="Links" />
 
    </div>
    <div class="container-fluid--50 mb-3">
      <BaseButton :clickedFunction="backtoAllCustomers" class="btn-back">
      Back to all customers 
    </BaseButton>
    </div>
    <div class="container-fluid--50">
      <BaseCard class="bg-L_D_Yellow-50 p-2">
        <h4 v-if="isLoading" class="text-center">
          {{ $t("loading") }}
        </h4>
        <template v-else>
          <BaseTable
            v-if="
              invoicesWeekUserDetails &&
              invoicesWeekUserDetails.histories &&
              invoicesWeekUserDetails.histories.data
            "
            class="responsive_table table_raduis_bottom"
            :data="invoicesWeekUserDetails.histories.data"
            :headings="invoicesHead"
            :orderedArray="[
              'id',
              'bill_id',
              'store_name',
              'seller_name',
              'created_at',
            ]"
          >
            <template #options="{ item }">
              <td class="table__actions">
                <BaseModal
                  :show="showModal(item.id)"
                  @close="toggleModal(item.id)"
                >
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

                          <span :class="statusColors(item.order_status)">
                            {{ item.order_status }}
                          </span>

                          <span>
                            {{ item.seller_name }}
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
                            {{ item.quantity }} {{ $t('items') }}
                          </span>

                          <span>
                            {{ item.price }} {{ $t('egp') }}
                          </span>
                          <span>
                            {{ item.created_at }}
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
          <div class="card-footer m-auto w-80">
            <BasePagenation
              v-if="
                invoicesWeekUserDetails && invoicesWeekUserDetails.histories
              "
              :totalPages="
                Math.ceil(
                  invoicesWeekUserDetails.histories.total /
                    invoicesWeekUserDetails.histories.per_page
                )
              "
              :perPage="invoicesWeekUserDetails.histories.per_page"
              :currentPage="currentPage"
              :getData="paginatedWeeklyUserInvoices"
            />
          </div>
        </template>
      </BaseCard>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BaseModal from "../../base/BaseModal.vue";
import CheveronRight from "../../icon/CheveronRight.vue";
export default {
  name: "CustomerInvoicesDetails",
  components: { CheveronRight, BaseModal },
  data() {
    return {
      currentPage: 1,
      isLoading: false,
      activeModal: 0,
      userId: this.$route.params.id,
      clientName:'',
      invoicesHead: [
        { id: 1, name: `${this.$t("transaction_id")}` },
        { id: 2, name: `${this.$t("bill_id")}` },
        { id: 3, name: `${this.$t("store_name")}` },
        { id: 4, name: `${this.$t("seller_name")}` },
        { id: 5, name: `${this.$t("checkout_Date")}` },
        { id: 6, name: `${this.$t("more")}` },
      ],
      Links: [
        {
          name: `${this.$t("Dashboard")}`,
          url: "/dashboard",
        },
        {
          name: `${this.$t("Anomaly")}`,
          url: "/productions/Anomaly",
        },
        {
          name: `${this.$t("invoices_details")}`,
          url: "",
        },
      ],
    };
  },
  computed: {
    ...mapGetters("productions/Anomaly", [
      "loading",
      "success",
      "error",
      "invoicesWeekUserDetails",
    ]),
  },
  created() {
    this.paginatedWeeklyUserInvoices(this.currentPage);
  },
  methods: {
    paginatedWeeklyUserInvoices(page) {
      this.isLoading = true;
      this.currentPage = page;
      this.$store
        .dispatch("productions/Anomaly/fetchWeekInvoicesSameUserDetails", {
          page: page,
          per_page: 15,
          user_id: this.userId,
        })
        .then(() => {
          this.isLoading = false;
        });
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
    statusColors(status) {
      return this.$statusColors.statusColor(status);
    },
    backtoAllCustomers(){
      this.$router.push(this.localePath('/productions/Anomaly/#5'));
    }
  },
};
</script>

<style>
</style>