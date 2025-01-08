<template>
  <div>
    <apexchart
      type="bar"
      class="text-white"
      :options="chartOptions"
      :series="chartData"
    />
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    eskulInstansiList: {
      Type: Array,
    },
  },
  data() {
    return {
      chartData: [],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: [
            'Member Total',
            'Kas Total (in thousands)',
            'Achievements',
            'Alumni',
          ],
        },
        yaxis: {
          title: {
            text: 'Values',
          },
        },
        title: {
          text: 'Eskul Statistics',
          align: 'center',
        },
        colors: [], // Colors for each category
      },
    }
  },
  mounted() {
    this.updateChartData()
  },
  watch: {
    eskulInstansiList() {
      this.updateChartData()
    },
  },
  methods: {
    updateChartData() {
      if (this.eskulInstansiList) {
        this.chartData = []
        this.chartOptions.colors = []
        this.eskulInstansiList.forEach((eskul, index) => {
          this.chartData.push({
            name: eskul.name,
            data: [
              eskul.total_member,
              eskul.total_kas,
              eskul.total_achievement,
              eskul.alumni,
            ],
          })
          this.chartOptions.colors.push(this.getRandomColor())
        })
      }
    },
    getRandomColor() {
      var letters = '0123456789ABCDEF'
      var color = '#'
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    },
  },
}
</script>

<style>
/* Optional: adjust the chart's appearance */
</style>
