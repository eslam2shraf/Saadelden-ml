<template>
  <div class="container-fluid p-2 min-height--46 min-height--lg">
    <div class="row flex_gap flex-wrap">
      <div class="col-md-3 col-lg-2 col-sm-5 col-12">
        <BaseCard class="bg-L_D_Yellow-50">
          <div
            class="d-flex justify-content-space-between flex_gap p-2 border-bottom align-items-center"
          >
            <h4 class="mb-0">{{ $t("filter") }}</h4>
            <FilterIcon />
          </div>
          <div class="card-body p-3">
            <BaseCard class="border-darkBlue">
              <div class="input select-wrapper select-filter">
                <select class="select input__field" v-model="typeId">
                  <option value="">
                    {{ $t("types") }}
                  </option>
                  <option
                    v-for="option in customerCategories"
                    :key="option.id"
                    :value="option.id"
                  >
                    <span v-if="option.name">
                      {{ option.name }}
                    </span>
                  </option>
                </select>
              </div>
            </BaseCard>
          </div>
        </BaseCard>
      </div>
      <div class="col-md-8 col-lg-9 col-sm-6 col-12">
        <BaseCard class="bg-L_D_Yellow-50">
          <div class="d-flex flex_gap p-2 mb-1">
            <h3 class="mb-0">{{ $t("All_customers") }}</h3>
          </div>
          <div class="d-flex flex_gap align-items-flex-start p-1">
            <BaseInput
              :placeholder="`${$t('search_by_customerName_phone')}`"
              type="text"
              class="d-inline search_input ml-1"
              v-model="searchWord"
              @keyup.enter="() => customers(1)"
            />
            <div class="d-flex flex_gap w-73 justify-content-flex-end">
              <BaseInput type="date" class="d-inline" v-model="joinDate" />
              <BaseButton
                :clickedFunction="() => customers(1)"
                class="button button--xs search-btn d-inline"
              >
                {{ $t("Done") }}
              </BaseButton>
              <BaseButton
                :clickedFunction="() => Reset()"
                class="button button--xs reset-btn"
              >
           
              <reset />
                {{ $t("reset") }}
              </BaseButton>
            </div>
          </div>
          <p class="p-2">
            <span class="h4" v-if="typeName">{{ $t("Results_of") }} ( </span>
            <span class="breadcrumbs__item__active h4" v-if="typeName">
              {{ typeName }}
            </span>

            <span class="h4" v-if="typeName">)</span>
          </p>
          <h3 class="text-center p-11" v-if="loading">
            {{ $t("loading") }}
          </h3>
          <div class="card-body p-2" v-if="!loading">
            <BaseTable
              v-if="
                customerList &&
                customerList.data &&
                customerList.data.length !== 0
              "
              class="responsive_table table_raduis_bottom hovered-table"
              :data="customerList.data"
              :headings="customerHead"
              :URL="'/customer/analysis'"
              :prevents="['status']"
            />
            <div v-else>
              <h3 class="text-center p-11">
                {{ $t("noCustomers") }}
              </h3>
            </div>
          </div>

          <div class="card-footer m-auto w-80">
            <BasePagenation
              v-if="customerList && customerList.meta"
              :totalPages="
                Math.ceil(customerList.meta.total / customerList.meta.per_page)
              "
              :perPage="customerList.meta.per_page"
              :currentPage="currentPage"
              :getData="customers"
            />
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FilterIcon from "../../icon/Filter.vue";
import Reset from '../../icon/Reset.vue';
export default {
  components: { FilterIcon, Reset },
  name: "CustomersList",
  data() {
    return {
      typeId: "",
      searchWord: "",
      currentPage: 1,
      typeName: "",
      joinDate: "",
      customerHead: [
        { id: 1, name: "#" },
        { id: 2, name: `${this.$t("Username")}` },
        { id: 3, name: `${this.$t("Phone_Number")}` },
        { id: 4, name: `${this.$t("Type")}` },
        { id: 5, name: `${this.$t("Joining_Date")}` },
        {
          id: 6,
          name: `${
            this.$t("Number_of_Purchases") + "(" + this.$t("Receipts") + ")"
          }`,
        },
      ],
    };
  },
  watch: {
    typeId(newType) {
      this.typeId = newType;
      this.currentPage = 1;
      let selectedtype = this.customerCategories.filter(
        (item) => item.id == newType
      );
      if (selectedtype.length !== 0) {
        this.typeName = selectedtype[0].name;
      } else {
        this.typeName = "";
      }

      this.$store.dispatch("customers/fetchCustomerList", {
        type_id: this.typeId,
        perPage: 15,
        search: this.searchWord,
        page: this.currentPage,
        joinDate: this.joinDate,
      });
    },
    searchWord(newWord) {
      if (newWord === "") {
        this.customers(this.currentPage);
      }
    },
  },
  computed: {
    ...mapGetters("customers/segmentaion", [
      "loading",
      "success",
      "error",
      "customerCategories",
    ]),
    ...mapGetters("customers", ["loading", "success", "error", "customerList"]),
  },
  created() {
    this.customers(this.currentPage);

    this.$store.dispatch("customers/segmentaion/fetchCustomerCategories");
  },
  methods: {
    customers(page) {
      this.currentPage = page;
      this.$store.dispatch("customers/fetchCustomerList", {
        type_id: this.typeId,
        search: this.searchWord,
        page: this.currentPage,
        joinDate: this.joinDate,
        perPage: 15,
      });
    },
    Reset(){
      this.joinDate = ""
      this.searchWord = ''
      this.typeId = ''
      this.currentPage = 1;
      this.customers( this.currentPage )
    }
  },
};
</script>

<style></style>
