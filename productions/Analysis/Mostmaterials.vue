<template>
  <BaseCard class="card-lg bg-L_D_Yellow">
    <div class="d-flex flex-gap flex-column p-2 b-1 bt-0">
      <LayoutsFilter
        @fromDate="getFromDate"
        @toDate="getToDate"
        :filter="() => fetchMostUsedMaterials()"
        class="input-date--lg"
        :Msg="errorMessage"
        @resetErrorMsg="setErrorMsg"
      />
      <h5 class="card-title mb-0">
        {{ $t("Most_Used_Materials") }}
      </h5>
    </div>
    <div class="card-body mt-2">
      <h4 class="m-auto text-center" v-if="isLoading">
        {{ $t("loading") }}
      </h4>
      <template v-else>
        <BaseTable
          class="table_raduis_bottom min-h--20"
          v-if="!mostUsedMaterials.response"
          :data="mostUsedMaterials"
          :amount="true"
          :headings="materialsHead"
          :orderedArray="['name', 'quantity']"
        />
        <h4 v-if="mostUsedMaterials.length === 0 && !isLoading" class="m-auto">
          {{ $t("nodataAvailable") }}
        </h4>
        <h4
          v-if="
            mostUsedMaterials &&
            mostUsedMaterials.response &&
            mostUsedMaterials.response.data &&
            mostUsedMaterials.response.data.errors &&
            mostUsedMaterials.response.data.errors.to
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
  components: { Reset },
  name: "MostUsedMaterials",
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
    mostUsedMaterials() {
      return this.$store.getters["productions/Analysis/mostUsedMaterials"];
    },
  },

  methods: {
    getFromDate(from) {
      this.filterFrom = from;
    },
    getToDate(to) {
      this.filterTo = to;
    },
    setErrorMsg(msg) {
      this.errorMessage = msg;
    },
    fetchMostUsedMaterials() {
      this.isLoading = true;
      this.$store
        .dispatch("productions/Analysis/fetchMostUsedMaterials", {
          from: this.filterFrom,
          to: this.filterTo,
        })
        .then(() => {
          this.isLoading = false;
          if (
            this.mostUsedMaterials &&
            this.mostUsedMaterials.response &&
            this.mostUsedMaterials.response.data &&
            this.mostUsedMaterials.response.data.errors &&
            this.mostUsedMaterials.response.data.errors.to
          ) {
            this.errorMessage =
              this.mostUsedMaterials.response.data.errors.to[0];
          }
        });
    },
  },
  mounted() {
    this.fetchMostUsedMaterials();
  },
};
</script>

<style></style>
