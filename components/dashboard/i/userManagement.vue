<template>
  <div>
    <!-- modal add user -->
    <div
      v-if="showModal"
      class="fixed z-40 inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white rounded-lg w-96 p-6">
        <h2 class="text-xl text-gray-800 font-semibold mb-4">Add New User</h2>

        <!-- Form for Adding User -->
        <form @submit.prevent="addUser">
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
              <option
                v-for="(org, index) in organizations"
                :key="index"
                :value="org"
              >
                {{ org }}
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
          <form class="max-w-xl w-2/4">
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
                id="default-search"
                class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Mockups, Logos..."
                required
              />
              <button
                type="submit"
                class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
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
                <th scope="col" class="px-6 py-3">Username</th>
                <th scope="col" class="px-6 py-3">Password</th>
                <th scope="col" class="px-6 py-3">Leader At</th>
                <th scope="col" class="px-6 py-3">Access</th>
                <th scope="col" class="px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, i) in orgsCard"
                :key="i"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div class="flex gap-4 items-center">
                    <v-avatar><img :src="item.logo" alt="logo" /></v-avatar>
                    {{ item.name }}
                  </div>
                </td>
                <td
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div class="flex gap-4 items-center">
                    {{ item.username }}
                  </div>
                </td>
                <td
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div class="flex gap-4 items-center">
                    {{ item.password }}
                  </div>
                </td>
                <!-- Leader At Select Dropdown -->
                <td class="px-6 py-4 text-black">
                  <form class="max-w-sm mx-auto">
                    <select
                      id="organizations"
                      v-model="item.leaderAt"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="" disabled selected>
                        Choose an organization
                      </option>
                      <option
                        v-for="(org, index) in organizations"
                        :key="index"
                        :value="org"
                      >
                        {{ org }}
                      </option>
                    </select>
                  </form>
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
                      <v-list-item>
                        <v-checkbox
                          v-model="item.accessAdmin"
                          label="Admin Access"
                          @change="
                            updateAccess(i, 'Admin Access', item.accessAdmin)
                          "
                        />
                      </v-list-item>
                      <v-list-item>
                        <v-checkbox
                          v-model="item.accessDashboard"
                          label="Dashboard Access"
                          @change="
                            updateAccess(
                              i,
                              'Dashboard Access',
                              item.accessDashboard
                            )
                          "
                        />
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </td>
                <td class="px-6 py-4 text-right">
                  <a
                    href="#"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >Edit</a
                  >
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
  data() {
    return {
      showModal: false,
      newUser: {
        name: '',
        password: '',
        leaderAt: '',
      },
      orgsCard: [
        {
          name: 'Aditya Dwi Saputra',
          username: 'dheep',
          password: '123',
          logo: 'https://koppling.site/bgJumbo2.jpg',
          leaderAt: 'Koppling',
          accessAdmin: false,
          accessDashboard: false,
        },
        {
          name: 'Aditya Dwi Saputra',
          username: 'dheep',
          password: '123',
          logo: 'https://koppling.site/bgJumbo2.jpg',
          leaderAt: 'Koppling',
          accessAdmin: false,
          accessDashboard: false,
        },
        {
          name: 'Aditya Dwi Saputra',
          username: 'dheep',
          password: '123',
          logo: 'https://koppling.site/bgJumbo2.jpg',
          leaderAt: 'Koppling',
          accessAdmin: false,
          accessDashboard: false,
        },
        // Add other users if needed
      ],
      organizations: ['Koppling', 'Nature Club', 'Green Peace', 'Wildlife Org'],
    }
  },
  methods: {
    updateAccess(index, type, isEnabled) {
      console.log(`Access ${type} for ${this.orgsCard[index].name}:`, isEnabled)
    },
    addUser() {
      // Handle the form submission
      console.log('Adding user:', this.newUser)

      // Reset the form
      this.newUser = { name: '', leaderAt: '' }

      // Close the modal
      this.showModal = false
    },
  },
}
</script>
