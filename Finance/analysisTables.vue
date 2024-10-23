<template>
  <BaseCard class="wrapper__Anomally__Analytics__analysis__table">
    <div
      class="rounded-top wrapper__Anomally__Analytics__analysis__table__header"
    >
      <p class="mb-1">
        {{ $t(title) }}
      </p>
      <slot name="filters"></slot>
    </div>
    <h4 class="text-center" v-if="!loading && !data">
          {{ $t("select_data") }}
        </h4>
    <h4 v-if="loading" class="text-center">{{ $t("loading") }}</h4>
    <div class="wrapper__Anomally__Analytics__analysis__table__body">
     
      <BaseTable
        class="responsive_table table_raduis_bottom"
        :data="data"
        :orderedArray="orderedArray"
        :labels="labels"
      />
      
    </div>
    <h4 v-if="data && data.length === 0 && !loading" class="text-center">{{ $t(message) }}</h4>
  </BaseCard>
</template>

<script>
export default {
  name: "AnalysisTables",

  data() {
    return {};
  },
  props: {
    title: String,

    orderedArray: {
      type: Array,
      require: false,
    },
    labels: {
      type: Array,
      require: false,
    },
    data: {
      type: Array,
    },
    message:{
      type: String,
    },
    loading:{
      type:Boolean,
    }
  },
  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>

