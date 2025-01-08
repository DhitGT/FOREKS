<template>
  <div class="bg-gray-900 text-white py-8">
    <div class="flex justify-around space-x-6 container text-center">
      <div>
        <p class="text-3xl font-semibold text-gray-300">
          {{ stats?.instansi_total }}
        </p>
        <p class="text-sm text-gray-500">Schools</p>
      </div>
      <div>
        <p class="text-3xl font-semibold text-gray-300">
          {{ stats?.eskul_total }}
        </p>
        <p class="text-sm text-gray-500">Organizations</p>
      </div>
      <div>
        <p class="text-3xl font-semibold text-gray-300">
          {{ stats?.user_total }}
        </p>
        <p class="text-sm text-gray-500">Users</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stats: [],
    }
  },

  methods: {
    async getAppsStats() {
      const data = await this.$store.dispatch('getAppStats')
      this.stats = data
      console.log('stats : ', this.stats)
    },
  },

  mounted() {
    this.getAppsStats()
  },
}
</script>
