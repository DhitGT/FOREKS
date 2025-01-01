<template>
  <div class="my-12 pa-6">
    <v-container>
      <div class="flex flex-col items-center justify-center">
        <span class="text-4xl font-bold mb-5">About Us</span>
        <div v-html="aboutText" class="ql-editor"></div>
      </div>
    </v-container>
    <visimisi />
  </div>
</template>

<script>
export default {
  name: 'TentangKami',
  props: {
    aboutText: {
      type: String,
      default: ``, // Default about text if not passed
    },
  },
}
</script>

<style scoped>
/* Add any custom styles if needed */
</style>
