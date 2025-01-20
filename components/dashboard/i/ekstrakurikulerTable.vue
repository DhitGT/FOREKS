<template>
  <div>
    <div class="pt-4">
      <div class="tablecontainer my-4">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left rtl:text-right text-gray-200">
            <thead class="text-xs text-gray-100 uppercase bg-gray-700">
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
                class="bg-gray-700 border-b border-gray-800 hover:bg-gray-600"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-100 whitespace-nowrap"
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
      orgsCard: [],
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
