<template>
  <div>
    <ChartsChartBar
      :chartdata="chartData"
      :options="options"
      v-if="chartData"
    />
    <p class="ai-power-seller__transactions__categoriescharts__desc">
      {{ $t('clientTypesChartesc') }}
     
    </p>
  </div>
</template>

<script>
export default {
  name: "TypesChart",
  props: {
    labels: {
      type: Array,
    },
    values: {
      type: Object,
    },
  },
  watch:{
    values(){
      this.getData()
    }
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
                labelString: this.$t("customersTypes"),
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
    };
  },

  mounted() {
    this.getData();
  },
  computed: {
    getclientTypes() {
      const types = [];
      Object.entries(this.values).forEach((element) => {
        for (let index = 0; index < this.labels.length; index++) {
          if (element[0] == `client_type_${index + 1}.0`) {
            types.push(element[1]);
            this.colors.push("#033043");
          }
        }
      });
      return types;
    },
  },
  methods: {
    getData() {
      this.chartData = {
        datasets: [
          {
            backgroundColor: this.colors,
            data: this.getclientTypes,
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

<style>
</style>