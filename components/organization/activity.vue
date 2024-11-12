<template>
  <div :style="{ backgroundColor: carouselBgColor }" class="my-12">
    <div class="pa-6">
      <v-container>
        <div class="flex flex-col items-center justify-center">
          <span :style="{ color: fontColor }" class="text-4xl font-bold mb-5"
            >Aktivitas Kami</span
          >
          <div>
            <p :style="{ color: fontColor }" class="mb-3 font-normal text-lg">
              Adapun kegiatan yang kami lakukan adalah kegiatan yang
              berkontribusi pada pelestarian lingkungan dan pengembangan diri.
              Kami berusaha menyelenggarakan kegiatan yang bervariasi dan
              mendidik untuk menginspirasi anggota kami. Berikut adalah beberapa
              contohnya:
            </p>

            <ul class="`text-[#${FontColor}]`">
              <li class="list-disc mb-2">
                <span class="font-bold"> Mountaineering: </span>
                Mendaki gunung untuk merasakan keindahan alam dan meningkatkan
                keterampilan bertahan hidup di lingkungan yang keras.
              </li>
              <li class="list-disc mb-2">
                <span class="font-bold"> Pembelajaran Hidroponik: </span>
                Mengenal teknik bertani modern yang ramah lingkungan dan
                berkontribusi pada ketahanan pangan.
              </li>
              <li class="list-disc mb-2">
                <span class="font-bold">
                  Pembelajaran tentang Lingkungan Hidup:
                </span>
                Memahami isu-isu lingkungan dan mencari solusi inovatif untuk
                mengatasi tantangan yang dihadapi.
              </li>
              <li class="list-disc mb-2">
                <span class="font-bold"> Kunjungan Studi: </span>
                Mengunjungi tempat-tempat yang memiliki praktik terbaik dalam
                pengelolaan lingkungan dan belajar dari pengalaman mereka.
              </li>
            </ul>

            <p class="`mb-3 font-normal text-lg text-[#${FontColor}]`">
              Nah dibawah ini ada detail beberapa kegiatan yang pernah kita
              lakuin.
            </p>
          </div>
        </div>
      </v-container>
    </div>
    <div :style="{ backgroundColor: carouselBgColor }">
      <v-container :style="{ backgroundColor: carouselBgColor }" class="py-6">
        <carousel
          paginationColor="gray"
          paginationActiveColor="black"
          ref="carouselActivities"
          :per-page-custom="[
            [320, 1],
            [768, 3],
            [1200, 4],
          ]"
          :mouse-drag="true"
          :pagination-enabled="true"
        >
          <slide v-if="indexPage > 1"> </slide>
          <slide
            style="padding: 10px"
            v-for="(item, i) in itemActivities"
            :key="`activity-${i}`"
          >
            <organization-card-activity
              :item="item"
              bgColor="#2C2C2C"
              borderColor="#444444"
              titleColor="#FFFFFF"
              textColor="#B0B0B0"
              buttonTextColor="#FFEB3B"
            />
          </slide>
          <slide v-if="itemActivities.length === 7 * perPage && dotsTotal > 7">
          </slide>
        </carousel>
      </v-container>
    </div>
  </div>
</template>
<script>
import { Carousel, Slide } from 'vue-carousel'

