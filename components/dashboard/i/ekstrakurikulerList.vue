<template>
  <div>
    <div class="pt-4">
      <div class="grid grid-cols-2 gap-4 my-4">
        <dashboard-i-eskul-card
          @handleTrash="handleTrash"
          @handleRestore="handleRestore"
          @handleHrefEskul="handleHrefEskul"
          @handleEdit="handleEdit"
          :isTrash="isTrash"
          v-for="(item, i) in eskulInstansiList"
          :eskul="item"
          :key="i"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    eskulInstansiList: {
      Type: Array,
    },
    isTrash: {
      Type: Boolean,
    },
  },
  methods: {
    async handleRestore(item) {
      const formdata = new FormData()
      formdata.append('id', item.id)

      const { data } = await this.$store.dispatch(
        'Dashboard/instansi/restoreEskul',
        formdata
      )

      this.$emit('getEskul', this.isTrash)
    },
    handleEdit(item) {
      this.$emit('handleEdit', item)
    },
    handleTrash(item) {
      this.$emit('handleTrash', item)
    },
    handleHrefEskul(item) {
      this.$emit('handleHrefEskul', item)
    },
  },
  data() {
    return {}
  },
}
</script>
