<template>
  <div class="stories-container flex gap-4 overflow-x-auto px-4 py-4">
    <div
      v-for="(story, index) in stories"
      :key="index"
      @click="openStory(story)"
      class="story-item cursor-pointer"
    >
      <v-avatar size="80" class="border-4 border-blue-500">
        <img class="object-cover" :src="story.image" alt="User Story" />
      </v-avatar>
      <p class="text-center text-sm mt-2">{{ story.username }}</p>
    </div>

    <!-- Story Dialog -->
    <v-dialog v-model="storyDialog" max-width="600px">
      <v-card class="p-4">
        <v-card-title class="text-h6">
          <div class="flex gap-3 items-center">
            <img
              src="https://koppling.site/kopplingLogo.png"
              class="w-10 rounded-full"
            />
            {{ currentStory?.username }}
          </div>
        </v-card-title>
        <img :src="currentStory?.image" aspect-ratio="16/9" />
        <p>
          Kegiatan : Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Molestias optio ipsa perspiciatis voluptates at doloremque voluptatum,
          ipsam deserunt placeat aperiam saepe, officiis praesentium magnam
          corporis tempora non nihil porro aliquam? Eligendi mollitia quia
          sapiente?
        </p>
        <p>Tanggal : 12 Januari 2025</p>
        <p>Jam : 05:00 - 8:00</p>
        <p>Absensi : <a href="">Daftar Siswa Hadir</a></p>
        <v-card-actions>
          <v-btn text color="primary" @click="storyDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
  methods: {
    openStory(story) {
      this.currentStory = story
      this.storyDialog = true
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
