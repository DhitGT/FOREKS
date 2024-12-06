<template>
  <div>
    <apexchart
      type="bar"
      class="text-black"
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
    profileInfo: {
      type: Object, // Changed to Object
    },
  },
  data() {
    return {
      chartData: [
        {
          name: 'Member Total',
          data: [], // Will be populated dynamically
        },
        {
          name: 'Followers Total',
          data: [], // Will be populated dynamically
        },
        {
          name: 'Total Organization',
          data: [], // Will be populated dynamically
        },
        {
          name: 'Achievements Total',
          data: [], // Will be populated dynamically
        },
      ],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 350,
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: ['Total'], // A single category for all the values
        },
        yaxis: {
          title: {
            text: 'Values',
          },
        },
        title: {
          text: 'Instansi Statistics',
          align: 'center',
        },
        colors: ['#1E90FF', '#32CD32', '#FFD700', '#FF6347'], // Colors for each category
      },
    }
  },
  watch: {
    // Watch for changes in profileInfo prop and update chart data
    profileInfo: {
      handler(newValue) {
        if (newValue) {
          // Update chart data based on profileInfo properties
          this.chartData[0].data = [newValue.total_member] // total_member data
          this.chartData[1].data = [newValue.total_followers] // total_followers data
          this.chartData[2].data = [newValue.total_organization] // total_organization data
          this.chartData[3].data = [newValue.total_achivement || 0] // total_achivement (set default 0 if undefined)
        }
      },
      immediate: true, // Trigger the handler immediately to update chart on component mount
    },
  },
}
</script>

<style scoped>
/* Optional: adjust the chart's appearance */
</style>
