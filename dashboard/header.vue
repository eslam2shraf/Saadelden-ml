<template>
  <header class="header">
    <menuIcon class="header__bars" v-on:click.native="isOpend = !isOpend" />
    <span class="header__title">
      {{ $t("Dashboard") }}
    </span>
    <BaseInput
      :title="'Search'"
      type="text"
      :icon="'iconSearchIcon'"
      class="m-auto"
    />
    <ul class="navegation__Info">
      <LangDropdown
        class="navegation__list__item lang_menu__item"
        :isMobile="isMobile"
      />
      <li class="navegation__list__item">
        <a href="#" class="profiledropdown">
          <img
            src="@/assets/images/icons/profile_picture.png"
            alt="profilePicture"
            class="profilePicture"
          />
          <ArrowDown class="arrowicon-dark" />
        </a>
        <ul class="navegation__list__sub">
          <li>
            <BaseButton
              :clickedFunction="logout"
              class="logout_btn text-NORDIC font-weight-bold"
            >
              {{ $t("logout") }}
            </BaseButton>
          </li>
        </ul>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  name: "DashboardHeader",
  data() {
    return {
      isOpend: true,
      selectedLang: "",
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push(this.localePath("/"));
    },
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
    if (this.$i18n.locale == "en") {
      this.selectedLang = `${this.$t("English")}`;
    } else if (this.$i18n.locale == "ar") {
      this.selectedLang = `${this.$t("Arabic")}`;
    }
    this.setLanguageHeader();
  },
};
</script>

<style>
</style>