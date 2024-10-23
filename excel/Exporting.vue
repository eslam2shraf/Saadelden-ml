<template>
  <div class="container p-2">
    <div class="d-flex justify-content-space-between flex_gap">
      <h3>Exporting Excels</h3>
      <base-bread-crumbs :Links="Links" />
    </div>
    <div class="d-flex justify-content-flex-end goDownload mb-2">
      <NuxtLink :to="localePath('/excels/AllDownloads')">
        Go to Downloads
      </NuxtLink>
    </div>
    <div class="d-flex flex_gap justify-content-center">
      <BaseCard class="card-tiny bg-L_D_Yellow p-2">
        <h4 class="card-title mb-2">Page Content</h4>

        <div class="card-body">
          <h5
            class="card-title mb-2"
            v-for="(modulename, i) in modules"
            :key="i"
          >
            {{ modulename }}
          </h5>
        </div>
      </BaseCard>
      <div class="d-flex flex-column flex_gap">
        <BaseCard class="card-xl bg-L_D_Yellow p-2">
          <h3 class="mb-2">Customers</h3>
          <div class="card-body">
            <table class="excel__container">
              <tbody>
                <tr>
                  <td>All Customer Report</td>
                  <td>
                    <BaseInput
                      type="date"
                      :title="'From'"
                      v-model="allcustFrom"
                    />
                  </td>
                  <td>
                    <BaseInput type="date" :title="'to'" v-model="allcustTo" />
                  </td>
                  <td>
                    <BaseButton
                      :clickedFunction="getAllCustomerReport"
                      class="request-to-download"
                    >
                      Request to download
                    </BaseButton>
                  </td>
                </tr>
                <tr>
                  <td>All Customer</td>
                  <td></td>
                  <td></td>
                  <td>
                    <BaseButton
                      :clickedFunction="getAllCustomers"
                      class="request-to-download"
                    >
                      Request to download
                    </BaseButton>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </BaseCard>
        <BaseCard class="card-xl bg-L_D_Yellow p-2">
          <h3 class="mb-2">Stores</h3>
          <div class="card-body">
            <table class="excel__container">
              <tbody>
                <tr>
                  <td>Srores Target</td>
                  <td>
                    <BaseInput type="date" :title="'From'" v-model="sTFrom" />
                  </td>
                  <td>
                    <BaseInput type="date" :title="'to'" v-model="sTto" />
                  </td>
                  <td>
                    <BaseButton
                      :clickedFunction="getstoresTargetExcel"
                      class="request-to-download"
                    >
                      Request to download
                    </BaseButton>
                  </td>
                </tr>
                <tr>
                  <td>All Stores</td>
                  <td></td>
                  <td></td>
                  <td>
                    <BaseButton
                      :clickedFunction="getallStores"
                      class="request-to-download"
                    >
                      Request to download
                    </BaseButton>
                  </td>
                </tr>
                <tr>
                  <td>Srores Transfers</td>
                  <td>
                    <BaseInput
                      type="date"
                      :title="'From'"
                      v-model="stransFrom"
                    />
                  </td>
                  <td>
                    <BaseInput type="date" :title="'to'" v-model="stransTo" />
                  </td>
                  <td>
                    <BaseButton
                      :clickedFunction="getstoresTransfers"
                      class="request-to-download"
                    >
                      Request to download
                    </BaseButton>
                  </td>
                </tr>
                <tr>
                  <td>Srores Settels</td>
                  <td>
                    <BaseInput
                      type="date"
                      :title="'From'"
                      v-model="settleFrom"
                    />
                  </td>
                  <td>
                    <BaseInput type="date" :title="'to'" v-model="settleTo" />
                  </td>
                  <td>
                    <BaseButton
                      :clickedFunction="getstoresSettles"
                      class="request-to-download"
                    >
                      Request to download
                    </BaseButton>
                  </td>
                </tr>
                <tr>
                  <td>Srores Refunds</td>
                  <td>
                    <BaseInput
                      type="date"
                      :title="'From'"
                      v-model="refundsFrom"
                    />
                  </td>
                  <td>
                    <BaseInput type="date" :title="'to'" v-model="refundsTo" />
                  </td>
                  <td>
                    <BaseButton
                      :clickedFunction="getstoresRefunds"
                      class="request-to-download"
                    >
                      Request to download
                    </BaseButton>
                  </td>
                </tr>
                <tr>
                  <td>Srores Shipped Orders</td>
                  <td>
                    <BaseInput
                      type="date"
                      :title="'From'"
                      v-model="ShippedFrom"
                    />
                  </td>
                  <td>
                    <BaseInput type="date" :title="'to'" v-model="ShippedTo" />
                  </td>
                  <td>
                    <BaseButton
                      :clickedFunction="getstoresShippedOrders"
                      class="request-to-download"
                    >
                      Request to download
                    </BaseButton>
                  </td>
                </tr>
                <tr>
                  <td>Srores Factory Shipped Orders</td>
                  <td>
                    <BaseInput
                      type="date"
                      :title="'From'"
                      v-model="facShippedFrom"
                    />
                  </td>
                  <td>
                    <BaseInput
                      type="date"
                      :title="'to'"
                      v-model="facShippedTo"
                    />
                  </td>
                  <td>
                    <BaseButton
                      :clickedFunction="getstoresFactoryShippedOrders"
                      class="request-to-download"
                    >
                      Request to download
                    </BaseButton>
                  </td>
                </tr>
                <tr>
                  <td>Srores Purchase</td>
                  <td>
                    <BaseInput
                      type="date"
                      :title="'From'"
                      v-model="purchFrom"
                    />
                  </td>
                  <td>
                    <BaseInput type="date" :title="'to'" v-model="purchTo" />
                  </td>
                  <td>
                    <BaseButton
                      :clickedFunction="getstoresPurchases"
                      class="request-to-download"
                    >
                      Request to download
                    </BaseButton>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ExcelExportingComponents",
  data() {
    return {
      allcustFrom: "",
      allcustTo: new Date().toISOString().substr(0, 10),
      sTFrom: "",
      sTto: new Date().toISOString().substr(0, 10),
      stransFrom: "",
      stransTo: new Date().toISOString().substr(0, 10),
      settleFrom: "",
      settleTo: new Date().toISOString().substr(0, 10),
      refundsFrom: "",
      refundsTo: new Date().toISOString().substr(0, 10),
      ShippedFrom: "",
      ShippedTo: new Date().toISOString().substr(0, 10),
      facShippedFrom: "",
      facShippedTo: new Date().toISOString().substr(0, 10),
      purchFrom: "",
      purchTo: new Date().toISOString().substr(0, 10),

      Links: [
        {
          name: "Reports",
          url: "",
        },
        {
          name: " Exporting Excels",
          url: "/excels/Exporting",
        },
      ],
      modules: ["Customers", "Stores"],
    };
  },
  computed: {
    ...mapGetters("excels/customers", [
      "loading",
      "success",
      "error",
      "allCustomers",
      "allCustomersReport",
    ]),
  },
  methods: {
    getAllCustomerReport() {
      let from = this.allcustFrom;
      let to = this.allcustTo;
      this.$store
        .dispatch("excels/customers/fetchAllCustomersReport", { from, to })
        .then(() => {});
    },
    getAllCustomers() {
      this.$store.dispatch("excels/customers/fetchAllCustomers");
    },
    getstoresTargetExcel() {
      let from = this.sTFrom;
      let to = this.sTto;
      this.$store.dispatch("excels/stores/storesTargetExcel", { from, to });
    },
    getallStores() {
      this.$store.dispatch("excels/stores/allStores");
    },
    getstoresSettles() {
      let from = this.settleFrom;
      let to = this.settleTo;
      this.$store.dispatch("excels/stores/storesSettles", { from, to });
    },
    getstoresTransfers() {
      let from = this.stransFrom;
      let to = this.stransTo;
      this.$store.dispatch("excels/stores/storesTransfers", { from, to });
    },
    getstoresRefunds() {
      let from = this.refundsFrom;
      let to = this.refundsTo;
      this.$store.dispatch("excels/stores/storesRefunds", { from, to });
    },
    getstoresShippedOrders() {
      let from = this.ShippedFrom;
      let to = this.ShippedTo;
      this.$store.dispatch("excels/stores/storesShippedOrders", { from, to });
    },
    getstoresFactoryShippedOrders() {
      let from = this.facShippedFrom;
      let to = this.facShippedTo;
      this.$store.dispatch("excels/stores/storesFactoryShippedOrders", {
        from,
        to,
      });
    },
    getstoresPurchases() {
      let from = this.purchFrom;
      let to = this.purchTo;
      this.$store.dispatch("excels/stores/storesPurchases", { from, to });
    },
    formatDate(date) {
      return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join(
        "-"
      );
    },
    setDate() {
      let date = new Date();
      let previous = new Date(date.getTime());
      let x;
      previous.setDate(date.getDate() - 1);
      x = previous.toISOString().substr(0, 10);
      this.allcustFrom = x;

      this.sTFrom = x;

      this.stransFrom = x;

      this.settleFrom = x;

      this.refundsFrom = x;

      this.ShippedFrom = x;

      this.facShippedFrom = x;

      this.purchFrom = x;
    },
  },
  mounted() {
    this.setDate();
  },
};
</script>

<style>
</style>