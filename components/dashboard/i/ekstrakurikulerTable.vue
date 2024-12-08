<template>
  <div>
    <div class="pt-4">
      <div class="tablecontainer my-4">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table
            class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="px-6 py-3">Name</th>
                <th scope="col" class="px-6 py-3">Member</th>
                <th scope="col" class="px-6 py-3">Gen</th>
                <th scope="col" class="px-6 py-3">Leader</th>
                <th scope="col" class="px-6 py-3">Contact</th>
                <th scope="col" class="px-6 py-3">Alumni</th>
                <th scope="col" class="px-6 py-3">Kas</th>
                <th scope="col" class="px-6 py-3">Achiv/Yr</th>
                <th scope="col" class="px-6 py-3">Total Achivement</th>
                <th scope="col" class="px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, i) in eskulInstansiList"
                :key="i"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {{ item.name }}
                </th>
                <td class="px-6 py-4">
                  {{ item.total_member != null ? item.total_member : '-' }}
                </td>
                <td class="px-6 py-4">
                  {{ item.gen != null ? item.gen : '-' }}
                </td>
                <td class="px-6 py-4">
                  {{ item.leader_name != null ? item.leader_name : '-' }}
                </td>
                <td class="px-6 py-4">
                  {{
                    item.whatsapp_number != null ? item.whatsapp_number : '-'
                  }}
                </td>
                <td class="px-6 py-4">
                  {{ item.alumni != null ? item.alumni : '-' }}
                </td>
                <td class="px-6 py-4">
                  {{ item.kas != null ? item.kas : '-' }}
                </td>
                <td class="px-6 py-4">
                  {{
                    item.total_achievement_year != null
                      ? item.total_achievement_year
                      : '-'
                  }}
                </td>
                <td class="px-6 py-4">
                  {{
                    item.total_achievement != null
                      ? item.total_achievement
                      : '-'
                  }}
                </td>
                <td class="px-6 py-4 text-right">
                  <button
                    @click="handleEdit(item)"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    eskulInstansiList: {
      Type: Array,
    },
  },
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
  methods: {
    handleEdit(item) {
      console.log('ITEM TABLE : ', item)
      this.$emit('handleEdit', item)
    },
    handleTrash(item) {
      console.log('ITEM TABLE : ', item)
      this.$emit('handleTrash', item)
    },
  },
}
</script>
