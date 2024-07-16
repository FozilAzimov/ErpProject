<template>
  <div class="w-full p-[0px_12px_0px_10px]">
    <LoadingPage
      v-if="isLoading"
      class="absolute left-[50%] top-[8px] translate-x-[-50%]"
    />
    <template v-if="isCloseTable">
      <div
        class="border-[1px] border-solid border-[rgba(0,0,0,0.05)] p-[12px] bg-gradient-to-b from-transparent via-transparent to-gray-200 shadow-md flex items-center justify-between mt-2"
      >
        <div class="flex items-center gap-[10px]">
          <h1 class="font-bold text-[rgb(49,126,172)] text-[14px] uppercase">
            Transaction Detail Report
          </h1>
        </div>
        <div>
          <ul class="flex items-center gap-4">
            <li
              class="p-[7px] rounded-[50%] cursor-pointer border-[1px] border-[solid] border-[rgba(0,0,0,0.1] hover:border-[#3b89e9] focus:border-[#3b89e9] duration-[0.4s]"
              :style="{
                background: 'radial-gradient(#fff, rgba(32,111,162,0.2))',
              }"
              @click="isOpen"
            >
              <img
                class="w-[11px]"
                :class="
                  isOpenTable
                    ? 'rotate-[-180deg] duration-[1s]'
                    : 'rotate-[0deg] duration-[1s]'
                "
                src="@assets/icons/arrow.png"
                alt="arrow"
              />
            </li>
            <li
              class="p-[7px] rounded-[50%] cursor-pointer border-[1px] border-[solid] border-[rgba(0,0,0,0.1] hover:border-[#3b89e9] focus:border-[#3b89e9] duration-[0.4s]"
              :style="{
                background: 'radial-gradient(#fff, rgba(32,111,162,0.2))',
              }"
              @click="isClose"
            >
              <img
                class="w-[11px]"
                src="@assets/icons/remove.png"
                alt="remove"
              />
            </li>
          </ul>
        </div>
      </div>
      <div
        class="border-[1px] border-solid border-[rgba(0,0,0,0.1)] flex flex-col gap-8 p-4 flex-wrap"
        :class="
          isOpenTable
            ? 'duration-[1s] overflow-hidden'
            : 'duration-[1s]  overflow-hidden'
        "
      >
        <!-- =============================================== -->
        <div class="flex gap-8">
          <ul class="flex flex-col gap-4 justify-start w-[450px]">
            <li class="flex justify-between">
              <label>Start Date</label>
              <GenericInput
                :value="new Date().toLocaleString('en-GB').split(',').join('')"
                width="150"
                widthtype="px"
                height="23"
                pl="10"
                pr="10"
                pt="2"
                pb="2"
                textsize="13"
                type="text"
              />
            </li>
            <li class="flex justify-between">
              <label>End Date</label>
              <GenericInput
                :value="new Date().toLocaleString('en-GB').split(',').join('')"
                width="150"
                widthtype="px"
                height="23"
                pl="10"
                pr="10"
                pt="2"
                pb="2"
                textsize="13"
                type="text"
              />
            </li>
            <li class="flex justify-between">
              <label>Company Group </label>
              <LookUp
                durl="invoiceBase/findAllPaymentType"
                dwidth="150"
                widthtype="px"
                dlist="100"
                name="paymentType"
              />
            </li>
            <li class="flex justify-between">
              <label>Company Branch </label>
              <LookUp
                durl="invoiceBase/findAllPaymentType"
                dwidth="150"
                widthtype="px"
                dlist="100"
                name="paymentType"
              />
            </li>
            <li class="flex justify-between h-[23.99px]">
              <label>Transactions </label>
              <el-select
                v-model="select"
                clearable
                placeholder=" "
                size="small"
                class="w-[150px]"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
                <!-- <el-option>Please Select</el-option>
                <el-option>Cashbox</el-option>
                <el-option>Banks</el-option>
                <el-option>Person</el-option>
                <el-option>Companies</el-option>
                <el-option>Branch</el-option> -->
              </el-select>
            </li>

            <li class="flex justify-between">
              <label>clusterSeasonForPaymentType </label>
              <LookUp
                durl="invoiceBase/findAllPaymentType"
                dwidth="150"
                widthtype="px"
                dlist="100"
                name="paymentType"
              />
            </li>

            <li class="flex justify-between">
              <label>Payment Type </label>
              <LookUp
                durl="invoiceBase/findAllPaymentType"
                dwidth="150"
                widthtype="px"
                dlist="100"
                name="paymentType"
              />
            </li>

            <li class="flex justify-between">
              <label>Currency Filter </label>
              <LookUp
                durl="invoiceBase/findAllPaymentType"
                dwidth="150"
                widthtype="px"
                dlist="100"
                name="paymentType"
              />
            </li>
            <li class="flex justify-between">
              <label>Company </label>
              <el-radio-group
                v-model="radio"
                class="flex justify-between w-[65%]"
              >
                <el-radio label="1" size="large">All</el-radio>
                <el-radio label="2" size="large">Active</el-radio>
                <el-radio label="3" size="large">In Active</el-radio>
              </el-radio-group>
            </li>
            <li class="flex justify-between">
              <label>Companies </label>
              <LookUp
                durl="invoiceBase/findAllPaymentType"
                dwidth="150"
                widthtype="px"
                dlist="100"
                name="paymentType"
              />
            </li>
            <li class="flex justify-between">
              <label>Company Code </label>
              <GenericInput
                width="150"
                widthtype="px"
                height="23"
                pl="10"
                pr="10"
                pt="2"
                pb="2"
                textsize="13"
                type="text"
              />
            </li>
          </ul>

          <div class="w-[80%]">
            <table class="w-full border-[1px] border-collapse border-black">
              <tr>
                <td
                  class="border-[1px] border-collapse border-black text-center"
                ></td>
                <td
                  class="border-[1px] border-collapse border-black text-center"
                >
                  Start Report: Debit
                </td>
                <td
                  class="border-[1px] border-collapse border-black text-center"
                >
                  Start Report: Credit
                </td>
                <td
                  class="border-[1px] border-collapse border-black text-center"
                >
                  End Report: Debit
                </td>
                <td
                  class="border-[1px] border-collapse border-black text-center"
                >
                  End Report: Credit
                </td>
                <td
                  class="border-[1px] border-collapse border-black text-center"
                >
                  Start Debit
                </td>
                <td
                  class="border-[1px] border-collapse border-black text-center"
                >
                  Start Credit
                </td>
                <td
                  class="border-[1px] border-collapse border-black text-center"
                >
                  End Debit
                </td>
                <td
                  class="border-[1px] border-collapse border-black text-center"
                >
                  End Credit
                </td>
              </tr>
              <tr>
                <td
                  class="border-[1px] border-collapse border-black text-center"
                >
                  Total:
                </td>
                <td
                  v-for="(item, index) in examTable"
                  :key="index"
                  class="border-[1px] border-collapse border-black text-center"
                >
                  {{ item.value }}
                </td>
              </tr>
              <tr>
                <td
                  class="border-[1px] border-collapse border-black text-center"
                >
                  Saldo:
                </td>
                <td
                  v-for="(item, index) in examTable"
                  :key="index"
                  class="border-[1px] border-collapse border-black text-center"
                >
                  {{ item.value }}
                </td>
              </tr>
              <tr>
                <td
                  class="border-[1px] border-collapse border-black text-center"
                ></td>
                <td
                  class="border-[1px] border-collapse border-black text-center"
                >
                  Start Report: Debit
                </td>
                <td
                  class="border-[1px] border-collapse border-black text-center"
                >
                  Start Report: Credit
                </td>
                <td
                  class="border-[1px] border-collapse border-black text-center"
                >
                  End Report: Debit
                </td>
                <td
                  class="border-[1px] border-collapse border-black text-center"
                >
                  End Report: Credit
                </td>
                <td
                  class="border-[1px] border-collapse border-black text-center"
                >
                  Start Debit
                </td>
                <td
                  class="border-[1px] border-collapse border-black text-center"
                >
                  Start Credit
                </td>
                <td
                  class="border-[1px] border-collapse border-black text-center"
                >
                  End Debit
                </td>
                <td
                  class="border-[1px] border-collapse border-black text-center"
                >
                  End Credit
                </td>
              </tr>
              <tr>
                <td
                  class="border-[1px] border-collapse border-black text-center"
                >
                  Total:
                </td>
                <td
                  v-for="(item, index) in examTable"
                  :key="index"
                  class="border-[1px] border-collapse border-black text-center"
                >
                  {{ item.value }}
                </td>
              </tr>
              <tr>
                <td
                  class="border-[1px] border-collapse border-black text-center"
                >
                  Saldo:
                </td>
                <td
                  v-for="(item, index) in examTable"
                  :key="index"
                  class="border-[1px] border-collapse border-black text-center"
                >
                  {{ item.value }}
                </td>
              </tr>
            </table>
          </div>
        </div>
        <!-- =============================================== -->
        <div class="flex gap-2">
          <GenericButton
            name="Accept"
            pl="15"
            pt="3"
            pr="15"
            pb="3"
            bggradient="linear-gradient(90deg, rgba(75,157,162,1) 0%, rgba(0,155,255,1) 0%, rgba(0,155,255,1) 99%)"
            textsize="15"
          />
          <GenericButton
            name="Print Preview"
            pl="15"
            pt="3"
            pr="15"
            pb="3"
            bggradient="linear-gradient(90deg, rgba(75,157,162,1) 0%, rgba(22,198,5,1) 0%, rgba(69,161,2,1) 99%)"
            textsize="15"
          />
        </div>

        <div class="w-full overflow-scroll">
          <GenericTablePage
            :tablehead="tableHead"
            :tablebody="tableBody"
            :tableheadlength="tableHeadLength"
            :istherebody="isThereBody"
            height="600"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import LookUp from '@generics/LookUp.vue'
