<template>
  <div>
    <div v-if="!loading">
      <dashboard-o-absent-list
        :eskulAbsen="absens.eskul_absen"
        :members="[]"
        @add-absen="handleAddAbsen"
        @fetchAbsen="GetEskulAbsenByCode"
        @edit-absen="handleEditAbsen"
        @delete-absen="handleDeleteAbsen"
      />
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
      suggestName: [],
      loading: false,
    }
  },
  methods: {
    async GetEskulAbsenByCode() {
      this.loading = true
      const { data } = await this.$store.dispatch(
        'Dashboard/absent/GetEskulAbsenByCode',
        this.$route.params.code
      )
      this.absens = data.data
      this.loading = false
      console.log('absen : ', this.absens)
    },
    async handleEditAbsen(param) {
      this.loading = true
      const formData = new FormData()
      console.log('PARAMS : ', param)

      formData.append('id', param.absen.id)
      formData.append('keterangan', param.keterangan)

      const { data } = await this.$store.dispatch(
        'Dashboard/absent/editAbsen',
        formData
      )

      if (data) {
        await this.GetEskulAbsenByCode()
      }
      this.loading = false
      console.log('absen : ', this.absens)
    },
    handleAddAbsen(newAbsen) {
      // Logic to add a new absence
    },

    async handleDeleteAbsen(id) {
      this.loading = true
      const formData = new FormData()
      formData.append('id', id)

      const { data } = await this.$store.dispatch(
        'Dashboard/absent/deleteAbsen',
        formData
      )

      if (data) {
        await this.GetEskulAbsenByCode()
      }
      console.log('absen : ', this.absens)
      this.loading = false
    },

    async getUserByName(name) {
      this.loading = true
      const { data } = await this.$store.dispatch(
        'Dashboard/absent/getUserByName',
        name
      )

      if (data) {
        this.suggestName = data.data
      }
      console.log('absen : ', this.suggestName)
      this.loading = false
    },
  },

  mounted() {
    this.GetEskulAbsenByCode()
  },
}
</script>
