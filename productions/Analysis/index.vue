<template>
  <div class="container-fluid--50 p-2 min-height--46 min-height--lg">
    <h3>
      {{ $t("ProductionLinesAnalysis") }}
    </h3>

    <BaseTabs
      :tabList="tabshead"
      :sideTitle="true"
      class="container-fluid--50"
      :tabName="'PlAnalysis'"
    >
      <template v-slot:PlAnalysis-0>
        <Production />
      </template>
      <template v-slot:PlAnalysis-1>
        <Worker />
      </template>
      <template v-slot:PlAnalysis-2>
        <Cost />
      </template>
      <template v-slot:PlAnalysis-3>
        <div class="d-flex flex_gap">
          <Mostmaterials />
          <Lessmaterials />
        </div>
      </template>
      <template v-slot:PlAnalysis-4>
        <wastes  />
      </template>
    </BaseTabs>
  </div>
</template>

<script>
import AnomalieChart from "./AnomalieChart.vue";
import Lessmaterials from "./Lessmaterials.vue";
import Mostmaterials from "./Mostmaterials.vue";
import Production from "./Production.vue";
import Wastes from "./Wastes.vue";
import Worker from "./Worker.vue";
import Cost from "./Cost.vue";
export default {
  components: {
    AnomalieChart,
    Wastes,
    Mostmaterials,
    Lessmaterials,
    Production,
    Worker,
    Cost,
  },
  name: "ProductionLinesAnalysis",
  data() {
    return {
      tabshead: [
        `${this.$t("ProductionLines")}`,
        `${this.$t("Workers")}`,
        `${this.$t("Cost")}`,
        `${this.$t("materials")}`,
        `${this.$t("Wastes")}`,
      ],
    };
  },
};
</script>

<style></style>
