<template>
  <div>
    <dashboard-i-eskul-card-detail-modal
      :data="eskul"
      :isVisible="isModalVisible"
      @close="closeModal"
    />
    <div
      class="flex flex-col items-center bg-gray-800 border border-gray-800 w-full h-full rounded-lg shadow md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <img
        @click="showModal"
        class="object-cover w-full md:w-48 h-full rounded-s-lg"
        :src="`http://localhost:8000/storage/${eskul.logo}`"
        alt=""
      />
      <div
        class="flex flex-col justify-between shadow-lg h-full text-start p-4 leading-normal"
      >
        <div @click="showModal">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-100">
            {{ eskul.name }}
          </h5>
          <div
            v-if="eskul.about"
            v-html="eskul.about"
            class="mb-3 overflow-y-hidden max-h-24 font-normal text-gray-100"
          ></div>
          <div v-else class="mb-3 font-normal text-gray-500">
            No description added yet.
          </div>
          <div class="flex items-center justify-start gap-4">
            <p class="font-normal text-gray-100">
              Members: {{ eskul.total_member }}
            </p>
            <p class="font-normal text-gray-100">Gen: {{ eskul.gen }}</p>
          </div>
        </div>
        <div class="flex h-fit pt-auto justify-start items-end mt-auto">
          <div v-if="isTrash">
            <v-btn
              @click="handleRestore(eskul)"
              class="text-gray-800 m-3 p-2"
              icon
              fab
              color="white"
              plain
              x-small
            >
              <v-icon color="white">mdi-restore</v-icon>
              Restore
            </v-btn>
          </div>
          <div v-else>
            <v-btn @click="handleTrash(eskul)" icon fab plain x-small>
              <v-icon color="white">mdi-delete</v-icon>
            </v-btn>
            <v-btn @click="handleEdit(eskul)" icon fab plain x-small>
              <v-icon color="white">mdi-pencil</v-icon>
            </v-btn>
            <v-btn @click="handleHrefEskul(eskul)" icon fab plain x-small>
              <v-icon color="white">mdi-earth</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    eskul: {
      Type: Object,
      required: false,
    },
    isTrash: {
      Type: Boolean,
    },
  },
  data() {
    return {
      isModalVisible: false,
    }
  },
  methods: {
    closeModal() {
      this.isModalVisible = false
    },
    showModal() {
      this.isModalVisible = true
    },
    handleEdit(item) {
      this.$emit('handleEdit', item)
    },
    handleTrash(item) {
      this.$emit('handleTrash', item)
    },
    handleRestore(item) {
      this.$emit('handleRestore', item)
    },
    handleHrefEskul(item) {
      this.$emit('handleHrefEskul', item)
    },
  },
  mounted() {
    console.log('eskullll', this.eskul)
  },
}
</script>
