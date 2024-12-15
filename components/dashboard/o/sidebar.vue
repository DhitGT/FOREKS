<template>
  <div>
    <!-- Toggle Button -->
    <button
      @click="toggleSidebar"
      class="inline-flex items-center p-2 mt-2 ml-3 text-gray-300 rounded-lg sm:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
    >
      <i class="mdi mdi-menu text-2xl"></i>
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
            <i class="mdi mdi-close text-2xl"></i>
          </button>
          <div class="text-2xl font-bold text-gray-300">Dashboard</div>
        </div>
        <ul class="space-y-2">
          <li>
            <nuxt-link
              to="/dashboard/o"
              class="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700"
            >
              <i class="mdi mdi-home-outline text-xl"></i>
              <span class="ml-3">Dashboard</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              :to="`/i/${profileInfo?.data?.instansi.instansi_web_page.custom_domain_name}/${profileInfo?.data?.web_pages.custom_domain_name}`"
              class="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700"
            >
              <i class="mdi mdi-card-outline text-xl"></i>
              <span class="ml-3">Web Profile</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/dashboard/o/webprofile"
              class="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700"
            >
              <i class="mdi mdi-pencil-outline text-xl"></i>
              <span class="ml-3">Edit Web Profile</span>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </aside>
  </div>
</template>

<script>
export default {
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
  },
}
</script>
