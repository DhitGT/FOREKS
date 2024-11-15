<template>
  <div>
    <dashboard-o-sidebar />
    <div class="container md:ml-52">
      <div class="md:pl-52 flex flex-col gap-4">
        <p class="text-2xl font-bold">Profile</p>
        <dashboard-o-info />
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
