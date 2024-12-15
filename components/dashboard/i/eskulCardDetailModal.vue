<template>
  <div class="max-h-[80vh] overflow-y-scroll">
    <div
      v-if="isShowModal"
      class="fixed inset-0 flex justify-center items-center z-50"
    >
      <v-card
        class="rounded-lg max-h-[80vh] shadow-lg w-1/3 max-w-md overflow-y-scroll"
      >
        <v-card-title class="text-lg font-semibold">
          Organization Details
        </v-card-title>
        <v-card-subtitle class="text-sm text-gray-300">
          More information about {{ data.name }}
        </v-card-subtitle>

        <v-card-text>
          <div class="flex flex-col gap-4">
            <div class="flex gap-4 items-center">
              <img
                :src="getImageUrl(data.logo)"
                alt="Logo"
                class="w-16 h-16 object-cover rounded-full border border-gray-300"
              />
              <div>
                <h2 class="text-lg font-bold text-gray-400">{{ data.name }}</h2>
                <p class="text-sm text-gray-300">
                  Generation: {{ data.gen }}
                  <br />
                  Members: {{ data.total_member }}
                </p>
              </div>
            </div>

            <div class="bg-gray-100 rounded-lg p-4">
              <p class="text-gray-700 font-semibold">Leader:</p>
              <p class="text-sm text-gray-600">
                {{ data.leader_name || 'Not Assigned' }}
              </p>
            </div>

            <div class="bg-gray-100 rounded-lg p-4">
              <p class="text-gray-700 font-semibold">Achievements:</p>
              <p class="text-sm text-gray-600">
                Total Achievements: {{ data.total_achievement }}
              </p>
              <p class="text-sm text-gray-600">
                Achievements This Year: {{ data.total_achievement_year }}
              </p>
            </div>

            <div class="bg-gray-100 rounded-lg p-4">
              <p class="text-gray-700 font-semibold">Contact:</p>
              <a
                :href="data.instagram_url"
                target="_blank"
                class="text-sm text-blue-600 hover:underline"
                >Instagram</a
              >
              <p class="text-sm text-gray-600">
                WhatsApp: {{ data.whatsapp_number }}
              </p>
            </div>
            <div class="bg-gray-100 rounded-lg p-4">
              <p class="text-gray-700 font-semibold">Kas</p>
              <p class="text-sm text-gray-600">
                Total Kas: {{ data.total_kas }}
              </p>
            </div>

            <div>
              <p class="text-gray-700 font-semibold mb-2">Badges:</p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="(badge, index) in parseBadges(data.badge)"
                  :key="index"
                  class="px-4 py-2 rounded-lg text-white text-sm font-semibold"
                  :style="{ backgroundColor: badge.color }"
                >
                  {{ badge.name }}
                </span>
              </div>
            </div>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-btn color="primary" text @click="closeModal">Close</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalCard',
  props: {
    // Prop to control modal visibility externally
    isVisible: {
      type: Boolean,
      required: false,
    },
    // Data for the modal
    data: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      // Internal state for modal visibility
      isShowModal: this.isVisible,
    }
  },
  watch: {
    // Watch for changes to the `isVisible` prop and update internal state
    isVisible(newVal) {
      this.isShowModal = newVal
    },
    // Watch for internal state changes and emit the updated visibility
    isShowModal(newVal) {
      this.$emit('update:isVisible', newVal)
    },
  },
  methods: {
    parseBadges(badgeString) {
      try {
        return JSON.parse(badgeString)
      } catch (e) {
        return []
      }
    },
    getImageUrl(path) {
      return `${
        process.env.BASE_URL || 'http://localhost:8000/storage/'
      }/${path}`
    },
    closeModal() {
      this.isShowModal = false // Close the modal on close button click
      this.$emit('close') // Emit updated value to parent component
    },
  },
}
</script>
