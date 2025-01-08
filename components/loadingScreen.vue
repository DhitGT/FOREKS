<template>
  <div
    v-if="loading"
    class="h-screen w-screen flex justify-center items-center"
  >
    <v-progress-circular
      indeterminate
      color="primary"
      size="50"
    ></v-progress-circular>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  props: {
    loading: {
      default: false,
    },
  },
}
</script>
