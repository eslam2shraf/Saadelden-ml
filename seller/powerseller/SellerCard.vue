<template>
  <BaseCard class="ai-power-seller">
    <slot name="filter"></slot>
    <h4 v-if="isLoading" class="text-center">{{ $t("loading") }}</h4>
    <template v-for="(seller, index) in sellerData">
      <div class="" :key="index" v-if="index === activeSlide">
        <div class="ai-power-seller__head">
          <slot name="title"></slot>
          <div class="ai-power-seller__head__result">
            <p v-if="cardType != 'store'">
              <span class="ai-power-seller__head__result__title">
                {{ $t("according_results") }}
              </span>
              <span class="ai-power-seller__head__result__value">
                <span>{{ $t("month") }}: {{ seller.data.month }} </span>
                <span>{{ $t("year") }}: {{ seller.data.year }} </span>
              </span>
            </p>
            <crown v-if="seller.data.jocker" />
          </div>
        </div>
        <div class="ai-power-seller__content mt-3">
          <span class="ai-power-seller__content__index"> {{ index + 1 }} </span>
          <div class="ai-power-seller__content__details">
            <p v-if="cardType == 'store'">
              <span class="ai-power-seller__content__details__key">
                {{ $t("store_name") }}:
              </span>
              <span class="ai-power-seller__content__details__value">
                {{ seller.store_name }}
              </span>
            </p>
            <p v-if="cardType == 'store'">
              <span class="ai-power-seller__content__details__key">
                {{ $t("working_days_in_store") }}:
              </span>
              <span class="ai-power-seller__content__details__value">
                {{ seller.data.day }}
              </span>
            </p>
            <p v-if="cardType == 'store'">
              <span class="ai-power-seller__content__details__key">
                {{ $t("month") }}:
              </span>
              <span class="ai-power-seller__content__details__value">
                {{ seller.data.month }}
              </span>
            </p>
            <p v-if="cardType == 'store'">
              <span class="ai-power-seller__content__details__key">
                {{ $t("year") }}:
              </span>
              <span class="ai-power-seller__content__details__value">
                {{ seller.data.year }}
              </span>
            </p>
            <p v-if="cardType != 'store'">
              <span class="ai-power-seller__content__details__key">
                {{ $t("seller_name") }}:
              </span>
              <span class="ai-power-seller__content__details__value">
                {{ seller.seller_name }}
                <span
                  v-if="seller.data.suspend !== 0"
                  class="text_status--red ai-power-seller__content__details__value__status"
                >
                  <suspended />
                  {{ $t("Suspended") }}
                </span>
                <span
                  v-if="seller.data.suspend === 0"
                  class="text_status--green ai-power-seller__content__details__value__status"
                >
                  <active />
                  {{ $t("active") }}
                </span>
              </span>
            </p>
            <p v-if="cardType != 'store'">
              <span class="ai-power-seller__content__details__key">
                {{ $t("email") }}:
              </span>
              <span class="ai-power-seller__content__details__value">
                {{ seller.seller_email }}
              </span>
            </p>
            <p v-if="cardType != 'store'">
              <span class="ai-power-seller__content__details__key">
                {{ $t("store_performance_locator") }}:
              </span>
              <span class="ai-power-seller__content__details__value">
                {{ seller.store_name }}
              </span>
            </p>
            <p v-if="cardType != 'store'">
              <span class="ai-power-seller__content__details__key">
                {{ $t("main_store") }}:
              </span>
              <span class="ai-power-seller__content__details__value">
                {{ seller.main_store_name }}
              </span>
            </p>
            <div class="d-flex flex_gap--lg justify-content-space-between">
              <div class="ai-power-seller__content__details">
                <p>
                  <span class="ai-power-seller__content__details__key">
                    {{ $t("store_category") }}:
                  </span>
                  <span class="ai-power-seller__content__details__value">
                    {{ seller.data.store_category }}
                  </span>
                </p>
                <p v-if="cardType != 'store'">
                  <span class="ai-power-seller__content__details__key">
                    {{ $t("num_shifts") }}:
                  </span>
                  <span class="ai-power-seller__content__details__value">
                    {{ seller.data.num_of_shifts }}
                  </span>
                </p>
              </div>
              <div class="ai-power-seller__content__details">
                <p v-if="cardType != 'store'">
                  <span class="ai-power-seller__content__details__key">
                    {{ $t("exprience") }}({{ $t("months") }}):
                  </span>
                  <span class="ai-power-seller__content__details__value">
                    {{ seller.data.month_difference }}
                  </span>
                </p>
                <p v-if="cardType != 'store'">
                  <span class="ai-power-seller__content__details__key">
                    {{ $t("working_days") }}:
                  </span>
                  <span class="ai-power-seller__content__details__value">
                    {{ seller.data.working_days }}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <hr class="ai-power-seller__content__hr" />
          <div
            v-if="cardType != 'store'"
            class="ai-power-seller__content__target"
          >
            <p>
              <target />
              <span>
                <span> {{ $t("target") }} </span>
                <span>
                  {{ firstTwoDigit(seller.data.required_target) }}
                  {{ $t("LE") }}
                </span>
              </span>
            </p>
            <p>
              <achieved-target />
              <span>
                <span> {{ $t("Achieved_Target") }} </span>
                <span> {{ seller.data.transactions }} {{ $t("LE") }}</span>
              </span>
            </p>
            <p>
              <precentage />
              <span>
                <span> {{ $t("Target_Percentage") }}</span>
                <span>
                  {{ firstTwoDigit(calcPrecentage(seller.data.Growth)) }}
                  {{ $t("LE") }}
                </span>
              </span>
            </p>
          </div>
          <div
            v-if="cardType == 'store'"
            class="ai-power-seller__content__target"
          >
            <p>
              <target />
              <span>
                <span> {{ $t("target") }} </span>
                <span>
                  {{ firstTwoDigit(seller.data.target) }} {{ $t("LE") }}
                </span>
              </span>
            </p>
            <p>
              <achieved-target />
              <span>
                <span> {{ $t("Achieved_Target") }} </span>
                <span> {{ seller.data.price }} {{ $t("LE") }}</span>
              </span>
            </p>
            <p>
              <precentage />
              <span>
                <span> {{ $t("Target_Percentage") }} </span>
                <span>
                  {{ firstTwoDigit(calcPrecentage(seller.data.growth)) }}
                  {{ $t("LE") }}
                </span>
              </span>
            </p>
          </div>
          <hr class="ai-power-seller__content__hr" />
          <div
            v-if="cardType != 'store'"
            class="ai-power-seller__content__target"
          >
            <p class="mb-0">
              <arrow-growth />
              <span>
                <span> {{ $t("Growth") }} </span>
                <span> {{ firstTwoDigit(seller.data.Growth) }} </span>
              </span>
            </p>
          </div>
          <div
            v-if="cardType == 'store'"
            class="ai-power-seller__content__target"
          >
            <p class="mb-0">
              <arrow-growth />
              <span>
                <span> {{ $t("Growth") }} </span>
                <span> {{ firstTwoDigit(seller.data.growth) }} </span>
              </span>
            </p>
          </div>
        </div>
        <div class="ai-power-seller__transactions mt-9">
          <CategoriesChart
            :values="seller"
            class="ai-power-seller__transactions__categoriescharts"
          />
          <hr class="ai-power-seller__transactions__hr" />
          <div class="ai-power-seller__transactions__values">
            <p class="transactions-nums">
              <span>{{ $t("Num_Transactions") }}</span>
              <span>
                {{
                  numberTransactions(
                    seller.data.order_status_delivered,
                    seller.data.order_status_partially_refunded,
                    seller.data.order_status_hole_refunded
                  )
                }}</span
              >
            </p>
            <p class="transactions-rate-wrapper d-flex flex_gap flex-column">
              <span class="transactions-rate-wrapper__rate">
                <span> {{ $t("Win_rate") }} </span>
                <span> {{ seller.data.win_rate }}% </span>
              </span>
              <span class="transactions-rate-wrapper__desc">
                {{ $t("Percentage_between_delivered_and_refunded") }}
              </span>
            </p>
            <div class="transactions-status">
              <p class="transactions-status__values">
                <span> {{ seller.data.order_status_delivered }} </span>
                <span>
                  {{ seller.data.order_status_partially_refunded }}
                </span>
                <span> {{ seller.data.order_status_hole_refunded }} </span>
              </p>
              <p class="transactions-status__colors">
                <span class="text_status--green"> {{ $t("Delivered") }} </span>
                <span class="text_status--orange">
                  {{ $t("Partially_refunded") }}</span
                >
                <span class="text_status--red">
                  {{ $t("wHole_refunded") }}
                </span>
              </p>
            </div>
          </div>
          <hr class="ai-power-seller__transactions__hr" />
          <types-chart
            :labels="seller.client_type_names"
            :values="seller.data"
            class="ai-power-seller__transactions__categoriescharts"
          />
        </div>
        <BaseButton
          class="ai-power-seller__next"
          :clickedFunction="() => nextSlide(index, 5)"
        >
          <golden-arrow />
        </BaseButton>
        <BaseButton
          class="ai-power-seller__prev"
          :clickedFunction="() => prevSlide(index, 5)"
        >
          <golden-arrow />
        </BaseButton>
      </div>
    </template>
  </BaseCard>
