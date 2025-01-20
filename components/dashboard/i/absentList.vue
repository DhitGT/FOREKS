<template>
  <div
    class="container mx-auto p-6 bg-transparent text-gray-200 rounded-lg shadow-lg"
  >
    <!-- Edit Modal -->
    <transition name="modal">
      <div
        v-if="isEditModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div class="modal-overlay absolute inset-0 bg-black opacity-50"></div>
        <div class="bg-gray-800 rounded-lg overflow-hidden shadow-lg z-50 p-6">
          <h2 class="text-lg font-bold mb-4">Edit Absen</h2>
          <div class="mb-4 p-3">
            <input
              type="text"
              v-model="editAbsenName"
              placeholder="Member Name"
              class="input"
              readonly
            />
          </div>
          <div class="mb-4">
            <select v-model="editKeterangan" class="input">
              <option value="Hadir">Hadir</option>
              <option value="Izin">Izin</option>
              <option value="Sakit">Sakit</option>
            </select>
          </div>
          <div class="flex justify-end">
            <button @click="saveEdit" class="btn">Save</button>
            <button @click="closeEditModal" class="btn ml-2">Cancel</button>
          </div>
        </div>
      </div>
    </transition>

    <h1 class="text-2xl font-bold mb-4">Eskul Absen List</h1>

    <!-- <div class="mb-4 flex flex-col md:flex-row gap-3">
      <input
        type="text"
        v-model="newAbsenName"
        @input="getUserByName"
        placeholder="Enter member name..."
        class="input lg:max-w-lg"
      />
      <div
        v-if="suggestName.length"
        class="absolute bg-gray-700 rounded-lg shadow-lg mt-1"
      >
        <ul>
          <li
            v-for="member in suggestName"
            :key="member?.id"
            @click="selectMember(member)"
            class="p-2 hover:bg-gray-600 cursor-pointer"
          >
            {{ member?.name }} (Gen: {{ member?.gen }})
          </li>
        </ul>
      </div>
      <div class="flex min-h-[90%] min-w-screen md:max-w-lg">
        <select v-model="newKeterangan" class="input mr-2">
          <option value="Hadir">Hadir</option>
          <option value="Izin">Izin</option>
          <option value="Sakit">Sakit</option>
        </select>
        <button @click="addAbsen" class="btn">Add Absen</button>
      </div>
    </div> -->

    <div class="grid grid-cols-1 gap-3">
      <div
        v-for="absen in eskulAbsen"
        :key="absen.id"
        class="bg-gray-800 rounded-lg p-2 shadow-lg flex justify-between items-center"
      >
        <div class="flex justify-between items-center">
          <div class="flex flex-col" style="max-width: fit-content">
            <span class="font-bold text-xl">{{ absen.member?.name }}</span>
            <span class="text-gray-300"
              ><strong>Gen:</strong> {{ absen.member?.gen }}</span
            >
          </div>
          <div class="flex flex-col px-4" style="max-width: fit-content">
            <span class="text-xl font-bold"
              ><strong class="text-gray-300">Keterangan:</strong>
              {{ absen.keterangan }}</span
            >
            <span class="text-gray-300">{{ formatDate(absen.date) }}</span>
          </div>
        </div>
        <!-- <div>
          <button
            @click="editAbsenFunc(absen)"
            class="text-blue-400 hover:underline"
          >
            <v-icon>mdi-pencil</v-icon>
          </button>
          <button
            @click="deleteAbsen(absen.id)"
            class="text-red-400 hover:underline"
          >
            <v-icon>mdi-delete</v-icon>
          </button>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    eskulAbsen: {
      type: Array,
      required: true,
    },
    members: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      newAbsenName: '',
      debounceTimeout: null,
      newKeterangan: 'Hadir',
      filteredMembers: [],
      suggestName: [],
      isEditModalOpen: false,
      editAbsen: null,
      editAbsenName: '',
      selectedMember: null,
      editKeterangan: 'Hadir',
    }
  },
  methods: {
    selectMember(member) {
      this.newAbsenName = member.name
      this.selectedMember = member
      this.suggestName = []
    },
    async addAbsen() {
      const formData = new FormData()
      formData.append('eskul_id', this.selectedMember.eskul_id)
      formData.append('member_id', this.selectedMember.id)
      formData.append('keterangan', this.newKeterangan)
      formData.append('absent_code', this.$route.params.code)
      const { data } = await this.$store.dispatch(
        'Dashboard/absent/storeAbsen',
        formData
      )

      if (data) {
        this.$emit('fetchAbsen')
      }
    },

    editAbsenFunc(absen) {
      this.editAbsen = absen
      this.editAbsenName = absen.member.name // Set the name for the modal
      this.editKeterangan = absen.keterangan // Set the keterangan for the modal
      this.isEditModalOpen = true // Open the modal
    },
    closeEditModal() {
      this.isEditModalOpen = false // Close the modal
    },
    saveEdit() {
      if (this.editAbsen) {
        // Emit an event to save the edited absen
        const absen = this.editAbsen
        const keterangan = this.editKeterangan

        this.$emit('edit-absen', {
          absen: absen,
          keterangan: keterangan,
        })
        this.closeEditModal() // Close the modal after saving
      }
    },
    deleteAbsen(id) {
      // Emit an event to delete the selected absen
      this.$emit('delete-absen', id)
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(dateString).toLocaleDateString(undefined, options)
    },
    async getUserByName() {
      clearTimeout(this.debounceTimeout)

      // Set a new timeout to fetch data after 0.5 seconds
      this.debounceTimeout = setTimeout(async () => {
        // Ensure the name is still the same before fetching
        if (this.newAbsenName) {
          const { data } = await this.$store.dispatch(
            'Dashboard/absent/getUserByName',
            this.newAbsenName
          )

          if (data) {
            this.suggestName = data.data
          }
          console.log('absen : ', this.suggestName)
        }
      }, 500) // Delay of 0.5 seconds
    },
  },
}
</script>

<style scoped>
.input {
  width: 100%;
  padding: 0.5em 1em;
  border: 1px solid #4b5563;
  border-radius: 0.375rem;
  background-color: #1f2937;
  color: #e5e7eb;
}

.btn {
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
}

.btn:hover {
  background-color: #2563eb;
}
</style>
