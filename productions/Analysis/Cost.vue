<template>
  <div class="d-flex flex_gap">
    <BaseCard class="card-lg bg-L_D_Yellow">
      <div class="d-flex flex-column flex_gap p-2 b-1">
        <LayoutsFilter
          @fromDate="getFromhighestDate"
          @toDate="getTohighestDate"
          :filter="() => fetchHighestCost()"
          class="input-date--lg"
          :Msg="highestErrMsg"
          @resetErrorMsg="setHighestErrorMsg"
        />
        <div>
          <h5 class="card-title mb-0">
            {{ $t("highestCosttitle") }}
          </h5>
        </div>
      </div>
      <div class="card-body mt-1">
        <h4 class="text-center" v-if="isHighesCostsLoading">
          {{ $t("loading") }}
        </h4>
        <template v-else>
          <BaseTable
            v-if="!highestcost.response"
            class="responsive_table table_raduis_bottom min-h--20"
            :data="highestcost"
            :headings="costsHead"
            :orderedArray="['process_number', 'total_cost']"
          />
          <h4 v-if="highestcost.length === 0" class="m-auto text-center">
            {{ $t("nodataAvailable") }}
          </h4>
          <h4
            v-if="
              highestcost &&
              highestcost.response &&
              highestcost.response.data &&
              highestcost.response.data.errors &&
              highestcost.response.data.errors.to
            "
            class="text-center"
          >
            {{ $t("invaild_range") }}
          </h4>
        </template>
      </div>
    </BaseCard>
    <BaseCard class="card-lg bg-L_D_Yellow">
      <div class="d-flex flex-column flex_gap p-2 b-1">
        <LayoutsFilter
          @fromDate="getFromLowestDate"
          @toDate="getToLowestDate"
          :filter="() => fetchLowestCost()"
          class="input-date--lg"
          :Msg="lowestErrMsg"
          @resetErrorMsg="setLowestErrorMsg"
        />
        <div>
          <h5 class="card-title mb-0">
            {{ $t("lowestCost_title") }}
          </h5>
        </div>
      </div>
      <div class="card-body mt-1">
        <h4 class="text-center" v-if="isLowestCostsLoading">
          {{ $t("loading") }}
        </h4>
        <template v-else>
          <BaseTable
            v-if="!lowestcost.response"
            class="responsive_table table_raduis_bottom min-h--20"
            :data="lowestcost"
            :headings="costsHead"
            :orderedArray="['process_number', 'total_cost']"
          />
          <h4 v-if="lowestcost.length === 0" class="m-auto text-center">
            {{ $t("nodataAvailable") }}
          </h4>
          <h4
            v-if="
              lowestcost &&
              lowestcost.response &&
              lowestcost.response.data &&
              lowestcost.response.data.errors &&
              lowestcost.response.data.errors.to
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
  name: "MLHighestCost",

  data() {
    return {
      highest_filter_from: "",
      highest_filter_to: "",
      lowest_filter_from: "",
      lowest_filter_to: "",
      highestErrMsg: "",
      lowestErrMsg: "",
      isLowestCostsLoading: false,
      isHighesCostsLoading: false,
      costsHead: [
        { id: 1, name: `${this.$t("Production_line_Name")}` },
        { id: 2, name: `${this.$t("Cost")}` },
      ],
    };
  },
  computed: {
    highestcost() {
      return this.$store.getters["productions/Analysis/highestcost"];
    },
    lowestcost() {
      return this.$store.getters["productions/Analysis/lowestcost"];
    },
    error() {
      return this.$store.getters["productions/Analysis/error"];
    },
  },
  mounted() {
    this.fetchHighestCost();
    this.fetchLowestCost();
  },

  methods: {
    getFromhighestDate(from) {
      this.highest_filter_from = from;
    },
    getTohighestDate(to) {
      this.highest_filter_to = to;
    },
    getFromLowestDate(from) {
      this.lowest_filter_from = from;
    },
    getToLowestDate(to) {
      this.lowest_filter_to = to;
    },
    setHighestErrorMsg(msg){
      this.highestErrMsg = msg
    },
    setLowestErrorMsg(msg){
      this.lowestErrMsg = msg
    },
    fetchHighestCost() {
      this.isHighesCostsLoading = true;
      this.$store
        .dispatch("productions/Analysis/fetchHighestCost", {
          from: this.highest_filter_from,
          to: this.highest_filter_to,
        })
        .then(() => {
          this.isHighesCostsLoading = false;
          if (
            this.highestcost &&
            this.highestcost.response &&
            this.highestcost.response.data &&
            this.highestcost.response.data.errors &&
            this.highestcost.response.data.errors.to
          ) {
            this.highestErrMsg = this.highestcost.response.data.errors.to[0];
          }
        });
    },
    fetchLowestCost() {
      this.isLowestCostsLoading = true;
      this.$store
        .dispatch("productions/Analysis/fetchLowestCost", {
          from: this.lowest_filter_from,
          to: this.lowest_filter_to,
        })
        .then(() => {
          this.isLowestCostsLoading = false;
          if( this.lowestcost &&
            this.lowestcost.response &&
            this.lowestcost.response.data &&
            this.lowestcost.response.data.errors &&
            this.lowestcost.response.data.errors.to){
              this.lowestErrMsg = this.highestcost.response.data.errors.to[0];

            }
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
