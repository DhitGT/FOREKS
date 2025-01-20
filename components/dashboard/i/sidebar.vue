<template>
  <div>
    <!-- Toggle Button -->
    <button
      @click="toggleSidebar"
      class="inline-flex items-center p-2 mt-2 ml-3 text-gray-300 rounded-lg sm:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
    >
      <i class="text-white mdi mdi-menu text-2xl"></i>
    </button>

    <!-- Sidebar -->
    <aside
      :class="[
        'fixed top-0 left-0 w-64 h-full transition-transform bg-gray-900 border-r border-gray-700',
        { '-translate-x-full': !isSidebarOpen, 'translate-x-0': isSidebarOpen },
      ]"
      class="z-20 sm:translate-x-0"
    >
      <div class="h-full px-3 py-4 overflow-y-auto">
        <div class="flex items-center gap-2">
          <button
            @click="toggleSidebar"
            class="inline-flex items-center p-2 ml-3 text-gray-300 rounded-lg sm:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            <i class="text-white mdi mdi-close text-2xl"></i>
          </button>
          <div class="flex flex-col">
            <img
              src="/assets/img/foresk white.png"
              class="w-16"
              alt="Foresk Logo"
            />
            <div class="text-2xl font-bold text-gray-300">
              Intansi Dashboard
            </div>
          </div>
        </div>
        <ul class="space-y-2">
          <li>
            <nuxt-link
              to="/dashboard/i"
              class="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700"
            >
              <i class="text-white mdi mdi-home-outline text-xl"></i>
              <span class="text-white ml-3">Dashboard</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              v-if="profileInfo?.data?.custom_domain_name"
              :to="`/i/${profileInfo?.data?.custom_domain_name}`"
              class="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700"
            >
              <i class="text-white mdi mdi-card-outline text-xl"></i>
              <span class="text-white ml-3">Web Profile</span>
            </nuxt-link>
            <div
              v-else
              class="flex items-center p-2 text-gray-600 cursor-progress rounded-lg hover:bg-gray-700"
            >
              <i class="text-gray-500 mdi mdi-card-outline text-xl"></i>
              <span class="text-gray-500 ml-3">Web Profile</span>
            </div>
          </li>

          <li>
            <nuxt-link
              to="/dashboard/i/reportActivity"
              class="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700"
            >
              <i class="text-white mdi mdi-note-text text-xl"></i>
              <!-- Activity Report Icon -->
              <span class="text-white ml-3">Activity Report</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/dashboard/i/absent"
              class="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700"
            >
              <i class="text-white mdi mdi-calendar-check text-xl"></i>
              <!-- Absent Icon -->
              <span class="text-white ml-3">Absent</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/dashboard/i/kas"
              class="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700"
            >
              <i class="text-white mdi mdi-cash-multiple text-xl"></i>
              <!-- Kas (Cash) Icon -->
              <span class="text-white ml-3">Kas</span>
            </nuxt-link>
          </li>

          <li v-if="token">
            <div
              @click="handleLogout"
              class="flex cursor-pointer items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700"
            >
              <i class="text-white mdi mdi-logout text-xl"></i>
              <span class="text-white ml-3">Logout</span>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      token: (state) => state.token,
    }),
  },
  props: {
    profileInfo: {
      type: Object,
    },
  },
  data() {
    return {
      isSidebarOpen: false,
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen
    },
    async handleLogout() {
      try {
        const res = await this.$store.dispatch('logout')
      } catch (error) {
        console.error('Error:', error)
      }
    },
  },
}
</script>
