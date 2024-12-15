<template>
  <div>
    <!-- Edit User Modal -->
    <div
      v-if="showEditModal"
      class="fixed z-40 inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white rounded-lg w-96 p-6">
        <h2 class="text-xl text-gray-800 font-semibold mb-4">Edit User</h2>
        <form @submit.prevent="updateUser">
          <div class="mb-4">
            <label
              for="edit_profile_image"
              class="block text-sm font-medium text-gray-700"
            >
              Profile Image
            </label>
            <input
              type="file"
              id="edit_profile_image"
              @change="handleImageUpload"
              accept="image/*"
              class="block w-full bg-gray-300 p-2 border text-gray-700 border-gray-600 rounded-lg mt-1"
            />
            <div v-if="selectedUser?.profileImagePreview" class="mt-2">
              <img
                :src="selectedUser.profileImagePreview"
                alt="Profile Preview"
                class="w-24 h-24 object-cover rounded-full"
              />
            </div>
          </div>
          <div class="mb-4">
            <label
              for="edit_name"
              class="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="edit_name"
              v-model="selectedUser.name"
              class="block bg-gray-300 w-full p-2 border text-gray-700 border-gray-600 rounded-lg mt-1"
              required
            />
          </div>
          <div class="mb-4">
            <label
              for="edit_email"
              class="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="edit_email"
              v-model="selectedUser.email"
              class="block bg-gray-300 w-full p-2 border text-gray-700 border-gray-600 rounded-lg mt-1"
              required
            />
          </div>
          <div class="mb-4">
            <label
              for="edit_leaderAt"
              class="block text-sm font-medium text-gray-700"
            >
              Leader At
            </label>
            <select
              id="edit_leaderAt"
              v-model="selectedUser.eskul_id"
              class="block w-full bg-gray-300 p-2 border text-gray-700 border-gray-600 rounded-lg mt-1"
              required
            >
              <option value="" disabled>Select Organization</option>
              <option value="0">Not Leader In Any Organization</option>
              <option
                v-for="org in organizations"
                :key="org.id"
                :value="org.id"
                :disabled="org.leader_name != null"
              >
                {{ org.name }}
              </option>
            </select>
          </div>
          <div class="flex justify-end mt-6">
            <button
              type="button"
              @click="showEditModal = false"
              class="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- modal add user -->
    <div
      v-if="showModal"
      class="fixed z-40 inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white rounded-lg w-96 p-6">
        <h2 class="text-xl text-gray-800 font-semibold mb-4">Add New User</h2>

        <!-- Form for Adding User -->
        <form @submit.prevent="addUser">
          <!-- Profile Image Upload -->
          <div class="mb-4">
            <label
              for="profile_image"
              class="block text-sm font-medium text-gray-700"
            >
              Profile Image
            </label>
            <input
              type="file"
              id="profile_image"
              @change="handleImageUploadAddUser"
              accept="image/*"
              class="block w-full bg-gray-300 p-2 border text-gray-700 border-gray-600 rounded-lg mt-1"
            />
            <div v-if="newUser.profileImagePreview" class="mt-2">
              <img
                :src="newUser.profileImagePreview"
                alt="Profile Preview"
                class="w-24 h-24 object-cover rounded-full"
              />
            </div>
          </div>
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              v-model="newUser.name"
              class="block bg-gray-300 w-full p-2 border text-gray-700 border-gray-600 rounded-lg mt-1"
              required
            />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">
              email
            </label>
            <input
              type="email"
              id="email"
              v-model="newUser.email"
              class="block bg-gray-300 w-full p-2 border text-gray-700 border-gray-600 rounded-lg mt-1"
              required
            />
          </div>
          <div class="mb-4">
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              v-model="newUser.password"
              class="block w-full rounded-lg p-2 mt-1 bg-gray-300 text-black"
              required
              color="black"
              bg-color="#FF0000"
              icon
              outlined
              append-icon="mdi-eye"
            />
          </div>

          <div class="mb-4">
            <label
              for="leaderAt"
              class="block text-sm font-medium text-gray-700"
            >
              Leader At
            </label>
            <select
              id="leaderAt"
              v-model="newUser.leaderAt"
              class="block w-full bg-gray-300 p-2 border text-gray-700 border-gray-600 rounded-lg mt-1"
              required
            >
              <option value="" disabled selected>Select Organization</option>
              <option value="0">Not Leader In Any Organization</option>
              <option
                v-for="(org, index) in organizations"
                :key="index"
                :disabled="org.leader_name != null"
                :value="org.id"
              >
                {{ org.name }}
              </option>
            </select>
          </div>

          <div class="flex justify-end mt-6">
            <button
              type="button"
              @click="showModal = false"
              class="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="pt-4">
      <div class="flex gap-4 items-center">
        <div class="w-2/4 flex gap-4 justify-start items-center">
          <div class="max-w-xl w-2/4">
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >Search</label
            >
            <div class="relative">
              <div
                class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
              >
                <i
                  class="mdi mdi-magnify w-5 h-5 text-gray-500 dark:text-gray-400"
                ></i>
              </div>
              <input
                type="search"
                v-model="userSearchQuery"
                id="default-search"
                class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
              />
              <button
                @click="handleSearch"
                class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </div>
          <button
            @click="showModal = true"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add User
          </button>
        </div>
      </div>
      <div class="tablecontainer my-4">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table
            class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="px-6 py-3">Name</th>
                <th scope="col" class="px-6 py-3">Email</th>
                <th scope="col" class="px-6 py-3">Role</th>
                <th scope="col" class="px-6 py-3">Leader At</th>
                <th scope="col" class="px-6 py-3">Access</th>
                <th scope="col" class="px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, i) in userLists"
                :key="i"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div class="flex gap-4 items-center">
                    <v-avatar
                      ><img
                        class="object-cover object-center"
                        :src="
                          'http://localhost:8000/storage/' + item.profile_image
                        "
                        alt="logo"
                    /></v-avatar>
                    {{ item.name }}
                  </div>
                </td>

                <td
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div class="flex gap-4 items-center">
                    {{ item.email }}
                  </div>
                </td>
                <td
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div class="flex gap-4 items-center">
                    {{ item.role }}
                  </div>
                </td>
                <td class="px-6 py-4 text-black">
                  <div class="flex gap-4 items-center">
                    {{
                      item.eskul_id != '0'
                        ? item.eskul_name
                        : 'Not Leader In Any Organization'
                    }}
                  </div>
                </td>
                <td class="px-6 py-4 text-right">
                  <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <div
                        class="border border-gray-300 rounded-lg px-4 py-2 cursor-pointer dark:bg-gray-700 dark:border-gray-600"
                        v-bind="attrs"
                        v-on="on"
                      >
                        Select Access
                      </div>
                    </template>
                    <v-list>
                      <v-list-item
                        v-for="(itemHakAkses, iakses) in masterHakAkses"
                        :key="iakses"
                      >
                        <v-checkbox
                          :input-value="getAccessValue(item, itemHakAkses)"
                          :label="itemHakAkses.Nama"
                          @change="updateAccess(item, itemHakAkses)"
                        />
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </td>
                <td class="px-6 py-4 text-right">
                  <button
                    @click="editUser(item)"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
  },
  async mounted() {
    await this.getEskulInstansi()
    await this.getUserInstansi()
    await this.getMasterHakAkses()
  },
  data() {
    return {
      showModal: false,
      showEditModal: false,
      masterHakAkses: [],
      selectedUser: null,
      userSearchQuery: '',
      newUser: {
        name: '',
        email: '',
        password: '',
        leaderAt: '',
        profileImage: null,
        profileImagePreview: null,
      },
      userLists: [
        // Add other users if needed
      ],

      organizations: [],
    }
  },
  watch: {
    eskulInstansiList(val) {
      this.organizations = val
    },
    userSearchQuery(val) {
      if (val == '') {
        this.getUserInstansi()
      }
    },
  },
  methods: {
    async handleSearch() {
      await this.getUserInstansi(this.userSearchQuery)
    },
    async updateAccess(userItem, itemHakAkses) {
      const formData = new FormData()
      formData.append('user_id', userItem.id)
      formData.append('hak_akses_kode', itemHakAkses.Kode)

      const existingAccess = userItem.access.find(
        (access) => access.name === itemHakAkses.kode
      )
      const flag = existingAccess
        ? existingAccess.value
          ? 'remove'
          : 'add'
        : 'add'

      formData.append('flag', flag)

      const { data } = await this.$store.dispatch(
        'Dashboard/instansi/updateHakAkses',
        formData
      )
      if (data) {
        await this.getUserInstansi()
      }
    },
    getAccessValue(item, itemHakAkses) {
      const access = item.access.find(
        (element) => element.kode === itemHakAkses.Kode
      )
      return access ? access.value : false
    },
    editUser(user) {
      this.selectedUser = { ...user, profileImagePreview: user.profileImage }
      this.showEditModal = true
    },
    async updateUser() {
      try {
        // Example API call to update user
        const formData = new FormData()
        formData.append('id', this.selectedUser.id)
        formData.append('username', this.selectedUser.name)
        formData.append('email', this.selectedUser.email)
        // formData.append('password', this.selectedUser.password)
        formData.append('leader_eskul_id', this.selectedUser.eskul_id)

        if (this.selectedUser.profileImage) {
          formData.append('profile_image', this.selectedUser.profileImage)
        }
        const { data } = await this.$store.dispatch('editUser', formData)
        if (data) {
          this.showEditModal = false
          // Refresh the user list after update
          await this.getUserInstansi()
        }
      } catch (error) {
        console.error('Failed to update user:', error)
      }
    },
    handleImageUpload(event) {
      const file = event.target.files[0]
      if (file) {
        this.selectedUser.profileImage = file
        const reader = new FileReader()
        reader.onload = (e) => {
          this.selectedUser.profileImagePreview = e.target.result
        }
        reader.readAsDataURL(file)
      }
    },

    handleImageUploadAddUser(event) {
      const file = event.target.files[0]
      if (file) {
        this.newUser.profileImage = file
        const reader = new FileReader()
        reader.onload = (e) => {
          this.newUser.profileImagePreview = e.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    async getUserInstansi(userSearchQuery) {
      this.itemEskulEdit = null

      const { data } = await this.$store.dispatch(
        'Dashboard/instansi/getUserInstansi',
        userSearchQuery
      )
      this.userLists = data.data
    },
    async getMasterHakAkses() {
      // this.itemEskulEdit = null

      const { data } = await this.$store.dispatch(
        'Dashboard/instansi/getMasterHakAkses'
      )
      this.masterHakAkses = data.data
      console.log('master hak akses : ', this.masterHakAkses)
    },
    async getEskulInstansi(isTrash = false) {
      this.itemEskulEdit = null

      const { data } = await this.$store.dispatch(
        'Dashboard/instansi/getEskulInstansi',
        isTrash
      )
      this.organizations = data.data

      console.log('eskul instansi :', this.organizations)

      // this.getEskulInstansi()
    },
    async addUser() {
      // Handle the form submission
      console.log('Adding user:', this.newUser)

      const formData = new FormData()
      formData.append('username', this.newUser.name)
      formData.append('email', this.newUser.email)
      formData.append('password', this.newUser.password)
      formData.append('leader_eskul_id', this.newUser.leaderAt)
      formData.append('profile_image', this.newUser.profileImage)

      const { data } = await this.$store.dispatch('addUser', formData)

      if (data) {
      }

      // Reset the form
      this.newUser = { name: '', leaderAt: '', email: '', password: '' }

      // Close the modal
      this.showModal = false
      this.getUserInstansi()
    },
  },
}
</script>


