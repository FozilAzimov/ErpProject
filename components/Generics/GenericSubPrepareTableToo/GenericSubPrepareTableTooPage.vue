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
      class="flex items-start overflow-scroll relative z-0 mb-5 bg-white border-[1px] border-[solid] border-[rgba(119,136,153,0.3)]"
      :style="`max-height:${height}px`"
      style="min-height: 132px"
    >
      <table class="w-full border-[1px] border-[solid] border-[#F0F0F0]">
        <thead class="bg-[rgb(229,235,245)]">
          <tr>
            <th
              class="text-[13px] font-semibold border-[1px] border-[solid] border-[rgba(119,136,153,0.2)] p-2"
            >
              №
            </th>

            <th
              v-for="(headName, key) in filteredTablehead"
              :key="key"
              class="text-[13px] font-semibold border-[1px] border-[solid] border-[rgba(119,136,153,0.2)] p-2 whitespace-nowrap"
              :class="headName.width ? `w-[${headName.width}px]` : ''"
            >
              <template v-if="headName.type !== 'hidden'">
                {{ headName.headerText }}
              </template>
            </th>
            <th
              v-if="!showHideRow"
              class="text-[13px] font-semibold border-[1px] border-[solid] border-[rgba(119,136,153,0.2)] p-2"
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
                class="text-center border-[1px] border-[solid] border-[#F0F0F0] text-[12px] p-2"
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
                class="border-[1px] text-[13px] p-3 text-[rgba(0,0,0,0.7)] border-[1px] border-[solid] border-[rgba(119,136,153,0.2)]"
              >
                Total
              </td>
              <td
                v-for="(item, indexToo) in filteredTablehead"
                :key="indexToo"
                class="border-[1px] text-[12px] p-2 text-[rgb(29,119,255)] border-[1px] border-[solid] border-[rgba(119,136,153,0.2)]"
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
                <LookUp
                  v-if="value.type === 'list'"
                  :durl="`invoiceBase/${value.durl}`"
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
              class="text-center border-[1px] border-[solid] border-[#F0F0F0] text-[12px] py-3"
            >
              <div
                class="flex flex-col justify-center items-start text-[rgba(0,0,0,0.5)]"
              >
                <GenericButton
                  name="Add an Item"
                  pl="10"
                  pt="3"
                  pr="10"
                  pb="3"
                  bg="rgb(119,191,120)"
                  textsize="14"
                  :url="img.plus"
                  :istherepicture="true"
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
// import icons
import plus from '../../../assets/icons/plus.png'
import del from '../../../assets/icons/delete-button.png'

// import components
import LookUp from '../../Lookup/LookUp.vue'
import GenericInputDatePage from '../../InputDate/GenericInputDatePage.vue'
import LoadingPage from '../../Loading/LoadingPage.vue'
import GenericButton from '../../Button/GenericButton.vue'
import GenericInvoiceItemModalPage from '../../GenericInvoiceItemModal/GenericInvoiceItemModalPage.vue'
import GenericInput from '../../Input/GenericInput.vue'

export default {
  // COMPONENTS
  components: {
    LoadingPage,
    GenericButton,
    GenericInputDatePage,
    LookUp,
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
      img: {
        plus,
        del,
      },
      isLoading: false,
      isOpenModal: false,
      tableBody: [],
      inputValuesObj: new Map(),
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
      this.ResData = newVal
      this.newEditResData = this.ResData
      this.setIndex()
      this.twoResData = this.ResData
      this.totalAction()
      this.twoResData.length
        ? (this.noDataRow = false)
        : (this.noDataRow = true)
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

    // Save action dan keyin filter qiluvchi input funksiyasi
    filterAction(name, value) {
      // eslint-disable-next-line array-callback-return
      this.twoResData = this.ResData.filter((obj) => {
        if (obj[name]) {
          this.rowDataShowHide = true
          this.noDataRow = false
          if (typeof obj[name] === 'number') {
            if (String(obj[name]).includes(String(value))) return obj
          } else if (String(obj[name].text).includes(String(value))) return obj
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

      this.ResData = this.newEditResData
    },
    // Lookup's Valuesini olish

    // Add an Item
    addAnItemAction() {
      if (this.addmodalorrow) {
        this.isOpenModal = true
      } else {
        this.tableBody.push(this.filteredTablehead)
        let requestObj = Object.fromEntries(this.inputValuesObj)
        this.ResData.push(requestObj)
        this.inputValuesObj.clear()
        requestObj = {}
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
      this.twoResData = this.newEditResData
      this.ResData = this.newEditResData
      this.inputValuesObj.clear()
    },

    // Modal Closeobject
    closeAction(isClose) {
      this.isOpenModal = isClose
    },

    modalAcceptAction(objBack) {
      this.tableBody.push(this.filteredTablehead)
      this.newEditResData.push(objBack)
    },
    // Modal uchun ishlaydi

    // edit qilganda transactionsExtraList data'sini filter qiladi
    payloadDataFilter() {
      this.ResData.forEach((obj) => {
        const temporarilyObj = {}
        if ('amount' in obj) temporarilyObj.amount = obj.amount
        if ('cashbox' in obj) temporarilyObj.cashbox = obj.cashbox
        if ('companyRefId' in obj)
          temporarilyObj.companyRefId = obj.companyRefId
        if ('company_amount' in obj)
          temporarilyObj.company_amount = obj.company_amount
        if ('currency1' in obj) temporarilyObj.currency1 = obj.currency1
        if ('currencyRate' in obj)
          temporarilyObj.currencyRate = obj.currencyRate
        if ('currency_amount' in obj)
          temporarilyObj.currency_amount = obj.currency_amount
        if ('date' in obj)
          temporarilyObj.date = new Date(obj.date).toISOString().split('.')[0]
        if ('debitCredit' in obj) temporarilyObj.debitCredit = obj.debitCredit
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
      } else {
        let requestObj = Object.fromEntries(this.inputValuesObj)
        this.ResData.push(requestObj)
        this.inputValuesObj.clear()
        requestObj = {}
      }
      // function
      this.arrayFiltered()
      // function
      this.payloadDataFilter()

      // emit ishlatilgan
      this.ResData.forEach((obj) => {
        if (Object.keys(obj).length > 10) {
          this.$emit('rowValues', this.fakeResData, prop)
        } else {
          this.$emit('rowValues', this.ResData, prop)
        }
      })
      // emit ishlatilgan

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
        this.inputValuesObj.clear()
        this.noDataRow = true
      }
    },

    // Edit button click qilganda ishlaydi
    editAction() {
      this.showHideRow = false
      this.tableShowHide = false
      this.helperShowHideRow = false

      if (this.addmodalorrow) {
        for (let i = 0; i < this.newEditResData.length; i++) {
          this.tableBody.push(this.filteredTablehead)
        }
      } else {
        for (let i = 0; i < this.ResData.length; i++) {
          this.tableBody.push(this.filteredTablehead)
        }
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
