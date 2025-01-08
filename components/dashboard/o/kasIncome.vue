<template>
  <div class="bg-gray-900 my-4 rounded-xl p-5">
    <div>
      <p class="text-xl font-bold">Kas Income</p>
    </div>
    <div class="flex gap-4 flex-col">
      <div v-for="(item, i) in kas" :key="i">
        <div
          class="flex justify-between items-center p-2 bg-gray-600 cursor-pointer"
          @click="toggleKeterangan(i)"
          :class="selectedItem === i ? 'rounde-t' : 'rounded'"
        >
          <p>{{ item.amount }}</p>
          <p>{{ item.date }}</p>
        </div>
        <div v-if="selectedItem === i" class="p-2 bg-gray-700 rounded-b">
          <p>{{ item.keterangan }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      kas: [
        { amount: 50000, keterangan: 'uang kas mingguan', date: '20-04-2024' },
        { amount: 10000, keterangan: 'uang kas mingguan', date: '26-03-2024' },
        { amount: 30000, keterangan: 'uang kas mingguan', date: '10-02-2024' },
        { amount: 20000, keterangan: 'uang kas mingguan', date: '24-01-2024' },
      ],
      selectedItem: null,
    }
  },
  methods: {
    toggleKeterangan(index) {
      this.selectedItem = this.selectedItem === index ? null : index
    },
  },
}
</script>
