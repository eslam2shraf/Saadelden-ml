<template>
  <BaseCard class="p-1">
    <h4>
      {{ $t("customers_Invoices_per_week") }}
    </h4>
    <div class="d-flex flex_gap flex-wrap">
      <h4 v-if="isLoading" class="text-center">
        {{ $t("loading") }}
      </h4>
      <template v-else>
        <BaseCard
          class="bg-L_D_Yellow-50 p-2 customer_card border-midwinter-mist"
          v-for="customer in invoicesWeekUser.data"
          :key="customer.user_id"
        >
          <div class="d-flex flex_gap mb-5 flex-lg-nowrap">
            <div class="d-flex flex-column align-items-flex-start flex_gap">
              <span class="font-weight-bold"> {{ $t("customer_name") }}: </span>
              <span class="font-weight-bold"> {{ $t("customer_type") }}: </span>
              <span class="font-weight-bold"> {{ $t("phone_number") }}: </span>
            </div>
            <div class="d-flex flex-column align-items-flex-start flex_gap">
              <span>
                {{ customer.user_name }}
              </span>

              <span>
                {{ customer.user_type }}
              </span>

              <span>
                {{ customer.phone }}
              </span>
            </div>
          </div>

          <NuxtLink
            :to="
              localePath(
                `/productions/Anomaly/InvoicesDetailsPerCustomer/${customer.user_id}`
              )
            "
            class="show_more_link"
          >
            {{ $t("show_invoices") }}
            <component :is="`DoubleArrowsRight`" :key="`DoubleArrowsRight`" />
          </NuxtLink>
        </BaseCard>
      </template>
      <h4
        v-if="
          invoicesWeekUser &&
          invoicesWeekUser.data &&
          invoicesWeekUser.data.length == 0
        "
        class="text-center"
      >
        {{ $t("nodataAvailable") }}
      </h4>
    </div>
  </BaseCard>
</template>

<script>
import { mapGetters } from "vuex";
import DoubleArrowsRight from "../../icon/DoubleArrowsRight.vue";
export default {
  components: { DoubleArrowsRight },
  name: "WeeklyUserInvoices",
  data() {
    return {
      currentPage: 1,
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters("productions/Anomaly", [
      "loading",
      "success",
      "error",
      "invoicesWeekUser",
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
        .dispatch("productions/Anomaly/fetchWeekInvoicesSameUser", {
          page: page,
          per_page: 15,
        })
        .then(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<style>
</style>