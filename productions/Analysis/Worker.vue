<template>
  <div class="d-flex flex_gap">
    <BaseCard class="card-lg bg-L_D_Yellow">
      <div class="d-flex flex-column flex_gap p-2 b-1">
        <LayoutsFilter
          @fromDate="getFromSmallestDate"
          @toDate="getToSmallestDate"
          :filter="() => fetchSmallestWorkersNums()"
          class="input-date--lg"
          :Msg="lowestErrMsg"
          @resetErrorMsg="setLowestErrorMsg"
        />
        <div>
          <h5 class="card-title mb-0">
            {{ $t("Smallestnum_workers_title") }}
          </h5>
        </div>
      </div>
      <div class="card-body mt-1">
        <h4 class="text-center" v-if="isSmallestWorkesLoading">
          {{ $t("loading") }}
        </h4>
        <template v-else>
          <BaseTable
            v-if="!smallestWorkersNums.response"
            class="responsive_table table_raduis_bottom min-h--20"
            :data="smallestWorkersNums"
            :headings="workersHead"
            :orderedArray="['process_number', 'workers_count']"
          />
          <h4 v-if="smallestWorkersNums.length === 0" class="text-center">
          {{ $t("nodataAvailable") }}
        </h4>
        <h4 v-if="smallestWorkersNums &&
              smallestWorkersNums.response &&
              smallestWorkersNums.response.data &&
              smallestWorkersNums.response.data.errors &&
              smallestWorkersNums.response.data.errors.to" class=" text-center">
            {{ $t('invaild_range') }}
          </h4>
        </template>
       
      </div>
    </BaseCard>
    <BaseCard class="card-lg bg-L_D_Yellow">
      <div class="d-flex flex-column flex_gap p-2 b-1">
        <LayoutsFilter
          @fromDate="getFromLargestDate"
          @toDate="getToLargestDate"
          :filter="() => fetchLargestWorkersNums()"
          class="input-date--lg"
          :Msg="highestErrMsg"
          @resetErrorMsg="setHighestErrorMsg"
        />
        <div>
          <h5 class="card-title mb-0">
            {{ $t("Largestnum_workers_title") }}
          </h5>
        </div>
      </div>
      <div class="card-body mt-1">
        <h4 class="text-center" v-if="islargestWorkesLoading">
          {{ $t("loading") }}
        </h4>
        <template v-else>
          <BaseTable
            v-if="!largestWorkersNums.response"
            class="responsive_table table_raduis_bottom min-h--20"
            :data="largestWorkersNums"
            :headings="workersHead"
            :orderedArray="['process_number', 'workers_count']"
          />
          <h4 v-if="largestWorkersNums.length === 0" class="text-center">
            {{ $t("nodataAvailable") }}
          </h4>
           <h4 v-if="largestWorkersNums &&
              largestWorkersNums.response &&
              largestWorkersNums.response.data &&
              largestWorkersNums.response.data.errors &&
              largestWorkersNums.response.data.errors.to" class=" text-center">
            {{ $t('invaild_range') }}
          </h4>
        </template>
      </div>
    </BaseCard>
  </div>
</template>
<script>
import Reset from '../../icon/Reset.vue';
export default {
  components: { Reset },
  name: "MLLargestWorker",

  data() {
    return {
      largest_filter_from: "",
      largest_filter_to: "",
      smallest_filter_from: "",
      smallest_filter_to: "",
      highestErrMsg: "",
      lowestErrMsg: "",
      islargestWorkesLoading: false,
      isSmallestWorkesLoading: false,

      workersHead: [
        { id: 1, name: `${this.$t("Production_line_Name")}` },
        { id: 2, name: `${this.$t("numberofWorkrs")}` },
      ],
    };
  },
  computed: {
    smallestWorkersNums() {
      return this.$store.getters["productions/Analysis/smallestWorkersNums"];
    },
    largestWorkersNums() {
      return this.$store.getters["productions/Analysis/largestWorkersNums"];
    },
  },
  mounted() {
    this.fetchSmallestWorkersNums();
    this.fetchLargestWorkersNums();
  },

  methods: {
    setHighestErrorMsg(msg) {
      this.highestErrMsg = msg;
    },
    setLowestErrorMsg(msg) {
      this.lowestErrMsg = msg;
    },
    getFromSmallestDate(from) {
      this.smallest_filter_from = from;
    },
    getToSmallestDate(to) {
      this.smallest_filter_to = to;
    },
    getFromLargestDate(from) {
      this.largest_filter_from = from;
    },
    getToLargestDate(to) {
      this.largest_filter_to = to;
    },
    fetchSmallestWorkersNums() {
      this.isSmallestWorkesLoading = true;
      this.$store
        .dispatch("productions/Analysis/fetchSmallestWorkersNums", {
          from: this.smallest_filter_from,
          to: this.smallest_filter_to,
        })
        .then(() => {
          this.isSmallestWorkesLoading = false;
          if(this.smallestWorkersNums &&
              this.smallestWorkersNums.response &&
              this.smallestWorkersNums.response.data &&
              this.smallestWorkersNums.response.data.errors &&
              this.smallestWorkersNums.response.data.errors.to){
                this.lowestErrMsg = this.smallestWorkersNums.response.data.errors.to[0];

              }
        });
    },
    fetchLargestWorkersNums() {
      this.islargestWorkesLoading = true;
      this.$store
        .dispatch("productions/Analysis/fetchLargestWorkersNums", {
          from: this.largest_filter_from,
          to: this.largest_filter_to,
        })
        .then(() => {
          this.islargestWorkesLoading = false;
          if(this.largestWorkersNums &&
              this.largestWorkersNums.response &&
              this.largestWorkersNums.response.data &&
              this.largestWorkersNums.response.data.errors &&
              this.largestWorkersNums.response.data.errors.to){
                this.highestErrMsg = this.largestWorkersNums.response.data.errors.to[0];

              }
        });
    },

  },
};
</script>

<style lang="scss" scoped></style>
