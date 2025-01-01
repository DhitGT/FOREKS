<template>
  <div class="container mx-auto p-4">
    <button
      @click="showModal = true"
      class="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
    >
      Add Member
    </button>

    <table class="min-w-full bg-gray-800 rounded-lg border border-gray-900">
      <thead>
        <tr>
          <th class="py-2 px-4 border-b">Index</th>
          <th class="py-2 px-4 border-b">Name</th>
          <th class="py-2 px-4 border-b">Gen</th>
          <th class="py-2 px-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(member, index) in eskulMembers" :key="member.id">
          <td class="py-2 px-4 border-b">
            {{
              (pagination.current_page - 1) * pagination.per_page + (index + 1)
            }}
          </td>
          <td class="py-2 px-4 border-b">{{ member.name }}</td>
          <td class="py-2 px-4 border-b">{{ member.gen }}</td>
          <td class="py-2 px-4 border-b">
            <button
              @click="editMember(member)"
              class="bg-yellow-500 text-white px-2 py-1 rounded"
            >
              Edit
            </button>
            <button
              @click="deleteMember(member.id)"
              class="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination Controls -->
    <div class="flex justify-between items-center mt-4">
      <button
        @click="changePage(pagination.current_page - 1)"
        :disabled="pagination.current_page === 1"
        class="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Previous
      </button>

      <span class="text-white">
        Page {{ pagination.current_page }} of {{ pagination.last_page }}
      </span>

      <button
        @click="changePage(pagination.current_page + 1)"
        :disabled="pagination.current_page === pagination.last_page"
        class="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Next
      </button>
    </div>

    <!-- Dialog Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-gray-900 rounded-lg p-6 w-96">
        <h2 class="text-lg font-bold mb-4">
          {{ isEditing ? 'Edit Member' : 'Add Member' }}
        </h2>
        <form
          class=""
          @submit.prevent="isEditing ? updateMember() : createMember()"
        >
          <div class="mb-4">
            <label class="block text-gray-100">Name</label>
            <input
              v-model="form.name"
              type="text"
              class="mt-1 block w-full bg-gray-800 border-gray-300 rounded p-2"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-100">Gen</label>
            <input
              v-model="form.gen"
              type="text"
              class="mt-1 block w-full bg-gray-800 border-gray-300 rounded p-2"
              required
            />
          </div>
          <div class="flex justify-end space-x-2">
            <button
              type="button"
              @click="showModal = false"
              class="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {{ isEditing ? 'Update' : 'Create' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    eskulMembers: {
      required: true,
      default: () => [],
    },
    pagination: {
      required: true,
      default: { current_page: 1, per_page: 5, last_page: 1 },
    },
  },
  data() {
    return {
      members: [],
      showModal: false,
      isEditing: false,
      form: {
        name: '',
        gen: '',
      },
      currentMemberId: null,
    }
  },
  methods: {
    changePage(page) {
      console.log('page : ', page)
      if (page >= 1 && page <= this.pagination.last_page) {
        this.fetchMembers(page)
      }
    },
    fetchMembers(page) {
      this.$emit('fetchMember', page)
    },
    async createMember() {
      let formData = new FormData()
      formData.append('name', this.form.name)
      formData.append('gen', this.form.gen)

      await this.$store.dispatch(
        'Dashboard/organization/storeEskulMember',
        formData
      )
      this.resetForm()
      this.showModal = false
      this.fetchMembers()
    },
    editMember(member) {
      this.isEditing = true
      this.currentMemberId = member.id
      this.form.name = member.name
      this.form.gen = member.gen
      this.showModal = true
    },
    updateMember() {
      // Update logic here
      this.resetForm()
      this.showModal = false
      this.fetchMembers()
    },
    deleteMember(id) {
      // Delete logic here
      this.fetchMembers()
    },
    resetForm() {
      this.form.name = ''
      this.form.gen = ''
      this.isEditing = false
      this.currentMemberId = null
    },
  },
  mounted() {
    this.fetchMembers()
  },
}
</script>

