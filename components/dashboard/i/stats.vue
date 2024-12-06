<template>
  <div>
    <apexchart
      type="line"
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
  data() {
    return {
      // Dummy data for each category and 5 eskuls
      chartData: [
        {
          name: 'Member Total',
          data: [25, 30, 20, 15, 10], // Example member totals for each eskul
        },
        {
          name: 'Kas Total (in thousands)',
          data: [50, 75, 30, 40, 60], // Example kas totals for each eskul in thousands
        },
        {
          name: 'Achievements',
          data: [3, 4, 1, 5, 2], // Example achievements count for each eskul
        },
        {
          name: 'Absensi (%)',
          data: [90, 85, 95, 80, 88], // Absensi percentage for each eskul
        },
      ],
      chartOptions: {
        chart: {
          type: 'line',
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
          categories: ['Eskul 1', 'Eskul 2', 'Eskul 3', 'Eskul 4', 'Eskul 5'],
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
        colors: ['#1E90FF', '#32CD32', '#FFD700', '#FF6347'], // Colors for each category
      },
    }
  },
}
</script>

<style>
/* Optional: adjust the chart's appearance */
</style>
