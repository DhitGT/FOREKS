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
          backgroundImage: preview.jumboBg
            ? 'url(' + preview.jumboBg + ')'
            : profileInfo.web_pages?.jumbotron_image
            ? 'url(' +
              'http://localhost:8000/storage/' +
              profileInfo.web_pages?.jumbotron_image +
              ')'
            : '',
        }"
        class="absolute inset-0 bg-center opacity-100 bg-no-repeat bg-cover bg-gray-700 bg-blend-multiply transition-opacity duration-1000 ease-in-out"
      ></div>

      <div
        class="relative z-10 px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56"
      >
        <h1
          class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl"
        >
          {{
            preview?.title
              ? preview?.title
              : profileInfo?.web_pages?.jumbotron_title
              ? profileInfo?.web_pages?.jumbotron_title
              : 'Lorem ipsum Dolor Sit'
          }}
        </h1>
        <p
          class="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48"
        >
          {{
            preview?.subtitle
              ? preview?.subtitle
              : profileInfo?.web_pages?.jumbotron_subtitle
              ? profileInfo?.web_pages?.jumbotron_subtitle
              : 'Lorem ipsum Dolor Sit'
          }}
        </p>

        <div
          class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0"
        >
          <a
            v-if="
              profileInfo?.web_pages?.form_register_link != null &&
              preview?.isFormRegister
            "
            :href="profileInfo?.web_pages?.form_register_link"
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
            <div class="flex justify-center gap-5 flex-wrap">
              <div
                v-for="(item, i) in badge"
                :key="i"
                :class="`px-5 py-2 rounded-lg `"
                :style="`background-color : ${item.color} `"
              >
                <p class="align-middle my-auto text-gray-800">
                  {{ item.name }}
                </p>
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
  watch: {
    preview(newVal, oldVal) {
      console.log('preview changed from:', oldVal, 'to:', newVal)
    },
  },
  props: {
    JumboTittle: {
      required: false,
      default: 'FORESK - FORUM EKSTRAKURIKULER',
    },
    JumboSubTittle: {
      required: false,
      default: 'Lorem ipsum dolor sit amet',
    },
    JumboImageList: {
      required: false,
    },
    OrganizationItem: {
      required: false,
    },
    LearnMoreHref: {
      required: false,
      default: '#about',
    },
    profileInfo: {
      type: Object,
    },
    preview: {
      type: Object,
    },
    FormHref: {
      required: false,
      default:
        'https://docs.google.com/forms/d/e/1FAIpQLSdH5ainp7B7cj1kLM4UuAsTtGDs5U2RwPFDc1kRVJUoPLDn9g/viewform',
    },
    badge: {
      default: [
        { name: 'Lingkungan Hidup', color: '#A7F3D0' }, // Light green
        { name: 'Voly', color: '#FEF3C7' }, // Light yellow
        { name: 'Futsal', color: '#BFDBFE' }, // Light blue
        { name: 'English Club', color: '#FECACA' }, // Light red
        { name: 'Japanese Club', color: '#E9D5FF' }, // Light purple
        { name: 'Software Community', color: '#D9F99D' }, // Light lime
        { name: 'Tenro', color: '#FDE68A' }, // Light amber
      ],
    },
  },
  data() {
    return {
      currentBackgroundIndex: 0,
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
}
</script>
<style>
.section {
  transition: opacity 1s ease-in-out;
}
</style>
