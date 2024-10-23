<template>
  <BaseCard class="bg-L_D_Yellow-50 p-2">
    <h4>
      {{ $t('invoices_without_checkIn') }}
    </h4>
  <h4 v-if="isLoading" class="text-center">
    {{ $t('loading') }}
  </h4>
  <template v-else>
   
    <BaseTable
      v-if="invoicesWitthoutCheckIn && invoicesWitthoutCheckIn.histories && invoicesWitthoutCheckIn.histories.data && invoicesWitthoutCheckIn.histories.data.length !== 0"
      class="responsive_table table_raduis_bottom"
      :data="invoicesWitthoutCheckIn.histories.data"
      :headings="invoicesHead"
      :orderedArray="[
        'id',
        'bill_id',
        'store_name',
        'seller_name',
        'client_name',
        'created_at'
      ]"
    >
      <template #options="{ item }">
        <td class="table__actions">
          <BaseModal :show="showModal(item.id)" @close="toggleModal(item.id)">
            <template v-slot:modal_body>
              <div>
                <h4>{{ $t("invoice_details_of") }} {{ item.id }}</h4>
                <hr />
                <div class="d-flex flex_gap--lg justify-content-center mt-4 modal-container__body">
                  <div
                    class="d-flex flex-column align-items-flex-start flex_gap"
                  >
                    <span class="font-weight-normal"> {{ $t("transaction_id") }}: </span>
                    <span class="font-weight-normal">
                      {{ $t("bill_id") }}:
                    </span>
                    <span class="font-weight-normal">
                      {{ $t("purchase_status") }}:
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

                    <span  :class="statusColors(item.order_status)">
                      {{item.order_status}}
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
                      {{ item.price }}
                    </span>
                    <span>
                      {{ item.created_at }}
                    </span>

                  </div>
                </div>
              </div>
            </template>
          </BaseModal>

          <a class="table__actions__read_more" href="#" @click.stop="toggleModal(item.id)">
              <CheveronRight />
          </a>
        </td>
      </template>
    </BaseTable>
    <h4 v-else class="text-center">
          {{ $t('nodataAvailable') }}
        </h4>
    <div class="card-footer m-auto w-80">
      <BasePagenation
        v-if="invoicesWitthoutCheckIn && invoicesWitthoutCheckIn.histories"
        :totalPages="
          Math.ceil(
            invoicesWitthoutCheckIn.histories.total / invoicesWitthoutCheckIn.histories.per_page
          )
        "
        :perPage="invoicesWitthoutCheckIn.histories.per_page"
        :currentPage="currentPage"
        :getData="paginatedInvoicesWithoutCheckIn"
      />
    </div>
  </template>
 
  </BaseCard>
</template>

<script>
import { mapGetters } from "vuex";
import BaseModal from "../../base/BaseModal.vue";
import CheveronRight from "../../icon/CheveronRight.vue";
export default {
    name: 'InvoicesWithoutCheckIn',
    components: { CheveronRight, BaseModal },
    data() {
    return {
      currentPage: 1,
      activeModal: 0,
      isLoading: false,
      invoicesHead: [
        { id: 1, name: `${this.$t("transaction_id")}` },
        { id: 2, name: `${this.$t("bill_id")}` },
        { id: 3, name: `${this.$t("store_name")}` },
        { id: 4, name: `${this.$t("seller_name")}` },
        { id: 5, name: `${this.$t("customer_name")}` },
        { id: 6, name: `${this.$t("checkout_Date")}` },
        { id: 7, name: `${this.$t("more")}` },
      ],
    };
  },
    computed: {
    ...mapGetters("productions/Anomaly", [
      "loading",
      "success",
      "error",
      "invoicesWitthoutCheckIn",
    ]),
  },
  created() {
    this.paginatedInvoicesWithoutCheckIn(this.currentPage);
    
  },
  methods: {
    paginatedInvoicesWithoutCheckIn(page) {
      this.isLoading = true;
      this.currentPage = page;
      this.$store.dispatch("productions/Anomaly/fetchInvoicesWithoutCheckIn", {
        page: page,
        per_page: 15,
      }).then(()=>{
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
    statusColors(status){
      return this.$statusColors.statusColor(status);
    }
  },

}
</script>

<style>

</style>