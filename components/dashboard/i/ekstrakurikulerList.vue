<template>
  <div>
    <div class="pt-4">
      <div class="flex gap-4 items-center">
        <div class="w-2/4">
          <form class="max-w-xl mx-auto">
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >Search</label
            >
            <div class="relative">
              <div
                class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
              >
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Mockups, Logos..."
                required
              />
              <button
                type="submit"
                class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4 my-4">
        <dashboard-i-eskul-card v-for="(item, i) in orgsCard" :key="i" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      orgsCard: [
        {
          name: 'Koppling',
          logo: 'https://koppling.site/bgJumbo2.jpg',
          description:
            'Loremm ipsum dolor sit amet fugus amigo fabulous sir ametin jala rekame',
          member: '394',
          gen: '23',
          kas: 'Rp400.000',
          actv: '4',
          achivementthisYear: '4',
          totalAchievment: '23',
        },
        {
          name: 'Eco Warriors',
          logo: 'https://koppling.site/bgJumbo3.jpg',
          description:
            'Dedicated to preserving the environment through sustainable practices.',
          member: '120',
          gen: '15',
          kas: 'Rp150.000',
          actv: '5',
          achivementthisYear: '5',
          totalAchievment: '23',
        },
        {
          name: 'Tech Innovators',
          logo: 'https://koppling.site/bgJumbo4.jpg',
          description:
            'Exploring cutting-edge technology and innovation for a better future.',
          member: '180',
          gen: '12',
          kas: 'Rp250.000',
          actv: '6',
          achivementthisYear: '4',
          totalAchievment: '23',
        },
        {
          name: 'Sports Club',
          logo: 'https://koppling.site/bgJumbo5.jpg',
          description:
            'A community for all sports enthusiasts and aspiring athletes.',
          member: '250',
          gen: '19',
          kas: 'Rp300.000',
          actv: '7',
          achivementthisYear: '1',
          totalAchievment: '23',
        },
        {
          name: 'Art and Design Hub',
          logo: 'https://koppling.site/bgJumbo.jpg',
          description: 'Fostering creativity and design in various art forms.',
          member: '145',
          gen: '10',
          kas: 'Rp200.000',
          actv: '3',
          achivementthisYear: '0',
          totalAchievment: '23',
        },
      ],
    }
  },
}
</script>
