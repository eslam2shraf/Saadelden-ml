<template>
  <div class="">
    <ChartsChartLine :chartdata="chartData" :options="options" v-if="chartData" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: 'MostQuantityMovement',
  data() {
    return {
      chartData: null,
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
      "movementMostQuantity",
    ]),
  },
  created() {
    this.$store
      .dispatch("products/segmentaion/fetchMostQuantityMovement")
      .then(() => {
        let len = 0;
        if (this.movementMostQuantity && this.movementMostQuantity.dates) {
          len = this.movementMostQuantity.dates.length;
        }
        let dataProduct = new Array(len).fill(0),
          labels = new Array(len).fill(0),
          lableP = "", colors = ['#033043', '#F1A87F', '#A5D4DC', '#BAAD8F', '#70654C', 'rgba(3, 48, 67, 0.50)',
            'rgba(241, 168, 127, 0.50)', 'rgba(165, 212, 220, 0.50)', 'rgba(186, 173, 143, 0.50)', 'rgba(112, 101, 76, 0.50)'],
          dataSets = [];

        if (this.movementMostQuantity) {
          labels = this.movementMostQuantity.dates;
          Object.entries(this.movementMostQuantity.data).forEach(([key, value], j) => {
            Object.entries(value).forEach(([key, val]) => {
              for (let i = 0; i < labels.length; i++) {
                if (labels[i] === val.date) {
                  dataProduct[i] = (val.orders_quantity)
                }
              }
              lableP = val.name;
            })
            let obj = {
              label: lableP,
              data: dataProduct,
              pointBackgroundColor:  colors[j],
              borderColor: colors[j],
              pointHoverBackgroundColor: colors[j],
              pointHoverBorderColor: "#FFFFFF",
              pointHoverBorderWidth: 3,
              pointHoverRadius: 10,
              fill: false,
            }
            dataSets.push(obj)
            dataProduct = new Array(7).fill(0);
          })

        }
        this.chartData = {
          datasets: dataSets,
          labels: labels,
        }
      })
  }
}
</script>

<style></style>