</template>

<script>
import AchievedTarget from "../../icon/AchievedTarget.vue";
import Active from "../../icon/Active.vue";
import ArrowGrowth from "../../icon/ArrowGrowth.vue";
import Crown from "../../icon/Crown.vue";
import GoldenArrow from "../../icon/GoldenArrow.vue";
import Performance from "../../icon/Performance.vue";
import Precentage from "../../icon/Precentage.vue";
import Suspended from "../../icon/Suspended.vue";
import Target from "../../icon/Target.vue";
import CategoriesChart from "./CategoriesChart.vue";
import SellerCard from "./SellerCard.vue";
import TypesChart from "./TypesChart.vue";
export default {
  name: "FrontendMlSellerCard",
  props: {
    sellerData: {
      type: Array,
    },
    isLoading: {
      type: Boolean,
    },
    cardType: {
      type: String,
    },
  },
  data() {
    return {
      activeSlide: 0,
    };
  },
  computed: {
    numOfTransactions() {},
  },
  mounted() {},
  methods: {
    nextSlide(indx, len) {
      this.activeSlide = indx + 1;
      if (this.activeSlide === len) {
        this.activeSlide = 0;
      }
      this.$emit("newActiveSlide", this.activeSlide);
    },
    prevSlide(indx, len) {
      this.activeSlide = indx - 1;
      if (this.activeSlide < 0) {
        this.activeSlide = len - 1;
      }
      this.$emit("newActiveSlide", this.activeSlide);
    },
    calcPrecentage(value) {
      return value * 100;
    },
    firstTwoDigit(num) {
      return num ? num.toFixed(2) : "";
    },
    numberTransactions(num, num2, num3) {
      return num + num2 + num3;
    },
  },
  components: {
    CategoriesChart,
    Crown,
    Target,
    AchievedTarget,
    Precentage,
    ArrowGrowth,
    Performance,
    TypesChart,
    GoldenArrow,
    SellerCard,
    Suspended,
    Active,
  },
};
</script>

<style lang="scss" scoped></style>

