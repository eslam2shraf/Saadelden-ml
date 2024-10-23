<template>
  <BaseCard class="card-lg bg-L_D_Yellow">
    <div class="d-flex flex-gap flex-column p-2 b-1 bt-0">
      <LayoutsFilter
        @fromDate="getFromDate"
        @toDate="getToDate"
        :filter="() => fetchLessUsedMaterials()"
        class="input-date--lg"
        :Msg="errorMessage"
        @resetErrorMsg="setErrorMsg"
      />
      <h5 class="card-title mb-0">
        {{ $t("Least_Used_Materials") }}
      </h5>
    </div>

    <div class="card-body mt-2">
      <h4 class="m-auto text-center" v-if="isLoading">
        {{ $t("loading") }}
      </h4>
      <template v-else>
        <BaseTable
          class="table_raduis_bottom min-h--20"
          v-if="!lessUsedMaterials.response"
          :data="lessUsedMaterials"
          :headings="materialsHead"
          :amount="true"
          :orderedArray="['name', 'quantity']"
        />
        <h4 v-if="lessUsedMaterials.length === 0" class="m-auto">
          {{ $t("nodataAvailable") }}
        </h4>
        <h4
          v-if="
            lessUsedMaterials &&
            lessUsedMaterials.response &&
            lessUsedMaterials.response.data &&
            lessUsedMaterials.response.data.errors &&
            lessUsedMaterials.response.data.errors.to
          "
          class="text-center"
        >
          {{ $t("invaild_range") }}
        </h4>
      </template>
    </div>
  </BaseCard>
</template>

<script>
import Reset from "../../icon/Reset.vue";

export default {
  name: "LeastUsedMaterials",
  data() {
    return {
      filterFrom: "",
      filterTo: "",
      isLoading: false,
      errorMessage: "",
      materialsHead: [
        { id: 1, name: `${this.$t("material_name")}` },
        { id: 2, name: `${this.$t("amount")}` },
      ],
    };
  },
  computed: {
    lessUsedMaterials() {
      return this.$store.getters["productions/Analysis/lessUsedMaterials"];
    },
  },
  methods: {
    setErrorMsg(msg) {
      this.errorMessage = msg;
    },
    getFromDate(from) {
      this.filterFrom = from;
    },
    getToDate(to) {
      this.filterTo = to;
    },
    fetchLessUsedMaterials() {
      this.isLoading = true;
      this.$store
        .dispatch("productions/Analysis/fetchLessUsedMaterials", {
          from: this.filterFrom,
          to: this.filterTo,
        })
        .then(() => {
          this.isLoading = false;
          if (
            this.lessUsedMaterials &&
            this.lessUsedMaterials.response &&
            this.lessUsedMaterials.response.data &&
            this.lessUsedMaterials.response.data.errors &&
            this.lessUsedMaterials.response.data.errors.to
          ) {
            this.errorMessage =
              this.lessUsedMaterials.response.data.errors.to[0];
          }
        });
    },
  },
  mounted() {
    this.fetchLessUsedMaterials();
  },
  components: { Reset },
};
</script>

<style></style>
