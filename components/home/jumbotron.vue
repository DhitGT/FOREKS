<template>
  <div>
    <section
      class="relative min-h-[100vh] pt-24 md:pt-0 transition-opacity duration-500 ease-in-out"
    >
      <!-- Black background div -->
      <div class="absolute inset-0 bg-black"></div>

      <div
        ref="bgJumbo"
        class="absolute bg-[url(http://localhost:3000/assets/img/bgHome.png)] inset-0 opacity-100 bg-center bg-no-repeat bg-cover"
      ></div>
      <div
        class="relative top-0 h-screen z-10 px-4 flex items-center mx-auto max-w-screen-xl text-center py-24 lg:py-56"
      >
        <div class="flex flex-col">
          <h1
            class="mb-4 text-4xl xl:text-8xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl"
          >
            <span class="text-blue-400">FOR</span>um
            <span class="text-blue-400">EKS</span>trakurikuler
          </h1>
          <p
            class="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48"
          >
            Discover a world where managing your extracurricular club becomes
            effortless and effective. Simplify operations, foster collaboration,
            and achieve more together.
          </p>
          <div
            class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0"
          >
            <a
              href="#about-us"
              class="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-gray-800 visited:text-gray-800 rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
            >
              <span class="text-white">Learn More</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },

  methods: {},
  mounted() {},
}
</script>

