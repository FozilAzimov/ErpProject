<template>
  <div>
    <canvas ref="lineChart"></canvas>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Chart } from 'chart.js'

export default {
  // PROPS
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },

  // DATA
  data() {
    return {
      chart: null,
    }
  },

  // COMPUTED
  computed: {
    // Store getters
    ...mapGetters('translate', ['GET_CORE_STRING']),
  },

  // WATCH
  watch: {
    // start CoreString action
    GET_CORE_STRING: {
      handler(newVal) {
        if (this.chart) {
          this.chart.destroy()
        }
        // function
        newVal.length && this.renderChart(newVal, this.data)
      },
      deep: true,
    },
    // end CoreString action

    data: {
      handler(newVal) {
        if (this.chart) {
          this.chart.destroy()
        }
        // function
        newVal.length && this.renderChart(this.GET_CORE_STRING, newVal)
      },
      deep: true,
      immediate: true,
    },
  },

  // METHODS
  methods: {
    renderChart(getText, arr) {
      const ctx = this.$refs.lineChart.getContext('2d')

      // Chart instansiyasini o'zgaruvchiga saqlash
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [
            getText?.january,
            getText?.february,
            getText?.march,
            getText?.april,
            getText?.may,
            getText?.june,
            getText?.july,
            getText?.august,
            getText?.september,
            getText?.october,
            getText?.november,
            getText?.december,
          ],
          datasets: arr,
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      })
    },
  },
}
</script>

<style scoped>
canvas {
  width: 100% !important;
  height: 400px !important;
}
</style>
