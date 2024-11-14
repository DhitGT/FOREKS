module.exports = {
  purge: {
    content: [
      './components/**/*.{vue,js}',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './plugins/**/*.{js,ts}',
      './nuxt.config.{js,ts}',
      "./node_modules/flowbite/**/*.js"
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
