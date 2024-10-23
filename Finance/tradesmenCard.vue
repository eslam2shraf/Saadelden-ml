<template>
  <BaseCard class="wrapper__Anomally__Analytics__analysis__card">
    <div class="wrapper__Anomally__Analytics__analysis__card__side">
      <p v-if="this.$i18n.locale === 'en'" class="wrapper__Anomally__Analytics__analysis__card__side__title">
        -{{$t('theheighest')}} {{$t('tradesmen')}}
        <span class="text_status--green font-weight-bold">{{$t('pays')}}</span>
        {{$t('all_debts')}}
      </p>
      <p v-if="this.$i18n.locale === 'ar'" class="wrapper__Anomally__Analytics__analysis__card__side__title">
        - {{$t('tradesmen')}} {{$t('theheighest')}}
        <span class="text_status--green font-weight-bold">{{$t('pays')}}</span>
        {{$t('all_debts')}}
      </p>
      <div
        v-if="mostDeptPercent"
        class="wrapper__Anomally__Analytics__analysis__card__side__cardData"
      >
        <span class="card-title font-weight-bold"> {{ mostDept }}</span>
        <p class="d-flex flex-column align-items-flex-end">
          <span class="text_status--green  font-weight-bold">
            {{ firstTwoDigit(mostDeptPercent) }} %
          </span>
          <span class="label">{{$t('colection_rate')}}</span>
        </p>
      </div>
      <p v-else>
        {{ $t("nodataAvailable") }}
      </p>
    </div>

    <div class="wrapper__Anomally__Analytics__analysis__card__line"></div>
    <div class="wrapper__Anomally__Analytics__analysis__card__side">
      <p class="wrapper__Anomally__Analytics__analysis__card__side__title">
        -{{$t('thetradesmen')}} {{$t('whoHas')}}
        <span class="text_status--red  font-weight-bold">{{$t('mostDebt')}}</span>
       {{$t('to_us')}}
      </p>
    
      <div
        v-if="leastDeptPercent"
        class="wrapper__Anomally__Analytics__analysis__card__side__cardData"
      >
        <span class="card-title font-weight-bold"> {{ leastDept }} </span>
        <p>
          <span class="text_status--red font-weight-bold">
            {{ firstTwoDigit(leastDeptPercent) }} %
          </span>
          <span class="label">{{$t('colection_rate')}}</span>
        </p>
      </div>
      <p v-else>
        {{ $t("nodataAvailable") }}
      </p>
    </div>
  </BaseCard>
</template>

<script>
export default {
  name: "TradesmenCard",

  data() {
    return {};
  },
  props: {
    leastDept: String,
    leastDeptPercent: String,
    mostDept: String,
    mostDeptPercent: String,
  },
  mounted() {},
  watch: {
    leastDept() {
      return this.leastDept;
    },
    leastDeptPercent() {
      return this.leastDeptPercent;
    },
    mostDept() {
      return this.mostDept;
    },
    mostDeptPercent() {
      return this.mostDeptPercent;
    },
  },
  methods: {
    firstTwoDigit(num) {
      return num.toFixed(2);
    },
  },
};
</script>

<style lang="scss" scoped></style>
