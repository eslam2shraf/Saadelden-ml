<template>
  <BaseCard class="wrapper__Anomally__Analytics__graphAnalysis__tables__table">
    <div
      class="wrapper__Anomally__Analytics__graphAnalysis__tables__table__header"
    >
      <component :is="icon" :key="icon" />
      <p>
        {{ $t(title) }}
      </p>
    </div>
    <slot name="filters"></slot>
    <div
      class="wrapper__Anomally__Analytics__graphAnalysis__tables__table__line"
    ></div>
    <p v-if="!data && !loading" class="text-center mt-2">
      {{ $t("response_message") }}
    </p>
    <p v-if="loading === true" class="text-center mt-2">{{ $t("loading") }}</p>

    <div
      class="wrapper__Anomally__Analytics__graphAnalysis__tables__table__body"
      v-if="data && data.length !== 0 && !loading"
    >
      <BaseTable
        class="responsive_table table_raduis_bottom"
        :data="data"
        :orderedArray="orderedArray"
        :labels="labels"
        :isIndex="isIndex"
      />
    </div>
    <h4 v-if="data && data.length === 0 && !loading" class="text-center">
      {{ $t('nodataAvailable') }}
    </h4>
  </BaseCard>
</template>

<script>
import HexaWarningIcon from "../icon/HexaWarningIcon.vue";
import ArrowIncreaseIcon from "../icon/ArrowIncreaseIcon.vue";
import ArrowDecreaseIcon from "../icon/ArrowDecreaseIcon.vue";
export default {
  name: "GraphTables",

  data() {
    return {};
  },
  props: {
    title: String,
    icon: String,
    orderedArray: {
      type: [Array, Object],
      require: false,
    },
    labels: {
      type: Array,
      require: false,
    },
    data: {
      type: Array,
    },
    msg: {
      type: String,
    },
    loading: {
      type: Boolean,
    },
    isIndex: {
      type: Boolean,
      require: false,
    },
  },
  components: {
    HexaWarningIcon,
    ArrowIncreaseIcon,
    ArrowDecreaseIcon,
  },
  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>

