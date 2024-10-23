
<script>
import { Doughnut } from "vue-chartjs";

export default {
  extends: Doughnut,
  props: {
    chartdata: {
      type: Object,
      default: null,
    },
    options: {
      type: Object,
      default: null,
    },
  },
  watch:{
    chartdata(){
      this.renderChart(this.chartdata, this.options);
    }
  },
  mounted() {
    this.renderChart(this.chartdata, this.options);
  },
};
</script>

<style>
</style>