<template>
  <transition name="fade">
    <div class="btn-back-to-top" v-show="scY >= 300" @click="scrollToTop">
      <ArrowDown />
    </div>
  </transition>
</template>
  
<script>
import BaseButton from "../base/BaseButton.vue";
import ArrowDown from "../icon/ArrowDown.vue";
export default {
  data() {
    return {
      scY: 0,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.scY = window.scrollY;
    },
    scrollToTop() {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    },
  },
  components: { BaseButton, ArrowDown },
};
</script>
  