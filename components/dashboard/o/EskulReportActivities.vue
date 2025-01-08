<template>
  <div class="container mx-auto p-6 bg-transparent text-gray-200">
    <h1 class="text-2xl font-bold mb-4">Eskul Report Activities</h1>

    <div v-if="!loading">
      <div class="filter mb-4">
        <label for="filter_start" class="block">Start Date:</label>
        <input
          type="date"
          id="filter_start"
          v-model="filter.startDate"
          class="input"
        />
        <label for="filter_end" class="block mt-2">End Date:</label>
        <input
          type="date"
          id="filter_end"
          v-model="filter.endDate"
          class="input"
        />
        <button @click="applyFilter" class="btn mt-2">
          <i class="mdi mdi-filter-variant"></i> Apply Filter
        </button>
        <button @click="openModal" class="btn mt-2">
          <i class="mdi mdi-plus"></i> Create Activity
        </button>
      </div>

      <hr class="my-6 border-gray-600" />

      <!-- Table for Listing -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="activity in activities"
          :key="activity.id"
          class="bg-gray-700 rounded-lg p-4 shadow-lg"
        >
          <h3 class="text-lg font-bold">{{ activity.title }}</h3>
          <p><strong>Description:</strong> {{ activity.description }}</p>
          <p>
            <strong><v-icon>mdi-map</v-icon></strong> {{ activity.location }}
          </p>
          <p>
            <strong><v-icon>mdi-calendar</v-icon></strong>
            {{ activity.date_start }}
          </p>
          <p>
            <strong><v-icon>mdi-calendar</v-icon></strong>
            {{ activity.date_end }}
          </p>
          <button
            @click="
              $router.push(`/dashboard/o/absent/${activity?.absent_code}`)
            "
            class="text-blue-400 hover:underline"
          >
            <i class="mdi mdi-link"></i> Absent Form
          </button>
          <div class="mt-4">
            <button
              @click="editActivity(activity)"
              class="text-blue-400 hover:underline"
            >
              <i class="mdi mdi-pencil"></i> Edit
            </button>
            <button
              @click="deleteActivity(activity.id)"
              class="text-red-400 hover:underline"
            >
              <i class="mdi mdi-delete"></i> Delete
            </button>
          </div>
        </div>
      </div>

      <!-- Modal -->
      <transition name="modal">
        <div
          class="fixed inset-0 z-50 flex items-center justify-center"
          v-if="isModalOpen"
        >
          <div class="modal-overlay absolute inset-0 bg-black opacity-50"></div>
          <div
            class="modal-container bg-gray-800 rounded-lg overflow-hidden shadow-lg z-50"
          >
            <div class="modal-header p-4">
              <button
                @click="closeModal"
                class="text-gray-400 hover:text-gray-200"
              >
                <i class="mdi mdi-close"></i>
              </button>
              <h2 class="text-lg font-bold">
                {{ editMode ? 'Edit' : 'Create' }} Activity
              </h2>
            </div>
            <div class="modal-body p-4">
              <form @submit.prevent="handleSubmit">
                <div class="mb-4">
                  <label for="title" class="block">Title:</label>
                  <input
                    id="title"
                    v-model="form.title"
                    required
                    type="text"
                    class="input"
                  />
                </div>
                <div class="mb-4">
                  <label for="location" class="block">Location:</label>
                  <input
                    id="location"
                    v-model="form.location"
                    required
                    type="text"
                    class="input"
                  />
                </div>
                <div class="mb-4">
                  <label for="picture" class="block">Picture:</label>
                  <input
                    type="file"
                    id="picture"
                    @change="handleFileUpload"
                    required
                    class="input"
                  />
                </div>
                <div class="mb-4">
                  <label for="description" class="block">Description:</label>
                  <textarea
                    id="description"
                    v-model="form.description"
                    required
                    class="input"
                  ></textarea>
                </div>
                <div class="mb-4">
                  <label for="date_start" class="block">Start Date:</label>
                  <input
                    type="date"
                    id="date_start"
                    v-model="form.date_start"
                    required
                    class="input"
                  />
                </div>
                <div class="mb-4">
                  <label for="date_end" class="block">End Date:</label>
                  <input
                    type="date"
                    id="date_end"
                    v-model="form.date_end"
                    required
                    class="input"
                  />
                </div>

                <button type="submit" class="btn">
                  <i
                    class="mdi"
                    :class="editMode ? 'mdi-pencil' : 'mdi-plus'"
                  ></i>
                  {{ editMode ? 'Update' : 'Create' }} Activity
                </button>
              </form>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="md:pl-52 flex flex-col gap-4">
      <loading-screen :loading="loading" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      filter: {
        startDate: '',
        endDate: '',
      },
      activities: [],
      form: {
        id: null,
        picture: '',
        title: '',
        location: '',
        description: '',
        date_start: '',
        date_end: '',
      },
      editMode: false,
      isModalOpen: false,
    }
  },
  async mounted() {
    await this.fetchActivities()
  },
  methods: {
    openModal() {
      this.resetForm()
      this.isModalOpen = true
    },
    closeModal() {
      this.isModalOpen = false
    },
    applyFilter() {
      this.fetchActivities()
    },
    handleFileUpload(event) {
      console.log('handle upload img')
      const file = event.target.files[0]
      console.log('handle upload img file : ', file)
      if (file) {
        this.form.picture = file // Store the file object in the form
      }
      console.log('handle upload img frm : ', this.form)
    },
    async fetchActivities() {
      this.loading = true
      try {
        const params = {}
        if (this.filter.startDate) {
          params.start_date = this.filter.startDate
        }
        if (this.filter.endDate) {
          params.end_date = this.filter.endDate
        }

        const response = await this.$store.dispatch(
          'Dashboard/organization/activities/fetchActivities',
          params
        )

        if (response) {
          this.activities = response.data
        } else {
          // alert('No activities found.')
        }
      } catch (e) {
        // alert(e.message)
      }

      this.loading = false
    },
    async handleSubmit() {
      this.loading = true
      const action = this.editMode
        ? 'Dashboard/organization/activities/updateActivity'
        : 'Dashboard/organization/activities/createActivity'
      const payload = this.editMode
        ? { id: this.form.id, payload: this.form }
        : this.form

      //  id: null,
      // picture: '',
      // title: '',
      // location: '',
      // description: '',
      // date_start: '',
      // date_end: '',
      //
      const formData = new FormData()

      formData.append('picture', this.form.picture)
      formData.append('title', this.form.title)
      formData.append('location', this.form.location)
      formData.append('description', this.form.description)
      formData.append('date_start', this.form.date_start)
      formData.append('date_end', this.form.date_end)

      const response = await this.$store.dispatch(action, payload)
      this.loading = false
      if (response.status) {
        this.resetForm()
        await this.fetchActivities()
        this.closeModal()
      } else {
      }
    },
    editActivity(activity) {
      this.form = { ...activity }
      this.editMode = true
      this.openModal()
    },
    async deleteActivity(id) {
      this.loading = true
      if (confirm('Are you sure you want to delete this activity?')) {
        const response = await this.$store.dispatch(
          'Dashboard/organization/activities/deleteActivity',
          id
        )
        if (response.status) {
          await this.fetchActivities()
        } else {
        }
      }
      this.loading = false
    },
    resetForm() {
      this.form = {
        id: null,
        picture: '',
        title: '',
        location: '',
        description: '',
        date_start: '',
        date_end: '',
      }
      this.editMode = false
    },
  },
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
}
.input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #4b5563;
  border-radius: 0.375rem;
  background-color: #1f2937;
  color: #e5e7eb;
}
.btn {
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: background-color 0.3s;
}
.btn:hover {
  background-color: #2563eb;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-container {
  width: 90%;
  max-width: 500px;
}
</style>
