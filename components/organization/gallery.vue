<template>
  <div class="my-12 py-6">
    <v-container>
      <div>
        <div
          class="text-4xl font-bold text-center mb-12 mx-auto"
          :class="titleColor"
        >
          Gallery
        </div>
        <div
          class="gallery grid grid-cols-2 gap-3 md:gap-4 justify-between md:grid-cols-5"
        >
          <div
            :key="`dialog-gallery-${i}`"
            class="relative rounded-lg border cursor-pointer"
            :class="borderColor"
            v-for="(item, i) in gallery"
            @click="openImageDialog(item.imageView)"
          >
            <v-img
              class="rounded-lg object-cover aspect-square"
              :src="item.imageView"
            >
              <template #placeholder>
                <v-skeleton-loader
                  type="image"
                  width="100%"
                  height="100%"
                ></v-skeleton-loader>
              </template>
            </v-img>
          </div>

          <div
            :key="`dialog-gallery-${i}`"
            class="relative rounded-lg border cursor-pointer"
            :class="borderColor"
            v-for="(item, i) in wpgallery"
            @click="
              openImageDialog('http://localhost:8000/storage/' + item.image)
            "
          >
            <v-img
              class="rounded-lg object-cover aspect-square"
              :src="'http://localhost:8000/storage/' + item.image"
            >
              <template #placeholder>
                <v-skeleton-loader
                  type="image"
                  width="100%"
                  height="100%"
                ></v-skeleton-loader>
              </template>
            </v-img>
          </div>
        </div>
      </div>
      <!-- Dialog for fullscreen image -->
      <v-dialog
        v-model="imageDialog"
        style="margin-top: 10rem; z-index: 999"
        fullscreen
        hide-overlay
      >
        <v-toolbar :dark="true" :color="toolbarColor">
          <v-btn icon dark @click="closeImageDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card class="pt-16">
          <div class="flex items-center justify-center min-h-[85vh]">
            <v-img :src="selectedImage" contain max-height="90vh"></v-img>
          </div>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
// import { storage } from '~/plugins/firebase'
// import { ref, getDownloadURL } from 'firebase/storage'

export default {
  props: {
    titleColor: {
      type: String,
      default: 'text-white', // Default white text for title
    },
    borderColor: {
      type: String,
      default: 'border-[#333333]', // Default dark border
    },
    iconColor: {
      type: String,
      default: 'white', // Default white color for icons
    },
    buttonColor: {
      type: String,
      default: '#333333', // Default dark button color
    },
    buttonTextColor: {
      type: String,
      default: 'text-[#F1FDF3]', // Light text color for the button
    },
    toolbarColor: {
      type: String,
      default: '#333333', // Dark toolbar color
    },
    gallery: {
      type: Array,
      default: [], // Dark toolbar color
    },
    wpgallery: {
      type: Array,
      default: [], // Dark toolbar color
    },
  },
  data() {
    return {
      itemGallery: [],
      imageDialog: false,
      selectedImage: '',
      imageCache: {},
      imgUrls: {},
      displayedImages: [],
    }
  },
  async created() {
    // await this.preFetchImageUrls()
    this.shuffleArray(this.wpgallery)
    this.displayedImages = this.wpgallery.slice(0, 10)
  },
  methods: {
    openImageDialog(imageUrl) {
      this.selectedImage = imageUrl
      this.imageDialog = true
    },
    closeImageDialog() {
      this.selectedImage = ''
      this.imageDialog = false
    },
    // async preFetchImageUrls() {
    //   const promises = this.itemGallery.map(async (imgName) => {
    //     try {
    //       const fileRef = ref(storage, imgName)
    //       const url = await getDownloadURL(fileRef)
    //       this.$set(this.imgUrls, imgName, url)
    //     } catch (error) {
    //       console.error('Error getting image URL:', error)
    //     }
    //   })
    //   await Promise.all(promises)
    // },
    // loadMoreImages() {
    //   const startIndex = this.displayedImages.length
    //   const endIndex = startIndex + 10
    //   this.displayedImages = this.itemGallery.slice(0, endIndex)
    // },
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
      }
    },
  },
}
</script>
