<template>
  <div>
    <dashboard-o-sidebar :profileInfo="profileInfo" />
    <div class="container md:ml-52">
      <div class="md:pl-52 flex flex-col gap-4">
        <p class="text-2xl font-bold">Management Web Profile</p>
        <dashboard-o-management-web-profile :profileInfo="profileInfo" />
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
    }
  },
  methods: {
    async getProfileInfo() {
      const { data } = await this.$store.dispatch(
        'Dashboard/organization/getProfileInfo'
      )
      this.profileInfo = data
    },
  },
}
</script>
