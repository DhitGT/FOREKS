<template>
  <div>
    <div class="flex bg-gray-700 rounded-xl shadow-xl p-4 justify-center">
      <div class="flex items-start flex-col">
        <p class="text-2xl">Total Kas</p>
        <p class="text-6xl font-bold">Rp. 5000.000</p>
      </div>
      <div class="flex items-center justify-evenly">
        <div>
          <div>Deposit</div>
        </div>
        <div>
          <div>Withdraw</div>
        </div>
      </div>
    </div>
    <div class="flex bg-red-600">
      <dashboard-o-kas-income />
      <dashboard-o-kas-outcome />
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboardLayout', // Specify the layout to use
  data() {
    return {}
  },
  methods: {},
}
</script>
