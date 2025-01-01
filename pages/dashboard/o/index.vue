<template>
  <div>
    <dashboard-o-sidebar :profileInfo="profileInfo" />
    <div class="container md:ml-52">
      <div class="md:pl-52 flex flex-col gap-4">
        <p class="text-2xl font-bold">Profile</p>
        <dashboard-o-info :profileInfo="profileInfo" />
        <p class="text-2xl font-bold">Eskul Member</p>
        <dashboard-o-eskul-member-table
          @fetchMember="getEskulMembers"
          :eskulMembers="eskulMembers"
          :pagination="pagination"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getProfileInfo()
  },
  data() {
    return {
      viewMode: 'list', // default view mode
      profileInfo: [],
      eskulMembers: [],
      pagination: [],
    }
  },
  methods: {
    async getProfileInfo() {
      const { data } = await this.$store.dispatch(
        'Dashboard/organization/getProfileInfo'
      )
      this.profileInfo = data
    },
    async getEskulMembers(page) {
      const { data } = await this.$store.dispatch(
        'Dashboard/organization/getEskulMembers',
        page
      )
      this.eskulMembers = data.data
      this.pagination = data.pagination
      console.log('pagination : ', this.pagination)
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
