<template>
  <div>
    <GenericInvoiceItemModalPage
      v-if="isOpenModal"
      :tabledata="tablehead"
      @customCloseAction="closeAction"
      @customInputValueObj="modalAcceptAction"
    />
    <div
      class="flex items-start overflow-scroll relative z-0"
      :style="`max-height:${height}px`"
      style="min-height: 200px"
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
              class="text-[13px] font-semibold border-[1px] border-[solid] border-[rgba(119,136,153,0.2)] p-2"
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
          <!-- Start Open PopUp 'true' Table body -->
          <template v-if="addmodalorrow">
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
                  v-for="(row, indexOne) in tooLastRowSetArray"
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
                    <label>{{ row && row[item.name] }}</label>
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
                    v-if="value.type === 'list'"
                    :defvalue="
                      newEditObjData.length
                        ? newEditObjData[indexOne][value.name]
                        : rowSetArray.length
                        ? rowSetArray[indexOne][value.name]
                        : ''
                    "
                    :durl="`invoiceBase/${value.durl}`"
                    dwidth="250"
                    :order="indexOne"
                    :name="value.name"
                    @customFunction="getLookUpValue"
                  />
                  <GenericInput
                    v-else-if="
                      value.type === 'float' || value.type === 'integer'
                    "
                    :value="
                      newEditObjData.length
                        ? newEditObjData[indexOne][value.name]
                        : rowSetArray.length
                        ? rowSetArray[indexOne][value.name]
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
                      newEditObjData.length
                        ? newEditObjData[indexOne][value.name]
                        : rowSetArray.length
                        ? rowSetArray[indexOne][value.name]
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
                </td>
                <td class="border-[1px] text-[12px] p-2 text-center">
                  <span
                    class="flex justify-center active:scale-[1.2] duration-[0.2s]"
                  >
                    <img
                      :src="img.del"
                      alt="delete"
                      class="w-[18px] cursor-pointer"
                      @click="rowDelAction(indexOne)"
                    />
                  </span>
                </td>
              </tr>
            </template>
          </template>
          <!-- End Open PopUp 'true' Table body -->

          <!-- Start Open PopUp 'false' Table body -->
          <template v-else>
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
                  v-for="(row, indexOne) in tooLastRowSetArray"
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
                    <label>{{ row && row[item.name] }}</label>
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
                    v-if="value.type === 'list'"
                    :defvalue="
                      newEditObjData.length
                        ? newEditObjData[indexOne][value.name]
                        : ''
                    "
                    :durl="`invoiceBase/${value.durl}`"
                    dwidth="250"
                    :order="indexOne"
                    :name="value.name"
                    @customFunction="getLookUpValue"
                  />
                  <GenericInput
                    v-else-if="
                      value.type === 'float' || value.type === 'integer'
                    "
                    :value="
                      newEditObjData.length
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
                      newEditObjData.length
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
                </td>
                <td class="border-[1px] text-[12px] p-2 text-center">
                  <span
                    class="flex justify-center active:scale-[1.2] duration-[0.2s]"
                  >
                    <img
                      :src="img.del"
                      alt="delete"
                      class="w-[18px] cursor-pointer"
                      @click="rowDelAction(indexOne)"
                    />
                  </span>
                </td>
              </tr>
            </template>
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

