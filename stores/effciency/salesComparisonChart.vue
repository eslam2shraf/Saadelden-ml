<template>
    <div class="mt-9  position--relative">
      <!-- <span class="chart-title">{{ $t("LE") }}</span> -->
      <ChartsChartBar
        :chartdata="chartData"
        :options="options"
        v-if="chartData"
      />
    </div>
</template>
  
  <script>
  import { mapGetters } from "vuex";
  export default {
    name: "AvgSelling",
    data() {
      return {
        chartData: null,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: "y",
          legend: {
            labels: {
              usePointStyle: true,
            },
            position: "bottom",
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  suggestedMax: 4000,
                },
              },
            ],
            xAxes: [
              {
                gridLines: {
                  display: false,
                },
              },
            ],
          },
        },
      };
    },
  
    computed: {
      ...mapGetters("stores/stores", [
        "loading",
        "success",
        "error",
        "StoresSales",
      ]),
    },
    methods: {
      // convertSegmentName(name) {
      //   let newName = "";
      //   if (name === "segment_0") {
      //     newName = `${this.$t("Premium_pluse")}`;
      //   }
      //   if (name === "segment_1") {
      //     newName = `${this.$t("Standard")}`;
      //   }
      //   if (name === "segment_2") {
      //     newName = `${this.$t("Premium")}`;
      //   }
      //   if (name === "segment_3") {
      //     newName = `${this.$t("Elite")}`;
      //   }
      //   return newName;
      // },
    },
    created() {
      this.$store.dispatch("stores/stores/fetchStoresSales").then(() => {
        let data1 = [],
          data2 = [],
          label = [],
          colors1 = [],
          colors2 = [],
          colors3 = [];
        if (this.StoresSales) {
          Object.entries(this.StoresSales.data).forEach(
            ([key, value]) => {
              data1.push(value.avg_last_monthes);
              data2.push(value.last_month);
              colors1.push("#A5D4DC");
              value.normal === "1" ? colors2.push("#033043") : colors2.push("#B21C1C");
              colors3.push("#033043");
              label.push(value.store_name);
            }
          );
        }
  
        this.chartData = {
          datasets: [
            {
              label: `${this.$t("Average_sale_amount")}`,
              backgroundColor: colors1,
              data: data1,
              barThickness: 25,
              borderRadius: 50,
            },
            {
              label: `${this.$t("Last_month_sale_amount")}`,
              backgroundColor: colors2,
              borderColor:colors3,
              borderWidth:3,
              data: data2,
              barThickness: 25,
            },
          ],
          labels: label,
        };
      });
    },
  };
  </script>
  
  <style>
  </style>