<template>
  <div
    class="d-flex justify-content-space-between align-items-center"
    v-if="totalPages !== 0"
  >
    <p class="font-weight-bold">
      <span>
        {{ $t("Page") }}
      </span>
      <span>
        {{ currentPage }}
      </span>
      <span>
        {{ $t("Of") }}
      </span>
      <span>
        {{ totalPages }}
      </span>
    </p>
    <ul class="pagination">
      <li class="pagination-item">
        <BaseButton
          type="button"
          @click="onClickPreviousPage"
          :disabled="isInFirstPage"
          class="pagination-item__prev"
        >
        <CheveronRight  class="pagination-item__prev__arrow"/>
        </BaseButton>
      </li>
      <li v-for="(page, i) in pages" :key="i" class="pagination-item">
        <button
          type="button"
          @click="onClickPage(page.name)"
          :disabled="page.isDisabled"
          :class="[{ active: isPageActive(page.name) }, 'pagination-item_btn']"
        >
          {{ page.name }}
        </button>
      </li>

      <li class="pagination-item">
        <button
          type="button"
          @click="onClickNextPage"
          :disabled="isInLastPage"
          class="pagination-item__next"
        >
        <CheveronRight  class="pagination-item__next__arrow"/>
        
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import CheveronRight from "../icon/CheveronRight.vue";
import CheveronLeft from "../icon/CheveronLeft.vue";
export default {
  name: "Pagenation",
  props: {
    getData: {
      type: Function,
    },
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 6,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },

  computed: {
    startPage() {
      if (this.currentPage === 1) {
        return 1;
      }
      return this.currentPage - 1;
    },
    pages() {
      const range = [];
      for (
        let i = this.startPage;
        i <=
        Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
        i++
      ) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage,
        });
      }

      return range;
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
  },
  methods: {
    onClickPreviousPage() {
      this.getData(this.currentPage - 1);
    },
    onClickPage(page) {
      this.getData(page);
    },
    onClickNextPage() {
      this.getData(this.currentPage + 1);
    },

    isPageActive(page) {
      return this.currentPage === page;
    },
  },
  components: { CheveronRight, CheveronLeft },
};
</script>

<style lang="scss" scoped>
@import "~/assets/styles/modules/_pagenation.scss";
</style>