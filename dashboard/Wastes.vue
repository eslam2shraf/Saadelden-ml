<template>
  <BaseCard class="border-solid p-2 Wastes" v-bind="$attrs" v-on="$listeners">
    <h3 class="title mb-1">
      {{ $t("Wastes") }}
    </h3>
    <hr class="title_bottom title_bottom-22 mb-3" />
    <div class="d-flex flex-column justify-content-space-between flex_gap">
      <BaseCard class="bg_NORDIC Wastes__subcard" v-if="highestWastage">
        <div class="card-body p-1">
          <h5 class="mb-0">
            {{ $t("most_wasteful_title") }}
          </h5>
          <p
            class="d-flex flex-row flex_gap align-items-center text-soya_bean mt-1"
          >
            <span
              v-if="highestWastage.wastage_quantity"
              class="card-title font_weight_bold"
            >
              {{ highestWastage.wastage_quantity }}
            </span>
            <span
              v-if="
                highestWastage.wastage_quantity === 0 ||
                highestWastage.wastage_quantity > 10
              "
              class="card-subtitle text-soya_bean"
            >
              {{ $t("item") }}
            </span>
            <span
              v-if="highestWastage.wastage_quantity <= 10"
              class="card-subtitle text-soya_bean"
            >
              {{ $t("items") }}
            </span>
          </p>
          <p class="d-flex flex-column">
            <span class="font_weight_bold">
              {{ $t("productionLine_name") }}
            </span>
            <span
              v-if="highestWastage.process_number"
              class="card-subtitle text-neutral_White"
            >
              {{ highestWastage.process_number }}
            </span>
          </p>
        </div>
      </BaseCard>
      <BaseCard class="bg-L_D_Yellow Wastes__subcard mb-4" v-if="lowestWastage">
        <div class="card-body p-1">
          <h5 class="mb-0">
            {{ $t("Least_wasteful_title") }}
          </h5>
          <p
            class="d-flex flex-row flex_gap align-items-center text-soya_bean mt-1"
          >
            <span
              v-if="lowestWastage.wastage_quantity"
              class="card-title font_weight_bold"
            >
              {{ lowestWastage.wastage_quantity }}
            </span>
            <span
              v-if="
                lowestWastage.wastage_quantity === 0 ||
                lowestWastage.wastage_quantity > 10
              "
              class="card-subtitle text-soya_bean"
            >
              {{ $t("item") }}
            </span>
            <span
              v-if="lowestWastage.wastage_quantity <= 10"
              class="card-subtitle text-soya_bean"
            >
              {{ $t("items") }}
            </span>
          </p>
          <p class="d-flex flex-column">
            <span class="font_weight_bold">
              {{ $t("productionLine_name") }}
            </span>
            <span
              v-if="lowestWastage.process_number"
              class="card-subtitle text-black"
            >
              {{ lowestWastage.process_number }}
            </span>
          </p>
        </div>
      </BaseCard>
    </div>
  </BaseCard>
</template>

<script>
export default {
  name: "ProductionLineWastes",
  computed: {
    lowestWastage() {
      return this.$store.getters["productions/Analysis/lowestWastage"];
    },
    highestWastage() {
      return this.$store.getters["productions/Analysis/highestWastage"];
    },
  },
  mounted() {
    this.$store.dispatch("productions/Analysis/fetchHighestWastage");
    this.$store.dispatch("productions/Analysis/fetchLowestWastage");
  },
};
</script>

<style lang="scss">
.Wastes {
  height: toRem(432);
  &__subcard {
    height: auto;
  }
}
@media (max-width: $screen-lg) {
  .Wastes {
    height: auto;
    &__subcard {
      height: auto;
    }
  }
}
</style>