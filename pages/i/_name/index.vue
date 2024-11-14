<template>
  <div class="container">
    <!-- Hero Section -->
    <div class="hero p-8">
      <div class="flex">
        <img :src="profilePic" width="300" class="rounded-circle" alt="" />
        <div class="flex flex-col ms-10 px-5 items-start justify-center">
          <div class="w-full">
            <p class="text-6xl font-bold">{{ name }}</p>
            <div class="flex justify-start gap-6">
              <div>
                <p class="text-xl font-bold">Organizazion: 8</p>
              </div>
              <div>
                <p class="text-xl font-bold">All Member: 358</p>
              </div>
              <div>
                <p class="text-xl font-bold">Followers: 358</p>
              </div>
            </div>
          </div>
          <div class="max-h-14 items-center w-full flex gap-4">
            <v-btn color="blue" class="px-8">Follow</v-btn>
            <v-btn color="green" @click="showEditModal = true">Edit</v-btn>
          </div>
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
            <div v-for="(org, index) in orgsCard" :key="index">
              <div
                @click="cardclick(org)"
                class="bg-white cursor-pointer rounded-lg shadow-lg min-h-full hover:shadow-xl transition-shadow"
              >
                <img
                  :src="org.logo"
                  :alt="org.name"
                  class="w-full rounded-lg h-44 mx-auto object-cover"
                />
                <div class="px-5">
                  <h3 class="text-lg text-gray-900 font-semibold text-start">
                    {{ org.name }}
                  </h3>
                  <p class="text-sm text-gray-600 text-start">
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
  data() {
    return {
      profilePic: 'https://dheep.site/me.jpg',
      name: 'SMKN 2 BEKASI',
      badge: [
        { name: 'Lingkungan Hidup', color: '#A7F3D0' },
        { name: 'Voly', color: '#FEF3C7' },
        { name: 'Futsal', color: '#BFDBFE' },
        { name: 'English Club', color: '#FECACA' },
        { name: 'Japanese Club', color: '#E9D5FF' },
        { name: 'Software Community', color: '#D9F99D' },
        { name: 'Tenro', color: '#FDE68A' },
      ],
      orgsCard: [
        {
          name: 'Koppling',
          logo: 'https://koppling.site/bgJumbo2.jpg',
          description:
            'Loremm ipsum dolor sit amet fugus amigo fabulous sir ametin jala rekame',
        },
        {
          name: 'Eco Warriors',
          logo: 'https://koppling.site/bgJumbo3.jpg',
          description:
            'Dedicated to preserving the environment through sustainable practices.',
        },
        {
          name: 'Tech Innovators',
          logo: 'https://koppling.site/bgJumbo4.jpg',
          description:
            'Exploring cutting-edge technology and innovation for a better future.',
        },
        {
          name: 'Sports Club',
          logo: 'https://koppling.site/bgJumbo5.jpg',
          description:
            'A community for all sports enthusiasts and aspiring athletes.',
        },
        {
          name: 'Art and Design Hub',
          logo: 'https://koppling.site/bgJumbo.jpg',
          description: 'Fostering creativity and design in various art forms.',
        },
      ],
      // Modal and edit form data
      showEditModal: false,
      editProfilePic: '',
      editName: '',
      editBadge: [],
    }
  },
  methods: {
    cardclick(org) {
      this.$router.push(`${this.$route.path}/${org.name}`)
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
