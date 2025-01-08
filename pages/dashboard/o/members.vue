<template>
  <div>
    <p class="text-2xl font-bold">Eskul Member</p>
    <div v-if="!loading">
      <dashboard-o-eskul-member-table
        @fetchMember="getEskulMembers"
        :eskulMembers="eskulMembers"
        :pagination="pagination"
      />
    </div>
    <div class="flex flex-col gap-4">
      <loading-screen :loading="loading" />
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboardLayout', // Specify the layout to use
  data() {
    return {
      profileInfo: [],
      eskulMembers: [],
      pagination: [],
      loading: false,
    }
  },
  mounted() {
    this.getEskulMembers(1)
  },
  methods: {
    async getEskulMembers(page) {
      this.loading = true
      const { data } = await this.$store.dispatch(
        'Dashboard/organization/getEskulMembers',
        page
      )
      this.eskulMembers = data.data
      this.pagination = data.pagination
      console.log('pagination : ', this.pagination)
      this.loading = false
    },
  },
}
</script>
