<template>
  <footer :class="footerBgColor" class="p-4 sm:p-6">
    <div class="mx-auto max-w-screen-xl">
      <div class="md:flex md:justify-between">
        <div class="mb-6 md:mb-0">
          <a :href="footerLink" class="flex items-center">
            <img :src="logoSrc" class="mr-3 h-8 rounded-full" :alt="logoSrc" />
            <span
              class="self-center text-2xl font-semibold whitespace-nowrap"
              :class="fontColor"
              >{{ footerText }}</span
            >
          </a>
        </div>
        <div class="grid grid-cols-1 gap-8 sm:gap-6 sm:grid-cols-3">
          <div>
            <h2 class="mb-6 text-sm font-semibold" :class="fontColor">
              {{ followUsText }}
            </h2>
            <ul>
              <li
                class="mb-4 flex items-center"
                v-for="(social, index) in socialLinks"
                :key="index"
              >
                <v-icon :class="iconColor" class="mr-2">{{
                  social.icon
                }}</v-icon>
                <a
                  :href="social.url"
                  :class="fontColor"
                  class="hover:underline"
                >
                  <span>{{ social.name }}</span>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 class="mb-6 text-sm font-semibold" :class="fontColor">
              {{ contactText }}
            </h2>
            <ul>
              <li
                class="mb-4 flex items-center"
                v-for="(contact, index) in contactLinks"
                :key="index"
              >
                <v-icon :class="iconColor" class="mr-2">{{
                  contact.icon
                }}</v-icon>
                <a
                  :href="contact.url"
                  :class="fontColor"
                  class="hover:underline"
                >
                  <span>{{ contact.text }}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <hr
        class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"
      />

      <div class="w-full flex items-center justify-center mx-auto">
        <span class="text-sm text-center" :class="fontColor">
          © 2024
          <a :href="footerLink" class="hover:underline">
            <span>{{ footerText }}</span>
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent',
  props: {
    footerBgColor: {
      type: String,
      default: 'bg-[#333333]', // Dark background color by default
    },
    fontColor: {
      type: String,
      default: '#FFFFFF', // White text color by default
    },
    iconColor: {
      type: String,
      default: 'text-white', // White icon color by default
    },
    footerText: {
      type: String,
      default: 'Koppling',
    },
    footerLink: {
      type: String,
      default: 'https://koppling.site',
    },
    logoSrc: {
      type: String,
      default: 'kopplingLogo.png',
    },
    followUsText: {
      type: String,
      default: 'Follow us',
    },
    contactText: {
      type: String,
      default: 'Contact Us',
    },
    socialLinks: {
      type: Array,
      default: () => [
        {
          icon: 'mdi-instagram',
          name: '@koppling_smkn2bks',
          url: 'https://www.instagram.com/koppling_smkn2bks/?hl=en',
        },
        {
          icon: 'mdi-youtube',
          name: 'Koppling Smkn2bks',
          url: 'https://www.youtube.com/channel/UCXBwakJL8YeL-4-D7qhu4RQ',
        },
      ],
    },
    contactLinks: {
      type: Array,
      default: () => [
        {
          icon: 'mdi-whatsapp',
          text: '+62 85718251092',
          url: 'https://wa.me/+6285718251092',
        },
        {
          icon: 'mdi-email-outline',
          text: 'kopplingsmkn2bks@gmail.com',
          url: 'mailto:kopplingsmkn2bks@gmail.com',
        },
      ],
    },
  },
}
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/@mdi/font@5.9.55/css/materialdesignicons.min.css');
</style>
