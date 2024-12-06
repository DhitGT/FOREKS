<template>
  <div class="">
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-gray-800 rounded-lg shadow-lg w-96 p-6">
        <h2 class="text-lg font-bold mb-4">Create Web Profile</h2>
        <form @submit.prevent="submitForm">
          <div class="mb-4">
            <label for="description" class="block mb-1 text-sm font-medium">
              Description
            </label>
            <quill-editor
              class="text-white"
              v-model="form.description"
              :options="editorOptions"
              required
            />
          </div>
          <div>
            <label for="img_profile" class="block mb-2 text-sm font-medium">
              Profile Image
            </label>
            <input
              type="file"
              id="img_profile"
              @change="handleFileUpload"
              class="w-full p-2 border rounded-lg"
              accept="image/*"
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

          <div class="flex justify-end mt-4">
            <button
              @click="closeModal"
              type="button"
              class="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>

    <div class="flex justify-evenly gap-4">
      <div
        class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="flex justify-end px-4 pt-4">
          <button
            id="dropdownButton"
            data-dropdown-toggle="dropdown"
            class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
            type="button"
          >
            <span class="sr-only">Open dropdown</span>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 3"
            >
              <path
                d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
              />
            </svg>
          </button>
          <!-- Dropdown menu -->
          <div
            id="dropdown"
            class="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
          >
            <ul class="py-2" aria-labelledby="dropdownButton">
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >Edit</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >Export Data</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >Delete</a
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="flex flex-col items-center pb-10">
          <img
            class="w-24 h-24 mb-3 rounded-full shadow-lg"
            :src="
              profileInfo.data[0].img_profile
                ? 'http://localhost:8000/storage/' +
                  profileInfo.data[0].img_profile
                : '/assets/img/group-users.png'
            "
            alt=""
          />
          <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {{ profileInfo?.data[0].nama }}
          </h5>
          <span class="text-sm text-gray-500 dark:text-gray-400">{{
            profileInfo.data[0].owner_name
          }}</span>
          <div
            class="flex mt-4 md:mt-6"
            v-if="profileInfo.data[0].instansi_wp_id != null"
          >
            <button
              @click="hrefToWebPage()"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              View WebPage
            </button>
            <button
              @click="openModal"
              class="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Edit Web
            </button>
          </div>
          <div v-else>
            <button
              @click="openModal"
              class="mt-4 inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create Web Profile
            </button>
          </div>
        </div>
      </div>

      <div
        class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <ul
          class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800"
          role="tablist"
        >
          <li class="me-2">
            <button
              id="about-tab"
              data-tabs-target="#about"
              type="button"
              role="tab"
              aria-controls="about"
              aria-selected="true"
              class="inline-block p-4 text-blue-600 rounded-ss-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-blue-500"
              onclick="showTab(event, 'about')"
            >
              About
            </button>
          </li>
          <li class="me-2">
            <button
              id="statistic-tab"
              data-tabs-target="#statistic"
              type="button"
              role="tab"
              aria-controls="statistic"
              aria-selected="false"
              class="inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300"
              onclick="showTab(event, 'statistic')"
            >
              Charts
            </button>
          </li>
        </ul>
        <div
          id="defaultTabContent"
          v-if="profileInfo.data[0].instansi_wp_id != null"
        >
          <div
            class="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800"
            id="about"
            role="tabpanel"
            aria-labelledby="about-tab"
          >
            <h2
              class="mb-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white"
            >
              {{ profileInfo.data[0].nama }}
            </h2>

            <div class="flex justify-start gap-6">
              <div>
                <p class="text-xl font-bold text-gray-600">
                  Organizazion:
                  {{
                    profileInfo &&
                    profileInfo.data &&
                    profileInfo.data[0]?.total_organization
                  }}
                </p>
              </div>
              <div>
                <p class="text-xl font-bold text-gray-600">
                  All Member:
                  {{
                    profileInfo &&
                    profileInfo.data &&
                    profileInfo.data[0]?.total_member
                  }}
                </p>
              </div>
              <div>
                <p class="text-xl font-bold text-gray-600">
                  Followers:
                  {{
                    profileInfo &&
                    profileInfo.data &&
                    profileInfo.data[0]?.total_followers
                  }}
                </p>
              </div>
            </div>
            <div
              class="mb-3 text-gray-500 dark:text-gray-400"
              v-html="profileInfo.data[0].description"
            ></div>
          </div>
          <div
            class="hidden p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800"
            id="statistic"
            role="tabpanel"
            aria-labelledby="statistic-tab"
          >
            <dashboard-i-instansi-stats
              v-if="profileInfo && profileInfo.data"
              :profileInfo="profileInfo.data[0]"
            />
            <!-- <h2
              class="mb-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white"
            >
              Views
            </h2>
            <p class="mb-3 text-gray-500 dark:text-gray-400">200</p> -->
          </div>
        </div>
        <div v-else class="flex h-[90%] items-center justify-center">
          <p class="text-gray-500 dark:text-gray-400">
            Instansi Web Profile Not Found
          </p>
        </div>
      </div>

      <script>
        function showTab(event, tabId) {
          // Hide all tab content
          const tabContents = document.querySelectorAll(
            '#defaultTabContent > div'
          )
          tabContents.forEach((tab) => tab.classList.add('hidden'))

          // Remove active state from all tab buttons
          const tabButtons = document.querySelectorAll("[role='tab']")
          tabButtons.forEach((btn) => {
            btn.setAttribute('aria-selected', 'false')
            btn.classList.remove('text-blue-600', 'dark:text-blue-500')
          })

          // Show the selected tab content
          document.getElementById(tabId).classList.remove('hidden')

          // Set active state on the clicked tab button
          event.currentTarget.setAttribute('aria-selected', 'true')
          event.currentTarget.classList.add(
            'text-blue-600',
            'dark:text-blue-500'
          )
        }

        // Set default tab on page load
        document.addEventListener('DOMContentLoaded', () => {
          showTab(
            { currentTarget: document.getElementById('about-tab') },
            'about'
          )
        })
      </script>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isModalOpen: false,
      badgeInput: {
        name: '', // Badge name input
        color: '#A7F3D0', // Default color
      },
      form: {
        description: '',
        instansi_id: '',
        img_profile: '',
        badge: [],
      },
      editorOptions: {
        theme: 'snow', // Options: 'snow', 'bubble', etc.
        placeholder: 'Write something...',
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['code-block'],
          ],
        },
      },
    }
  },
  props: {
    profileInfo: {
      type: Array,
    },
  },
  methods: {
    openModal() {
      this.form.description = this.profileInfo.data[0].description
      this.form.badge = JSON.parse(this.profileInfo.data[0].badge)
      // this.form.img_profile = this.profileInfo.data[0].img_profile
      this.isModalOpen = true
    },
    closeModal() {
      this.isModalOpen = false
      this.resetForm()
    },
    addBadge() {
      // Ensure badgeInput has both name and color before adding
      if (this.badgeInput.name && this.badgeInput.color) {
        // Add the badge to the badge array
        this.form.badge.push({
          name: this.badgeInput.name,
          color: this.badgeInput.color,
        })
        // Clear the input fields
        this.badgeInput.name = ''
        this.badgeInput.color = '#A7F3D0' // Reset to default color
      }
    },
    removeBadge(index) {
      // Remove badge at the specified index
      this.form.badge.splice(index, 1)
    },
    resetForm() {
      this.form = {
        description: '',
        instansi_id: '',
        img_profile: '',
        badge: [],
      }
      this.badgeInput = ''
    },

    handleFileUpload(event) {
      const file = event.target.files[0]
      if (file) {
        this.form.img_profile = file
      }
    },
    async submitForm() {
      const formData = new FormData()

      // Append description, instansi_id, and img_profile to formData
      formData.append('description', this.form.description)
      formData.append('instansi_id', this.form.instansi_id)
      formData.append('img_profile', this.form.img_profile)

      // Convert badges to a JSON string before appending to FormData
      formData.append('badge', JSON.stringify(this.form.badge))

      try {
        // Submit the form data using the store action
        const res = await this.$store.dispatch(
          'Dashboard/instansi/setWebProfile',
          formData
        )

        if (res.data) {
          console.log('Form submitted successfully:', res)
          this.$emit('fetchProfileInfo') // Trigger parent component to fetch updated profile info
        }

        this.closeModal() // Close the modal after submission
      } catch (error) {
        console.error('Error submitting form:', error)
        // Handle error response if needed (e.g., show error message)
      }
    },
    hrefToWebPage() {
      this.$router.push(`/i/${this.profileInfo.data[0].nama}`)
    },
  },
}
</script>
