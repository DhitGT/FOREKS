<template>
  <div class="max-h-[80vh] overflow-y-scroll">
    <!-- Trigger Button -->

    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
    >
      <div
        class="bg-gray-600 rounded-lg max-h-[80vh] shadow-lg w-11/12 max-w-lg overflow-y-scroll"
      >
        <!-- Modal Header -->
        <div
          class="flex justify-between items-center p-4 border-gray-900 border-b"
        >
          <h2 class="text-lg font-medium text-gray-100">
            {{ isEditMode ? 'Edit' : 'Create' }} Organization
          </h2>
          <button
            @click="closeModal"
            class="text-gray-200 hover:text-gray-100 focus:outline-none"
          >
            ✕
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-4">
          <form @submit.prevent="submitForm">
            <div class="mb-4">
              <label for="name" class="block text-gray-200 font-medium mb-2"
                >Name</label
              >
              <input
                v-model="form.name"
                type="text"
                id="name"
                placeholder="Enter name"
                class="w-full bg-gray-700 px-3 py-2 border-gray-900 border rounded-md focus:outline-none text-white focus:ring focus:ring-blue-300"
              />
            </div>

            <div class="mb-4">
              <label for="logo" class="block text-gray-200 font-medium mb-2"
                >Logo</label
              >
              <input
                type="file"
                id="logo"
                @change="handleFileUpload"
                accept="image/*"
                placeholder="Enter logo URL"
                class="w-full px-3 py-2 border-gray-900 border rounded-md focus:outline-none bg-gray-700 text-white focus:ring focus:ring-blue-300"
              />
            </div>
            <div class="mb-4">
              <label
                for="custom_domain_name"
                class="block mb-1 text-gray-200 text-sm font-medium"
              >
                Custom Domain Name
              </label>
              <div
                class="flex items-center bg-gray-700 border-gray-800 border rounded-lg"
              >
                <span class="ps-3 text-gray-300"
                  >http://localhost:3000/i/{{
                    profileInfo.data.custom_domain_name
                  }}/</span
                >
                <input
                  type="text"
                  id="custom_domain_name"
                  class="text-white bg-transparent border-gray-900 border-none focus:ring-0 p-2"
                  v-model="form.custom_domain_name"
                  required
                />
              </div>
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
                  class="w-full p-2 border-gray-900 border bg-gray-700 rounded-lg text-gray-100"
                />
                <!-- Input for Badge Color -->
                <input
                  v-model="badgeInput.color"
                  id="badge-color"
                  type="color"
                  class="w-12 h-12 p-0 border-gray-900 border rounded-full"
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
                  class="inline-flex items-center px-3 py-1 text-sm font-medium text-gray-200 bg-gray-700 rounded-lg"
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
              <label for="gen" class="block text-gray-200 font-medium mb-2"
                >Generation</label
              >
              <input
                v-model="form.gen"
                type="text"
                id="gen"
                placeholder="Enter generation"
                class="w-full px-3 py-2 border-gray-900 border rounded-md focus:outline-none bg-gray-700 text-white focus:ring focus:ring-blue-300"
              />
            </div>

            <div class="mb-4">
              <label for="alumni" class="block text-gray-200 font-medium mb-2"
                >Alumni</label
              >
              <input
                v-model="form.alumni"
                type="number"
                id="alumni"
                placeholder="Enter alumni count"
                class="w-full px-3 py-2 border-gray-900 border rounded-md focus:outline-none bg-gray-700 text-white focus:ring focus:ring-blue-300"
              />
            </div>

            <div class="mb-4">
              <label
                for="instagram_url"
                class="block text-gray-200 font-medium mb-2"
                >Instagram URL</label
              >
              <input
                v-model="form.instagram_url"
                type="url"
                id="instagram_url"
                placeholder="Enter Instagram URL"
                class="w-full px-3 py-2 border-gray-900 border rounded-md focus:outline-none bg-gray-700 text-white focus:ring focus:ring-blue-300"
              />
            </div>

            <div class="mb-4">
              <label
                for="whatsapp_number"
                class="block text-gray-200 font-medium mb-2"
                >WhatsApp Number</label
              >
              <input
                v-model="form.whatsapp_number"
                type="text"
                id="whatsapp_number"
                placeholder="Enter WhatsApp number"
                class="w-full px-3 py-2 border-gray-900 border rounded-md focus:outline-none bg-gray-700 text-white focus:ring focus:ring-blue-300"
              />
            </div>

            <!-- Modal Actions -->
            <div class="flex justify-end">
              <button
                type="button"
                @click="closeModal"
                class="bg-gray-800 text-gray-200 px-4 py-2 rounded mr-2 hover:bg-gray-400"
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
    profileInfo: {
      type: Object,
      required: false,
    },
  },
  watch: {
    profileInfo(val) {
      console.log('profill infoo : ', val)
    },
  },
  data() {
    return {
      showModal: false, // State for showing/hiding modal
      isEditMode: false, // Flag to indicate edit mode
      form: {
        name: '',
        logo: '',
        custom_domain_name: '',
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
      formData.append('custom_domain_name', this.form.custom_domain_name)
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
          this.form.custom_domain_name = this.editData.custom_domain_name
          this.form.badge = [...JSON.parse(this.editData.badge)]
          this.form = { ...this.editData, badge: this.form.badge }
          this.form.logo = null
          console.log('EDIT DATA : ', this.form)
        } else {
          this.isEditMode = false
          this.form = {
            name: '',
            logo: '',
            custom_domain_name: '',
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
  color: white;
}
</style>
