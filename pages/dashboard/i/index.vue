<template>
  <div>
    <dashboard-i-sidebar />
    <div class="container md:ml-52">
      <div class="md:pl-52 flex flex-col gap-4">
        <div v-if="profileInfo.isFound">
          <p class="text-2xl font-bold">Activity</p>
          <dashboard-i-status v-if="eskulReportActivity.report_length > 0" />
          <div v-else>
            <p class="text-gray-600">Theres No Eskul Activity For Now</p>
          </div>
        </div>
        <hr />
        <p class="text-2xl font-bold">Profile</p>
        <dashboard-i-info
          :profileInfo="profileInfo"
          @fetchProfileInfo="getProfileInfo"
          v-if="profileInfo.isFound"
        />
        <div v-else>
          <p>Its Look like you're new here, lets make new instansi profile</p>
          <v-btn @click="hrefCreateNewInstansi"
            >Create New Instansi Profile</v-btn
          >
        </div>
        <div v-if="profileInfo.isFound">
          <hr />
          <div>
            <p class="text-2xl font-bold">Organization</p>
          </div>
          <div class="flex gap-4 my-3 items-center">
            <div class="w-2/4">
              <div class="max-w-xl mx-auto">
                <label
                  for="default-search"
                  class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                  >Search</label
                >
                <div class="relative">
                  <div
                    class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
                  >
                    <v-icon color="black">mdi-magnify</v-icon>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search"
                  />
                  <button
                    type="submit"
                    class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div>
              <dashboard-i-modal-form-new-eskul
                @close="closeNewEskulModal"
                :isShowModal="newEskulModal"
                :editData="itemEskulEdit"
                @getEskulInstansi="getEskulInstansi"
              />
              <button
                @click="showNewEskulModal"
                class="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                Add New Organization
              </button>
            </div>
          </div>
          <!-- View mode selector -->
          <div class="flex gap-2">
            <button
              @click="viewMode = 'list'"
              :class="viewMode === 'list' ? 'font-bold underline' : ''"
              class="text-gray-600 hover:text-gray-800"
            >
              List View
            </button>
            <button
              @click="viewMode = 'table'"
              :class="viewMode === 'table' ? 'font-bold underline' : ''"
              class="text-gray-600 hover:text-gray-800"
            >
              Table View
            </button>
            <button
              @click="viewMode = 'trash'"
              :class="viewMode === 'trash' ? 'font-bold underline' : ''"
              class="text-gray-600 hover:text-gray-800"
            >
              Trash
            </button>
          </div>

          <!-- Conditional rendering based on view mode -->
          <div v-if="viewMode === 'list'">
            <dashboard-i-ekstrakurikuler-list
              :eskulInstansiList="eskulInstansiList"
              @handleTrash="handleTrash"
              @handleEdit="handleEditEskul"
            />
          </div>
          <div v-else-if="viewMode === 'trash'">
            <dashboard-i-ekstrakurikuler-list
              :eskulInstansiList="eskulInstansiList"
              :isTrash="true"
              @getEskul="getEskulInstansi"
              @handleEdit="handleEditEskul"
            />
          </div>
          <div v-else-if="viewMode === 'table'">
            <dashboard-i-ekstrakurikuler-table
              :eskulInstansiList="eskulInstansiList"
              @handleEdit="handleEditEskul"
              @handleTrash="handleTrash"
            />
          </div>
          <hr />
          <div>
            <p class="text-2xl font-bold">User Management</p>
          </div>
          <dashboard-i-user-management />
          <hr />
          <div>
            <p class="text-2xl font-bold">Charts</p>
          </div>
          <dashboard-i-stats />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      viewMode: 'list', // default view mode
      eskulReportActivity: [],
      eskulInstansiList: [],
      profileInfo: [],
      newEskulModal: false,
      itemEskulEdit: null,
    }
  },
  mounted() {
    this.getProfileInfo()
    this.getEskulInstansi()
    this.getEskulReportActivity()
  },
  methods: {
    showNewEskulModal() {
      this.newEskulModal = !this.newEskulModal
      console.log('muncul ', this.newEskulModal)
    },
    closeNewEskulModal() {
      this.newEskulModal = false
    },
    hrefCreateNewInstansi() {
      this.$router.push({ name: 'create-institution' })
    },
    async getEskulReportActivity() {
      const { data } = await this.$store.dispatch(
        'Dashboard/instansi/getReportActivity'
      )
      this.eskulReportActivity = data
    },
    async getProfileInfo() {
      const { data } = await this.$store.dispatch(
        'Dashboard/instansi/getProfileInfo'
      )
      this.profileInfo = data
    },

    async handleTrash(item) {
      const formdata = new FormData()
      formdata.append('id', item.id)

      const { data } = await this.$store.dispatch(
        'Dashboard/instansi/trashEskul',
        formdata
      )

      await this.getEskulInstansi()
    },
    async getEskulInstansi(isTrash = false) {
      this.itemEskulEdit = null

      const { data } = await this.$store.dispatch(
        'Dashboard/instansi/getEskulInstansi',
        isTrash
      )
      this.eskulInstansiList = data.data

      console.log('eskul instansi :', this.eskulInstansiList)
    },
    handleEditEskul(item) {
      this.itemEskulEdit = item
      console.log('itme edit : ', item)
      this.showNewEskulModal()
    },
  },
  watch: {
    async viewMode(val) {
      if (val == 'trash') {
        await this.getEskulInstansi(true)
      } else {
        await this.getEskulInstansi(false)
      }
    },
  },
}
</script>

<style scoped>
/* Optional styling for the selected view mode button */
.font-bold.underline {
  text-decoration: underline;
}
</style>
