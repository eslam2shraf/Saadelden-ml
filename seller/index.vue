<template>
  <div class="container-fluid--50 p-2 min-height--46 min-height--lg">
    <div
      class="row d-flex flex_gap--xl justify-content-space-between align-items-center m-auto"
    >
      <h3>
        {{ $t("sellerList") }}
      </h3>
      <base-bread-crumbs :Links="Links" />
    </div>
    <div class="col-md-7 col-lg-9 col-sm-9 col-11">
      <BaseCard class="bg-L_D_Yellow-50 p-2">
        <div class="d-flex justify-content-space-between flex_gap p-2 mb-1">
          <div
            class="d-flex justify-content-space-between align-items-center flex_gap"
          >
            <FilterIcon class="mb-1" />

            <div class="select-wrapper select-filter sellersSelect">
              <BaseSelect
                class="sellerSelect__inner"
                @input="currentStoreId = $event.target.value"
                v-model="currentStoreId"
                :title="`${$t('currentStore')}`"
                :options="allStores.data"
                :key-id="'id'"
                :key-name="'name'"
                @change="getAllSellers(1)"
              >
              </BaseSelect>
            </div>

            <div
              v-if="allStores && allStores.data"
              class="select-wrapper select-filter sellersSelect"
            >
              <BaseSelect
                class="sellerSelect__inner"
                @input="mainStoreId = $event.target.value"
                :title="`${$t('main_store')}`"
                :options="allStores.data"
                :key-id="'id'"
                :key-name="'name'"
                @change="getAllSellers(1)"
              >
              </BaseSelect>
            </div>

            <div class="select-wrapper select-filter sellersSelect">
              <BaseSelect
                class="sellerSelect__inner"
                @input="type = $event.target.value"
                :title="`${$t('Type')}`"
                :options="types"
                :key-id="'value'"
                :key-name="'name'"
                @change="getAllSellers(1)"
              >
              </BaseSelect>
            </div>
            <div class="d-flex">
              <BaseButton
                :clickedFunction="Reset"
                class="button button--xs reset-btn"
              >
                <IconReset />
                {{ $t("reset") }}
              </BaseButton>
            </div>
          </div>

          <div class="d-flex flex_gap align-items-flex-start">
            <BaseInput
              :placeholder="`${$t('search_here')}`"
              type="text"
              class="d-inline search_input"
              v-model="searchWord"
              @keyup.enter="getAllSellers(1)"
            />
          </div>
        </div>
        <h4 v-if="isLoading" class="text-center">{{ $t("loading") }}</h4>
        <div
          class="flex_gap sellers-list"
          v-if="allSellers && allSellers.data && !isLoading"
        >
          <BaseCard
            v-for="(seller, index) in allSellers.data"
            :key="index"
            class="sellers-list-card"
          >
            <p v-if="seller.status === 1" class="sellers-list-card__status">
              <span>
                {{ $t("Suspended") }}
              </span>
            </p>
            <div class="sellers-list-inner-card">
              <div class="sellers-list-card-header">
                <div class="sellers-list-avatar">
                  <div class="front">
                    <p class="m-0">{{ firstLetter[index] }}</p>
                  </div>
                  <div class="back">
                    <nuxt-link :to="localePath(`/employees/seller/${seller.id}`)"
                      >{{ $t("open_analysis") }}
                    </nuxt-link>
                  </div>
                </div>
                <p class="sellerName">{{ seller.name }}</p>
              </div>
              <div
                class="d-flex align-items-center justify-content-flex-start flex_gap"
              >
                <HomeIcon />
                <p class="branchName">{{ seller.store_name }}</p>
              </div>
              <div
                class="d-flex align-items-center justify-content-flex-start flex_gap"
              >
                <PhoneIcon />
                <p class="sellerEmail">{{ seller.email }}</p>
              </div>
            </div>
          </BaseCard>
        </div>
        <h4
          v-if="
            allSellers &&
            allSellers.data &&
            allSellers.data.length === 0 &&
            !isLoading
          "
          class="text-center"
        >
          {{ $t("nodataAvailable") }}
        </h4>
        <div class="card-footer m-auto w-80">
          <BasePagenation
            v-if="allSellers && allSellers.meta"
            :totalPages="
              Math.ceil(allSellers.meta.total / allSellers.meta.per_page)
            "
            :perPage="allSellers.meta.per_page"
            :currentPage="currentPage"
            :getData="getAllSellers"
          />
        </div>
      </BaseCard>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BaseSelect from "../base/BaseSelect.vue";
import FilterIcon from "../icon/Filter.vue";
import HomeIcon from "../icon/HomeIcon.vue";
import PhoneIcon from "../icon/PhoneIcon.vue";

export default {
  name: "MLList",
  components: {
    BaseSelect,
    FilterIcon,
    HomeIcon,
    PhoneIcon,
  },
  data() {
    return {
      currentPage: 1,
      searchWord: "",
      mainStore: "",
      mainStoreId: "",
      currentStore: "",
      currentStoreId: "",
      type: "",
      splittedName: [],
      firstLetters: [],
      isLoading: false,
      types: [
        {
          name: `${this.$t("Suspended")}`,
          value: 1,
        },
        {
          name: `${this.$t("active")}`,
          value: 0,
        },
      ],
      Links: [
        {
          name: `${this.$t("Dashboard")}`,
          url: "/dashboard",
        },
        {
          name: `${this.$t("sellerList")}`,
        },
      ],
    };
  },
  computed: {
    ...mapGetters("employees/sellers", ["allSellers", "allStores"]),
    firstLetter() {
      if (this.allSellers && this.allSellers.data) {
        for (var i = 0; i < this.allSellers.data.length; i++) {
          this.splittedName = this.allSellers.data[i].name.split("");

          this.firstLetters[i] = this.splittedName[0];
        }
      }
      return this.firstLetters;
    },
  },

  created() {
    this.getAllSellers(this.currentPage);
    this.getAllStores(this.currentPage);
  },
  methods: {
    sellerAnalysis(id) {
      this.$router.push(this.localePath(`/employees/seller/${id}`));
    },
    getAllSellers(page) {
      this.currentPage = page;
      this.isLoading = true;
      this.$store
        .dispatch("employees/sellers/fetchAllSellers", {
          page: this.currentPage,
          perPage: 15,
          main_store_id: this.mainStoreId,
          store_id: this.currentStoreId,
          search: this.searchWord,
          status: this.type,
        })
        .then(() => {
          this.isLoading = false;
        });
    },
    getAllStores(page) {
      this.currentPage = page;
      this.$store.dispatch("employees/sellers/fetchAllStores", {
        page: this.currentPage,
        per_page: 16,
      });
    },
    Reset() {
      this.currentPage = 1;
      this.searchWord = "";
      this.mainStoreId = "";
      this.currentStoreId = "";
      this.type = "";
      this.getAllSellers(this.currentPage);
    },
  },
};
</script>

<style lang="scss" scoped></style>
