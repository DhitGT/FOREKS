<template>
  <v-app dark>
    <div class="flex">
      <!-- Sidebar -->
      <dashboard-i-sidebar :profileInfo="profileInfo" />

      <!-- Main Content -->
      <div class="container flex-1 md:ml-52">
        <div class="md:pl-52 flex flex-col gap-4">
          <Nuxt />
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  mounted() {
    this.getProfileInfo()
  },
  data() {
    return {
      profileInfo: {},
    }
  },
  methods: {
    ...mapActions({
      fetchCookie: 'fetchCookie',
    }),
    async getProfileInfo() {
      const { data } = await this.$store.dispatch(
        'Dashboard/instansi/getProfileInfo'
      )
      this.profileInfo = data
    },
  },

  created() {
    this.fetchCookie()
  },
}
</script>

<style scoped>
/* Add layout-specific styling if needed */
</style>