export default {
  // COMPONENTS
  components: {
    GenericButton,
    GenericInvoiceItemModalPage,
    LookUp,
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
    height: {
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
      isOpenModal: false,
      tableBody: [],
      rowSetArray: [],
      tooLastRowSetArray: [],
      allInputValues: {},
      inputValuesObj: new Map(),
      inputValuesMap: new Map(),
      totalArray: [],
      totalObjMap: new Map(),
      sumColumnArr: [],
      total: 0,
      showHideRow: false,
      rowDataShowHide: true,
      noDataRow: false,
      arrRow: [],
      isCanAdd: this.isedit,
      newEditObjData: [],
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
      this.rowSetArray = newVal
    },
    isedit(newVal) {
      this.isCanAdd = newVal
    },
  },

  // MOUNTED
  mounted() {},

  // METHODS
  methods: {
    // Save action dan keyin filter qiluvchi input funksiyasi
    filterAction(name, value) {
      // eslint-disable-next-line array-callback-return
      this.tooLastRowSetArray = this.rowSetArray.filter((obj) => {
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
      // Arrayni bo'sh object dan tozalash
      // eslint-disable-next-line array-callback-return
      this.tooLastRowSetArray = this.tooLastRowSetArray.filter((obj, index) => {
        if (Object.keys(obj).length) return obj
      })
      // Arrayni bosh object dan tozalash

      this.tooLastRowSetArray.length
        ? (this.noDataRow = false)
        : (this.noDataRow = true)
      this.total = 0
      this.totalAction()
    },

    // Add an Item
    addAnItemAction() {
      if (this.addmodalorrow) {
        this.yesOpenModal()
      } else {
        this.noOpenModal()
        this.allInputValues = Object.fromEntries(this.inputValuesMap)
        this.rowSetArray.push(this.allInputValues)
        const obj1 = Object.fromEntries(this.inputValuesObj)
        this.arrRow.push(obj1)
      }
      this.showHideRow = false
      this.inputValuesObj.clear()
      this.inputValuesMap.clear()
    },
    // Add an Item

    yesOpenModal() {
      this.isOpenModal = true
    },
    noOpenModal() {
      this.tableBody.push(this.filteredTablehead)
    },
    // row delete action
    rowDelAction(index) {
      this.tableBody = this.tableBody.filter((row, inx) => inx !== index)
      this.rowSetArray = this.rowSetArray.filter((row, inx) => inx !== index)
      this.inputValuesMap.clear()
    },

    // Modal Closeobject
    closeAction(isClose) {
      this.isOpenModal = isClose
    },

    // input's Valuesini olish
    getInputValue(key, value, order) {
      if (
        this.arrRow[order + 1] &&
        this.rowSetArray[order + 1] &&
        !this.newEditObjData.length
      ) {
        this.arrRow[order + 1][key] = value
        this.rowSetArray[order + 1][key] = value
      } else if (
        this.arrRow[order] &&
        this.rowSetArray[order] &&
        this.newEditObjData.length
      ) {
        this.arrRow[order][key] = value
        this.rowSetArray[order][key] = value
      } else {
        this.inputValuesObj.set('erepairStatus', 'false')
        this.inputValuesObj.set('marriage', 'false')
        this.inputValuesObj.set('mark', 'false')
        this.inputValuesObj.set('waste', 'false')
        this.inputValuesObj.set('qtyOfOne', '0')
        this.inputValuesObj.set('price4', '0')
        this.inputValuesObj.set('packNumber', `${order + 1}`)
        this.inputValuesObj.set(key, value)
        this.inputValuesMap.set(key, value)
      }
    },
    // input's Valuesini olish

    // Lookup's Valuesini olish
    getLookUpValue(key, name, value, order) {
      if (
        this.arrRow[order + 1] &&
        this.rowSetArray[order + 1] &&
        !this.newEditObjData.length
      ) {
        this.arrRow[order + 1][key] = { id: Number(value) }
        this.rowSetArray[order + 1][key] = name
      } else if (
        this.arrRow[order] &&
        this.rowSetArray[order] &&
        this.newEditObjData.length
      ) {
        this.arrRow[order][key] = { id: Number(value) }
        this.rowSetArray[order][key] = name
      } else {
        this.inputValuesObj.set(key, { id: Number(value) })
        this.inputValuesMap.set(key, name)
      }
    },
    // Lookup's Valuesini olish

    // Modal uchun ishlaydi
    modalAcceptAction(objBack, obj) {
      this.showHideRow = false
      this.noOpenModal()
      this.arrRow.push(objBack)
      this.rowSetArray.push(obj)

      this.inputValuesObj.clear()
      this.inputValuesMap.clear()
    },
    // Modal uchun ishlaydi

    // Save button click qilganda ishlaydi
    getSaveRowAction() {
      if (this.addmodalorrow) {
        this.showHideRow = true

        // ---------------------------------------------
        // Dublicate object ni filter qilish
        const uniqueArray = Array.from(
          new Set(this.rowSetArray.map(JSON.stringify))
        ).map(JSON.parse)
        this.rowSetArray = uniqueArray
        // Dublicate object ni filter qilish

        // Arrayni bo'sh object dan tozalash
        // eslint-disable-next-line array-callback-return
        this.rowSetArray = this.rowSetArray.filter((obj, index) => {
          if (Object.keys(obj).length) return obj
        })
        this.tooLastRowSetArray = this.rowSetArray
        // Arrayni bo'sh object dan tozalash
        // ----------------------------------------------
        this.$emit('rowValues', this.arrRow, this.showHideRow)

        // Total row ko'rinishini xal qiladi
        this.rowSetArray.length
          ? (this.noDataRow = false)
          : (this.noDataRow = true)

        this.totalAction()
      } else {
        this.showHideRow = true
        this.allInputValues = Object.fromEntries(this.inputValuesMap)
        this.rowSetArray.push(this.allInputValues)
        this.inputValuesMap.clear()

        // ---------------------------------------------
        // Dublicate object ni filter qilish
        const uniqueArray = Array.from(
          new Set(this.rowSetArray.map(JSON.stringify))
        ).map(JSON.parse)
        this.rowSetArray = uniqueArray
        // Dublicate object ni filter qilish

        // Arrayni bo'sh object dan tozalash
        // eslint-disable-next-line array-callback-return
        this.rowSetArray = this.rowSetArray.filter((obj, index) => {
          if (Object.keys(obj).length) return obj
        })
        this.tooLastRowSetArray = this.rowSetArray
        // Arrayni bo'sh object dan tozalash
        // ----------------------------------------------
        const obj1 = Object.fromEntries(this.inputValuesObj)
        this.arrRow.push(obj1)
        this.arrRow.shift()
        this.$emit('rowValues', this.arrRow, this.showHideRow)

        // Total row ko'rinishini xal qiladi
        this.rowSetArray.length
          ? (this.noDataRow = false)
          : (this.noDataRow = true)

        this.totalAction()
      }
    },

    //  Edit button click qilganda ishlaydi
    getEditRowAction() {
      this.showHideRow = false
      // ----------------------------------------------
      // Edit ning row data`sini shakillantirish
      this.newEditObjData = []
      this.rowSetArray.forEach((obj) => {
        const editObjData = new Map()
        this.tableBody.forEach((arr) => {
          arr.forEach((subObj) => {
            subObj.name in obj && editObjData.set(subObj.name, obj[subObj.name])
          })
        })
        this.newEditObjData = [
          ...this.newEditObjData,
          Object.fromEntries(editObjData),
        ]
      })
      // -------------------------------------
      // Dublicate object ni filter qilish
      const uniqueArray = Array.from(
        new Set(this.rowSetArray.map(JSON.stringify))
      ).map(JSON.parse)
      this.rowSetArray = uniqueArray
      // Dublicate object ni filter qilish

      // Arrayni bo'sh object dan tozalash
      // eslint-disable-next-line array-callback-return
      this.rowSetArray = this.rowSetArray.filter((obj, index) => {
        if (Object.keys(obj).length) return obj
      })
      this.newEditObjData = this.rowSetArray
      this.tooLastRowSetArray = this.rowSetArray
      // Arrayni bo'sh object dan tozalash
      // ----------------------------------------------

      this.totalAction()
    },
    // Total hisoblavchi function start
    totalAction() {
      this.filteredTablehead.forEach((headName) => {
        headName.sumColumn && this.sumColumnArr.push(headName.name)
      })
      this.sumColumnArr.forEach((name) => {
        this.tooLastRowSetArray.forEach((obj) => {
          if (name in obj) {
            this.total += Number(obj[name])
            this.totalObjMap.set(name, this.total)
          }
        })
        this.total = 0
      })
    },
    // Total hisoblavchi function end

    // intNumber
    intNumber(evt) {
      const theEvent = evt || window.event
      let key = theEvent.keyCode || theEvent.which
      const x = key
      key = String.fromCharCode(key)
      const textVal = this.$refs.input.value
      if (x === 46 && textVal.includes('.')) {
        theEvent.preventDefault()
      }
      const regex = /[0-9]|\./
      if (
        ((!regex.test(key) && x !== 8 && x !== 37 && x !== 39) || x === 46) &&
        x !== 9
      ) {
        theEvent.returnValue = false
        if (theEvent.preventDefault) theEvent.preventDefault()
      }
    },
  },
}
</script>
