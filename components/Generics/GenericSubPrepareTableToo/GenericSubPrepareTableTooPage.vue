<template>
  <div>
    <LoadingPage
      v-if="isLoading"
      class="fixed left-[50%] top-[8px] translate-x-[-50%]"
    />
    <LoadingPage
      v-if="!tableShowHide && helperShowHideRow"
      class="fixed left-[50%] top-[8px] translate-x-[-50%]"
    />
    <GenericInvoiceItemModalPage
      v-if="isOpenModal"
      :tabledata="tablehead"
      @customCloseAction="closeAction"
      @customInputValueObj="modalAcceptAction"
    />
    <div
      class="flex items-start overflow-scroll relative z-0 mb-5 bg-white border-[1px] border-solid border-[rgba(119,136,153,0.3)]"
      :style="`max-height:${height}px`"
      style="min-height: 132px"
    >
      <table class="w-full border-[1px] border-solid border-[#F0F0F0]">
        <thead class="bg-[rgb(229,235,245)]">
          <tr>
            <th
              class="text-[13px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.2)] p-2"
            >
              №
            </th>

            <th
              v-for="(headName, key) in filteredTablehead"
              :key="key"
              class="text-[13px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.2)] p-2 whitespace-nowrap"
              :class="headName.width ? `w-[${headName.width}px]` : ''"
            >
              <template v-if="headName.type !== 'hidden'">
                {{ headName.headerText }}
              </template>
            </th>
            <th
              v-if="!showHideRow"
              class="text-[13px] font-semibold border-[1px] border-solid border-[rgba(119,136,153,0.2)] p-2"
            >
              Delete
            </th>
          </tr>
        </thead>

        <tbody>
          <!-- Save button click qilingandan keyin ko'rinadi -->
          <template v-if="showHideRow">
            <tr>
              <td class="border-[1px] text-[12px] p-2 text-center">
                <GenericInput
                  width="50"
                  height="20"
                  pl="8"
                  pr="8"
                  pt="1"
                  pb="1"
                  textsize="11"
                  type="text"
                  name="index"
                  @customFunction="filterAction"
                />
              </td>
              <td
                v-for="(item, inx) in filteredTablehead"
                :key="inx"
                class="border-[1px] text-[12px] p-2 text-center"
              >
                <GenericInput
                  width="150"
                  height="20"
                  pl="8"
                  pr="8"
                  pt="1"
                  pb="1"
                  textsize="11"
                  type="text"
                  :name="item.name"
                  @customFunction="filterAction"
                />
              </td>
            </tr>
            <template v-if="rowDataShowHide">
              <tr
                v-for="(row, indexOne) in twoResData"
                :key="indexOne"
                class="bg-gradient-to-b from-transparent via-transparent to-[#F4F4F4]"
              >
                <td class="border-[1px] text-[12px] p-2 text-center">
                  {{ indexOne + 1 }}
                </td>
                <td
                  v-for="(item, indexToo) in filteredTablehead"
                  :key="indexToo"
                  class="border-[1px] text-[12px] p-2"
                >
                  <label
                    v-if="row[item.name] && typeof row[item.name] === 'object'"
                    >{{ row[item.name]['text'] }}</label
                  >
                  <label v-else-if="row[item.name] && item.type === 'date'">{{
                    new Date(row[item.name])
                      .toLocaleString('en-GB')
                      .split(',')
                      .join('')
                  }}</label>
                  <label v-else>{{ row[item.name] }}</label>
                </td>
              </tr>
            </template>
            <tr v-if="noDataRow">
              <td
                :colspan="tableheadlength"
                class="text-center border-[1px] border-solid border-[#F0F0F0] text-[12px] p-2"
              >
                <div
                  class="flex flex-col justify-center items-start text-[rgba(0,0,0,0.5)]"
                >
                  <span class="flex flex-col items-center">
                    <img
                      src="../../../assets/icons/no-data.png"
                      alt="no-data-icons"
                    />
                    No data
                  </span>
                </div>
              </td>
            </tr>
            <tr v-else class="bg-[rgb(229,235,245)]">
              <td
                class="border-[1px] text-[13px] p-3 text-[rgba(0,0,0,0.7)] border-solid border-[rgba(119,136,153,0.2)]"
              >
                Total
              </td>
              <td
                v-for="(item, indexToo) in filteredTablehead"
                :key="indexToo"
                class="border-[1px] text-[12px] p-2 text-[rgb(29,119,255)] border-solid border-[rgba(119,136,153,0.2)]"
              >
                {{ item.sumColumn && totalObjMap.get(item.name)?.toFixed(2) }}
              </td>
            </tr>
          </template>

          <!-- Save button click qilinishidan oldin ko'rinadi -->
          <template v-else>
            <tr
              v-for="(item, indexOne) in tableBody"
              :key="indexOne"
              class="bg-gradient-to-b from-transparent via-transparent to-[#F3F3F3]"
            >
              <td class="border-[1px] text-[12px] p-2 text-center">
                {{ indexOne + 1 }}
              </td>
              <td
                v-for="(value, indexToo) in item"
                :key="indexToo"
                class="border-[1px] text-[12px] p-2"
                :class="`w-[${value.dwidth}px]`"
              >
                <generic-look-up
                  v-if="value.type === 'list'"
                  :durl="`${value.durl}`"
                  :defvalue="
                    newEditResData.length &&
                    newEditResData?.[indexOne]?.[value.name]
                      ? newEditResData[indexOne][value.name]?.text
                      : ''
                  "
                  dwidth="250"
                  :order="indexOne"
                  :name="value.name"
                  :result-type="value.resultType"
                  :required="requiredData?.[indexOne]?.[value.name]"
                  @customFunction="getLookUpValue"
                />
                <GenericInput
                  v-else-if="value.type === 'float' || value.type === 'integer'"
                  :value="
                    newEditResData.length &&
                    newEditResData?.[indexOne]?.[value.name]
                      ? newEditResData[indexOne][value.name]
                      : ''
                  "
                  width="150"
                  height="23"
                  pl="10"
                  pr="10"
                  pt="2"
                  pb="2"
                  :order="indexOne"
                  textsize="13"
                  type="number"
                  :name="value.name"
                  :required="requiredData?.[indexOne]?.[value.name]"
                  @customFunction="getInputValue"
                />
                <GenericInput
                  v-else-if="value.type === 'string'"
                  :value="
                    newEditResData.length &&
                    newEditResData?.[indexOne]?.[value.name]
                      ? newEditResData[indexOne][value.name]
                      : ''
                  "
                  width="150"
                  height="23"
                  pl="10"
                  pr="10"
                  pt="2"
                  pb="2"
                  :order="indexOne"
                  textsize="13"
                  type="text"
                  :name="value.name"
                  :required="requiredData?.[indexOne]?.[value.name]"
                  @customFunction="getInputValue"
                />
                <GenericInputDatePage
                  v-else-if="value.type === 'date'"
                  :value="
                    newEditResData.length && newEditResData?.[indexOne]?.date
                      ? new Date(newEditResData[indexOne]?.date)
                          .toISOString()
                          .split('.')[0]
                      : ''
                  "
                  width="190"
                  height="23"
                  pl="10"
                  pr="10"
                  pt="1"
                  pb="1"
                  :order="indexOne"
                  textsize="13"
                  type="datetime-local"
                  valuecolor="rgba(0,0,0,0.7)"
                  :name="value.name"
                  :required="requiredData?.[indexOne]?.[value.name]"
                  @customFunction="getInputValue"
                />
              </td>
              <td class="border-[1px] text-[12px] p-2 text-center">
                <span
                  class="flex justify-center active:scale-[1.2] duration-[0.2s]"
                >
                  <img
                    :src="img.del"
                    alt="delete"
                    class="w-[18px] cursor-pointer"
                    @click="rowDelAction(indexOne, ResData[indexOne]?.id)"
                  />
                </span>
              </td>
            </tr>
          </template>

          <!-- AddAnItem button -->
          <tr v-if="!showHideRow">
            <td
              :colspan="tableheadlength"
              class="text-center border-[1px] border-solid border-[#F0F0F0] text-[12px] py-3"
            >
              <div
                class="flex flex-col justify-center items-start text-[rgba(0,0,0,0.5)]"
              >
                <generic-button
                  name="Add an Item"
                  type="success"
                  icon-name-attribute="circle-plus-outline"
                  @click="addAnItemAction"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import GenericLookUp from '@generics/GenericLookUp.vue'
