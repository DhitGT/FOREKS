<template>
  <div class="px-8">
    <p class="text-2xl font-bold">Eskul Absent</p>
    <div
      v-if="!loading"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <div
        v-for="item in absens"
        :key="item?.id"
        @click="$router.push(`/dashboard/o/absent/${item?.absent_code}`)"
        class="bg-gray-700 rounded-lg p-4 shadow-lg hover:bg-gray-800 cursor-pointer"
      >
        <h3 class="text-lg font-bold">
          {{ item?.eskul_report_activity?.title }}
        </h3>
        <p><strong>Absent Code:</strong> {{ item?.absent_code }}</p>
        <p>
          <strong>Date:</strong>
          {{ formatDate(item?.eskul_report_activity?.date_start) }}
        </p>
      </div>
    </div>
    <div v-else class="flex flex-col gap-4">
      <loading-screen :loading="loading" />
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboardLayout', // Specify the layout to use
  data() {
    return {
      absens: [],
      loading: false,
    }
  },
  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(dateString).toLocaleDateString(undefined, options)
    },
    async GetEskulAbsen(page) {
      this.loading = true
      const { data } = await this.$store.dispatch(
        'Dashboard/absent/GetEskulAbsen',
        page
      )
      this.absens = data.data
      console.log('absen : ', this.absens)
      this.loading = false
    },
  },
  mounted() {
    this.GetEskulAbsen()
  },
}
</script>
