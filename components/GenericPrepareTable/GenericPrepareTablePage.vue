<template>
  <div>
    <LoadingPage
      v-if="isLoading"
      class="absolute left-[50%] top-[8px] translate-x-[-50%]"
    />
    <GenericInvoiceItemModalPage
      v-if="isOpenModal"
      :tabledata="tablehead"
      :which-table-name="whichTableName"
      @customCloseAction="closeAction"
      @customInputValueObj="modalAcceptAction"
    />
    <div
      class="flex items-start overflow-scroll relative z-0 mb-5 bg-white border-[1px] border-[solid] border-[rgba(119,136,153,0.3)]"
      :style="`max-height:${height}px`"
      style="min-height: 165px"
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
          <!-- Start Open PopUp 'false' Table body -->
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
                    new Date(row[item.name]).toISOString().split('.')[0]
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
                      src="../../assets/icons/no-data.png"
                      alt="no-data-icons"
                    />
                    No data
                  </span>
                </div>
              </td>
            </tr>
            <template v-else>
              <tr class="bg-[rgb(229,235,245)]">
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
                  {{ item.sumColumn && totalObjMap.get(item.name) }}
                </td>
              </tr>
            </template>
          </template>

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
                  v-if="value.type === 'list' && value.required"
                  :defvalue="
                    newEditObjData?.length &&
                    newEditObjData[indexOne][value.name] &&
                    typeof newEditObjData[indexOne][value.name] === 'object'
                      ? newEditObjData[indexOne][value.name].text
                      : newEditObjData.length &&
                        newEditObjData[indexOne][value.name] &&
                        typeof newEditObjData[indexOne][value.name] !== 'object'
                      ? newEditObjData[indexOne][value.name]
                      : ''
                  "
                  :durl="`invoiceBase/${value.durl}`"
                  dwidth="250"
                  :order="indexOne"
                  :name="value.name"
                  :result-type="value.resultType"
                  @customFunction="getLookUpValue"
                />
                <LookUp
                  v-else-if="value.type === 'list' && !value.required"
                  :defvalue="
                    newEditObjData.length &&
                    newEditObjData[indexOne][value.name] &&
                    typeof newEditObjData[indexOne][value.name] === 'object'
                      ? newEditObjData[indexOne][value.name].text
                      : newEditObjData.length &&
                        newEditObjData[indexOne][value.name] &&
                        typeof newEditObjData[indexOne][value.name] !== 'object'
                      ? newEditObjData[indexOne][value.name]
                      : ''
                  "
                  :durl="`invoiceBase/${value.durl}`"
                  dwidth="250"
                  :order="indexOne"
                  :name="value.name"
                  :result-type="value.resultType"
                  @customFunction="getLookUpValue"
                />
                <GenericInput
                  v-else-if="value.type === 'float' || value.type === 'integer'"
                  :value="
                    newEditObjData.length &&
                    newEditObjData[indexOne][value.name] &&
                    typeof newEditObjData[indexOne][value.name] === 'object'
                      ? newEditObjData[indexOne][value.name].text
                      : newEditObjData.length &&
                        newEditObjData[indexOne][value.name] &&
                        typeof newEditObjData[indexOne][value.name] !== 'object'
                      ? newEditObjData[indexOne][value.name]
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
                    newEditObjData.length &&
                    newEditObjData[indexOne][value.name] &&
                    typeof newEditObjData[indexOne][value.name] === 'object'
                      ? newEditObjData[indexOne][value.name].text
                      : newEditObjData.length &&
                        newEditObjData[indexOne][value.name] &&
                        typeof newEditObjData[indexOne][value.name] !== 'object'
                      ? newEditObjData[indexOne][value.name]
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
                  width="170"
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
                <GenericInput
                  v-else-if="value.type === 'checkbox'"
                  type="checkbox"
                  :order="indexOne"
                  :name="value.name"
                  @customFunction="getInputValue"
                />
                <GenericButton
                  v-else-if="value.type === 'button'"
                  :name="value.headerText"
                  pl="10"
                  pt="3"
                  pr="10"
                  pb="3"
                  :order="indexOne"
                  bg="rgb(156,104,183)"
                  textsize="12"
                />
                <span
                  v-else-if="
                    value.type === 'label' &&
                    newEditObjData.length &&
                    newEditObjData[indexOne][value.name] &&
                    typeof newEditObjData[indexOne][value.name] === 'object'
                  "
                  >{{ newEditObjData[indexOne][value.name].text }}</span
                >
                <span
                  v-else-if="
                    value.type === 'label' &&
                    newEditObjData.length &&
                    newEditObjData[indexOne][value.name] &&
                    typeof newEditObjData[indexOne][value.name] !== 'object'
                  "
                  >{{ newEditObjData[indexOne][value.name] }}</span
                >
              </td>
              <td class="border-[1px] text-[12px] p-2 text-center">
                <span
                  class="flex justify-center active:scale-[1.2] duration-[0.2s]"
                >
                  <img
                    :src="img.del"
                    alt="delete"
                    class="w-[18px] cursor-pointer"
                    @click="
                      rowDelAction(indexOne, newEditObjData[indexOne]?.id)
                    "
                  />
                </span>
              </td>
            </tr>
          </template>
          <!-- End Open PopUp 'false' Table body -->

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
import plus from '../../assets/icons/plus.png'
import del from '../../assets/icons/delete-button.png'

