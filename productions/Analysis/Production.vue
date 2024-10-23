<template>
  <div class="d-flex flex_gap">
    <BaseCard class="card-lg bg-L_D_Yellow">
      <LayoutsFilter
        @fromDate="getFromFastestDate"
        @toDate="getToFastestDate"
        :filter="() => fatestProductionLine()"
        class="input-date--lg p-1"
        :Msg="highestErrMsg"
        @resetErrorMsg="setHighestErrorMsg"
      />
      <div class="d-flex flex_gap mb-1 ml-3 b-1 mb-3 mt-2">
        <img src="@/assets/images/icons/arrow_up.png" class="icon-md" />

        <div>
          <h5 class="card-title mb-1">
            {{ $t("Fastes_production_lines") }}
          </h5>
          <span class="card-subtitle">
            {{ $t("Fastes_production_linesDesc") }}
          </span>
        </div>
      </div>

      <div class="card-body mt-1">
        <h4 class="m-auto text-center" v-if="isFastestProdutionLinesLoading">
          {{ $t("loading") }}
        </h4>
        <template v-else>
          <BaseTable
            v-if="!FatestProductionLine.response"
            class="responsive_table table_raduis_bottom min-h--20"
            :data="FatestProductionLine"
            :headings="fatestHead"
            :orderedArray="['id', 'process_number', 'duration']"
          />
          <h4
            v-if="
              FatestProductionLine.length === 0 &&
              !isFastestProdutionLinesLoading
            "
            class="m-auto text-center"
          >
            {{ $t("nodataAvailable") }}
          </h4>
          <h4
            v-if="
              FatestProductionLine &&
              FatestProductionLine.response &&
              FatestProductionLine.response.data &&
              FatestProductionLine.response.data.errors &&
              FatestProductionLine.response.data.errors.to
            "
            class="text-center"
          >
            {{ $t("invaild_range") }}
          </h4>
        </template>
      </div>
    </BaseCard>
    <BaseCard class="card-lg bg-L_D_Yellow">
      <LayoutsFilter
        @fromDate="getFromLowestDate"
        @toDate="getToLowestDate"
        :filter="() => lowestProductionLine()"
        class="input-date--lg p-1"
        :Msg="lowestErrMsg"
        @resetErrorMsg="setLowestErrorMsg"
      />
      <div class="d-flex flex_gap mb-1 ml-3 b-1 mb-3 mt-2">
        <img src="@/assets/images/icons/arrow_down.png" class="icon-md" />
        <div>
          <h5 class="card-title mb-1">
            {{ $t("slowest_production_lines") }}
          </h5>
          <span class="card-subtitle">
            {{ $t("slowest_production_linesDesc") }}
          </span>
        </div>
      </div>

      <div class="card-body mt-1">
        <h4 class="m-auto text-center" v-if="islowestProdutionLinesLoading">
          {{ $t("loading") }}
        </h4>
        <template v-else>
          <BaseTable
            v-if="!SlowestProductionLine.response"
            class="responsive_table table_raduis_bottom min-h--20"
            :data="SlowestProductionLine"
            :headings="fatestHead"
            :orderedArray="['id', 'process_number', 'duration']"
          />
          <h4
            v-if="
              SlowestProductionLine.length === 0 &&
              !islowestProdutionLinesLoading
            "
            class="m-auto text-center"
          >
            {{ $t("nodataAvailable") }}
          </h4>
          <h4
            v-if="
              SlowestProductionLine &&
              SlowestProductionLine.response &&
              SlowestProductionLine.response.data &&
              SlowestProductionLine.response.data.errors &&
              SlowestProductionLine.response.data.errors.to
            "
            class="text-center"
          >
            {{ $t("invaild_range") }}
          </h4>
        </template>
      </div>
    </BaseCard>
  </div>
</template>
<script>
import Reset from "../../icon/Reset.vue";
export default {
  components: { Reset },
  name: "MLFastestProduction",
  computed: {
    FatestProductionLine() {
      return this.$store.getters["productions/Analysis/fatestProductionLine"];
    },
    SlowestProductionLine() {
      return this.$store.getters["productions/Analysis/slowestProductionLine"];
    },
  },
  data() {
    return {
      fastest_filter_from: "",
      fastest_filter_to: "",
      lowest_filter_from: "",
      lowest_filter_to: "",
      highestErrMsg: "",
      lowestErrMsg: "",
      isFastestProdutionLinesLoading: false,
      islowestProdutionLinesLoading: false,
      fatestHead: [
        { id: 1, name: `${this.$t("Production_line_code")}` },
        { id: 2, name: `${this.$t("Production_line_Name")}` },
        { id: 3, name: `${this.$t("Production_line_time")}` },
      ],
    };
  },

  mounted() {
    this.fatestProductionLine();
    this.lowestProductionLine();
  },

  methods: {
    setHighestErrorMsg(msg) {
      this.highestErrMsg = msg;
    },
    setLowestErrorMsg(msg) {
      this.lowestErrMsg = msg;
    },
    getToFastestDate(to) {
      this.fastest_filter_to = to;
    },
    getFromFastestDate(from) {
      this.fastest_filter_from = from;
    },
    getToLowestDate(to) {
      this.lowest_filter_to = to;
    },
    getFromLowestDate(from) {
      this.lowest_filter_from = from;
    },
    lowestProductionLine() {
      this.islowestProdutionLinesLoading = true;
      this.$store
        .dispatch("productions/Analysis/fetchSlowestProductionLine", {
          from: this.lowest_filter_from,
          to: this.lowest_filter_to,
        })
        .then(() => {
          this.islowestProdutionLinesLoading = false;
          if (
            this.SlowestProductionLine &&
            this.SlowestProductionLine.response &&
            this.SlowestProductionLine.response.data &&
            this.SlowestProductionLine.response.data.errors &&
            this.SlowestProductionLine.response.data.errors.to
          ) {
            this.lowestErrMsg =
              this.SlowestProductionLine.response.data.errors.to[0];
          }
        });
    },
    fatestProductionLine() {
      this.isFastestProdutionLinesLoading = true;
      this.$store
        .dispatch("productions/Analysis/fetchFatestProductionLine", {
          from: this.fastest_filter_from,
          to: this.fastest_filter_to,
        })
        .then(() => {
          this.isFastestProdutionLinesLoading = false;
          if (
            this.FatestProductionLine &&
            this.FatestProductionLine.response &&
            this.FatestProductionLine.response.data &&
            this.FatestProductionLine.response.data.errors &&
            this.FatestProductionLine.response.data.errors.to
          ) {
            this.highestErrMsg =
              this.FatestProductionLine.response.data.errors.to[0];
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
