<template>
  <div>
    <!-- Existing UI -->
    <div class="flex bg-gray-700 rounded-xl shadow-xl p-4 justify-center">
      <div class="flex items-start flex-col">
        <p class="text-2xl">Total Kas</p>
        <p class="text-2xl md:text-6xl font-bold">{{ formatRp(kas?.total) }}</p>
      </div>
      <div class="flex flex-col md:flex-row items-center justify-evenly">
        <!-- <div
          class="flex gap-2 items-center cursor-pointer hover:text-white text-gray-300"
          @click="showModal('income')"
        >
          <v-icon>mdi-plus</v-icon>
          <div>Income</div>
        </div> -->
        <!-- <div
          class="flex gap-2 items-center cursor-pointer hover:text-white text-gray-300"
          @click="showModal('expense')"
        >
          <v-icon>mdi-plus</v-icon>
          <div>Expense</div>
        </div> -->
      </div>
    </div>

    <!-- View Mode Selection -->
    <div class="flex mt-4 items-center">
      <div
        class="p-2 px-5 rounded-s text-white cursor-pointer hover:bg-gray-800"
        @click="viewMode = 'list'"
        :class="viewMode == 'list' ? 'bg-gray-800' : 'bg-gray-600'"
      >
        List View
      </div>
      <div
        class="p-2 px-5 rounded-e text-white cursor-pointer hover:bg-gray-800"
        @click="viewMode = 'table'"
        :class="viewMode == 'table' ? 'bg-gray-800' : 'bg-gray-600'"
      >
        Table View
      </div>
    </div>

    <!-- List and Table Views -->
    <div
      class="flex md:flex-row max-w-sm md:max-w-lg flex-col gap-3 max-h-lg"
      v-if="viewMode == 'list'"
    >
      <dashboard-o-kas-income :kasLogs="kasLogsIncome" />
      <dashboard-o-kas-outcome :kasLogs="kasLogsExpense" />
    </div>
    <div class="flex gap-3 max-h-lg" v-if="viewMode == 'table'">
      <dashboard-o-kas-table :kasLogs="kasLogs" />
    </div>

    <!-- Modal -->
    <div
      v-if="isModalVisible"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-gray-800 p-6 rounded shadow-xl w-1/3">
        <h2 class="text-xl font-bold mb-4">
          {{ modalType === 'income' ? 'Add Income' : 'Add Expense' }}
        </h2>
        <label for="amount">Amount</label>
        <input
          type="number"
          placeholder="Amount"
          id="amount"
          v-model="modalData.amount"
          class="w-full p-2 mb-4 border bg-gray-900 border-gray-900 rounded"
        />
        <label for="desc">Description</label>
        <input
          type="text"
          id="desc"
          placeholder="Description"
          v-model="modalData.description"
          class="w-full p-2 mb-4 border bg-gray-900 border-gray-900 rounded"
        />
        <div class="flex justify-end">
          <button
            @click="closeModal"
            class="px-4 py-2 bg-gray-500 text-white rounded mr-2"
          >
            Cancel
          </button>
          <button
            @click="submitData"
            class="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboardiLayout', // Specify the layout to use

  data() {
    return {
      viewMode: 'list',
      kas: [],
      kasLogs: [],
      kasLogsIncome: [],
      kasLogsExpense: [],
      isModalVisible: false,
      modalType: '', // 'income' or 'expense'
      modalData: {
        amount: '',
        description: '',
      },
      loading: false,
      profileInfo: null,
    }
  },
  async mounted() {
    // await this.getProfileInfo()
    await this.getKas()
  },
  methods: {
    async getProfileInfo() {
      this.loading = true
      const { data } = await this.$store.dispatch(
        'Dashboard/instansi/getProfileInfo'
      )
      this.profileInfo = data
      this.loading = false
    },
    formatRp(amount = 0) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      }).format(amount)
    },
    // showModal(type) {
    //   this.modalType = type
    //   this.isModalVisible = true
    // },
    // closeModal() {
    //   this.isModalVisible = false
    //   this.modalData = {
    //     amount: '',
    //     description: '',
    //   }
    // },

    // async submitData() {
    //   // Handle data submission logic here
    //   console.log(this.modalType, this.modalData)

    //   const formData = new FormData()
    //   formData.append('eskul_id', this.profileInfo.data.eskul_id)
    //   formData.append('amount', this.modalData.amount)
    //   formData.append('flag', this.modalType)
    //   formData.append('description', this.modalData.description)
    //   const { data } = await this.$store.dispatch(
    //     'Dashboard/organization/kas/storeKas',
    //     formData
    //   )

    //   await this.getKas()
    //   this.closeModal()
    // },

    async getKas() {
      this.loading = true
      let eskulId = ''
      console.log('eskul id : ', eskulId)
      const formData = new FormData()
      formData.append('eskul_id', eskulId)
      formData.append('flag', 'all')
      formData.append('cdn', this.$route.params.eskul)

      const { data } = await this.$store.dispatch(
        'Dashboard/organization/kas/getEskulKas',
        formData
      )
      if (data.data != {}) {
        this.kas = data.data.kas
        this.kasLogs = data.data.kas_logs
        this.kasLogsIncome = data.data.kas_logs?.filter(
          (log) => log.flag === 'income'
        )
        this.kasLogsExpense = data.data.kas_logs?.filter(
          (log) => log.flag === 'expense'
        )
      }

      this.loading = false

      console.log('kas : ', this.kas)
    },
  },
}
</script>