// import components
import GenericButton from '../Button/GenericButton.vue'
import GenericInvoiceItemModalPage from '../GenericInvoiceItemModal/GenericInvoiceItemModalPage.vue'
import GenericInput from '../Input/GenericInput.vue'
import LookUp from '../Lookup/LookUp.vue'
import GenericInputDatePage from '../InputDate/GenericInputDatePage.vue'
import LoadingPage from '../Loading/LoadingPage.vue'

export default {
  // COMPONENTS
  components: {
    GenericButton,
    GenericInvoiceItemModalPage,
    LookUp,
    GenericInput,
    GenericInputDatePage,
    LoadingPage,
  },

  // PROPS
  props: {
    tablehead: {
      type: Array,
      default: () => [],
    },
    responseData: {
      type: Array,
      default: () => [],
    },
    uiShowHide: {
      type: Boolean,
      default: false,
    },
    tableheadlength: {
      type: Number,
      default: 0,
    },
    height: {
      type: Number,
      default: 0,
    },
    addmodalorrow: {
      type: Boolean,
      default: true,
    },
    defaultValues: {
      type: Array,
      default: () => [],
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
      showHideRow: false,
      rowDataShowHide: true,
      noDataRow: false,
      newEditObjData: [],
      whichTableName: '',
      ResData: [],
      twoResData: [],
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
    defaultValues(newVal) {
      this.ResData = newVal
    },
    responseData(newResData) {
      this.ResData = newResData
      this.twoResData = this.ResData
      this.totalAction()
      // ID orqali filterlash uchun
      this.ResData.forEach((obj, i) => (obj.index = i + 1))
    },
  },

  // MOUNTED
  mounted() {},

  // METHODS
  methods: {
    // Arrayni bo'sh object dan tozalash
    arrayFiltered() {
      // eslint-disable-next-line array-callback-return
      this.ResData = this.ResData.filter((obj) => {
        if (Object.keys(obj).length > 8) return obj
      })
    },
    // Arrayni bo'sh object dan tozalash

    // static filter
    ResDataFiltered() {
      if (this.ResData.length) {
        this.ResData = this.ResData.filter((obj) => {
          if (
            'createdDate' in obj ||
            'invoiceDate' in obj ||
            'updatedDate' in obj
          ) {
            obj.createdDate = new Date(obj.createdDate)
              .toISOString()
              .split('.')[0]
            obj.invoiceDate = new Date(obj.invoiceDate)
              .toISOString()
              .split('.')[0]
            obj.updatedDate = new Date(obj.updatedDate)
              .toISOString()
              .split('.')[0]
          }
          return obj
        })
        this.ResData.forEach((obj) => {
          for (const key in obj) {
            if (obj[key] === '' || obj[key] === ' ') {
              delete obj[key]
            }
          }
        })
        this.ResData.forEach((obj) => {
          for (const key in obj) {
            if (key === 'warehouse' || key === 'invoice') {
              obj[key] = { id: obj[key] }
            }
          }
        })
      }
    },
    // static filter

    // Save action dan keyin filter qiluvchi input funksiyasi
    filterAction(name, value) {
      // eslint-disable-next-line array-callback-return
      this.twoResData = this.ResData.filter((obj) => {
        if (obj[name]) {
          this.rowDataShowHide = true
          this.noDataRow = false
          if (String(obj[name]).includes(String(value))) {
            return obj
          }
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
      this.setDefaultValues(order)
      if (this.ResData[order] && !this.newEditObjData.length) {
        this.ResData[order][key] = value
      } else if (this.ResData[order] && this.newEditObjData.length) {
        this.ResData[order][key] = value
      } else {
        this.inputValuesObj.set(key, value)
        this.ResData.push(Object.fromEntries(this.inputValuesObj))
      }
    },
    // input's Valuesini olish

    // Lookup's Valuesini olish
    lookUpVal(resultType, value, name) {
      return resultType === 'object' ? { id: Number(value), text: name } : value
    },
    getLookUpValue(key, name, value, order, resultType) {
      this.setDefaultValues(order)
      if (this.ResData[order] && !this.newEditObjData.length) {
        this.ResData[order][key] = this.lookUpVal(resultType, value, name)
      } else if (this.ResData[order] && this.newEditObjData.length) {
        this.ResData[order][key] = this.lookUpVal(resultType, value, name)
      } else {
        this.inputValuesObj.set(key, this.lookUpVal(resultType, value, name))
        this.ResData.push(Object.fromEntries(this.inputValuesObj))
      }
    },
    // Lookup's Valuesini olish

    // default set values
    setDefaultValues(order) {
      this.inputValuesObj.set('erepairStatus', 'false')
      this.inputValuesObj.set('marriage', 'false')
      this.inputValuesObj.set('mark', 'false')
      this.inputValuesObj.set('waste', 'false')
      this.inputValuesObj.set('qtyOfOne', '0')
      this.inputValuesObj.set('price4', '0')
      // this.inputValuesObj.set('packNumber', order + 1)
      return this.inputValuesObj
    },
    // default set values

    // Add an Item
    addAnItemAction() {
      if (this.addmodalorrow) {
        this.isOpenModal = true
        this.whichTableName = 'topTable'
      } else {
        this.tableBody.push(this.filteredTablehead)
        this.setDefaultValues()
        const requestObj = Object.fromEntries(this.inputValuesObj)
        this.ResData.push(requestObj)
        this.inputValuesObj.clear()
      }
      this.showHideRow = false
      // ID orqali filterlash uchun
      this.ResData.forEach((obj, i) => (obj.index = i + 1))
    },
    // Add an Item

    // Row delete Request
    requestAction(id) {
      this.$axios
        .post(
          `/invoice/prepareCreateEditPurchaseInvoiceEx`,
          { deleteItemId: id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'x-auth-token': localStorage.getItem('authToken'),
            },
          }
        )
        .then()
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // row delete action
    rowDelAction(index, id) {
      this.tableBody = this.tableBody.filter((row, inx) => inx !== index)
      id
        ? (this.ResData = this.ResData.filter((row) => row.id !== id))
        : (this.ResData = this.ResData.filter((row) => row.index !== index))

      this.newEditObjData = this.ResData
      this.twoResData = this.ResData
      this.inputValuesObj.clear()
      id && this.requestAction(id)
    },

    // Modal Closeobject
    closeAction(isClose) {
      this.isOpenModal = isClose
    },

    // Modal uchun ishlaydi
    modalAcceptAction(objBack) {
      this.showHideRow = false
      this.tableBody.push(this.filteredTablehead)
      this.ResData.push(objBack)
      this.newEditObjData = this.ResData
    },
    // Modal uchun ishlaydi

    // Save button click qilganda ishlaydi
    getSaveRowAction() {
      if (this.addmodalorrow) {
        this.showHideRow = true
      } else {
        this.showHideRow = true
        const requestObj = Object.fromEntries(this.inputValuesObj)
        this.ResData.push(requestObj)
        this.inputValuesObj.clear()
      }
      // ==================================
      this.arrayFiltered()
      this.ResDataFiltered()
      this.$emit('rowValues', this.ResData, this.showHideRow)
      this.twoResData = this.ResData
      // Total row ko'rinishini xal qiladi
      this.totalAction()
      this.twoResData.length
        ? (this.noDataRow = false)
        : (this.noDataRow = true)
      // ==================================
    },

    //  Edit button click qilganda ishlaydi
    getEditRowAction() {
      this.showHideRow = false
      this.newEditObjData = this.ResData
    },

    // Total hisoblavchi function start
    totalAction() {
      this.filteredTablehead.forEach((headName) => {
        headName.sumColumn && this.sumColumnArr.push(headName.name)
      })
      this.sumColumnArr.forEach((name) => {
        this.twoResData.forEach((obj) => {
          if (name in obj) {
            this.total += Number(obj[name])
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
