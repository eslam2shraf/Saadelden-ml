<template>
  <div class="container">
    <div class="logs-header">
      <h3 class="heading m-0">{{ $t("Logs") }}</h3>
      <base-bread-crumbs :Links="Links" />
    </div>
    <BaseCard>
      <BaseTable
        v-if="logsProfitCost && logsProfitCost.data"
        class="responsive_table table_raduis_bottom "
        :headings="Head"
        :data="logsProfitCost.data"
        :ordered-array="[
          'From',
          'To',
          'Created At',
          'Status',
          'Gross Profit',
          'total revenue',
        ]"
      >
        <template #Status="{ item }">
          <p v-if="item.Status === '1'" class="status-ok">{{$t('done')}}</p>
          <p v-else-if="item.Status === '0'" class="status-inprogress">
            {{$t('inprogress')}}
          </p>
        </template>
      </BaseTable>
      <BasePagenation
        v-if="logsProfitCost && logsProfitCost.pagination"
        class="p-2"
        :total-pages="16"
        :per-page="logsProfitCost.pagination.per_page"
        :current-page="logsProfitCost.pagination.current_page"
        :getData="getData"
      />
    </BaseCard>
  </div>
</template>
<script>
import BaseTable from "../base/BaseTable.vue";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      current_page: 1,
      last_page: 26,
      per_page: 10,
      total: 16,
      total_pages: 29,
      Head: [
        { id: 1, name: `${this.$t("from")}` },
        { id: 2, name: `${this.$t("to")}` },
        { id: 3, name: `${this.$t("Created_at")}` },
        { id: 4, name: `${this.$t("status")}` },
        { id: 5, name: `${this.$t("Gross_Profit")}` },
        { id: 6, name: `${this.$t("Total_Revenue")}` },
      ],
      Links: [
        {
          name: `${this.$t("Dashboard")}`,
          url: "/dashboard",
        },
        {
          name: `${this.$t("FinancialSummary")}`,
          url: "/finance",
        },
        {
          name: `${this.$t("Logs")}`,
        },
      ],
    };
  },
  components: { BaseTable },
  computed: {
    ...mapGetters("finance/costs", ["logsProfitCost"]),
  },
  // mounted() {
  //   this.getLogsProfitCost();
  // },
  created() {
    this.getLogsProfitCost();
  },
  methods: {
    // getLogsProfitCost() {
    //   this.isLoading = true;
    //   this.$store
    //     .dispatch("finance/costs/fetchLogsProfitCost", {
    //       page: this.current_page,
    //       per_page: this.per_page,
    //     })
    //     .finally(() => {
    //       this.isLoading = false;
    //     });
    // },
    getLogsProfitCost(page = null) {
      this.isLoading = true;
      if (page <= 16) {
        this.$store
          .dispatch("finance/costs/fetchLogsProfitCost", {
            page: page || this.current_page,
            per_page: this.per_page,
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
    },
    getData(page) {
      return this.getLogsProfitCost(page);
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  width: 90%;

  .card {
    margin: 0 20px;
  }

  .logs-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 36px 0;

    .heading {
      color: #171b1e;
      font-family: Poppins;
      font-size: 32px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }

    .hints {
      display: flex;
      align-content: center;

      span {
        margin: 0 16px;
        color: #929197;
        font-family: Poppins;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
      }
      .title {
        color: #171b1e;
        font-family: Poppins;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
      }
    }
  }
}
.status-ok {
  color: #298532;
  font-size: 16.36px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}
.status-inprogress {
  color: #c44e0c;
  font-size: 16.36px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}
</style>
