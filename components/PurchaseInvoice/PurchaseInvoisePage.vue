<template>
  <div class="w-full m-1 pr-2">
    <LoadingPage
      v-if="isLoading"
      class="absolute left-[50%] top-[8px] translate-x-[-50%]"
    />
    <div
      class="dashboardBox border-[1px] border-solid border-[rgba(0,0,0,0.05)] p-[12px] bg-gradient-to-b from-transparent via-transparent to-gray-200 shadow-md flex items-center justify-between"
    >
      <div class="flex items-center gap-[10px]">
        <img
          src="../../assets/icons/user-black.png"
          alt="user"
          class="w-[14px]"
        />
        <h1 class="font-bold text-[#3b89e9] text-[14px] uppercase">
          {{ $t('pages.purchaseinvoice.headerName') }}
        </h1>
      </div>
      <div>
        <ul class="flex items-center gap-4">
          <li
            class="bg-[rgba(32,111,162,0.05)] p-[7px] rounded-[50%] cursor-pointer border-[1px] border-[solid] border-[rgba(0,0,0,0.1] hover:border-[#3b89e9] duration-[0.4s]"
          >
            <img
              class="w-[11px]"
              src="../../assets/icons/gear.png"
              alt="gear"
            />
          </li>
          <li
            class="bg-[rgba(32,111,162,0.05)] p-[7px] rounded-[50%] cursor-pointer border-[1px] border-[solid] border-[rgba(0,0,0,0.1] hover:border-[#3b89e9] duration-[0.4s]"
          >
            <img
              class="w-[11px] rotate-180"
              src="../../assets/icons/arrow.png"
              alt="arrow"
            />
          </li>
          <li
            class="bg-[rgba(32,111,162,0.05)] p-[7px] rounded-[50%] cursor-pointer border-[1px] border-[solid] border-[rgba(0,0,0,0.1] hover:border-[#3b89e9] duration-[0.4s]"
          >
            <img
              class="w-[11px]"
              src="../../assets/icons/remove.png"
              alt="remove"
            />
          </li>
        </ul>
      </div>
    </div>
    <div class="border-[1px] border-solid border-[rgba(0,0,0,0.1)] h-[500px]">
      <div class="inline">
        <GenericButton />
      </div>
      <div class="mt-3 p-2">
        <table class="border-[1px] border-[solid] border-[#F0F0F0]">
          <thead class="bg-[rgba(229,235,245,1)]">
            <tr>
              <th
                v-for="(headName, key) in tableHead"
                :key="key"
                :style="{ width: `${headName.width}px` }"
                class="text-[13px] font-semibold border-[1px] border-[solid] border-[rgba(119,136,153,0.2)] p-3 cursor-pointer"
              >
                {{ headName.name }}
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-if="isThereData">
              <tr
                v-for="(value, index) in tableData"
                :key="index"
                class="bg-gradient-to-b from-transparent via-transparent to-[#F4F4F4]"
              >
                <td
                  v-for="(key, inx) in tableHead"
                  :key="inx"
                  class="border-[1px] text-[12px] p-2"
                >
                  {{
                    key.code === 'date'
                      ? new Date(value[key.code]).toLocaleString('en-GB', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                        })
                      : value[key.code]
                  }}
                </td>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td
                  :colspan="tableHeadLength"
                  class="text-center border-[1px] border-[solid] border-[#F0F0F0] text-[12px] p-3"
                >
                  <div
                    class="flex flex-col items-center justify-center text-[rgba(0,0,0,0.5)]"
                  >
                    <img
                      src="../../assets/icons/no-data.png"
                      alt="no-data-icons"
                    />
                    No data
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import LoadingPage from '../Loading/LoadingPage.vue'
import GenericButton from '../Button/GenericButton.vue'
export default {
  components: {
    LoadingPage,
    GenericButton,
  },
  data() {
    return {
      isLoading: false,
      isThereData: false,
      users: [],
      tableHead: {},
      tableBody: [],
      tableData: [],
      tableHeadLength: null,
    }
  },
  mounted() {
    // Menu request
    this.isLoading = !this.isLoading
    axios
      .get(
        'https://192.168.1.55:8443/api/invoice/purchaseInvoiceList?current_page=1&page_size=2',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then((res) => {
        this.isLoading = !this.isLoading
        this.tableHead = res.data.rightMap
        this.tableBody = res.data.invoiceList
        this.getTableBody()
      })
      .catch((error) => {
        this.isLoading = !this.isLoading
        console.log(error)
      })
  },

  // Methods
  methods: {
    getTableBody() {
      for (const obj of this.tableBody) {
        const data = new Map()
        for (const key in this.tableHead) {
          const value = this.tableHead[key].code
          if (this.tableHead[key].code in obj) {
            if (obj[value]) {
              if (typeof obj[value] === 'object')
                data.set(value, obj[value].name)
              else data.set(value, obj[value])
            } else data.set(value, '-')
          } else data.set(value, false)
        }
        this.tableData.push(Object.fromEntries(data))
      }
      this.tableHeadLength = Object.entries(this.tableHead).length
      this.tableData.length > 0
        ? (this.isThereData = true)
        : (this.isThereData = false)
    },
  },
}
</script>
