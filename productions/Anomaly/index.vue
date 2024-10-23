<template>
  <div class="p-2 min-height--46 min-height--lg">
    <div
      class="d-flex justify-content-space-between align-items-center container-fluid--50 flex-lg-nowrap"
    >
      <h3 class="mb-0">{{ $t("Anomaly") }}</h3>
      <base-bread-crumbs :Links="Links" />
    </div>
    
    <BaseTabs
      :tabList="tabshead"
      :sideTitle="false"
      class="container-fluid--50"
      :tabName="'anomaly'"
    >
      <template v-slot:anomaly-0>
        <Peakhours />
        <BaseCard
          class="p-2 bg-L_D_Yellow-50 mt-3"
          v-if="billsTime && billsTime.data && billsTime.data.length !== 0"
        >
          <h3>{{ $t("Bills_times") }}</h3>
          <div class="d-flex flex_gap flex-column" v-if="!loading">
            <BaseCard
              class="p-2 bg-L_D_Yellow"
              v-if="
                billsTime &&
                billsTime.data &&
                billsTime.data.anomalies &&
                billsTime.data.anomalies.length !== 0
              "
            >
              <h4>{{ $t("Bills_times_desc") }}</h4>
              <div class="row d-flex flex_gap--lg flex-wrap">
                <div
                  class="col-md-4 col-sm-4 col-lg-2 d-flex flex-row align-items-center flex_gap"
                  v-for="(time, i) in billsTime.data.anomalies"
                  :key="i"
                >
                  <BillIcon class="icon-md-sm" />

                  <span class="h4 font-weight-normal">
                    {{ time }}
                  </span>
                </div>
              </div>
            </BaseCard>
          </div>
          <h3 class="text-center" v-if="loading">Loading...</h3>
        </BaseCard>
        <BaseCard
          class="p-2 bg-L_D_Yellow-50 mt-3"
          v-if="billsPrice && billsPrice.data && billsPrice.data.length !== 0"
        >
          <h3>{{ $t("Bills_Price") }}</h3>
          <div class="d-flex flex_gap flex-column" v-if="!loading">
            <BaseCard
              class="p-2 bg-MIDWINTER_MIST"
              v-if="
                billsPrice &&
                billsPrice.data &&
                billsPrice.data.center_anomalies &&
                billsPrice.data.center_anomalies.length !== 0
              "
            >
              <h4>{{ $t("normalBills") }}</h4>
              <div class="row d-flex flex_gap--lg flex-wrap">
                <div
                  class="col-md-4 col-sm-5 col-lg-2 d-flex flex-row align-items-center flex_gap"
                  v-for="(price, i) in billsPrice.data.center_anomalies"
                  :key="i"
                >
                  <BillIcon class="icon-md-sm" />

                  <span class="h4 font-weight-normal">
                    {{ price }}
                  </span>
                </div>
              </div>
            </BaseCard>
            <BaseCard
              class="p-2 bg-PRAIRIE_DUST"
              v-if="
                billsPrice &&
                billsPrice.data &&
                billsPrice.data.upper_anomalies &&
                billsPrice.data.upper_anomalies.length !== 0
              "
            >
              <h4>
                {{ $t("Bills_with") }}
                <span class="text-danger_Scarlet">{{ $t("V_high") }}</span>
                {{ $t("compared_billsPrice") }}
              </h4>
              <div class="row d-flex flex_gap--lg flex-wrap">
                <div
                  class="col-md-4 col-sm-5 col-lg-2 d-flex flex-row align-items-center flex_gap"
                  v-for="(price, i) in billsPrice.data.upper_anomalies"
                  :key="i"
                >
                  <BillIcon class="icon-md-sm" />
                  <span class="h4 font-weight-normal">
                    {{ price }}
                  </span>
                </div>
              </div>
            </BaseCard>
            <BaseCard
              class="p-2 bg-L_D_Yellow"
              v-if="
                billsPrice &&
                billsPrice.data &&
                billsPrice.data.lower_anomalies &&
                billsPrice.data.lower_anomalies.length !== 0
              "
            >
              <h4>{{ $t("compared_lowbillsPrice") }}</h4>
              <div class="row d-flex flex_gap--lg flex-wrap">
                <div
                  class="col-md-4 col-sm-5 col-lg-2 d-flex flex-row align-items-center flex_gap"
                  v-for="(price, i) in billsPrice.data.lower_anomalies"
                  :key="i"
                >
                  <BillIcon class="icon-md-sm" />

                  <span class="h4 font-weight-normal">
                    {{ price }}
                  </span>
                </div>
              </div>
            </BaseCard>
          </div>
          <h3 class="text-center" v-if="loading">{{ $t("loading") }}</h3>
        </BaseCard>
      </template>
      <template v-slot:anomaly-1>
        <OffHoursInvoices />
      </template>
      <template v-slot:anomaly-2>
        <OffHoursCheckIn
          ref="OffHoursCheckIn"
          :from="filter_from"
          :to="filter_to"
        />
      </template>
      <template v-slot:anomaly-3>
        <RefundedInvoicesMoreThanWeek :from="filter_from" :to="filter_to" />
      </template>
      <template v-slot:anomaly-4>
        <RefundedInvoicesLastDay :from="filter_from" :to="filter_to" />
      </template>
      <template v-slot:anomaly-5>
        <WeeklyUserInvoices />
      </template>
      <template v-slot:anomaly-6>
        <InvoicesWithoutCheckIn />
      </template>
    </BaseTabs>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BillIcon from "../../icon/Bill.vue";
import OffHoursInvoices from "./OffHoursInvoices.vue";
import Peakhours from "./Peakhours.vue";
import OffHoursCheckIn from "./OffHoursCheckIn.vue";
import RefundedInvoicesMoreThanWeek from "./RefundedInvoicesMoreThanWeek.vue";
import RefundedInvoicesLastDay from "./RefundedInvoicesLastDay.vue";
import WeeklyUserInvoices from "./WeeklyUserInvoices.vue";
import InvoicesWithoutCheckIn from "./InvoicesWithoutCheckIn.vue";
export default {
  components: {
    Peakhours,
    BillIcon,
    OffHoursInvoices,
    OffHoursCheckIn,
    RefundedInvoicesMoreThanWeek,
    RefundedInvoicesLastDay,
    WeeklyUserInvoices,
    InvoicesWithoutCheckIn,
  },
  name: "ProductionsAnomaly",
  data() {
    return {
      clicked: false,
      filter_from: "",
      filter_to: "",
      tabshead: [
        `${this.$t("Anomaly")}`,
        `${this.$t("Off_Hours_Invoices")}`,
        `${this.$t("Off_Hours_checkIn")}`,
        `${this.$t("abnormal_refund_invoice")}`,
        `${this.$t("lastday_refund_invoice")}`,
        `${this.$t("weekly_user_invoices")}`,
        `${this.$t("invoices_without_checkIn_tab")}`,
      ],
      Links: [
        {
          name: `${this.$t("Dashboard")}`,
          url: "/dashboard",
        },
        {
          name: `${this.$t("Anomaly")}`,
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
      "peakTime",
      "billsPrice",
      "billsTime",
    ]),
  },
  methods: {
    getFiltredData() {
      this.$refs.OffHoursCheckIn.paginatedCheckInHours();
    },
  },
  created() {
    this.$store.dispatch("productions/Anomaly/fetchPeakTime");
    this.$store.dispatch("productions/Anomaly/fetchBillsPrice");
    this.$store.dispatch("productions/Anomaly/fetchBillsTime");
  },
  mounted() {},
};
</script>

<style></style>
