<template>
  <li v-bind="$attrs" v-on="$listeners">
    <a href="#">
      <Global />
      <span class="lang-title" v-if="!isMobile">
        {{ selectedLang }}
      </span>
      <ArrowDown v-if="!isMobile" class="arrow-down" />
    </a>
    <ul class="navegation__list__sub">
      <li v-for="locale in $i18n.locales" :key="locale.code" class="lang-link">
        <a
          :class="`${$i18n.locale == locale.code ? 'text-gold' : ''}`"
          href="#"
          @click.prevent.stop="changeLang(locale.code)"
          >{{ $t(locale.name) }}</a
        >
      </li>
    </ul>
  </li>
</template>

<script>
import ArrowDown from "../icon/ArrowDown.vue";

import Global from "../icon/Global.vue";
export default {
  name: "LanguageDropdown",
  props: {
    isMobile: {
      type: Boolean,
      require: false,
    },
  },
  data() {
    return {
      selectedLang: "",
    };
  },
  methods: {
    changeLang(event) {
      this.$router.replace(this.switchLocalePath(event));
      this.setLanguageHeader();
    },
    setLanguageHeader() {
      const locale = `${this.$i18n.locale === "ar" ? "ar" : "en"}`;
      this.$axios.setHeader("Accept-Language", locale);
    },
  },
  mounted() {
    if (this.$i18n.locale === "en") {
      this.selectedLang = `${this.$t("English")}`;
    } else if (this.$i18n.locale === "ar") {
      this.selectedLang = `${this.$t("Arabic")}`;
    }
    this.setLanguageHeader();
  },
  components: { Global, ArrowDown },
};
</script>
        

<style lang="scss">
.active_lang {
  list-style-type: disc;
}
</style>