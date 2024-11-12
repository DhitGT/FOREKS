<template>
  <div class="container">
    <div class="hero p-8">
      <div class="flex">
        <img
          src="https://dheep.site/me.jpg"
          width="300"
          class="rounded-circle"
          alt=""
        />
        <div class="flex flex-col ms-10 px-5 items-start justify-center">
          <div class="w-full">
            <p class="text-6xl font bold">SMKN 2 BEKASI</p>
            <div class="flex justify-start gap-6">
              <div>
                <p class="text-xl font-bold">Organizazion : 8</p>
              </div>
              <div>
                <p class="text-xl font-bold">All Member : 358</p>
              </div>
              <div>
                <p class="text-xl font-bold">Followers : 358</p>
              </div>
            </div>
          </div>
          <div class="max-h-14 items-center w-full flex">
            <div>
              <v-btn color="blue" class="px-8">Follow</v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="badge px-8">
      <div class="flex gap-5">
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
    <div>
      <div class="orgs-card max-h-fit">
        <div>
          <div class="grid grid-cols-1 p-5 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="(org, index) in orgsCard" :key="index">
              <div
                @click="cardclick(org)"
                class="bg-white cursor-pointer rounded-lg shadow-lg min-h-full hover:shadow-xl transition-shadow"
              >
                <img
                  :src="org.logo"
                  :alt="org.name"
                  class="w-full rounded-lg h-44 mx-auto object-cover"
                />
                <div class="px-5">
                  <h3 class="text-lg text-gray-900 font-semibold text-start">
                    {{ org.name }}
                  </h3>
                  <p class="text-sm text-gray-600 text-start">
                    {{ org.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      badge: [
        { name: 'Lingkungan Hidup', color: '#A7F3D0' }, // Light green
        { name: 'Voly', color: '#FEF3C7' }, // Light yellow
        { name: 'Futsal', color: '#BFDBFE' }, // Light blue
        { name: 'English Club', color: '#FECACA' }, // Light red
        { name: 'Japanese Club', color: '#E9D5FF' }, // Light purple
        { name: 'Software Community', color: '#D9F99D' }, // Light lime
        { name: 'Tenro', color: '#FDE68A' }, // Light amber
      ],
      orgsCard: [
        {
          name: 'Koppling',
          logo: 'https://koppling.site/bgJumbo2.jpg',
          description:
            'Loremm ipsum dolor sit amet fugus amigo fabulous sir ametin jala rekame',
        },
        {
          name: 'Eco Warriors',
          logo: 'https://koppling.site/bgJumbo3.jpg',
          description:
            'Dedicated to preserving the environment through sustainable practices.',
        },
        {
          name: 'Tech Innovators',
          logo: 'https://koppling.site/bgJumbo4.jpg',
          description:
            'Exploring cutting-edge technology and innovation for a better future.',
        },
        {
          name: 'Sports Club',
          logo: 'https://koppling.site/bgJumbo5.jpg',
          description:
            'A community for all sports enthusiasts and aspiring athletes.',
        },
        {
          name: 'Art and Design Hub',
          logo: 'https://koppling.site/bgJumbo.jpg',
          description: 'Fostering creativity and design in various art forms.',
        },
      ],
    }
  },
  methods: {
    cardclick(org) {
      this.$router.push('/o/' + org.name)
    },
  },
}
</script>
