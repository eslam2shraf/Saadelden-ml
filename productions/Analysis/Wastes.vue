<template>
  <div class="d-flex flex_gap">
    <BaseCard class="card-lg bg-L_D_Yellow">
      <div class="d-flex flex_gap flex-column p-2 b-1">
        <LayoutsFilter
          @fromDate="getFromHighestDate"
          @toDate="getToHighestDate"
          :filter="() => fetchHighestWastage()"
          class="input-date--lg"
          :Msg="highestErrMsg"
          @resetErrorMsg="setHighestErrorMsg"
        />
        <div>
          <h5 class="card-title mb-0">
            {{ $t("most_wasteful_title") }}
          </h5>
        </div>
      </div>
      <div class="card-body mt-1">
        <h4 class="text-center" v-if="isHighestWastageLoading">
          {{ $t("loading") }}
        </h4>
        <template v-else>
          <BaseTable
            v-if="!highestWastage.response"
            class="responsive_table table_raduis_bottom min-h--20"
            :data="highestWastage"
            :headings="wastesHead"
            :orderedArray="['process_number', 'wastage_quantity']"
          />
          <h4 v-if="highestWastage.length === 0" class="text-center">
            {{ $t("nodataAvailable") }}
          </h4>
          <h4
            v-if="
              highestWastage &&
              highestWastage.response &&
              highestWastage.response.data &&
              highestWastage.response.data.errors &&
              highestWastage.response.data.errors.to
            "
            class="text-center"
          >
            {{ $t("invaild_range") }}
          </h4>
        </template>
      </div>
    </BaseCard>
    <BaseCard class="card-lg bg-L_D_Yellow">
      <div class="d-flex flex_gap flex-column p-2 b-1">
        <LayoutsFilter
          @fromDate="getFromLowestDate"
          @toDate="getToLowestDate"
          :filter="() => fetchLowestWastage()"
          class="input-date--lg"
          :Msg="lowestErrMsg"
          @resetErrorMsg="setLowestErrorMsg"
        />
        <div>
          <h5 class="card-title mb-0">
            {{ $t("Least_wasteful_title") }}
          </h5>
        </div>
      </div>
      <div class="card-body mt-1">
        <h4 class="text-center" v-if="isLowestWastageLoading">
          {{ $t("loading") }}
        </h4>
        <template v-else>
          <BaseTable
            v-if="!lowestWastage.response"
            class="responsive_table table_raduis_bottom min-h--20"
            :data="lowestWastage"
            :headings="wastesHead"
            :orderedArray="['process_number', 'wastage_quantity']"
          />
          <h4 v-if="lowestWastage.length === 0" class="text-center">
            {{ $t("nodataAvailable") }}
          </h4>
          <h4
            v-if="
              lowestWastage &&
              lowestWastage.response &&
              lowestWastage.response.data &&
              lowestWastage.response.data.errors &&
              lowestWastage.response.data.errors.to
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
  name: "WastesProductionLines",
  data() {
    return {
      highest_filter_from: "",
      highest_filter_to: "",
      lowest_filter_from: "",
      lowest_filter_to: "",
      highestErrMsg: "",
      lowestErrMsg: "",
      isLowestWastageLoading: false,
      isHighestWastageLoading: false,
      wastesHead: [
        { id: 1, name: `${this.$t("Production_line_Name")}` },
        { id: 2, name: `${this.$t("wastageamount")}` },
      ],
    };
  },
  computed: {
    lowestWastage() {
      return this.$store.getters["productions/Analysis/lowestWastage"];
    },
    highestWastage() {
      return this.$store.getters["productions/Analysis/highestWastage"];
    },
  },

  methods: {
    setHighestErrorMsg(msg) {
      this.highestErrMsg = msg;
    },
    setLowestErrorMsg(msg) {
      this.lowestErrMsg = msg;
    },
    getFromHighestDate(from) {
      this.highest_filter_from = from;
    },
    getToHighestDate(to) {
      this.highest_filter_to = to;
    },
    getFromLowestDate(from) {
      this.lowest_filter_from = from;
    },
    getToLowestDate(to) {
      this.lowest_filter_to = to;
    },
    fetchHighestWastage() {
      this.isHighestWastageLoading = true;
      this.$store
        .dispatch("productions/Analysis/fetchHighestWastage", {
          from: this.highest_filter_from,
          to: this.highest_filter_to,
        })
        .then(() => {
          this.isHighestWastageLoading = false;
          if (
            this.highestWastage &&
            this.highestWastage.response &&
            this.highestWastage.response.data &&
            this.highestWastage.response.data.errors &&
            this.highestWastage.response.data.errors.to
          ) {
            this.highestErrMsg = this.highestWastage.response.data.errors.to[0];
          }
        });
    },
    fetchLowestWastage() {
      this.isLowestWastageLoading = true;
      this.$store
        .dispatch("productions/Analysis/fetchLowestWastage", {
          from: this.lowest_filter_from,
          to: this.lowest_filter_to,
        })
        .then(() => {
          this.isLowestWastageLoading = false;
          if (
            this.lowestWastage &&
            this.lowestWastage.response &&
            this.lowestWastage.response.data &&
            this.lowestWastage.response.data.errors &&
            this.lowestWastage.response.data.errors.to
          ) {
            this.lowestErrMsg = this.lowestWastage.response.data.errors.to[0];
          }
        });
    },
  },
  mounted() {
    this.fetchLowestWastage();
    this.fetchHighestWastage();
  },
};
</script>

<style></style>
