<template>
  <BaseCard class="bg-L_D_Yellow">
    <div class="p-3 b-1">
      <LayoutsFilter
        @fromDate="getFromMostDate"
        @toDate="getToMostDate"
        :filter="() => filterMostMovement()"
        class="input-date--lg"
        :Msg="mostSoldErrMsg"
        @resetErrorMsg="setMostSoldErrorMsg"
      />
      <h5 class="card-title mb-2">
        {{ $t("most_sold_movement_products_title") }}
      </h5>
    </div>
    <div class="card-body mt-1">
      <h4 v-if="isMovementMostSoldLoading" class="text-center">
        {{ $t("loading") }}
      </h4>
      <div class="mt-2 position--relative">
        <span class="chart-title left-15" v-if="chartData"
          >({{ $t("LE") }})</span
        >
        <ChartsChartLine
          :chartdata="chartData"
          :options="options"
          v-if="chartData"
        />
      </div>
    </div>
  </BaseCard>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "MovementMostSoldChart",

  data() {
    return {
      chartData: null,
      isMovementMostSoldLoading:false,
      mostSoldErrMsg:'',
      options: {
        cutoutPercentage: 70,
        responsive: true,
        maintainAspectRatio: false,

        legend: {
          align: "right",
          labels: {
            usePointStyle: true,
            boxWidth: 10,
          },
          position: "left",
          maxWidth: 100,
        },
      },
    };
  },
  props: {

  },

  watch: {
    movementMostSold(movementMostSold) {
      this.getMovement(movementMostSold);
    },
  },
  computed: {
    ...mapGetters("products/segmentaion", [
      "loading",
      "success",
      "error",
      "movementMostSold",
    ]),
  },
  methods: {
    setMostSoldErrorMsg(msg) {
      this.mostSoldErrMsg = msg;
    },

    getFromMostDate(from) {
      this.filter_from = from;
    },
    getToMostDate(to) {
      this.filter_to = to;
    },
    getMovement(movementMostSold) {
      if (movementMostSold) {
        let len = 0;
        if (!movementMostSold.response && movementMostSold.dates) {
          len = movementMostSold.dates.length;
        }
        this.chartData = null;
        let dataProduct = new Array(len).fill(0),
          labels = new Array(len).fill(0),
          lableP = "",
          colors = [
            "#033043",
            "#F1A87F",
            "#A5D4DC",
            "#BAAD8F",
            "#70654C",
            "rgba(3, 48, 67, 0.50)",
            "rgba(241, 168, 127, 0.50)",
            "rgba(165, 212, 220, 0.50)",
            "rgba(186, 173, 143, 0.50)",
            "rgba(112, 101, 76, 0.50)",
          ],
          dataSets = [];

        if (!movementMostSold.response) {
          labels = movementMostSold.dates;
          Object.entries(movementMostSold.data).forEach(([key, value], j) => {
            Object.entries(value).forEach(([key, val]) => {
              for (let i = 0; i < labels.length; i++) {
                if (labels[i] === val.date) {
                  dataProduct[i] = val.orders_price.split(",").join("");
                }
              }
              lableP = val.name;
            });
            let obj = {
              label: lableP,
              data: dataProduct,
              pointBackgroundColor: colors[j],
              borderColor: colors[j],
              pointHoverBackgroundColor: colors[j],
              pointHoverBorderColor: "#FFFFFF",
              pointHoverBorderWidth: 3,
              pointHoverRadius: 10,
              fill: false,
            };
            dataSets.push(obj);
            dataProduct = new Array(7).fill(0);
          });
        }
        this.chartData = {
          datasets: dataSets,
          labels: labels,
        };
      }
    },
    filterMostMovement() {
      this.isMovementMostSoldLoading= true
      this.$store.dispatch("products/segmentaion/fetchMovementMostSold", {
        from: this.filter_from,
        to: this.filter_to,
      }).then(() => {
        this.isMovementMostSoldLoading= false
        this.getMovement(this.movementMostSold)
          if (
            this.movementMostSold &&
            this.movementMostSold.response &&
            this.movementMostSold.response.data &&
            this.movementMostSold.response.data.errors &&
            this.movementMostSold.response.data.errors.to
          ) {
            this.mostSoldErrMsg =  this.movementMostSold.response.data.errors.to[0]
          }
        });
    },
  },

  mounted() {
    this.filterMostMovement()
    if (window.innerWidth <= 800) {
      this.options.legend.position = "bottom";
    }
  },
};
</script>

<style>
</style>