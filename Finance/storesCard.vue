<template>
  <BaseCard class="wrapper__Anomally__Analytics__analysis__card">
    <div  class="wrapper__Anomally__Analytics__analysis__card__side">
      <p  v-if="this.$i18n.locale === 'en'" class="wrapper__Anomally__Analytics__analysis__card__side__title">
        - {{$t('theheighest')}} {{$t('store')}}
        <span class="text_status--green font-weight-bold"
          >{{$t('achieves')}} {{$t('and')}} {{$t('exceeds')}}</span
        >
        {{$t('theTarget')}}
      </p>
      <p v-if="this.$i18n.locale === 'ar'" class="wrapper__Anomally__Analytics__analysis__card__side__title">
        -{{$t('thestore')}} {{$t('theheighest')}}
        <span class="text_status--green font-weight-bold">{{$t('achievment')}}</span>
        {{$t('fortheTarget')}}
      </p>
      <div v-if="achievedPercent" class="wrapper__Anomally__Analytics__analysis__card__side__cardData">
        <span class="card-title font-weight-bold"> {{ achieved }} </span>
        <p class="d-flex flex-column align-items-flex-end">
          <span class="text_status--green font-weight-bold">
            {{ firstTwoDigit(achievedPercent) }}%
          </span>
          <span class="label">{{ $t('colection_rate') }}</span>
        </p>
      </div>
      <p v-else>
        {{ $t('nodataAvailable') }}
      </p>
    </div>
    <div class="wrapper__Anomally__Analytics__analysis__card__line"></div>
    <div class="wrapper__Anomally__Analytics__analysis__card__side">
   
      <p class="wrapper__Anomally__Analytics__analysis__card__side__title">
        -{{$t('theMost')}} {{$t('store')}}
        <span class="text_status--red font-weight-bold">{{$t('doesnot')}} {{$t('achieve')}}</span>
        {{$t('theTarget')}}
      </p>
      <div  v-if="notAchievedPercent" class="wrapper__Anomally__Analytics__analysis__card__side__cardData">
        <span class="card-title font-weight-bold"> {{ notAchieved }} </span>
        <p class="d-flex flex-column align-items-flex-end">
          <span class="text_status--red font-weight-bold">
            {{ firstTwoDigit(notAchievedPercent) }}%
          </span>
          <span class="label">{{$t('colection_rate')}}</span>
        </p>
      </div>
      <p v-else>
        {{ $t('nodataAvailable') }}
      </p>
    </div>
  </BaseCard>
</template>

<script>
export default {
  name: "StoresCard",

  data() {
    return {};
  },
  props: {
    achieved: String,
    achievedPercent: String,
    notAchieved: String,
    notAchievedPercent: String,
  },
  mounted() {},
  watch:{
    achieved(){
      return this.achieved
    },
    achievedPercent(){
      return this.achievedPercent
    },
    notAchieved(){
      return this.notAchieved
    },
    notAchievedPercent(){
      return this.notAchievedPercent
    }
  },
  methods: {
    firstTwoDigit(num) {
      return num.toFixed(2);
    },
  },
};
</script>

<style lang="scss" scoped></style>
