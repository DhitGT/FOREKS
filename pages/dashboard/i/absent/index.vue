<template>
  <div class="px-8">
    <p class="text-2xl font-bold">Eskul Kas</p>
    <div
      v-if="!loading"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <div v-if="absens == []">
        <p><strong>No data</strong></p>
      </div>
      <div
        v-for="item in eskulInstansiList"
        :key="item?.id"
        @click="goToAbsentPage(item)"
        class="bg-gray-700 rounded-lg p-4 shadow-lg hover:bg-gray-800 cursor-pointer"
      >
        <div>
          <img
            :src="'http://localhost:8000/storage/' + item?.logo"
            alt=""
            class="h-10"
            srcset=""
          />
        </div>
        <h3 class="text-lg font-bold">
          {{ item?.name }}
        </h3>
      </div>
    </div>
    <div v-else class="flex flex-col gap-4">
      <loading-screen :loading="loading" />
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboardLayout', // Specify the layout to use
  data() {
    return {
      absens: [],
      eskulInstansiList: [],
      loading: false,
    }
  },
  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(dateString).toLocaleDateString(undefined, options)
    },
    async getEskulInstansi(isTrash = false) {
      this.loading = true
      this.itemEskulEdit = null

      const { data } = await this.$store.dispatch(
        'Dashboard/instansi/getEskulInstansi',
        { isTrash: false, search: '' }
      )
      this.eskulInstansiList = data.data

      this.loading = false
      console.log('eskul instansi :', this.eskulInstansiList)
    },
    goToAbsentPage(item) {
      if (item?.custom_domain_name) {
        this.$router.push(
          `${this.$router.currentRoute.path}/${item.custom_domain_name}`
        )
      }
    },
  },
  mounted() {
    this.getEskulInstansi()
  },
}
</script>
