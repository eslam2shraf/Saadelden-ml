<template>
  <BaseCard class="seller-cost">
    <div class="d-flex justify-content-flex-end mb-1">
      <base-year-picker
        class="text-NORDIC"
        @year="getSelectedYear"
        :startYear="2018"
        v-model="selectedYear"
      />
    </div>

    <h4 v-if="isLoading" class="text-center">{{ $t("loading") }}</h4>
    <div v-if="sellerCost && !isLoading" class="seller-cost__items">
      <div class="d-flex flex_gap--md justify-content-space-between two">
        <p
          v-if="sellerCost.ratioOfSellerSalaryOfTotal >= 0"
          class="seller-cost__items__item m-0"
        >
          <span class="word-break">
            {{ firstTwoDigit(sellerCost.ratioOfSellerSalaryOfTotal) }} %
          </span>
          <span>
            {{ $t("Salary_Cost")
            }}<span class="font-weight--600"> {{ $t("Ratio") }}</span>
            {{ $t("Yearly_Cost_Evaluation") }}
          </span>
        </p>
        <hr class="m-0" />
        <p
          v-if="sellerCost.sellerSalary >= 0"
          class="seller-cost__items__item m-0"
        >
          <span>
            {{ firstTwoDigit(sellerCost.sellerSalary) }} {{ $t("LE") }}
          </span>
          <span v-if="this.$i18n.locale === 'en'">
            {{ $t("Total_seller") }}
            <span class="font-weight--600"> {{ $t("cost") }} </span
            >{{ $t("of_this_year") }}
          </span>
          <span v-if="this.$i18n.locale === 'ar'">
            <span class="font-weight--600"> {{ $t("Cost") }} </span>
            {{ $t("Total_seller") }}{{ $t("of_this_year") }}
          </span>
        </p>
      </div>
      <hr class="w-80 hr" />
      <p v-if="sellerCost.totalCost >= 0" class="seller-cost__items__item m-0">
        <span> {{ firstTwoDigit(sellerCost.totalCost) }} {{ $t("LE") }} </span>
        <span v-if="this.$i18n.locale === 'en'">
          {{ $t("General") }}
          <span class="font-weight--600"> {{ $t("cost") }} </span
          >{{ $t("of_this_year") }}
        </span>
        <span v-if="this.$i18n.locale === 'ar'">
          {{ $t("cost") }}
          <span class="font-weight--600"> {{ $t("General") }} </span
          >{{ $t("of_this_year") }}
        </span>
      </p>
    </div>
    <p v-else class="text-center m-0">
      {{ $t("nodataAvailable") }}
    </p>
    <p
      v-if="
        sellerCost &&
        sellerCost.status &&
        sellerCost.status === false &&
        !isLoading
      "
      class="text-center m-0"
    >
      {{ $t("nodataAvailable") }}
    </p>
  </BaseCard>
</template>

<script>
import { mapGetters } from "vuex";
import BaseYearPicker from "../../base/BaseYearPicker.vue";
export default {
  components: { BaseYearPicker },
  name: "SellerCost",
  data() {
    return {
      sellerId: this.$route.params.id,
      chartData: null,
      isLoading: false,
      selectedYear: "2023",
    };
  },
  computed: {
    ...mapGetters("employees/sellers", ["sellerCost"]),
  },
  mounted() {
    this.getSellerCost();
  },
  watch: {
    selectedYear() {
      this.getSellerCost();
    },
  },

  methods: {
    getSelectedYear(year) {
      this.selectedYear = year;
    },
    getSellerCost() {
      this.isLoading = true;
      const data = {
        id: this.sellerId,
      };
      if (this.selectedYear !== "") {
        data.year = this.selectedYear;
      }
      this.$store
        .dispatch("employees/sellers/fetchSellerCost", data)
        .then(() => {
          this.isLoading = false;
        });
    },
    firstTwoDigit(num) {
      return num.toFixed(2);
    },
  },
};
</script>

<style></style>

