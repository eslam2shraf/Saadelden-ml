<template>
  <div>
    <ul class="sidebar__list" v-if="opened">
      <li class="mb-7">
        <img
          v-if="opened"
          src="@/assets/images/logo.png"
          alt="logo"
          class="sidebar__logo"
        />
      </li>

      <li class="sidebar__list__item">
        <NuxtLink :to="localePath('/dashboard')">
          <HomeDarkIcon />

          {{ $t("Dashboard") }}
        </NuxtLink>
      </li>
      <li class="sidebar__list__item">
        <NuxtLink :to="localePath('/productions/Anomaly')">
          <AnomalyIcon />
          {{ $t("Anomaly") }}
        </NuxtLink>
      </li>
      <base-dropdown-menu
        :title="$t('Products')"
        :display="'d-block'"
        :icon="'ProductsIcon'"
        :arrowicon="`${
          $i18n.locale == 'ar' ? 'CheveronLeft' : 'CheveronRight'
        }`"
        class="sidebar__dropdown"
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
        :display="'d-block'"
        :icon="'ProductionsIcon'"
        :arrowicon="`${
          $i18n.locale == 'ar' ? 'CheveronLeft' : 'CheveronRight'
        }`"
        class="sidebar__dropdown"
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
        :display="'d-block'"
        :icon="'CustomersIcon'"
        :arrowicon="`${
          $i18n.locale == 'ar' ? 'CheveronLeft' : 'CheveronRight'
        }`"
        class="sidebar__dropdown"
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
        :title="`${$t('finance')}`"
        :display="'d-block'"
        :icon="'Receipt'"
        :arrowicon="`${
          $i18n.locale == 'ar' ? 'CheveronLeft' : 'CheveronRight'
        }`"
        class="sidebar__dropdown"
      >
        <li>
          <NuxtLink :to="localePath('/finance')">
            {{ $t("FinancialSummary") }}
          </NuxtLink>
        </li>
      </base-dropdown-menu>
      <base-dropdown-menu
        :title="`${$t('employees')}`"
        :display="'d-block'"
        :icon="'CustomersIcon'"
        :arrowicon="`${
          $i18n.locale == 'ar' ? 'CheveronLeft' : 'CheveronRight'
        }`"
        class="sidebar__dropdown"
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
        :title="`${$t('stores')}`"
        :display="'d-block'"
        :icon="'CustomersIcon'"
        :arrowicon="`${
          $i18n.locale == 'ar' ? 'CheveronLeft' : 'CheveronRight'
        }`"
        class="sidebar__dropdown"
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
    </ul>

    <ul v-if="!opened" class="closed__list">
      <li class="mb-7">
        <img
          src="@/assets/images/logo-sm.png"
          alt="logo"
          class="closed__logo"
        />
      </li>
      <ul class="sub_list">
        <li class="closed__list__item" title="Dashboard">
          <NuxtLink
            :to="localePath('/dashboard')"
            class="closed__list__item__title"
          >
            <HomeLightIcon class="list-icon" />
          </NuxtLink>
        </li>
        <li class="closed__list__item" title="Anomaly">
          <NuxtLink :to="localePath('/productions/Anomaly')">
            <AnomalyIcon class="list-icon" />
          </NuxtLink>
        </li>
        <li class="closed__list__item" title="Products">
          <a href="#" class="closed__list__item__title">
            <ProductsIcon class="list-icon" />
            <component
              :is="`${$i18n.locale == 'ar' ? 'CheveronLeft' : 'CheveronRight'}`"
              :key="`${
                $i18n.locale == 'ar' ? 'CheveronLeft' : 'CheveronRight'
              }`"
            />
          </a>
          <ul class="closed__list__item__sub">
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
        <li class="closed__list__item" title="Productions">
          <a href="#" class="closed__list__item__title">
            <ProductionsIcon class="list-icon" />
            <component
              :is="`${$i18n.locale == 'ar' ? 'CheveronLeft' : 'CheveronRight'}`"
              :key="`${
                $i18n.locale == 'ar' ? 'CheveronLeft' : 'CheveronRight'
              }`"
            />
          </a>
          <ul class="closed__list__item__sub">
            <li>
              <NuxtLink
                :to="localePath('/productions/ProductionLinesAnalysis')"
              >
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
        <li class="closed__list__item" title="Customers">
          <a href="#" class="closed__list__item__title">
            <CustomersIcon class="list-icon" />
            <component
              :is="`${$i18n.locale == 'ar' ? 'CheveronLeft' : 'CheveronRight'}`"
              :key="`${
                $i18n.locale == 'ar' ? 'CheveronLeft' : 'CheveronRight'
              }`"
            />
          </a>
          <ul class="closed__list__item__sub">
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
          </ul>
        </li>
        <li class="closed__list__item" title="Finance">
          <a href="#" class="closed__list__item__title">
            <Receipt class="list-icon" />
            <component
              :is="`${$i18n.locale == 'ar' ? 'CheveronLeft' : 'CheveronRight'}`"
              :key="`${
                $i18n.locale == 'ar' ? 'CheveronLeft' : 'CheveronRight'
              }`"
            />
          </a>
          <ul class="closed__list__item__sub">
            <li>
              <NuxtLink :to="localePath('/finance')">
                {{ $t("FinancialSummary") }}
              </NuxtLink>
            </li>
          </ul>
        </li>
        <li class="closed__list__item" title="Employees">
          <a href="#" class="closed__list__item__title">
            <CustomersIcon class="list-icon" />
            <component
              :is="`${$i18n.locale == 'ar' ? 'CheveronLeft' : 'CheveronRight'}`"
              :key="`${
                $i18n.locale == 'ar' ? 'CheveronLeft' : 'CheveronRight'
              }`"
            />
          </a>
          <ul class="closed__list__item__sub">
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
          </ul>
        </li>
        <li class="closed__list__item" title="Stores">
          <a href="#" class="closed__list__item__title">
            <CustomersIcon class="list-icon" />
            <component
              :is="`${$i18n.locale == 'ar' ? 'CheveronLeft' : 'CheveronRight'}`"
              :key="`${
                $i18n.locale == 'ar' ? 'CheveronLeft' : 'CheveronRight'
              }`"
            />
          </a>
          <ul class="closed__list__item__sub">
            <li>
              <NuxtLink :to="localePath('/stores/AiPowerStore')">
                {{ $t("ai_powerStore") }}
              </NuxtLink>
            </li>
          </ul>
        </li>
      </ul>
    </ul>

    <div class="sidebar__footer p-1">
      <h4 class="mb-0">ATW Ltd.</h4>
      <p>Copyright &copy; 2023, All Right Reserved</p>
    </div>
  </div>
</template>

<script>
import AnomalyIcon from "../icon/AnomalyIcon.vue";
import CheveronLeft from "../icon/CheveronLeft.vue";
import CheveronRight from "../icon/CheveronRight.vue";
import CustomersIcon from "../icon/CustomersIcon.vue";
import HomeDarkIcon from "../icon/HomeDarkIcon.vue";
import HomeLightIcon from "../icon/HomeLightIcon.vue";
import ProductionsIcon from "../icon/ProductionsIcon.vue";
import ProductsIcon from "../icon/ProductsIcon.vue";
import Receipt from "../icon/Receipt.vue";
import Profile from "../icon/Profile.vue";
export default {
  components: {
    ProductsIcon,
    CheveronRight,
    CustomersIcon,
    ProductionsIcon,
    AnomalyIcon,
    HomeDarkIcon,
    HomeLightIcon,
    CheveronLeft,
    Receipt,
    Profile,
  },
  name: "Sidebar",
  props: {
    opened: {
      type: Boolean,
    },
  },
};
</script>

<style></style>
