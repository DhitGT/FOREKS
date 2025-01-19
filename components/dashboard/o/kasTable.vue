<template>
  <div class="container mx-auto p-4">
    <table class="min-w-full bg-gray-800 border border-gray-900 rounded-lg">
      <thead class="rounded-lg text-start">
        <tr>
          <th class="py-2 px-4 border-b border-gray-900">Amount</th>
          <th class="py-2 px-4 border-b border-gray-900">Information</th>
          <th class="py-2 px-4 border-b border-gray-900">Date</th>
          <th class="py-2 px-4 border-b border-gray-900">Type</th>
        </tr>
      </thead>
      <tbody class="rounded-lg">
        <tr
          v-for="(item, index) in kasLogs"
          :key="index"
          class="hover:bg-gray-900"
        >
          <td class="py-2 px-4 border-b border-gray-900">{{ item.amount }}</td>
          <td class="py-2 px-4 border-b border-gray-900">
            {{ item.description }}
          </td>
          <td class="py-2 px-4 border-b border-gray-900">
            {{ getFormattedDate(item.created_at) }}
          </td>
          <td
            class="py-2 px-4 border-b border-gray-900"
            :class="item.flag == 'income' ? 'text-green-300' : 'text-red-400'"
          >
            {{ item.flag }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    kasLogs: {
      default: [],
    },
  },
  data() {
    return {
      kas: [
        {
          amount: 50000,
          keterangan: 'uang kas mingguan',
          date: '20-04-2024',
          flag: 'income',
        },
        {
          amount: 50000,
          keterangan: 'minuman',
          date: '21-04-2024',
          flag: 'spend',
        },
        {
          amount: 50000,
          keterangan: 'uang kas mingguan',
          date: '22-04-2024',
          flag: 'income',
        },
      ],
    }
  },
  methods: {
    getFormattedDate(timestamp) {
      const date = new Date(timestamp)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    },
  },
}
</script>