import GenericInputDatePage from '@components/InputDate/GenericInputDatePage.vue'
import LoadingPage from '@components/Loading/LoadingPage.vue'
import GenericButton from '@generics/GenericButton.vue'
import GenericInvoiceItemModalPage from '@components/GenericInvoiceItemModal/GenericInvoiceItemModalPage.vue'
import GenericInput from '@generics/GenericInput.vue'

export default {
  // COMPONENTS
  components: {
    LoadingPage,
    GenericButton,
    GenericInputDatePage,
    GenericLookUp,
    GenericInvoiceItemModalPage,
    GenericInput,
  },

  // PROPS
  props: {
    tablehead: {
      type: Array,
      default: () => [],
    },
    tableheadlength: {
      type: Number,
      default: 0,
    },
    addmodalorrow: {
      type: Boolean,
      default: true,
    },
    isedit: {
      type: Boolean,
      default: false,
    },
    height: {
      type: Number,
      default: 0,
    },
    defaultValues: {
      type: Array,
      default: () => [],
    },
    responseData: {
      type: Array,
      default: () => [],
    },
    subUiShowHideTwo: {
      type: Boolean,
      default: false,
    },
  },

  // DATA
  data() {
    return {
      isLoading: false,
      isOpenModal: false,
      tableBody: [],
      totalArray: [],
      totalObjMap: new Map(),
      sumColumnArr: [],
      total: 0,
      showHideRow: true,
      helperShowHideRow: false,
      rowDataShowHide: true,
      noDataRow: false,
      ResData: [],
      fakeResData: [],
      newEditResData: [],
      twoResData: [],
      isCanAdd: this.isedit,
      parentID: null,
      tableShowHide: false,
      requiredData: [],
      disabledButtun: false,
    }
  },

  // COMPUTED
  computed: {
    filteredTablehead() {
      return this.tablehead.filter((headName) => headName.type !== 'hidden')
    },
  },

  // WATCH
  watch: {
    isedit(newVal) {
      this.isCanAdd = newVal
    },
    subUiShowHideTwo(value) {
      this.tableShowHide = value
      this.showHideRow = value
    },
    defaultValues(newVal) {
      if (newVal.length && Object.values(newVal?.at(-1)).length > 9) {
        this.tableShowHide = true
        this.showHideRow = true
      }
      this.ResData = newVal
      this.newEditResData = this.ResData
      this.setIndex()
      this.twoResData = this.ResData
      this.totalAction()
      this.twoResData.length
        ? (this.noDataRow = false)
        : (this.noDataRow = true)
    },
    ResData(val) {
      this.requiredLookUpAndInputCheckerAction(val)
    },
  },

  // MOUNTED
  mounted() {},

  // METHODS
  methods: {
    // ID orqali filterlash uchun
    setIndex() {
      this.ResData.forEach((obj, i) => (obj.index = i + 1))
    },
    // ID orqali filterlash uchun

    // Arrayni bo'sh object dan tozalash
    arrayFiltered() {
      // eslint-disable-next-line array-callback-return
      this.ResData = this.ResData.filter((obj) => {
        if (Object.keys(obj).length > 3) return obj
      })
    },
    // Arrayni bo'sh object dan tozalash

    // GenericLookUp va Input'larning required'larini tekshiradi
    requiredLookUpAndInputCheckerAction(data) {
      const arr = this.filteredTablehead.filter(
        (obj) =>
          obj.required &&
          (obj.type === 'list' || obj.type === 'float' || obj.type === 'date')
      )
      arr.forEach((obj) => {
        data.forEach((subObj, index) => {
          if (subObj?.[obj.name] && this.requiredData[index])
            this.requiredData[index][obj.name] = true
          else if (subObj?.[obj.name] && !this.requiredData[index])
            this.requiredData.push({ [obj.name]: true })
          else if (!subObj?.[obj.name] && this.requiredData[index])
            this.requiredData[index][obj.name] = false
          else this.requiredData.push({ [obj.name]: false })
        })
      })
      this.requiredData = this.requiredData.splice(0, this.tableBody.length)
      this.disabledButtun = this.requiredData.find((obj) =>
        Object.values(obj).includes(false)
      )
      if (this.disabledButtun) this.disabledButtun = true
      else this.disabledButtun = false
      this.$emit('requiredAction', this.disabledButtun, 'subBottom')
    },
    // GenericLookUp va Input'larning required'larini tekshiradi

    // Save action dan keyin filter qiluvchi input funksiyasi
    filterAction(name, value) {
      // eslint-disable-next-line array-callback-return
      this.twoResData = this.ResData.filter((obj) => {
        if (obj[name]) {
          this.rowDataShowHide = true
          this.noDataRow = false
          if (typeof obj[name] === 'number') {
            if (String(obj[name]).includes(String(value))) return obj
          } else if (
            typeof obj[name] === 'object' &&
            String(obj[name]?.text).includes(String(value))
          )
            return obj
          else if (String(obj[name]).includes(String(value))) return obj
        } else if (obj[name] && value.length) {
          this.rowDataShowHide = false
          this.noDataRow = true
          return obj
        } else if (!value.length) {
          this.rowDataShowHide = true
          this.noDataRow = false
          return obj
        }
      })
      this.twoResData.length
        ? (this.noDataRow = false)
        : (this.noDataRow = true)
      this.total = 0
      this.totalAction()
    },

    // Cashbox and Banks value'larini o'chirish
    removeCashboxAndBanksValueAction(key, order) {
      this.newEditResData.forEach((obj) => {
        if (key === 'cashbox') {
          delete this.newEditResData[order]?.bankBranchAccount
        } else if (key === 'bankBranchAccount') {
          delete this.newEditResData[order]?.cashbox
        }
      })
    },

    // input's Valuesini olish
    getInputValue(key, value, order) {
      if (
        this.newEditResData[order] &&
        Object.keys(this.newEditResData[order]).length &&
        [key] in this.newEditResData[order]
      )
        this.newEditResData[order][key] = value
      else if (this.newEditResData[order]) {
        const newObj = Object.assign({}, this.newEditResData[order], {
          [key]: value,
        })
        this.$set(this.newEditResData, order, newObj)
      } else this.newEditResData.push({ [key]: value })

      this.ResData = this.newEditResData
      // function
      this.requiredLookUpAndInputCheckerAction(this.ResData)
    },
    // input's Valuesini olish

    // Lookup's Valuesini olish
    lookUpVal(resultType, value) {
      return resultType === 'object' ? { id: Number(value) } : value
    },
    getLookUpValue(key, name, value, order, resultType) {
      if (
        this.newEditResData[order] &&
        key in this.newEditResData[order] &&
        [key] in this.newEditResData[order]
      ) {
        this.newEditResData[order][key] = this.lookUpVal(
          resultType,
          value,
          name
        )
      } else if (this.newEditResData[order]) {
        const newObj = Object.assign({}, this.newEditResData[order], {
          [key]: this.lookUpVal(resultType, value, name),
        })
        this.$set(this.newEditResData, order, newObj)
      } else {
        this.newEditResData.push({
          [key]: this.lookUpVal(resultType, value, name),
        })
      }
      // function
      this.removeCashboxAndBanksValueAction(key, order)
      this.ResData = this.newEditResData
      // function
      this.requiredLookUpAndInputCheckerAction(this.ResData)
    },
    // Lookup's Valuesini olish

    // Add an Item
    addAnItemAction() {
      if (this.addmodalorrow) {
        this.isOpenModal = true
      } else {
        this.tableBody.push(this.filteredTablehead)
      }
    },
    // Add an Item

    // Row delete Request
    requestAction(id) {
      this.$axios
        .post(
          `/invoice/extraPayUnPay`,
          { deleteItemId: id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'x-auth-token': localStorage.getItem('authToken'),
            },
          }
        )
        .then((res) => {})
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // row delete action
    rowDelAction(index, id) {
      this.tableBody = this.tableBody.filter((row, inx) => inx !== index)
      this.newEditResData = this.newEditResData.filter(
        (row, inx) => inx !== index
      )
      // ===============
      id
        ? (this.ResData = this.ResData.filter((row) => row?.id !== id))
        : (this.ResData = this.ResData.filter((row) => row.index !== index + 1))
      id && this.requestAction(id)
      // ===============
      this.requiredData = this.requiredData.filter((obj, inx) => inx !== index)
      this.twoResData = this.newEditResData
      this.ResData = this.newEditResData
      // function
      this.requiredLookUpAndInputCheckerAction(this.newEditResData)
    },

    // Modal Closeobject
    closeAction(isClose) {
      this.isOpenModal = isClose
    },

    modalAcceptAction(objBack) {
      this.tableBody.push(this.filteredTablehead)
      this.newEditResData.push(objBack)
      // function
      this.requiredLookUpAndInputCheckerAction(this.newEditResData)
    },
    // Modal uchun ishlaydi

    // edit qilganda transactionsExtraList data'sini filter qiladi
    payloadDataFilter() {
      this.fakeResData = []
      this.ResData.forEach((obj) => {
        const temporarilyObj = {}
        if ('amount' in obj) temporarilyObj.amount = obj.amount
        if (obj?.cashbox) temporarilyObj.cashbox = obj.cashbox
        if (obj?.bankBranchAccount)
          temporarilyObj.bankBranchAccount = obj.bankBranchAccount
        if (obj?.companyRefId) temporarilyObj.companyRefId = obj.companyRefId
        if (obj?.company_amount)
          temporarilyObj.company_amount = obj.company_amount
        if (obj?.currency1) temporarilyObj.currency1 = obj.currency1
        if (obj?.currencyRate) temporarilyObj.currencyRate = obj.currencyRate
        if (obj?.currency_amount)
          temporarilyObj.currency_amount = obj.currency_amount
        if ('date' in obj)
          temporarilyObj.date = new Date(obj.date).toISOString().split('.')[0]
        if (obj?.debitCredit) temporarilyObj.debitCredit = obj.debitCredit
        if ('id' in obj) temporarilyObj.id = obj.id
        if ('invoice' in obj) temporarilyObj.invoice = { id: obj.invoice }
        if ('nominalConstant' in obj)
          temporarilyObj.nominalConstant = obj.nominalConstant
        if ('paymentTypesId' in obj)
          typeof obj.paymentTypesId === 'object'
            ? (temporarilyObj.paymentTypesId = obj?.paymentTypesId?.id)
            : (temporarilyObj.paymentTypesId = obj?.paymentTypesId)
        if ('transactionParent' in obj)
          temporarilyObj.transactionParent = obj.transactionParent
        if ('user' in obj) temporarilyObj.user = { id: obj.user }
        if ('valueDate' in obj)
          temporarilyObj.valueDate = new Date(obj.valueDate)
            .toISOString()
            .split('.')[0]

        this.fakeResData.push(temporarilyObj)
      })
    },
    // edit qilganda transactionsExtraList data'sini filter qiladi

    // Pay button click qilganda ishlaydi
    payAction(prop) {
      if (this.addmodalorrow) {
        this.ResData = this.newEditResData
        const arr = this.ResData
        arr.filter((obj) => {
          const newObj = (obj.paymentTypesId = obj.paymentTypesId.id)
          return newObj
        })
        this.ResData = arr
      }
      // function
      this.arrayFiltered()
      // function
      this.payloadDataFilter()

      this.$emit('rowValues', this.fakeResData, prop)

      // Total row ko'rinishini xal qiladi
      this.totalAction()
      this.helperShowHideRow = true
    },
    // Pay button click qilganda ishlaydi

    // Discard va Undo Payment button click qilganda ishlaydi
    discardAndUndoPaymentAction(prop) {
      if (prop === 'subD') {
        this.showHideRow = true
        this.noDataRow = true
      } else if (prop === 'subUP') {
        this.showHideRow = true
        this.tableBody = []
        this.twoResData = []
        this.ResData = []
        this.newEditResData = []
        this.noDataRow = true
      }
    },

    // Edit button click qilganda ishlaydi
    editAction() {
      this.showHideRow = false
      this.tableShowHide = false
      this.helperShowHideRow = false

      this.tableBody = []
      for (let i = 0; i < this.ResData.length; i++) {
        this.tableBody.push(this.filteredTablehead)
      }
    },
    // Edit button click qilganda ishlaydi

    // Total hisoblavchi function start
    totalAction() {
      this.filteredTablehead.forEach((headName) => {
        headName.sumColumn && this.sumColumnArr.push(headName.name)
      })
      this.sumColumnArr.forEach((name) => {
        this.twoResData.forEach((obj) => {
          if (name in obj) {
            this.total += parseFloat(obj[name].replace(' ', ''))
            this.totalObjMap.set(name, this.total)
          }
        })
        this.total = 0
      })
    },
    // Total hisoblavchi function end
  },
}
</script>
