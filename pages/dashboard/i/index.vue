<template>
  <div>
    <dashboard-i-sidebar :profileInfo="profileInfo" />

    <div class="container md:ml-52">
      <div class="flex md:pl-52 flex-col gap-4" v-if="!loading">
        <div>
          <p class="text-2xl font-bold">Activity</p>
          <dashboard-i-status
            :profileInfo="profileInfo"
            v-if="eskulReportActivity.report_length > 0"
          />
          <div v-else>
            <p class="text-gray-600">Theres No Eskul Activity For Now</p>
          </div>
        </div>

        <p class="text-2xl font-bold">Profile</p>
        <dashboard-i-info
          :profileInfo="profileInfo"
          @fetchProfileInfo="getProfileInfo"
          v-if="profileInfo.isFound"
        />

        <div v-if="profileInfo.data?.custom_domain_name != null">
          <div>
            <p class="text-2xl font-bold">Organization</p>
          </div>
          <div class="flex gap-4 my-3 max-h-fit items-center">
            <div class="w-full">
              <div class="max-w-full mx-auto">
                <label
                  for="default-search"
                  class="mb-2 text-sm font-medium text-gray-100 bg-gray-800 sr-only"
                  >Search</label
                >
                <div class="relative">
                  <div
                    class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
                  >
                    <v-icon color="white">mdi-magnify</v-icon>
                  </div>
                  <input
                    type="search"
                    v-model="eskulSearchQuery"
                    id="default-search"
                    class="block w-full p-4 ps-10 rounded-lg text-sm bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search"
                  />
                  <button
                    @click="getEskulInstansi"
                    class="text-white absolute end-2.5 bottom-2.5 font-medium rounded-lg text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
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
                :profileInfo="profileInfo"
              />
              <button
                @click="showNewEskulModal"
                class="block w-full h-12 px-4 text-sm rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              >
                + New
              </button>
            </div>
          </div>
          <!-- View mode selector -->
          <div class="flex gap-2">
            <button
              @click="viewMode = 'list'"
              :class="viewMode === 'list' ? 'font-bold underline' : ''"
              class="text-gray-100 hover:text-gray-400"
            >
              List View
            </button>
            <button
              @click="viewMode = 'table'"
              :class="viewMode === 'table' ? 'font-bold underline' : ''"
              class="text-gray-100 hover:text-gray-400"
            >
              Table View
            </button>
            <button
              @click="viewMode = 'trash'"
              :class="viewMode === 'trash' ? 'font-bold underline' : ''"
              class="text-gray-100 hover:text-gray-400"
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
              @handleHrefEskul="handleHrefEskul"
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

          <div>
            <p class="text-2xl font-bold">User Management</p>
          </div>
          <dashboard-i-user-management :eskulInstansiList="eskulInstansiList" />

          <div>
            <p class="text-2xl font-bold">Charts</p>
          </div>
          <dashboard-i-stats :eskulInstansiList="eskulInstansiList" />
        </div>
      </div>
      <div>
        <loading-screen :loading="loading" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  // computed: {
  //   ...mapState({
  //     eskulSearchQuery: (state) => state.dashboard.instansi.eskulSearchQuery,
  //   }),
  // },
  data() {
    return {
      viewMode: 'list', // default view mode
      eskulReportActivity: [],
      eskulInstansiList: [],
      profileInfo: [],
      newEskulModal: false,
      itemEskulEdit: null,
      eskulSearchQuery: '',
      loading: false,
      sidebar: false,
    }
  },
  async mounted() {
    await this.getProfileInfo()
    await this.getEskulInstansi()
    await this.getEskulReportActivity()
  },
  methods: {
    isSidebarOpen(val) {
      this.sidebar = val
    },
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
      this.loading = true
      const { data } = await this.$store.dispatch(
        'Dashboard/instansi/getReportActivity'
      )
      this.eskulReportActivity = data
      this.loading = false
    },
    async getProfileInfo() {
      this.loading = true
      const { data } = await this.$store.dispatch(
        'Dashboard/instansi/getProfileInfo'
      )
      this.profileInfo = data
      this.loading = false
    },


    async handleTrash(item) {
      this.loading = true
      const formdata = new FormData()
      formdata.append('id', item.id)

      const { data } = await this.$store.dispatch(
        'Dashboard/instansi/trashEskul',
        formdata
      )

      await this.getEskulInstansi()
      this.loading = false
    },
    async getEskulInstansi(isTrash = false) {
      this.loading = true
      this.itemEskulEdit = null

      const { data } = await this.$store.dispatch(
        'Dashboard/instansi/getEskulInstansi',
        { isTrash: isTrash, search: this.eskulSearchQuery }
      )
      this.eskulInstansiList = data.data

      this.loading = false
      console.log('eskul instansi :', this.eskulInstansiList)
    },

    handleEditEskul(item) {
      this.itemEskulEdit = item
      console.log('itme edit : ', item)
      this.showNewEskulModal()
    },
    handleHrefEskul(item) {
      this.$router.push(
        `/i/${this.profileInfo.data.custom_domain_name}/${item.custom_domain_name}`
      )
    },
  },
  watch: {
    async viewMode(val) {
      this.loading = true
      if (val == 'trash') {
        await this.getEskulInstansi(true)
      } else {
        await this.getEskulInstansi(false)
      }
    },
    eskulSearchQuery(val) {
      if (val == '') {
        this.getEskulInstansi()
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
