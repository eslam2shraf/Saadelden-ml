<template>
  <div class="wrapper container-fluid--50  min-height--46 min-height--lg">
    <div class="d-flex  justify-content-space-between align-items-center m-auto">
      <h3 class="mb-0">{{ $t("FinancialSummary") }}</h3>
      <base-bread-crumbs :Links="Links" />
    </div>
    <div class="d-flex flex-column bg-L_D_Yellow-30 card p-2 mb-1">
      <div class="wrapper__periodTime">
        <p class="wrapper__periodTime__header">
          {{ $t("expenses_cost_title") }}
        </p>
        <LayoutsFilter
          @fromDate="getFromDate"
          @toDate="getToDate"
          :filter="() => filterDirectIndirectExpenses()"
          class="input-date--sm justify-content-flex-end mb-1"
          :Msg="
            expenses &&
            expenses.response &&
            expenses.response.data &&
            expenses.response.data.errors &&
            expenses.response.data.errors.to
              ? expenses.response.data.errors.to[0]
              : ''
          "
        />
      </div>

      <div class="wrapper__parent">
        <div class="wrapper__parent__mainbar">
          <div class="wrapper__parent">
            <div
              v-if="latestFinancialsCost.data"
              class="wrapper__parent_processing"
            >
              <div class="actions d-flex">
                <div class="buttonss d-flex">
                  <BaseButton
                    :clickedFunction="getCalcGenerateFinancialsCost"
                    class="btn-one"
                  >
                    {{ $t("generateCapital") }}
                  </BaseButton>
                  <BaseButton
                    :clickedFunction="getLatestFinancialsCost"
                    class="btn-two"
                  >
                    {{ $t("reload") }}
                  </BaseButton>
                </div>

                <div
                  class="status d-flex mr-3 flex_gap ml-3 align-items-flex-end"
                  v-if="
                    latestFinancialsCost &&
                    latestFinancialsCost.data &&
                    latestFinancialsCost.data.Status
                  "
                >
                  <span class="status_btn">{{ $t("status") }}:</span>
                  <span
                    class="inprogress text_status--green"
                    v-if="latestFinancialsCost.data.Status == 1"
                  >
                    {{ $t("done") }}
                  </span>
                  <span
                    class="inprogress text_status--red"
                    v-if="latestFinancialsCost.data.Status == 0"
                  >
                    {{ $t("inprogress") }}
                  </span>
                </div>
              </div>
              <h4 class="text-center" v-if="isLoading">
                {{ $t("loading") }}
              </h4>
              <div class="financeWrapper d-flex">
                <FinanceTotalMetric
                  :title="$t('Current_Capital')+'('+ $t('Fixed')+')'"
                  :value="
                    latestFinancialsCost && latestFinancialsCost.data
                      ? latestFinancialsCost.data['Current Capital']
                      : ''
                  "
                />
                <FinanceTotalMetric
                  :title="$t('Current_Cash') +'(' + $t('Fixed') +')'"
                  :value="
                    latestFinancialsCost && latestFinancialsCost.data
                      ? latestFinancialsCost.data['Current Cash']
                      : ''
                  "
                />
              </div>

              <div class="genrationResult">
                <p style="text-align: center">
                  {{ $t("last_generation") }}

                  {{
                    latestFinancialsCost && latestFinancialsCost.data
                      ? latestFinancialsCost.data[`Created At`]
                      : ""
                  }}
                </p>
              </div>
            </div>
            <div class="wrapper__parent_processing">
              <div class="actions d-flex">
                <div class="buttonss d-flex">
                  <BaseButton
                    :clickedFunction="getGenerateProfitCost"
                    class="btn-one"
                  >
                    {{ $t("generateReveu") }}
                  </BaseButton>
                  <BaseButton :clickedFunction="getProfitCost" class="btn-two">
                    {{ $t("reload") }}
                  </BaseButton>
                </div>
                <div
                  class="status d-flex flex_gap align-items-flex-end"
                  v-if="profitCost && profitCost.data && profitCost.data.Status"
                >
                  <span class="status_btn">{{ $t("status") }}:</span>
                  <span
                    class="inprogress text_status--green"
                    v-if="profitCost.data.Status == 1"
                  >
                    {{ $t("done") }}
                  </span>
                  <span
                    class="inprogress text_status--red"
                    v-if="profitCost.data.Status == 0"
                  >
                    {{ $t("inprogress") }}
                  </span>
                </div>
                <div class=" d-flex justify-content-center align-items-center">
                  <NuxtLink :to="localePath('/logstarget')" class="text_decoration--none">
                    <span class="logsinfo">{{ $t("Logs") }}</span>
                  </NuxtLink>
                  <DoubleArrowsRight class="logs-arrow"/>
                </div>
              </div>
              <h4 class="text-center" v-if="isLoadingProfitCost">
                {{ $t("loading") }}
              </h4>
              <div class="financeWrapper d-flex">
                <FinanceTotalMetric
                  :title="$t('Total_Revenue')"
                  :value="
                    profitCost && profitCost.data
                      ? profitCost.data['total revenue']
                      : ''
                  "
                  :caption="$t('allsales_store')"
                />
                <FinanceTotalMetric
                  :title="$t('Gross_Profit')"
                  :value="
                    profitCost && profitCost.data
                      ? profitCost.data['Gross Profit']
                      : ''
                  "
                  :caption="$t('Total_Revenue')+ '-'+'('+ $t('Expenses')+')'"
                />
              </div>
              <div class="genrationResult d-flex justify-content-center flex_gap">
                <p v-if="profitCost && profitCost.data">
                  {{ $t("This_values_from") }}: {{ profitCost.data.From }} 
                </p>
                <p v-if="profitCost && profitCost.data">
                   {{ $t("to") }}: {{ profitCost.data.To }}
                </p>
              </div>
            </div>
          </div>
          <div class="wrapper__parent__mainbar__card">
            <h3 class="wrapper__parent__mainbar__card__title">
              {{ $t("totalCosts") }}
            </h3>
            <div class="wrapper__parent__mainbar__card__cost-defintion">
              <FinanceInfoSnipet
                color="#033043"
                :title="$t('directCost')"
                :text="$t('directcost_desc')"
                :examples="$t('directcost_examples')"
              />
              <FinanceInfoSnipet
                color="#F1A87F"
                :title="$t('indirectCost')"
                :text="$t('indirectcost_desc')"
                :examples="$t('indirectcost_examples')"
              />
              <FinanceProgressCircle
                :outerPercentage="
                  directAndIndirectCosts
                    ? directAndIndirectCosts.percentageOfDirectCost
                    : ''
                "
                :innerPercentage="
                  directAndIndirectCosts
                    ? directAndIndirectCosts.percentageOfIndirectCost
                    : ''
                "
              />
            </div>

            <p class="wrapper__parent__mainbar__card__helper-text">
              {{ $t("directChartDesc") }}
            </p>
          </div>
        </div>
        <div if="expenses" class="wrapper__parent__side-bar">
          <FinanceCardDefinition
            color="#000"
            :title="$t('Cost_of_goods_sold')"
            :cost="expenses.costOfSoldGoods"
          />
          <FinanceCardDefinition
            color="#BAAD8F"
            :title="
              $t('Operating_expenses')
            "
            :caption=" $t('Expenses') + ' + ' +
              $t('Salaries') + ' + ' +
              $t('Workerscost') + ' + ' +
              $t('directCost')"
            :cost="expenses.operating_expenses"
          />
          <FinanceCardDefinition
            color="#A5D4DC"
            :title="$t('Salaries')"
            :cost="expenses.salaries"
          />
        </div>
      </div>
    </div>

    <div class="wrapper__Anomally">
      <div class="wrapper__Anomally__title">
        <p class="ml-2">{{ $t("analytics_anomaly_title") }}</p>
      </div>
      <div class="wrapper__Anomally__Analytics">
        <!-- <cost-anomaly /> -->
        <div class="wrapper__Anomally__Analytics__graphAnalysis">
          <div class="wrapper__Anomally__Analytics__graphAnalysis__tables">
            <FinanceAbnormalProductionCost />
            <FinanceAbnormalMaterialCost />
          </div>
          <div class="wrapper__Anomally__Analytics__graphAnalysis__tables">
            <FinanceTopProfit />
            <FinanceLowestProfit />
          </div>
        </div>
        
      </div>
      <div class="wrapper__Anomally__Analytics__analysis mb-2">
        <anomalies-tades-men />
        <anomalies-stores-target />
      </div>
    </div>
    <!-- <FinanceCarts/> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import HexaWarningIcon from "../icon/HexaWarningIcon.vue";
