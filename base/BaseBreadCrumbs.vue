<template>
  <ul class="breadcrumbs">
    <li v-for="(link, i) in Links" :key="i" class="breadcrumbs__item">
      <a
        v-if="i < Links.length - 1"
        :href="localePath(link.url)"
        class="breadcrumbs__item__link"
      >
        {{ link.name }}
      </a>
      <template v-if="i < Links.length - 1">
        <component
          :is="`${$i18n.locale == 'ar' ? 'CheveronLeft' : 'CheveronRight'}`"
          :key="`${$i18n.locale == 'ar' ? 'CheveronLeft' : 'CheveronRight'}`"
          class="breadcrumbs__item__arrow"
        />
      </template>

      <span v-if="i == Links.length - 1" class="breadcrumbs__item__active">
        {{ link.name }}
      </span>
    </li>
  </ul>
</template>

<script>
import CheveronRight from "../icon/CheveronRight.vue";
import CheveronLeft from "../icon/CheveronLeft.vue";
export default {
  name: "BreadCrumbs",
  props: {
    Links: {
      type: Array,
    },
  },
  components: { CheveronRight, CheveronLeft },
};
</script>
