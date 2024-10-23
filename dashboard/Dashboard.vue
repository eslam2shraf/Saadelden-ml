<template>
  <div>
    <div :class="isOpend ? 'main' : 'main close'">
      <sidebar class="sidebar closed" :opened="isOpend" />
      <div class="content">
        <header class="header">
          <menuIcon
            :class="[{ 'd-none': isMobile }, 'header__bars']"
            v-on:click.native="isOpend = !isOpend"
          />
          <span class="header__title">
            {{ $t("Dashboard") }}
          </span>

          <ul
            :class="`${
              $i18n.locale == 'ar'
                ? 'navegation__Info__rtl navegation__Info'
                : 'navegation__Info'
            }`"
          >
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
        <div class="container">
          <div class="row mt-8 flex_gap flex-wrap">
            <BaseCard
              @click="redirect('/customer/Segmentaion')"
              class="col-lg-7 col-md-11 col-11 p-2 pointer hovered_card"
            >
              <h4 class="title">{{ $t("Average_selling_amount") }}</h4>
              <hr class="title_bottom" />
              <CustomersSegmentaionsAvgSelling />
              <p class="text-center">
                {{ $t("avg_selling_desc") }}
              </p>
            </BaseCard>
            <BaseCard
              @click="redirect('/customer/Segmentaion')"
              class="col-lg-4 col-md-11 col-11 hovered_card p-2 pointer"
            >
              <h4 class="title">{{ $t("Average_Customer_Frequency") }}</h4>
              <hr class="title_bottom title_bottom-68" />
              <CustomersVisits />
              <p class="text-center">
                {{ $t("customers_visits_desc") }}
              </p>
            </BaseCard>
          </div>
          <div class="row mt-4 flex_gap flex-wrap">
            <BaseCard
              @click="redirect('/customer/Segmentaion')"
              class="col-md-7 col-11 hovered_card p-2 pointer"
            >
              <h4 class="title">
                {{ $t("Types_of_customers") }}
              </h4>
              <hr class="title_bottom title_bottom-22 title-bottom-rtl" />
              <CustomersTypes />
              <p class="text-center">
                {{ $t("customertypes_desc") }}
              </p>
            </BaseCard>

            <BaseCard
              @click="redirect('/products/ProductsClassifications')"
              class="col-md-4 col-11 hovered_card p-2 pointer"
            >
              <h4 class="title">
                {{ $t("Selling_amount_of_suppliers") }}
              </h4>
              <hr class="title_bottom title_bottom-63" />
              <ProductsClassificationsSellingAmountSuppliers />
              <p class="text-center">
                {{ $t("Selling_amount_of_suppliers_desc") }}
              </p>
            </BaseCard>
          </div>
    

          <div class="row mt-4 mb-5">
            <BaseCard
              @click="redirect('/productions/Anomaly')"
              class="col-md-11 col-11 pointer"
            >
              <Peakhours class="hovered_card" />
            </BaseCard>
          </div>
          <BackToTopButton />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArrowDown from "../icon/ArrowDown.vue";
import Global from "../icon/Global.vue";
import menuIcon from "../icon/menu.vue";
import BackToTopButton from '../layouts/BackToTopButton.vue';
import LangDropdown from "../layouts/LangDropdown.vue";

import Peakhours from "../productions/Anomaly/Peakhours.vue";
import Header from "./header.vue";
import sidebar from "./sidebar.vue";

export default {
  components: {
    sidebar,
    Header,
    Peakhours,
    Global,
    LangDropdown,
    ArrowDown,
    menuIcon,
    BackToTopButton,
},
  name: "DashboardComponent",
  data() {
    return {
      isOpend: true,
      windowWidth: 0,
      selectedLang: "",
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push(this.localePath("/"));
    },
    redirect(link) {
      this.$router.push(this.localePath(link));
    },
  },
  mounted() {
    if (window.innerWidth <= 850) {
      this.isOpend = false;
    }
    this.windowWidth = window.innerWidth;
  },
  computed: {
    isMobile() {
      if (this.windowWidth < 768) {
        return true;
      }
    },
  },
};
</script>

<style>
</style>