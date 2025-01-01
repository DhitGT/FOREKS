<template>
  <div>
    <!-- Navbar -->
    <nav
      :class="{
        [NavColors.bgTransparent]: isTop && !isSidebarOpen,
        [NavColors.bgPrimary]: !isTop || isSidebarOpen,
      }"
      class="fixed w-full top-0 transition-colors duration-500 ease-in-out"
      style="z-index: 999"
    >
      <div class="max-w-screen-xl flex items-center justify-evenly mx-auto p-4">
        <a
          href=""
          class="flex gap-3 items-center"
          style="max-width: fit-content"
        >
          <img :src="NavLogoSrc" class="h-9 rounded-full" alt="Foresk Logo" />
          <span
            :class="NavColors.textPrimary"
            class="self-center text-2xl font-semibold whitespace-nowrap"
            >{{ NavTittle }}</span
          >
        </a>
        <button
          @click="toggleSidebar"
          type="button"
          :class="NavColors.iconColor"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden"
        >
          <span class="sr-only">Open main menu</span>
          <v-icon large :color="NavColors.iconColor" v-if="!isSidebarOpen"
            >mdi-menu</v-icon
          >
          <v-icon large :color="NavColors.iconColor" v-else>mdi-close</v-icon>
        </button>
        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul
            class="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0"
          >
            <li v-for="(item, i) in NavList" :key="i">
              <a
                :href="item.href"
                :class="NavColors.textPrimary"
                class="block nav-link py-2 px-3 rounded md:bg-transparent md:p-0"
              >
                <span :class="NavColors.textPrimary">{{ item.tittle }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Mobile Sidebar -->
    <transition name="sidebar">
      <div
        v-if="isSidebarOpen"
        :class="[
          NavColors.sidebarBackground,
          { 'opacity-100': isSidebarOpen, 'opacity-0': !isSidebarOpen },
        ]"
        class="fixed inset-0 bg-opacity-75 z-50 md:hidden"
        style="z-index: 888"
      >
        <div
          class="`absolute top-0 right-0 w-full h-full pt-24 backdrop-blur-xl shadow-md p-4 transform ${NavColors.sidebarContent}`"
          :class="{
            'translate-x-0': isSidebarOpen,
            'translate-x-full': !isSidebarOpen,
          }"
          @click.stop=""
        >
          <ul class="font-medium flex flex-col space-y-4">
            <li v-for="(item, i) in NavList" :key="i">
              <a
                :href="item.href"
                :class="NavColors.textPrimary"
                class="block nav-link py-2 px-3 rounded md:bg-transparent md:p-0"
              >
                <span :class="NavColors.textPrimary">{{ item.tittle }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    NavTittle: {
      required: false,
      default: 'FORESK',
    },
    NavLogoSrc: {
      required: false,
      default: 'https://koppling.site/kopplingLogo.png',
    },
    NavList: {
      required: false,
      default: [
        { tittle: 'Home', href: '#home' },
        { tittle: 'About', href: '#about' },
        { tittle: 'Activities', href: '#activities' },
        { tittle: 'Gallery', href: '#galery' },
        { tittle: 'Contact', href: '#contact' },
      ],
    },
    NavColors: {
      required: false,
      default: () => ({
        bgPrimary: 'bg-[#222222]',
        bgTransparent: 'bg-transparent',
        textPrimary: 'text-white',
        iconColor: 'text-gray-400',
        sidebarBackground: 'bg-transparent',
        sidebarContent: 'bg-[#1a531977]',
      }),
    },
  },
  data() {
    return {
      isTop: true,
      isSidebarOpen: false,
      offset: 100,
    }
  },
  methods: {
    handleScroll() {
      this.isTop = window.scrollY === 0
    },
    scrollToSection(event) {
      event.preventDefault()
      const targetId = event.currentTarget.getAttribute('href').substring(1)
      const targetElement = document.getElementById(targetId)
      const offsetPosition = targetElement.offsetTop - this.offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    this.handleScroll()

    // Add event listeners to nav links
    document.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', this.scrollToSection)
    })
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)

    // Remove event listeners from nav links
    document.querySelectorAll('.nav-link').forEach((link) => {
      link.removeEventListener('click', this.scrollToSection)
    })
  },
}
</script>

<style>
.sidebar-enter-active,
.sidebar-leave-active {
  transition: transform 0.5s ease;
}
.sidebar-enter,
.sidebar-leave-to {
  transform: translateX(200%);
}
</style>
