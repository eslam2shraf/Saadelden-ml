<template>
  <BaseCard class="bg-L_D_Yellow">
    <div class="p-3 b-1">
      <LayoutsFilter
        @fromDate="getFromLessDate"
        @toDate="getToLessDate"
        :filter="() => filterlessMovement()"
        class="input-date--lg"
        :Msg="lessSoldErrMsg"
        @resetErrorMsg="setLessSoldErrorMsg"
      />

      <h5 class="card-title mb-2">
        {{ $t("least_sold_movement_products_title") }}
      </h5>
    </div>
    <div class="card-body mt-1">
      <h4 v-if="isMovementLeastSoldLoading" class="text-center">
        {{ $t("loading") }}
      </h4>
      <div class="mt-2 position--relative">
        <span class="chart-title left-15 ml-3" v-if="chartData"
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
  props: {
  },
  data() {
    return {
      chartData: null,
      isMovementLeastSoldLoading:false,
      lessSoldErrMsg:'',
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
  computed: {
    ...mapGetters("products/segmentaion", [
      "loading",
      "success",
      "error",
      "movementLessSold",
    ]),
  },
  watch: {
    movementLessSold(movementLessSold) {
      this.getMovement(movementLessSold);
    },
  },
  methods: {
    setLessSoldErrorMsg(msg){
      this.lessSoldErrMsg = msg
    },
    getFromLessDate(from) {
      this.filter_fromless = from;
    },
    getToLessDate(to) {
      this.filter_toless = to;
    },
    filterlessMovement() {
      this.isMovementLeastSoldLoading = true;
      this.$store
        .dispatch("products/segmentaion/fetchMovementLessSold", {
          from: this.filter_fromless,
          to: this.filter_toless,
        })
        .then(() => {
          this.isMovementLeastSoldLoading =  false;
          this.getMovement(this.movementLessSold)
          if (
            this.movementLessSold &&
            this.movementLessSold.response &&
            this.movementLessSold.response.data &&
            this.movementLessSold.response.data.errors &&
            this.movementLessSold.response.data.errors.to
          ) {
            this.lessSoldErrMsg =  this.movementLessSold.response.data.errors.to[0]
          }
        });
    },
    getMovement(movementLessSold) {
      let len = 0;
      if (!movementLessSold.response && movementLessSold.dates) {
        len = movementLessSold.dates.length;
      }
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

      if (!movementLessSold.response) {
        labels = movementLessSold.dates;
        Object.entries(movementLessSold.data).forEach(([key, value], j) => {
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
    },
  },
  mounted() {
    this.filterlessMovement();
    if (window.innerWidth <= 800) {
      this.options.legend.position = "bottom";
    }
  },
};
</script>

<style>
</style>