  <template>
  <div class="flex gap-3">
    <apexchart
      type="pie"
      class="text-black w-full"
      :options="chartOptions"
      :series="chartData"
    />
    <apexchart
      type="pie"
      class="text-black w-full"
      :options="chartOptionsMember"
      :series="chartDataMember"
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
      dataKas: [],
      chartData: [],
      chartDataMember: [],
      dataMember: [],
      chartOptions: {
        chart: {
          type: 'pie',
        },
        labels: [], // Eskul names will be added here dynamically
        title: {
          text: 'Eskul Kas',
          align: 'center',
        },
        responsive: [
          {
            breakpoint: 768,
            options: {
              chart: {
                width: '100%',
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
      },
      chartOptionsMember: {
        chart: {
          type: 'pie',
        },
        labels: [], // Eskul names will be added here dynamically
        title: {
          text: 'Eskul Members',
          align: 'center',
        },
        responsive: [
          {
            breakpoint: 768,
            options: {
              chart: {
                width: '100%',
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
      },
    }
  },
  async mounted() {
    await this.getChartData()
  },
  methods: {
    formatRp(amount = 0) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      }).format(amount)
    },
    async getChartData() {
      const response = await this.$store.dispatch(
        'Dashboard/instansi/getChartData'
      )

      this.dataKas = response.data.kas
      this.dataMember = response.data.member

      this.chartData = this.dataKas.map((item) => parseInt(item.total)) // Keep this numeric for ApexCharts

      // Use `this.formatRp` in the tooltip for better display
      this.chartOptions = {
        ...this.chartOptions,
        labels: this.dataKas.map((item) => item.eskul.name), // Labels for the chart
        tooltip: {
          y: {
            formatter: (value) => this.formatRp(value), // Format values in tooltips
          },
        },
      }

      this.chartDataMember = this.dataMember.map(
        (item) => item.eskul_members_count
      ) // Totals for pie chart series

      // Recreate chartOptions object
      this.chartOptions = {
        ...this.chartOptions, // Preserve existing properties
        labels: this.dataKas.map((item) => item.eskul.name), // Assign Eskul names
      }

      // Recreate chartOptionsMember object
      this.chartOptionsMember = {
        ...this.chartOptionsMember, // Preserve existing properties
        labels: this.dataMember.map((item) => item.name), // Assign Eskul member names
      }

      console.log('Updated chartOptions:', this.chartOptions)
      console.log('Updated chartOptionsMember:', this.chartOptionsMember)
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
