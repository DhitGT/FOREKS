<template>
  <div class="my-12 pa-6">
    <v-container>
      <div class="flex flex-col items-center justify-center">
        <span class="text-4xl font-bold mb-5">About Us</span>
        <p class="mb-3 font-normal text-lg text-gray-600">{{ aboutText }}</p>
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
      default: `KOPPLING adalah singkatan dari Komunitas Pelajar Pecinta Lingkungan,
                sebuah organisasi ekstrakurikuler di SMK Negeri 2 Kota Bekasi yang
                dibentuk oleh dan untuk pelajar yang memiliki kepedulian tinggi
                terhadap isu-isu lingkungan. Kami bertujuan untuk meningkatkan
                kesadaran dan pengetahuan lingkungan di kalangan pelajar serta
                menginspirasi aksi nyata dalam pelestarian alam.`, // Default about text if not passed
    },
  },
}
</script>

<style scoped>
/* Add any custom styles if needed */
</style>
