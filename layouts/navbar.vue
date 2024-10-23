<template>
  <nav class="navegation">
    <NuxtLink :to="localePath('/dashboard')">
      <img src="@/assets/images/logo.png" alt="logo" class="navegation__logo" />
    </NuxtLink>
    <div v-show="isMobile" class="mobile-menu" :class="{ active: isActive }">
      <div class="close-icon" @click="isActive = false">
        <span> &times; </span>
      </div>
      <ul class="mt-6">
        <li class="navegation__list__item">
          <NuxtLink :to="localePath('/dashboard')">
            {{ $t("Dashboard") }}
          </NuxtLink>
        </li>
        <li class="navegation__list__item">
          <NuxtLink :to="localePath('/productions/Anomaly')">
            {{ $t("Anomaly") }}
          </NuxtLink>
        </li>

        <base-dropdown-menu
          :title="$t('Products')"
          :arrowicon="`${
            $i18n.locale == 'ar' ? 'CheveronLeft' : 'CheveronRight'
          }`"
          class="sidebar__dropdown"
          :display="'d-block'"
        >
          <li>
            <NuxtLink :to="localePath('/products/productlist')">
              {{ $t("ProductsList") }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/products/ProductsClassifications')">
              {{ $t("ProductClassifications") }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/products/ProductSegmentation')">
              {{ $t("ProductSegmentaion") }}
            </NuxtLink>
          </li>
        </base-dropdown-menu>
        <base-dropdown-menu
          :title="$t('Productions')"
          :arrowicon="`${
            $i18n.locale == 'ar' ? 'CheveronLeft' : 'CheveronRight'
          }`"
          class="sidebar__dropdown"
          :display="'d-block'"
        >
          <li>
            <NuxtLink :to="localePath('/productions/ProductionLinesAnalysis')">
              {{ $t("ProductionLinesAnalysis") }}
            </NuxtLink>
          </li>

          <li>
            <NuxtLink :to="localePath('/productions/StatusAndForcasts')">
              {{ $t("StatusandForecasts") }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/productions/DemandForcasting')">
              {{ $t("DemandForcasting") }}
            </NuxtLink>
          </li>
        </base-dropdown-menu>
        <base-dropdown-menu
          :title="$t('Customers')"
          :arrowicon="`${
            $i18n.locale == 'ar' ? 'CheveronLeft' : 'CheveronRight'
          }`"
          class="sidebar__dropdown"
          :display="'d-block'"
        >
          <li>
            <NuxtLink :to="localePath('/customer/List')">
              {{ $t("CustomerList") }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/customer/Segmentaion')">
              {{ $t("CustomerSegmentaion") }}
            </NuxtLink>
          </li>
        </base-dropdown-menu>
        <base-dropdown-menu
          :title="$t('finance')"
          :arrowicon="`${
            $i18n.locale == 'ar' ? 'CheveronLeft' : 'CheveronRight'
          }`"
          class="sidebar__dropdown"
          :display="'d-block'"
        >
          <li>
            <NuxtLink :to="localePath('/finance')">
              {{ $t("FinancialSummary") }}
            </NuxtLink>
          </li>
        </base-dropdown-menu>
        <base-dropdown-menu
          :title="$t('employees')"
          :arrowicon="`${
            $i18n.locale == 'ar' ? 'CheveronLeft' : 'CheveronRight'
          }`"
          class="sidebar__dropdown"
          :display="'d-block'"
        >
          <li>
            <NuxtLink :to="localePath('/employees/seller/List')">
              {{ $t("sellerList") }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/employees/seller/AiPowerSeller')">
              {{ $t("ai_powerSeller") }}
            </NuxtLink>
          </li>
        </base-dropdown-menu>
        <base-dropdown-menu
          :title="$t('stores')"
          :arrowicon="`${
            $i18n.locale == 'ar' ? 'CheveronLeft' : 'CheveronRight'
          }`"
          class="sidebar__dropdown"
          :display="'d-block'"
        >
          <li>
            <NuxtLink :to="localePath('/stores/AiPowerStore')">
              {{ $t("ai_powerStore") }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/stores/StoresEffciency')">
              {{ $t("stores_effciency") }}
            </NuxtLink>
          </li>
        </base-dropdown-menu>
        <hr />
        <li class="navegation__list__item">
          <BaseButton :clickedFunction="logout" class="logout_btn">
            {{ $t("logout") }}
          </BaseButton>
        </li>
      </ul>
    </div>

    <div v-if="isMobile" class="d-flex flex_gap--md align-items-center">
      <ul class="lang_menu">
        <LangDropdown
          class="navegation__list__item navlang_menu__item"
          :isMobile="isMobile"
        />
      </ul>
      <div class="hamburger" @click="isActive = !isActive">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
    </div>

    <div v-else class="navegation__container">
      <!-- Rest of your existing code goes here -->
    </div>

    <ul class="navegation__list" v-show="!isMobile || isActive">
      <li class="navegation__list__item">
        <NuxtLink :to="localePath('/dashboard')" class="navegation__list__item">
          <HomeLightIcon class="home-icon" />
          <span>
            {{ $t("Dashboard") }}
          </span>
        </NuxtLink>
      </li>
      <li class="navegation__list__item">
        <NuxtLink :to="localePath('/productions/Anomaly')">
          {{ $t("Anomaly") }}
        </NuxtLink>
      </li>
      <li class="navegation__list__item">
        <a href="#">
          {{ $t("Products") }}
          <ArrowDown />
        </a>
        <ul class="navegation__list__sub">
          <li>
            <NuxtLink :to="localePath('/products/productlist')">
              {{ $t("ProductsList") }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/products/ProductsClassifications')">
              {{ $t("ProductClassifications") }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/products/ProductSegmentation')">
              {{ $t("ProductSegmentaion") }}
            </NuxtLink>
          </li>
        </ul>
      </li>
      <li class="navegation__list__item">
        <a href="#">
          {{ $t("Productions") }}
          <ArrowDown />
        </a>
        <ul class="navegation__list__sub">
          <li>
            <NuxtLink :to="localePath('/productions/ProductionLinesAnalysis')">
              {{ $t("ProductionLinesAnalysis") }}
            </NuxtLink>
          </li>

          <li>
            <NuxtLink :to="localePath('/productions/StatusAndForcasts')">
              {{ $t("StatusandForecasts") }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/productions/DemandForcasting')">
              {{ $t("DemandForcasting") }}
            </NuxtLink>
          </li>
        </ul>
      </li>
      <li class="navegation__list__item">
        <a href="#">
          {{ $t("Customers") }}
          <ArrowDown />
        </a>
        <ul class="navegation__list__sub">
          <li>
            <NuxtLink :to="localePath('/customer/List')">
              {{ $t("CustomerList") }}</NuxtLink
            >
          </li>
          <li>
            <NuxtLink :to="localePath('/customer/Segmentaion')">
              {{ $t("CustomerSegmentaion") }}
            </NuxtLink>
          </li>
        </ul>
      </li>
      <li class="navegation__list__item">
        <a href="#">
          {{ $t("finance") }}
          <ArrowDown />
        </a>
        <ul class="navegation__list__sub">
          <li>
            <NuxtLink :to="localePath('/finance')">
              {{ $t("FinancialSummary") }}</NuxtLink
            >
          </li>
        </ul>
      </li>
      <li class="navegation__list__item">
        <a href="#">
          {{ $t("employees") }}
          <ArrowDown />
        </a>
        <ul class="navegation__list__sub">
          <li>
            <NuxtLink :to="localePath('/employees/seller/List')">
              {{ $t("sellerList") }}</NuxtLink
            >
          </li>
          <li>
            <NuxtLink :to="localePath('/employees/seller/AiPowerSeller')">
              {{ $t("ai_powerSeller") }}
            </NuxtLink>
          </li>
        </ul>
      </li>
      <li class="navegation__list__item">
        <a href="#">
          {{ $t("stores") }}
          <ArrowDown />
        </a>
        <ul class="navegation__list__sub">
          <li>
            <NuxtLink :to="localePath('/stores/AiPowerStore')">
              {{ $t("ai_powerStore") }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/stores/StoresEffciency')">
              {{ $t("stores_effciency") }}
            </NuxtLink>
          </li>
        </ul>
      </li>

      <ul
        :class="`${
          $i18n.locale == 'ar'
            ? 'navegation__Info__rtl navegation__Info'
            : 'navegation__Info'
        }`"
      >
        <LangDropdown
          class="navegation__list__item navlang_menu__item"
          :isMobile="false"
        />

        <li class="navegation__list__item">
          <a href="#" class="profiledropdown">
            <img
              src="@/assets/images/icons/profile_picture.png"
              alt="profilePicture"
              class="profilePicture"
            />
            <ArrowDown />
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
    </ul>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import BaseDropdownMenu from "../base/BaseDropdownMenu.vue";
import ArrowDown from "../icon/ArrowDown.vue";
import Global from "../icon/Global.vue";
import HomeLightIcon from "../icon/HomeLightIcon.vue";
import LangDropdown from "./LangDropdown.vue";

export default {
  components: {
    BaseDropdownMenu,
    Global,
    LangDropdown,
    ArrowDown,
    HomeLightIcon,
  },
  name: "NavBar",
  data() {
    return {
      isActive: false,
      windowWidth: 0,
      selectedLang: "",
    };
  },
  computed: {
    ...mapGetters("auth", ["loading", "success", "error", "token"]),
    isMobile() {
      return this.windowWidth <= 1000;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push(this.localePath("/"));
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
  },
  mounted() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style></style>
