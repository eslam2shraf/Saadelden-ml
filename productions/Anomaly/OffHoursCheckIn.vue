<template>
  <div>
    <BaseCard class="bg-L_D_Yellow-50 p-2">
      <h4>
        {{ $t("off_hours_checkIn_title") }}
      </h4>

      <div class="d-flex flex_gap align-items-flex-start flex-wrap mb-2">
        <div class="d-flex flex_gap">
          <BaseSelect
            class="search_input"
            :title="$t('stores')"
            :options="stores.data"
            :key-name="'name'"
            :key-id="'id'"
            :value="storeId"
            @input="storeId = $event.target.value"
          />

          <BaseInput
            v-model="searchWord"
            :placeholder="`${$t('searchby_first_mid_last')}`"
            type="text"
            class="d-inline search_input"
            @input="searchWord = $event.target.value"
            @keyup.enter="() => paginatedCheckInHours(currentPage)"
          />
        </div>

        <LayoutsFilter
          @fromDate="getFromDate"
          @toDate="getToDate"
          :filter="() => paginatedCheckInHours(currentPage)"
          :reset="Reset"
          class="input-date--lg"
          :Msg="errorMessage"
          @resetErrorMsg="setErrorMsg"
    
        />
      </div>
      <h4 v-if="isLoading" class="text-center">
        {{ $t("loading") }}
      </h4>
      <template v-else>
        <BaseTable
          v-if="
            offHoursCheckIn &&
            offHoursCheckIn.data &&
            offHoursCheckIn.data.length !== 0
          "
          class="responsive_table table_raduis_bottom"
          :data="offHoursCheckIn.data"
          :headings="invoicesHead"
          :orderedArray="[
            'employee_profile_id',
            'first_name',
            'email',
            'check_in_at',
            'check_out_at',
            'store_name',
          ]"
        >
        </BaseTable>
        <h4
          v-if="
            offHoursCheckIn &&
            offHoursCheckIn.data &&
            offHoursCheckIn.data.length === 0
          "
          class="text-center"
        >
          {{ $t("nodataAvailable") }}
        </h4>
        <h4
          v-if="
            this.offHoursCheckIn && this.offHoursCheckIn.response && this.offHoursCheckIn.response.data &&
            this.offHoursCheckIn.response.data.errors &&
            this.offHoursCheckIn.response.data.errors.to
          "
          class="text-center"
        >
          {{ $t("invaild_range") }}
        </h4>
        <div class="card-footer m-auto w-80">
          <BasePagenation
            v-if="offHoursCheckIn && offHoursCheckIn.meta"
            :totalPages="
              Math.ceil(
                offHoursCheckIn.meta.total / offHoursCheckIn.meta.per_page
              )
            "
            :perPage="offHoursCheckIn.meta.per_page"
            :currentPage="currentPage"
            :getData="paginatedCheckInHours"
          />
        </div>
      </template>
    </BaseCard>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "OffHoursCheckIn",
  data() {
    return {
      currentPage: 1,
      storeId: "",
      activeModal: 0,
      filterFrom: "",
      filterTo: "",
      isLoading: false,
      searchWord: "",
      errorMessage: "",
      invoicesHead: [
        { id: 1, name: `${this.$t("employee_id")}` },
        { id: 2, name: `${this.$t("employee_name")}` },
        { id: 3, name: `${this.$t("email")}` },
        { id: 4, name: `${this.$t("check_in_at")}` },
        { id: 5, name: `${this.$t("check_out_at")}` },
        { id: 6, name: `${this.$t("store")}` },
      ],
    };
  },
  computed: {
    ...mapGetters("productions/Anomaly", [
      "loading",
      "success",
      "error",
      "offHoursCheckIn",
      "stores",
    ]),
  },
  mounted() {
    this.getStores(1);
    this.paginatedCheckInHours(this.currentPage);
  },
  methods: {
    setErrorMsg(msg){
      this.errorMessage = msg
    },
    getFromDate(from) {
      this.filterFrom = from;
    },
    getToDate(to) {
      this.filterTo = to;
    },
    paginatedCheckInHours(page) {
      this.isLoading = true;
      this.currentPage = page;
      const data = {
        page: page,
        per_page: 10,
      };
      if (this.filterFrom !== "" && this.filterTo) {
        data.from = this.filterFrom;
        data.to = this.filterTo;
      }
      if (this.storeId !== "") {
        data.store_id = this.storeId;
      }
      if (this.searchWord !== "") {
        data.search = this.searchWord;
      }
      this.$store
        .dispatch("productions/Anomaly/fetchOffHoursCheckIn", data)
        .then(() => {
          this.isLoading = false;
        
          if (
            this.offHoursCheckIn && this.offHoursCheckIn.response && this.offHoursCheckIn.response.data &&
            this.offHoursCheckIn.response.data.errors &&
            this.offHoursCheckIn.response.data.errors.to
          ) {
            this.errorMessage = this.offHoursCheckIn.response.data.errors.to[0];
          }
        });
    },
    getStores(page) {
      this.$store.dispatch("productions/Anomaly/fetchStores", {
        page,
        per_page: 30,
      });
    },

    Reset() {
      this.storeId = "";
      this.searchWord = "";
      this.currentPage = 1;
    },
  },
};
</script>

<style></style>
