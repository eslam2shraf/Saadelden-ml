<template>
  <BaseCard class="p-2 bg-L_D_Yellow-50">
    <h3 class="title">{{ $t("peak_hour") }}</h3>
    <hr class="title_bottom title_bottom-8 mb-5" />
    <div class="d-flex flex_gap justify-content-center">
      <BaseCard class="p-2 card-sm bg-orange" v-if="peakTime && peakTime.hour">
        <h4 class="mb-1">
          {{ $t("peak_hour_visited_hour") }}
        </h4>
        <div class="d-flex flex_gap--lg flex-wrap">
          <div class="d-flex flex-row align-items-center flex_gap">
            <ClockIcon class="icon-md-sm" />
            <span class="h4 font-weight-normal">
              {{ peakTime.hour }}
              <span v-if="peakTime.hour > 12">
                {{ $t("PM") }}
              </span>
              <span v-else>
                {{ $t("AM") }}
              </span>
            </span>
          </div>
        </div>
      </BaseCard>
      <BaseCard
        class="p-2 card-sm bg-MIDWINTER_MIST"
        v-if="peakTime && peakTime.hour"
      >
        <h4 class="mb-1">
          {{ $t("peak_hour_reciepts") }}
        </h4>
        <div class="d-flex flex_gap--lg flex-wrap">
          <div class="d-flex flex-row align-items-center flex_gap">
            <ReceiptIcon class="icon-md-sm" />

            <span class="h4 font-weight-normal">
              {{ peakTime.purchases_count }}
            </span>
          </div>
        </div>
      </BaseCard>
    </div>
  </BaseCard>
</template>

<script>
import { mapGetters } from "vuex";
import ClockIcon from "../../icon/Clock.vue";
import ReceiptIcon from "../../icon/Receipt.vue";
export default {
  components: { ReceiptIcon, ClockIcon },
  name: "PeakHour",
  computed: {
    ...mapGetters("productions/Anomaly", [
      "loading",
      "success",
      "error",
      "peakTime",
    ]),
  },
  created() {
    this.$store.dispatch("productions/Anomaly/fetchPeakTime");
  },
};
</script>

<style>
</style>