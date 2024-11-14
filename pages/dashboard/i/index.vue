<template>
  <div>
    <dashboard-i-sidebar />
    <div class="container md:ml-52">
      <div class="md:pl-52 flex flex-col gap-4">
        <div>
          <p class="text-2xl font-bold">Activity</p>
          <dashboard-i-status />
        </div>
        <hr />
        <p class="text-2xl font-bold">Profile</p>
        <dashboard-i-info />
        <hr />
        <div>
          <p class="text-2xl font-bold">Organization</p>
        </div>

        <!-- View mode selector -->
        <div class="flex gap-2">
          <button
            @click="viewMode = 'list'"
            :class="viewMode === 'list' ? 'font-bold underline' : ''"
            class="text-gray-600 hover:text-gray-800"
          >
            List View
          </button>
          <button
            @click="viewMode = 'table'"
            :class="viewMode === 'table' ? 'font-bold underline' : ''"
            class="text-gray-600 hover:text-gray-800"
          >
            Table View
          </button>
        </div>

        <!-- Conditional rendering based on view mode -->
        <div v-if="viewMode === 'list'">
          <dashboard-i-ekstrakurikuler-list />
        </div>
        <div v-else-if="viewMode === 'table'">
          <dashboard-i-ekstrakurikuler-table />
        </div>
        <hr />
        <div>
          <p class="text-2xl font-bold">User Management</p>
        </div>
        <dashboard-i-user-management />
        <hr />
        <div>
          <p class="text-2xl font-bold">Charts</p>
        </div>
        <dashboard-i-stats />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      viewMode: 'list', // default view mode
    }
  },
}
</script>

<style scoped>
/* Optional styling for the selected view mode button */
.font-bold.underline {
  text-decoration: underline;
}
</style>
