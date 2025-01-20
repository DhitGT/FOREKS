<template>
  <div class="container">
    <!-- Hero Section -->
    <div class="hero p-8">
      <div class="flex">
        <div class="min-w-72 h-72 rounded-full overflow-hidden">
          <img
            :src="
              profileInfo && profileInfo.data && profileInfo.data?.img_profile
                ? 'http://localhost:8000/storage/' +
                  profileInfo.data?.img_profile
                : '/assets/img/group-users.png'
            "
            class="w-full h-full object-cover"
            alt=""
          />
        </div>

        <div
          class="max-w-[60%] flex flex-col ms-10 px-5 items-start justify-center"
        >
          <div class="w-full">
            <p class="text-6xl font-bold">
              {{ profileInfo && profileInfo.data && profileInfo.data?.nama }}
            </p>
            <div class="flex justify-start gap-6">
              <div>
                <p class="text-xl font-bold">
                  Organizazion:
                  {{
                    profileInfo &&
                    profileInfo.data &&
                    profileInfo.data?.total_organization
                  }}
                </p>
              </div>
              <div>
                <p class="text-xl font-bold">
                  All Member:
                  {{
                    profileInfo &&
                    profileInfo.data &&
                    profileInfo.data?.total_member
                  }}
                </p>
              </div>
              <div>
                <p class="text-xl font-bold">
                  Followers:
                  {{
                    profileInfo &&
                    profileInfo.data &&
                    profileInfo.data?.total_followers
                  }}
                </p>
              </div>
            </div>
          </div>
          <div
            class="text-lg"
            v-html="
              profileInfo && profileInfo.data && profileInfo.data?.description
            "
          ></div>
          <!--
          <div class="max-h-14 items-center w-full flex gap-4">
            <v-btn v-if="!profileInfo.isOwner" color="blue" class="px-8"
              >Follow</v-btn
            >
            <v-btn v-else color="green" @click="goToDashboard"
              >Go To Dashboard</v-btn
            >
          </div> -->
        </div>
      </div>
    </div>

    <!-- Badge Section -->
    <div class="badge px-8">
      <div class="flex gap-5">
        <div
          v-for="(item, i) in badge"
          :key="i"
          class="px-5 py-2 rounded-lg"
          :style="{ backgroundColor: item.color }"
        >
          <p class="align-middle my-auto">{{ item.name }}</p>
        </div>
      </div>
    </div>

    <!-- Organizations Cards -->
    <div>
      <div class="orgs-card max-h-fit">
        <div>
          <div class="grid grid-cols-1 p-5 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="(org, index) in eskulInstansiList" :key="index">
              <div
                @click="cardclick(org)"
                class="bg-gray-700 cursor-pointer rounded-lg shadow-lg min-h-full hover:shadow-xl transition-shadow"
              >
                <img
                  :src="'http://localhost:8000/storage/' + org.logo"
                  :alt="org.name"
                  class="w-full rounded-lg h-44 mx-auto object-cover"
                />
                <div class="px-5">
                  <h3 class="text-lg text-gray-100 font-semibold text-start">
                    {{ org.name }}
                  </h3>
                  <p class="text-sm text-gray-100 text-start">
                    {{ org.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <v-dialog v-model="showEditModal" max-width="600px">
      <v-card>
        <v-card-title>Edit Profile</v-card-title>
        <v-card-text>
          <v-form ref="editForm">
            <!-- Profile Picture Input -->
            <v-text-field
              v-model="editProfilePic"
              label="Profile Picture URL"
            ></v-text-field>

            <!-- Name Input -->
            <v-text-field v-model="editName" label="Name"></v-text-field>

            <!-- Badge List Input -->
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="closeModal">Cancel</v-btn>
          <v-btn color="blue" @click="saveChanges">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  watch: {
    $route(to, from) {
      // This allows you to reactively watch the route changes
      this.name_custom_domain = to.params.name
      console.log(this.name_custom_domain)
    },
  },
  data() {
    return {
      profileInfo: [],
      profilePic: 'https://dheep.site/me.jpg',
      name: 'SMKN 2 BEKASI',
      badge: [],

      // Modal and edit form data
      showEditModal: false,
      editProfilePic: '',
      editName: '',
      editBadge: [],
      name_custom_domain: '',
      eskulInstansiList: [],
    }
  },
  mounted() {
    this.getProfileInfo()
    this.getEskulInstansi()
  },

  methods: {
    async getEskulInstansi(isTrash = false) {
      const nameRoute = this.$route.params.name
      const { data } = await this.$store.dispatch(
        'Dashboard/instansi/getEskulInstansiPublic',
        { custom_domain_name: nameRoute }
      )
      this.eskulInstansiList = data.data

      console.log('eskul instansi :', this.eskulInstansiList)
    },
    async getProfileInfo() {
      const nameRoute = this.$route.params.name
      console.log('name route ', nameRoute)
      const { data } = await this.$store.dispatch(
        'Dashboard/instansi/getProfileInfoWithDomain',
        nameRoute
      )
      this.profileInfo = data

      this.badge = JSON.parse(this.profileInfo.data.badge)
      console.log(this.profileInfo)
      console.log('badge', this.badge)
    },
    cardclick(org) {
      this.$router.push(`${this.$route.path}/${org.custom_domain_name}`)
    },
    openEditModal() {
      this.editProfilePic = this.profilePic
      this.editName = this.name
      this.editBadge = JSON.parse(JSON.stringify(this.badge))
      this.showEditModal = true
    },
    closeModal() {
      this.showEditModal = false
    },
    saveChanges() {
      this.profilePic = this.editProfilePic
      this.name = this.editName
      this.badge = this.editBadge
      this.showEditModal = false
    },
    addBadge() {
      this.editBadge.push({ name: '', color: '#ffffff' })
    },
    removeBadge(index) {
      this.editBadge.splice(index, 1)
    },
  },
}
</script>
