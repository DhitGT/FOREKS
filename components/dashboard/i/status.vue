<template>
  <div class="stories-container flex gap-4 overflow-x-auto px-4 py-4">
    <div
      v-for="(story, index) in activities"
      :key="index"
      @click="openStory(story)"
      class="story-item cursor-pointer"
    >
      <v-avatar size="80" class="border-4 border-blue-500">
        <img
          class="object-cover"
          :src="'http://localhost:8000/storage/' + story.picture"
          alt="User Story"
        />
      </v-avatar>
      <p class="text-center text-sm mt-2">
        {{ story?.eskul?.web_pages?.navbar_title }}
      </p>
    </div>

    <!-- Story Dialog -->
    <v-dialog v-model="storyDialog" max-width="600px">
      <v-card class="p-4">
        <v-card-title class="text-h6">
          <div class="flex gap-3 items-center">
            <img
              :src="
                'http://localhost:8000/storage/' + currentStory?.eskul?.logo
              "
              class="aspect-1/1 h-10 rounded-full"
            />
            {{ currentStory?.eskul?.web_pages?.navbar_title }}
          </div>
        </v-card-title>
        <img
          :src="'http://localhost:8000/storage/' + currentStory?.picture"
          aspect-ratio="16/9"
        />
        <p>
          {{ currentStory?.title }}
        </p>
        <p>
          {{ currentStory?.description }}
        </p>
        <p>From : {{ currentStory?.date_start }}</p>
        <p>To : {{ currentStory?.date_end }}</p>

        <p>
          Absensi :
          <a
            @click="
              {
                $router.push(
                  '/dashboard/i/absent/' +
                    currentStory?.eskul?.web_pages?.custom_domain_name +
                    '/' +
                    currentStory?.absent_code
                )
              }
            "
            >Absent</a
          >
        </p>
        <v-card-actions>
          <v-btn text color="primary" @click="storyDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    profileInfo: {
      required: true,
    },
  },
  data() {
    return {
      activities: [],
      stories: [
        { username: 'User1', image: 'https://placehold.co/150' },
        { username: 'User2', image: '/assets/img/bgJumbo/bgjumbo3.jpg' },
        { username: 'User3', image: 'https://placehold.co/150' },
        // Add more users as needed
      ],
      storyDialog: false,
      currentStory: null,
    }
  },
  mounted() {
    this.getEskulActivityReport()
  },
  methods: {
    openStory(story) {
      this.currentStory = story
      this.storyDialog = true
    },
    async getEskulActivityReport() {
      this.loading = true
      console.log('run', this.profileInfo)

      const formData = new FormData()
      formData.append('instansi_id', this.profileInfo.data.instansi_id)

      console.log('fd : ', formData)
      try {
        const response = await this.$store.dispatch(
          'Dashboard/organization/getEskulActivityReport',
          formData
        )

        this.activities = response.data
        console.log('ACTV : ', this.activities)
      } catch (e) {
        // alert(e.message)
        console.log(e)
      }

      this.loading = false
    },
  },
}
</script>

<style scoped>
.stories-container {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding: 1rem;
}

.story-item {
  text-align: center;
  width: 80px;
}

.story-item .v-avatar {
  border: 4px solid #007aff; /* Blue border for story circle */
}
</style>
