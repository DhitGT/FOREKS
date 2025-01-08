<template>
  <div>
    <!-- Navbar -->
    <nav
      :class="{
        'bg-transparent': isTop && !isSidebarOpen,
        'bg-gray-950': !isTop || isSidebarOpen,
      }"
      class="fixed w-full top-0 transition-colors duration-500 ease-in-out"
      style="z-index: 999"
    >
      <div class="max-w-screen-xl flex items-center justify-evenly mx-auto p-4">
        <a
          href=""
          class="flex items-center max-h-16 overflow-y-hidden"
          style="max-width: fit-content"
        >
          <img
            src="/assets/img/foresk white.png"
            class="h-32"
            alt="Foresk Logo"
          />
          <!-- <span
            class="self-center text-2xl font-semibold whitespace-nowrap text-white"
            >FORESK</span
          > -->
        </a>

        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul
            class="font-medium flex flex-col p-4 md:p-0 border rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0"
          >
            <li>
              <a
                href="#about-us"
                class="block nav-link py-2 px-3 rounded md:bg-transparent md:p-0 visited:text-white text-white md:text-blue-500"
                ><span class="text-white">About</span></a
              >
            </li>

            <li>
              <a
                href="#faq"
                class="block nav-link py-2 px-3 rounded md:border-0 md:p-0 text-white hover:text-blue-500 hover:bg-gray-700 md:hover:bg-transparent"
                ><span class="text-white">Faq</span></a
              >
            </li>
            <li>
              <a
                href="#cusFooter"
                class="block nav-link py-2 px-3 rounded md:border-0 md:p-0 text-white hover:text-blue-500 hover:bg-gray-700 md:hover:bg-transparent"
                ><span class="text-white">Contact</span></a
              >
            </li>
          </ul>
        </div>
        <div
          class="flex gap-2 items-center flex-shrink"
          style="max-width: fit-content"
        >
          <div>
            <div class="flex ms-auto gap-4 items-center">
              <div @click="handleLogin" class="cursor-pointer">Sign In</div>
              <div
                @click="handleRegister"
                class="rounded-lg cursor-pointer bg-blue-900 py-2 px-5"
              >
                Sign Up
              </div>
            </div>
          </div>
          <button
            @click="toggleSidebar"
            type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden text-gray-400"
          >
            <span class="sr-only">Open main menu</span>
            <v-icon large color="white" v-if="!isSidebarOpen">mdi-menu</v-icon>
            <v-icon large color="white" v-else>mdi-close</v-icon>
          </button>
        </div>
      </div>
    </nav>

    <!-- Mobile Sidebar -->
    <transition name="sidebar">
      <div
        v-if="isSidebarOpen"
        class="fixed inset-0 bg-transparent bg-opacity-75 z-50 md:hidden"
        style="z-index: 888"
        :class="{
          'opacity-100': isSidebarOpen,
          'opacity-0': !isSidebarOpen,
        }"
      >
        <div
          class="absolute top-0 right-0 w-full h-full bg-gray-950 pt-24 backdrop-blur-xl backdrop:blur-xl shadow-md p-4 transform"
          :class="{
            'translate-x-0': isSidebarOpen,
            'translate-x-full': !isSidebarOpen,
          }"
          @click.stop=""
        >
          <ul class="font-medium flex flex-col space-y-4">
            <li>
              <a
                href="#about-us"
                class="block nav-link py-2 px-3 rounded"
                @click="isSidebarOpen = false"
                aria-current="page"
                ><span class="text-white">About</span></a
              >
            </li>
            <li>
              <a
                href="#faq"
                class="block nav-link py-2 px-3 rounded"
                @click="isSidebarOpen = false"
                ><span class="text-white">Faq</span></a
              >
            </li>
            <li>
              <a
                href="#cusFooter"
                class="block nav-link py-2 px-3 rounded"
                @click="isSidebarOpen = false"
                ><span class="text-white">Contact</span></a
              >
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isTop: true,
      isSidebarOpen: false,
      offset: 100,
    }
  }, //sdfsdfsdfsdfsdfsdf
  methods: {
    handleRegister() {
      this.$router.push('/auth/register')
    },
    handleLogin() {
      this.$router.push('/auth/login')
    },
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