import ArrowIncreaseIcon from "../icon/ArrowIncreaseIcon.vue";
import ArrowDecreaseIcon from "../icon/ArrowDecreaseIcon.vue";
import DoubleArrowsRight from "../icon/DoubleArrowsRight.vue";
import AnomaliesStoresTarget from "./AnomaliesStoresTarget.vue";
import AnomaliesTadesMen from "./AnomaliesTadesMen.vue";
import CostAnomaly from "../icon/CostAnomaly.vue";
export default {
  name: "FrontendMlCost",

  data() {
    return {
      targrtComponent: "logs",
      expenseFrom: "",
      expenseTo: "",
      DICostFrom: "",
      DICostTo: "",
      profitCostFrom: "",
      profitCostTo: "",
      isLoading: false,
      isLoadingProfitCost: false,
      body: [
        {
          Id: "1",
          ProductionLineName: "XXXXXXXXXXXXX",
          ProductionLineCode: "23255",
          MaterialName: "XXXXXXXXXXXXX",
          MaterialCode: "23255",
          cost: "252,255 LE",
          ProductName: "XXXXXXXX",
          ProductCode: "23255",
          AvgCost: "252,255 LE",
          AvgSellingPrice: "252,255 LE",
          Profit: "90.55",
          brandName: "Abu-Ouf",
          collected: "152,255 LE",
          uncollected: "252,255 LE",
          total: "252,255 LE",
          collectionRate: "22.2",
          StoreName: "Alexandria Store",
          ProgressAmount: "152,255 LE",
          Target: "252,255 LE",
          TargetRate: "52.2",
        },
        {
          Id: "2",
          ProductionLineName: "XXXXXXXXXXXXX",
          ProductionLineCode: "23255",
          MaterialName: "XXXXXXXXXXXXX",
          MaterialCode: "23255",
          cost: "252,255 LE",
          ProductName: "XXXXXXXX",
          ProductCode: "23255",
          AvgCost: "252,255 LE",
          AvgSellingPrice: "252,255 LE",
          Profit: "90.55",
          brandName: "Abu-Ouf",
          collected: "152,255 LE",
          uncollected: "252,255 LE",
          total: "252,255 LE",
          collectionRate: "92.2",
          StoreName: "Alexandria Store",
          ProgressAmount: "152,255 LE",
          Target: "252,255 LE",
          TargetRate: "120.2",
        },
        {
          Id: "3",
          ProductionLineName: "XXXXXXXXXXXXX",
          ProductionLineCode: "23255",
          MaterialName: "XXXXXXXXXXXXX",
          MaterialCode: "23255",
          cost: "252,255 LE",
          ProductName: "XXXXXXXX",
          ProductCode: "23255",
          AvgCost: "252,255 LE",
          AvgSellingPrice: "252,255 LE",
          Profit: "-90.55",
          brandName: "Abu-Ouf",
          collected: "152,255 LE",
          uncollected: "252,255 LE",
          total: "252,255 LE",
          collectionRate: "22.2",
          StoreName: "Alexandria Store",
          ProgressAmount: "152,255 LE",
          Target: "252,255 LE",
          TargetRate: "52.2",
        },
        {
          Id: "4",
          ProductionLineName: "XXXXXXXXXXXXX",
          ProductionLineCode: "23255",
          MaterialName: "XXXXXXXXXXXXX",
          MaterialCode: "23255",
          cost: "252,255 LE",
          ProductName: "XXXXXXXX",
          ProductCode: "23255",
          AvgCost: "252,255 LE",
          AvgSellingPrice: "252,255 LE",
          Profit: "90.55",
          brandName: "Abu-Ouf",
          collected: "152,255 LE",
          uncollected: "252,255 LE",
          total: "252,255 LE",
          collectionRate: "52.2",
          StoreName: "Alexandria Store",
          ProgressAmount: "152,255 LE",
          Target: "252,255 LE",
          TargetRate: "52.2",
        },
        {
          Id: "5",
          ProductionLineName: "XXXXXXXXXXXXX",
          ProductionLineCode: "23255",
          MaterialName: "XXXXXXXXXXXXX",
          MaterialCode: "23255",
          cost: "252,255 LE",
          ProductName: "XXXXXXXX",
          ProductCode: "23255",
          AvgCost: "252,255 LE",
          AvgSellingPrice: "252,255 LE",
          Profit: "90.55",
          brandName: "Abu-Ouf",
          collected: "152,255 LE",
          uncollected: "252,255 LE",
          total: "252,255 LE",
          collectionRate: "52.2",
          StoreName: "Alexandria Store",
          ProgressAmount: "152,255 LE",
          Target: "252,255 LE",
          TargetRate: "52.2",
        },
        {
          Id: "6",
          ProductionLineName: "XXXXXXXXXXXXX",
          ProductionLineCode: "23255",
          MaterialName: "XXXXXXXXXXXXX",
          MaterialCode: "23255",
          cost: "252,255 LE",
          ProductName: "XXXXXXXX",
          ProductCode: "23255",
          AvgCost: "252,255 LE",
          AvgSellingPrice: "252,255 LE",
          Profit: "90.55",
          brandName: "Abu-Ouf",
          collected: "152,255 LE",
          uncollected: "252,255 LE",
          total: "252,255 LE",
          collectionRate: "52.2",
          StoreName: "Alexandria Store",
          ProgressAmount: "152,255 LE",
          Target: "252,255 LE",
          TargetRate: "52.2",
        },
      ],
      Links: [
        {
          name: `${this.$t("Dashboard")}`,
          url: "/dashboard",
        },
        {
          name: `${this.$t("FinancialSummary")}`,
        },
      ],
    };
  },
  components: {
    DoubleArrowsRight,
    HexaWarningIcon,
    ArrowIncreaseIcon,
    ArrowDecreaseIcon,
    AnomaliesStoresTarget,
    AnomaliesTadesMen,
    CostAnomaly,
  },
  computed: {
    ...mapGetters("finance/costs", [
      "expenses",
      "directAndIndirectCosts",
      "calcGenerateFinancialsCost",
      "latestFinancialsCost",
      "profitCost",
    ]),
  },
  mounted() {
    this.getAllExpenses();
    this.getDirectAndIndirectCosts();
    this.getLatestFinancialsCost();
    this.getProfitCost();
  },
  methods: {
    getFromDate(from) {
      this.expenseFrom = from;
      this.DICostFrom = from;
      this.profitCostFrom = from;
    },
    getToDate(to) {
      this.expenseTo = to;
      this.DICostTo = to;
      this.profitCostTo = to;
    },
    getAllExpenses() {
      this.$store.dispatch("finance/costs/fetchAllExpenses", {
        from: this.expenseFrom,
        to: this.expenseTo,
      });
    },
    getDirectAndIndirectCosts() {
      this.$store.dispatch("finance/costs/fetchDirectAndIndirectCosts", {
        from: this.DICostFrom,
        to: this.DICostTo,
      });
    },
    filterDirectIndirectExpenses() {
      this.getAllExpenses();
      this.getDirectAndIndirectCosts();
    },

    getCalcGenerateFinancialsCost() {
      this.$store.dispatch("finance/costs/fetchCalcGenerate");
      this.$store.dispatch("finance/costs/fetchLatestFinancialsCost");
    },
    getLatestFinancialsCost() {
      this.isLoading = true;
      this.$store
        .dispatch("finance/costs/fetchLatestFinancialsCost")
        .then(() => {
          this.isLoading = false;
        });
    },
    getGenerateProfitCost() {
      this.$store.dispatch("finance/costs/fetchGenerateProfitCost", {
        from: this.profitCostFrom,
        to: this.profitCostTo,
      });
      this.getProfitCost();
    },
    getProfitCost() {
      this.isLoadingProfitCost = true;
      this.$store
        .dispatch("finance/costs/fetchProfitCost", {
          from_date: this.profitCostFrom,
          to_date: this.profitCostTo,
        })
        .then(() => {
          this.isLoadingProfitCost = false;
        });
    },
    
  },
};
</script>

<style lang="scss" scoped>


</style>
