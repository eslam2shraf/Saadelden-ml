<template>
  <div class="">
    <div>
      <ChartsChartBar
        :chartdata="chartData"
        :options="options"
        v-if="chartData"
      />
    </div>
    <div class="categories-values">
      <p v-for="(productCat, index) in values.product_cat" :key="index">
        <span class="font-weight-bold"
          >{{ $t("Category") }}{{ index + 1 }}: </span
        >
        <span>
          {{ $t("from") }} {{ productCat.lower_price }} {{ $t("LE") }}
          {{ $t("to") }} {{ productCat.upper_price }} {{ $t("LE") }}
        </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "FrontendMlCategoriesChart",
  props: {
    values: {
      type: Object,
    },
  },
  watch: {
    values() {
      this.getData();
    },
  },
  data() {
    return {
      chartData: null,
      options: {
        responsive: true,
        maintainAspectRatio: false,

        legend: {
          align: "right",
          labels: {
            usePointStyle: true,
            boxWidth: 10,
          },
          position: "bottom",
          maxWidth: 100,
          display: false,
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
              scaleLabel: {
                display: true,
                labelString: this.$t("ProductsCategories"),
              },
            },
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: this.$t("num_ofProducts"),
              },
              ticks: {
                beginAtZero: true,
                suggestedMax: 10,
              },
            },
          ],
        },
      },
      colors: [],
      labels: ["category1", "category2", "category3", "category4"],
    };
  },
  computed: {
    getProductCategories() {
      const categories = [];
      Object.entries(this.values.data).forEach((element) => {
        for (let index = 0; index < this.labels.length; index++) {
          if (element[0] === `product_cat_${index + 1}`) {
            categories.push(element[1]);
            this.colors.push("#033043");
          }
        }
      });
      return categories;
    },
  },
  mounted() {
    this.getData();
  },

  methods: {
    getData() {
      this.chartData = {
        datasets: [
          {
            backgroundColor: this.colors,
            data: this.getProductCategories,
            barThickness: 22,
            borderRadius: 50,
          },
        ],
        labels: this.labels,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>