import LoadingPage from '@components/Loading/LoadingPage.vue'
import GenericButton from '@components/Button/GenericButton.vue'
// import GenericTablePage from '../GenericTable/GenericTablePage.vue'

export default {
  components: {
    LoadingPage,
    GenericButton,
    LookUp,
    //  GenericTablePage
  },
  data() {
    return {
      examTable: [
        { value: 1 },
        { value: 2 },
        { value: 3 },
        { value: 4 },
        { value: 5 },
        { value: 6 },
        { value: 7 },
        { value: 8 },
      ],
      isLoading: false,
      pageSize_value: 10,
      keywordValue: '',
      users: [],
      tableData: [],
      tableHead: {},
      tableBody: [],
      tableHeadLength: null,
      isThereBody: false,
      tableId: [],
      selectData: {},
      formData: new Map(),
      checkModal: false,
      actionUrl: '',
      leftMap: {},
      isOpenTable: true,
      isCloseTable: true,
      radio1: '1',
      radio: '1',
      radioSaldo: '1',
      select: '',
      showHidePerson: false,
    }
  },
  mounted() {
    // Table function
    this.getTableRequest()
  },

  // Methods
  methods: {
    handleValue(checkModal) {
      this.checkModal = checkModal
    },
    getTableRequest() {
      this.isLoading = !this.isLoading
      this.$axios
        .post(`invoice/purchaseInvoiceList`, {
          current_page: 1,
          page_size: this.pageSize_value,
          searchForm: {
            keyword: this.keywordValue,
            from_date: new Date(Object.fromEntries(this.formData).from)
              .toLocaleString('en-GB')
              .split(',')
              .join(''),
            to_date: new Date(Object.fromEntries(this.formData).to)
              .toLocaleString('en-GB')
              .split(',')
              .join(''),
          },
          billStatus: Object.fromEntries(this.formData).bill,
          payStatus: Object.fromEntries(this.formData).pay,
          invoiceOnWayStatus: Object.fromEntries(this.formData).invoice,
          departmentId: Object.fromEntries(this.formData).departments,
          warehouseId: Object.fromEntries(this.formData).warehouse,
        })
        .then((res) => {
          this.tableBody = []
          this.isLoading = !this.isLoading
          this.tableHead = res.data.rightMap
          this.leftMap = res.data.leftMap
          this.actionUrl = res.data.actionUrl
          this.tableData = res.data.invoiceList
          this.selectData = res.data.invoiceSearchDTO
          this.getTableBody()
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // Generic Table function Start
    getTableBody() {
      const arr = new Set()
      for (const obj of this.tableData) {
        arr.add(obj.id)
        const data = new Map()
        for (const key in this.tableHead) {
          const value = this.tableHead[key].code
          if (this.tableHead[key].code in obj) {
            if (obj[value]) {
              if (typeof obj[value] === 'object')
                data.set(value, obj[value].value)
              else data.set(value, obj[value])
            } else data.set(value, obj[value])
          } else data.set(value, false)
        }
        this.tableBody.push(Object.fromEntries(data))
      }
      this.tableHeadLength = Object.entries(this.tableHead).length
      this.tableBody.length > 0
        ? (this.isThereBody = true)
        : (this.isThereBody = false)
      this.tableId = Array.from(arr)
    },
    // Generic Table function End

    // Table Action Open button
    getTableRowOpen(thisId) {
      this.isLoading = !this.isLoading
      this.$axios
        .post(`invoice/preparePurchaseInvoice`, {
          current_page: 1,
          page_size: this.pageSize_value,
          searchForm: { keyword: this.keywordValue || '', id: thisId },
        })
        .then((res) => {
          this.isLoading = !this.isLoading
          this.$router.push('/preparePurchaseInvoiceNew.htm')
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // Generic_Select value
    getSelectValue(value, id) {
      this.formData.set(id, value)
    },

    // Generic_Input value
    getInputValue(inputVal) {
      this.keywordValue = inputVal
    },

    // Table page ni ochish va yopish uchun
    isOpen() {
      this.isOpenTable = !this.isOpenTable
    },
    isClose() {
      this.isCloseTable = !this.isCloseTable
    },
  },
}
</script>

<style scoped>
.el-radio {
  margin: 0 !important;
  margin-right: 0 !important;
}

.el-radio-button__inner,
.el-radio-group {
  display: flex !important;
}
</style>
