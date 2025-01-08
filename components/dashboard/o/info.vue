<template>
  <div class="">
    <div class="flex lg:flex-row flex-col justify-evenly gap-4">
      <div
        class="w-full lg:max-w-md bg-gray-800 border text-white border-gray-900 rounded-lg shadow"
      >
        <div class="flex flex-col justify-center mt-auto items-center py-10">
          <img
            class="w-24 h-24 mb-3 rounded-full shadow-lg"
            :src="
              profileInfo.data?.logo
                ? 'http://localhost:8000/storage/' + profileInfo.data?.logo
                : '/assets/img/group-users.png'
            "
            alt=""
          />
          <h5 class="mb-1 text-xl font-medium text-gray-100">
            {{ profileInfo?.data?.name }}
          </h5>
          <span class="text-sm text-gray-200">{{
            profileInfo.data?.leader_name
          }}</span>
          <div
            class="flex mt-4 md:mt-6"
            v-if="profileInfo.data?.web_pages.id != null"
          >
            <button
              @click="hrefToWebPage()"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              View WebPage
            </button>
            <button
              @click="hrefEditWeb"
              class="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
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

      <div class="w-full bg-gray-800 border border-gray-900 rounded-lg shadow">
        <ul
          class="flex flex-wrap text-sm font-medium text-center text-gray-100 border-b border-gray-950 rounded-t-lg bg-gray-900"
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
              class="inline-block p-4 text-blue-600 hover:text-gray-300 rounded-ss-lg hover:bg-gray-800"
              onclick="showTab(event, 'about')"
            >
              About
            </button>
          </li>
          <!-- <li class="me-2">
            <button
              id="statistic-tab"
              data-tabs-target="#statistic"
              type="button"
              role="tab"
              aria-controls="statistic"
              aria-selected="false"
              class="inline-block p-4 hover:text-gray-300 hover:bg-gray-800"
              onclick="showTab(event, 'statistic')"
            >
              Charts
            </button>
          </li> -->
        </ul>
        <div
          id="defaultTabContent"
          v-if="profileInfo.data?.web_pages.id != null"
        >
          <div
            class="p-4 bg-gray-800 rounded-lg md:p-8"
            id="about"
            role="tabpanel"
            aria-labelledby="about-tab"
          >
            <h2
              class="mb-3 text-3xl font-extrabold tracking-tight text-gray-100"
            >
              {{ profileInfo.data?.name }}
            </h2>

            <div class="flex justify-start gap-6">
              <div>
                <p class="text-xl font-bold text-gray-100">
                  Achivement:
                  {{
                    profileInfo &&
                    profileInfo.data &&
                    profileInfo.data?.total_organization
                  }}
                </p>
              </div>
              <div>
                <p class="text-xl font-bold text-gray-100">
                  All Member:
                  {{
                    profileInfo &&
                    profileInfo.data &&
                    profileInfo.data?.total_member
                  }}
                </p>
              </div>
              <div>
                <p class="text-xl font-bold text-gray-100">
                  Kas:
                  {{
                    profileInfo &&
                    profileInfo.data &&
                    profileInfo.data?.total_followers
                  }}
                </p>
              </div>
            </div>
            <div
              class="mb-3 max-h-28 overflow-y-scroll overflow-x-hidden text-gray-500 dark:text-gray-400"
              v-html="profileInfo.data.description"
            ></div>
          </div>
          <div
            class="hidden p-4 bg-gray-800 text-white rounded-lg md:p-8"
            id="statistic"
            role="tabpanel"
            aria-labelledby="statistic-tab"
          >
            <!-- <dashboard-i-instansi-stats
              v-if="profileInfo && profileInfo.data"
              :profileInfo="profileInfo.data"
            /> -->
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
        domain: '',
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
      type: Object,
    },
  },
  methods: {
    hrefEditWeb() {
      this.$router.push(`/dashboard/o/webprofile`)
    },
    openModal() {
      this.form.description = this.profileInfo.data.description
      const badge_from_api = JSON.parse(this.profileInfo.data.badge)
      this.badgeInput.color = '#A7F3D0'
      this.form.badge = badge_from_api != null ? badge_from_api : []
      // this.form.img_profile = this.profileInfo.data.img_profile
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
      this.badgeInput.name = ''
      this.badgeInput.color = '#A7F3D0'
    },

    handleFileUpload(event) {
      const file = event.target.files[0]
      if (file) {
        // Validate file type and size if needed
        this.form.img_profile = file
      }
    },
    async submitForm() {
      const formData = new FormData()

      // Append description, instansi_id, and img_profile to formData
      formData.append('description', this.form.description)
      formData.append('instansi_id', this.form.instansi_id)
      formData.append('img_profile', this.form.img_profile)
      formData.append('custom_domain_name', this.form.domain)

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
      this.$router.push(
        `/i/${this.profileInfo.data.instansi.instansi_web_page.custom_domain_name}/${this.profileInfo.data.web_pages.custom_domain_name}`
      )
    },
  },
}
</script>
