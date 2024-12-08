<template>
  <div class="max-h-[80vh] overflow-y-scroll">
    <!-- Trigger Button -->

    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
    >
      <div
        class="bg-white rounded-lg max-h-[80vh] shadow-lg w-11/12 max-w-lg overflow-y-scroll"
      >
        <!-- Modal Header -->
        <div class="flex justify-between items-center p-4 border-b">
          <h2 class="text-lg font-medium text-gray-800">
            {{ isEditMode ? 'Edit' : 'Create' }} Form Modal
          </h2>
          <button
            @click="closeModal"
            class="text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            ✕
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-4">
          <form @submit.prevent="submitForm">
            <div class="mb-4">
              <label for="name" class="block text-gray-700 font-medium mb-2"
                >Name</label
              >
              <input
                v-model="form.name"
                type="text"
                id="name"
                placeholder="Enter name"
                class="w-full bg-gray-100 text-gray-700 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div class="mb-4">
              <label for="logo" class="block text-gray-700 font-medium mb-2"
                >Logo</label
              >
              <input
                type="file"
                id="logo"
                @change="handleFileUpload"
                accept="image/*"
                placeholder="Enter logo URL"
                class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div class="mb-4">
              <label for="badge" class="block mb-1 text-sm font-medium"
                >Badges</label
              >
              <div class="flex gap-2 mb-2">
                <!-- Input for Badge Name -->
                <input
                  v-model="badgeInput.name"
                  id="badge-name"
                  type="text"
                  placeholder="Enter badge name"
                  class="w-full p-2 border rounded-lg text-gray-900"
                />
                <!-- Input for Badge Color -->
                <input
                  v-model="badgeInput.color"
                  id="badge-color"
                  type="color"
                  class="w-12 h-12 p-0 border-2 border-gray-300 rounded-full"
                />
                <!-- Add Button -->
                <button
                  @click="addBadge"
                  type="button"
                  class="px-3 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Add
                </button>
              </div>

              <!-- Display Badges -->
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="(badge, index) in form.badge"
                  :key="index"
                  class="inline-flex items-center px-3 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg"
                  :style="{ backgroundColor: badge.color }"
                >
                  {{ badge.name }}
                  <button
                    @click="removeBadge(index)"
                    type="button"
                    class="ml-2 text-red-500"
                  >
                    ✕
                  </button>
                </span>
              </div>
            </div>

            <div class="mb-4">
              <label for="gen" class="block text-gray-700 font-medium mb-2"
                >Generation</label
              >
              <input
                v-model="form.gen"
                type="text"
                id="gen"
                placeholder="Enter generation"
                class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div class="mb-4">
              <label for="alumni" class="block text-gray-700 font-medium mb-2"
                >Alumni</label
              >
              <input
                v-model="form.alumni"
                type="number"
                id="alumni"
                placeholder="Enter alumni count"
                class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div class="mb-4">
              <label
                for="instagram_url"
                class="block text-gray-700 font-medium mb-2"
                >Instagram URL</label
              >
              <input
                v-model="form.instagram_url"
                type="url"
                id="instagram_url"
                placeholder="Enter Instagram URL"
                class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div class="mb-4">
              <label
                for="whatsapp_number"
                class="block text-gray-700 font-medium mb-2"
                >WhatsApp Number</label
              >
              <input
                v-model="form.whatsapp_number"
                type="text"
                id="whatsapp_number"
                placeholder="Enter WhatsApp number"
                class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <!-- Modal Actions -->
            <div class="flex justify-end">
              <button
                type="button"
                @click="closeModal"
                class="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
              >
                {{ isEditMode ? 'Update' : 'Submit' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShowModal: {
      type: Boolean,
    },
    editData: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      showModal: false, // State for showing/hiding modal
      isEditMode: false, // Flag to indicate edit mode
      form: {
        name: '',
        logo: '',
        badge: [],
        gen: '',
        alumni: null,
        instagram_url: '',
        whatsapp_number: '',
      },
      badgeInput: {
        name: '',
        color: '#A7F3D0', // Default color
      },
    }
  },
  methods: {
    async submitForm() {
      const formData = new FormData()

      if (this.editData) {
        formData.append('id', this.form.id)
      }

      if (this.form.logo != null) {
        formData.append('logo', this.form.logo)
      }

      formData.append('name', this.form.name)
      formData.append('badge', JSON.stringify(this.form.badge))
      formData.append('gen', this.form.gen)
      formData.append('alumni', this.form.alumni)
      formData.append('instagram_url', this.form.instagram_url)
      formData.append('whatsapp_number', this.form.whatsapp_number)

      try {
        await this.$store.dispatch('Dashboard/instansi/storeEskul', formData)

        this.closeModal()
      } catch (error) {
        console.error('Error submitting form:', error)
      }
    },
    addBadge() {
      if (this.badgeInput.name && this.badgeInput.color) {
        this.form.badge.push({
          name: this.badgeInput.name,
          color: this.badgeInput.color,
        })
        this.badgeInput.name = ''
        this.badgeInput.color = '#A7F3D0'
      }
    },
    handleFileUpload(event) {
      const file = event.target.files[0]
      if (file) {
        this.form.logo = file
      }
    },
    removeBadge(index) {
      this.form.badge.splice(index, 1)
    },
    closeModal() {
      this.$emit('close')
      this.$emit('getEskulInstansi')
      this.showModal = false
    },
  },
  watch: {
    isShowModal(val) {
      this.showModal = val
      // Reset form for new entry or load existing data for editing
      if (val) {
        if (this.editData) {
          this.isEditMode = true
          this.form.id = this.editData.id
          this.form.badge = [...JSON.parse(this.editData.badge)]
          this.form = { ...this.editData, badge: this.form.badge }
          this.form.logo = null
        } else {
          this.isEditMode = false
          this.form = {
            name: '',
            logo: '',
            badge: [],
            gen: '',
            alumni: null,
            instagram_url: '',
            whatsapp_number: '',
          }
        }
      }
    },
  },
}
</script>

<style scoped>
/* Optional: Add styles for smoother modal transitions */
input {
  color: black;
}
</style>
