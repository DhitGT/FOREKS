<template>
  <div>
    <!-- Toggle Button -->
    <button
      @click="toggleSidebar"
      class="inline-flex items-center p-2 mt-2 ml-3 text-gray-300 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
    >
      <i class="mdi mdi-menu text-2xl"></i>
    </button>

    <!-- Sidebar -->
    <div>
      <!-- Overlay -->
      <div
        v-if="isSidebarOpen"
        @click="toggleSidebar"
        class="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
      ></div>

      <!-- Sidebar -->
      <aside
        :class="[isSidebarOpen ? 'translate-x-0' : '-translate-x-full']"
        class="fixed top-0 left-0 z-20 w-64 h-full transition-transform bg-gray-900 border-r border-gray-700"
      >
        <div class="h-full px-3 py-4 overflow-y-auto">
          <!-- Sidebar Header -->
          <div class="flex items-center gap-2">
            <button
              @click="toggleSidebar"
              class="inline-flex items-center p-2 ml-3 text-gray-300 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
            >
              <i class="mdi mdi-close text-2xl"></i>
            </button>
            <div class="text-2xl font-bold text-gray-300">Dashboard</div>
          </div>

          <!-- Sidebar Menu -->
          <ul class="space-y-2">
            <li>
              <nuxt-link
                to="/"
                class="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700"
              >
                <i class="mdi mdi-home-outline text-xl"></i>
                <span class="ml-3">Home</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                :to="'/i/' + profileInfo.nama"
                class="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700"
              >
                <i class="mdi mdi-account-outline text-xl"></i>
                <span class="ml-3">Profile</span>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                to="/messages"
                class="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700"
              >
                <i class="mdi mdi-card-account-details-outline text-xl"></i>
                <span class="ml-3">Web Profile</span>
              </nuxt-link>
            </li>
            <li v-if="token">
              <div
                @click="handleLogout"
                class="flex cursor-pointer items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700"
              >
                <i class="mdi mdi-logout text-xl"></i>
                <span class="ml-3">Logout</span>
              </div>
            </li>
          </ul>
        </div>
      </aside>
    </div>
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
    eskulList: {
      type: Array,
    },
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
    async handleLogout() {
      try {
        const res = await this.$store.dispatch('logout')
      } catch (error) {
        console.error('Error:', error)
      }
    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen
      this.$emit('isSidebarOpen', this.isSidebarOpen)
    },
  },
}
</script>