export default {
  components: {
    Carousel,
    Slide,
  },
  props: {
    // Carousel background color
    carouselBgColor: {
      type: String,
      default: '#333333', // Dark gray for carousel background
    },

    // Active pagination dot color
    activeDotColor: {
      type: String,
      default: '#FFFFFF', // White for active pagination dot
    },

    // Inactive pagination dot color
    inactiveDotColor: {
      type: String,
      default: '#555555', // Darker gray for inactive pagination dot
    },
  },
  data() {
    return {
      windowWidth: 0,
      startIndex: 0,
      indexPage: 1,
      isNext: false,
      itemActivities: [],
      paginationDots: Array(5).fill(0), // Example array for pagination dots
      activeDot: 2, // Example of an active dot index
      originalItemActivities: [
        {
          title: 'Mandalawangi Camping',
          gen: 'VII',
          location: 'Mandalawangi, Bogor',
          date: '30 September 2023',
          imgUrl: '/assets/img/bgJumbo/bgJumbo2.jpg',
          action:
            'https://www.instagram.com/p/C6nUgY2Lv54/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
          descript: 'Kegiatan Camping di Mandalawangi, selama 1 hari 1 malam',
          galery: [
            'mandala1.jpg',
            'mandala2.jpg',
            'mandala3.jpg',
            'mandala4.jpg',
            'mandala5.jpg',
            'mandala6.jpg',
            'mandala7.jpg',
            'mandala8.jpg',
            'mandala9.jpg',
            'mandala10.jpg',
            'mandala11.jpg',
            'mandala12.jpg',
            'mandala13.jpg',
            'mandala14.jpg',
            'mandala15.jpg',
          ],
        },
      ],
    }
  },
  mounted() {
    this.getWindowWidth()
    window.addEventListener('resize', this.getWindowWidth)
    this.$refs.carouselActivities.$on('pageChange', this.onPageChange)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getWindowWidth)
    this.$refs.carouselActivities.$off('pageChange', this.onPageChange)
  },

  computed: {
    dotsTotal() {
      this.windowWidth = window.innerWidth
      if (this.windowWidth >= 320 && this.windowWidth < 768) {
        return this.originalItemActivities.length / 1
      } else if (this.windowWidth >= 768 && this.windowWidth < 1200) {
        return this.originalItemActivities.length / 3
      } else if (this.windowWidth >= 1200) {
        return this.originalItemActivities.length / 4
      }
    },
    perPage() {
      this.windowWidth = window.innerWidth
      if (this.windowWidth >= 320 && this.windowWidth < 768) {
        return 1 // 1 item per page for screens smaller than 320px
      } else if (this.windowWidth >= 768 && this.windowWidth < 1200) {
        return 3 // 3 items per page for screens between 320px and 767px
      } else if (this.windowWidth >= 1200) {
        return 4 // 4 items per page for screens between 768px and 1199px
      }
    },
  },

  methods: {
    onPageChange(page) {
      this.currentPage = page // Update the current page
      console.log('Page changed to', page)
      if (page === 7 && this.indexPage == 1) {
        console.log('next')
        this.showNextItems()
      } else if (page === 0 && this.indexPage != 1) {
        console.log('prev')
        this.showPreviousItems()
      } else if (page === 8 && this.indexPage != 1) {
        this.showNextItems()
      }
    },
    prev() {
      this.$refs.carouselActivities.goToPage(
        this.$refs.carouselActivities.currentPage - 1
      )
    },
    next() {
      this.$refs.carouselActivities.goToPage(
        this.$refs.carouselActivities.currentPage + 1
      )
    },
    getWindowWidth() {
      this.windowWidth = window.innerWidth

      if (this.dotsTotal > 7) {
        this.itemActivities = this.originalItemActivities.slice(
          this.startIndex,
          this.startIndex + 7 * this.perPage
        )
      } else {
        this.itemActivities = this.originalItemActivities
      }
    },
    showNextItems() {
      this.indexPage++
      this.$refs.carouselActivities.goToPage(1)
      this.startIndex += 7 * this.perPage
      this.itemActivities = this.originalItemActivities.slice(
        this.startIndex,
        this.startIndex + 7 * this.perPage
      )
    },
    showPreviousItems() {
      this.indexPage--
      if (this.indexPage == 1) {
        this.$refs.carouselActivities.goToPage(0)
      } else {
        this.$refs.carouselActivities.goToPage(1)
      }
      this.startIndex -= 7 * this.perPage
      this.itemActivities = this.originalItemActivities.slice(
        this.startIndex,
        this.startIndex + 7 * this.perPage
      )
    },
  },
}
</script>
