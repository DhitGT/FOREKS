<template>
  <div>
    <section
      class="relative min-h-[100vh] pt-24 md:pt-0 transition-opacity duration-500 ease-in-out"
    >
      <!-- Black background div -->
      <div class="absolute inset-0 bg-black"></div>

      <!-- Main background image div with fading animation -->
      <div
        :style="{
          backgroundImage: `url(http://localhost:8000/storage/${JumboImage})`,
        }"
        ref="bgJumbo"
        class="absolute inset-0 opacity-100 bg-center bg-no-repeat bg-cover bg-gray-700 bg-blend-multiply transition-opacity duration-1000 ease-in-out"
      ></div>

      <div
        class="relative z-10 px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56"
      >
        <h1
          class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl"
        >
          {{ JumboTittle }}
        </h1>
        <p
          class="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48"
        >
          {{ JumboSubTittle }}
        </p>
        <div
          class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0"
        >
          <a
            v-if="FormHref != ''"
            :href="FormHref"
            target="_blank"
            style="color: white"
            class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-gray-800 hover:bg-[#1b1d2b]"
          >
            <span class="text-white"> Form Pendaftaran </span>
            <svg
              class="w-3.5 h-3.5 ms-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <!-- asdasdadasd -->
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
          <a
            :href="LearnMoreHref"
            class="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-gray-800 visited:text-gray-800 rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
          >
            <span class="text-white"> Pelajari Lebih Lanjut </span>
          </a>
        </div>
        <div class="badge top-32 relative pt-auto h-full">
          <div>
            <div class="flex justify-center gap-5">
              <div
                v-for="(item, i) in badge"
                :key="i"
                :class="`px-5 py-2 rounded-lg `"
                :style="`background-color : ${item.color} `"
              >
                <p class="align-middle my-auto">{{ item.name }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  props: {
    JumboTittle: {
      required: false,
      default: 'FORESK - FORUM EKSTRAKURIKULER',
    },
    JumboSubTittle: {
      required: false,
      default: 'Lorem ipsum dolor sit amet',
    },
    JumboImage: {
      required: true,
    },
    OrganizationItem: {
      required: false,
    },
    LearnMoreHref: {
      required: false,
      default: '#about',
    },
    FormHref: {
      required: false,
      default: '',
    },
    badge: {
      default: [
        , // Light amber
      ],
    },
  },
  data() {
    return {
      fadingOut: false,
      phoneNumber: '6285718251092', // Replace with your phone number
      message: 'Saya mau join Koppling',
    }
  },

  computed: {
    whatsappLink() {
      const encodedMessage = encodeURIComponent(this.message)
      return `https://wa.me/${this.phoneNumber}?text=${encodedMessage}`
    },
  },
  methods: {},
  mounted() {},
}
</script>
<style>
.section {
  transition: opacity 1s ease-in-out;
}
</style>
