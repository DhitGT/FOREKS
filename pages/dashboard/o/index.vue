<template>
  <div>
    <dashboard-o-sidebar :profileInfo="profileInfo" />
    <div class="container md:ml-52">
      <!-- make this as a content -->
      <div v-if="!loading" class="md:pl-52 flex flex-col gap-4">
        <p class="text-2xl font-bold">Profile</p>
        <dashboard-o-info :profileInfo="profileInfo" />
        <p class="text-2xl font-bold">Eskul Member</p>
        <dashboard-o-eskul-member-table
          @fetchMember="getEskulMembers"
          :eskulMembers="eskulMembers"
          :pagination="pagination"
        />
      </div>
      <div class="md:pl-52 flex flex-col gap-4">
        <loading-screen :loading="loading" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getProfileInfo()
    this.getEskulMembers(1)
  },
  data() {
    return {
      viewMode: 'list', // default view mode
      profileInfo: [],
      eskulMembers: [],
      pagination: [],
      loading: false,
    }
  },
  methods: {
    async getProfileInfo() {
      this.loading = true
      const { data } = await this.$store.dispatch(
        'Dashboard/organization/getProfileInfo'
      )
      this.profileInfo = data
      this.loading = false
    },
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

<style scoped>
/* Optional styling for the selected view mode button */
.font-bold.underline {
  text-decoration: underline;
}
</style>
