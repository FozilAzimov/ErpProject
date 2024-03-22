<template>
  <div
    class="bg-[rgb(179,202,223)] max-w-[92%] w-fit max-h-[80vh] overflow-auto p-1 rounded-sm fixed z-[1000] left-[50%] top-[12%] translate-x-[-50%]"
  >
    <table class="w-full border-[1px] border-[solid] border-[#F0F0F0]">
      <thead class="bg-[rgb(229,235,245)]">
        <th
          class="text-[13px] font-semibold border-[1px] border-[solid] border-[rgba(119,136,153,0.2)] p-[5px_10px]"
        >
          Invoice # Recipient
        </th>
        <th
          v-for="headNameStart in tableHeadStart"
          :key="headNameStart"
          class="text-[13px] font-semibold border-[1px] border-[solid] border-[rgba(119,136,153,0.2)] p-[5px_10px]"
        >
          {{ headNameStart }}
        </th>
        <th
          class="text-[13px] font-semibold border-[1px] border-[solid] border-[rgba(119,136,153,0.2)] p-[5px_10px]"
        >
          <GenericButton
            name="Ok"
            pl="8"
            pt="3"
            pr="8"
            pb="3"
            bg="rgb(156,104,183)"
            disabled-bg="rgba(156,104,183,0.7)"
            textsize="14"
            :disabled="centerHeadBody"
            @click="firstLastBtnAction('first')"
          />
        </th>
        <template v-if="centerHeadBody">
          <th
            v-for="headNameCenterOne in tableHeadCenterOne"
            :key="headNameCenterOne.key"
            class="text-[13px] font-semibold border-[1px] border-[solid] border-[rgba(119,136,153,0.2)] p-[5px_10px]"
          >
            {{ headNameCenterOne.name }}
          </th>
        </template>
        <template v-if="centerHeadBody">
          <th
            class="text-[13px] font-semibold border-[1px] border-[solid] border-[rgba(119,136,153,0.2)] p-[5px_10px]"
          >
            <GenericButton
              name="Ok"
              pl="8"
              pt="3"
              pr="8"
              pb="3"
              bg="rgb(156,104,183)"
              disabled-bg="rgba(156,104,183,0.7)"
              textsize="14"
              :disabled="lastOkBtn"
              @click="firstLastBtnAction('last')"
            />
          </th>
          <th
            v-for="headNameCenterToo in tableHeadCenterToo"
            :key="headNameCenterToo"
            class="text-[13px] font-semibold border-[1px] border-[solid] border-[rgba(119,136,153,0.2)] p-[5px_10px]"
          >
            {{ headNameCenterToo }}
          </th>
        </template>
      </thead>

      <tbody class="bg-white">
        <tr
          v-for="(bodyRow, index) in newInvoiceItemsArray?.length
            ? newInvoiceItemsArray
            : invoiceItemsArray"
          :key="index"
          class="bg-gradient-to-b from-transparent via-transparent to-[#F3F3F3]"
        >
          <td class="border-[1px] text-[12px] p-2 text-center">
            {{ tableData?.warehouseName }}
          </td>
          <td class="border-[1px] text-[12px] p-2 text-center">
            {{ bodyRow?.itemName }}
          </td>
          <td class="border-[1px] text-[12px] p-2 text-center">
            {{ Math.trunc(bodyRow?.qty) }}
          </td>
          <td class="border-[1px] text-[12px] p-2 text-center">
            {{ bodyRow?.unitPrice }}
          </td>
          <td class="border-[1px] text-[12px] p-2 text-center">
            {{ bodyRow?.net }}
          </td>
          <td class="border-[1px] text-[12px] p-2 text-center">
            <GenericSelect
              :is-def-option="true"
              :is-def-option-title="`${index + 1}`"
              :is-def-option-title-two="newSelectDefValArray[index]"
              :index="index"
              :data="setSelectFirstColumnData(index)"
              :disabled="centerHeadBody"
              :min-width="40"
              :max-width="40"
              @change="getSelectValues"
            />
          </td>

          <template v-if="centerHeadBody">
            <!-- rowspan'ga aloqador qism boshlandi -->
            <template v-if="rowspanArray.length && rowspanArray[index]?.type">
              <td
                :rowspan="rowspanArray[index].rowspan"
                class="bg-[#fdfdfd] border-[1px] text-[12px] p-2 text-center"
              >
                <GenericInput
                  width="75"
                  height="28"
                  pl="6"
                  pr="6"
                  pt="1"
                  pb="1"
                  textsize="13"
                  type="number"
                  placeholder="Customs"
                  :order="index"
                  name="customsUZS"
                  @customFunction="getInputValue"
                />
              </td>
              <td
                :rowspan="rowspanArray[index].rowspan"
                class="bg-[#fdfdfd] border-[1px] text-[12px] p-2 text-center"
              >
                {{
                  usdCustoms && fakeCustomsUSDData[index]
                    ? fakeCustomsUSDData[index].toFixed(2)
                    : usdCustoms && customsUSDData[index]
                    ? customsUSDData[index].toFixed(2)
                    : ''
                }}
              </td>
              <td
                :rowspan="rowspanArray[index].rowspan"
                class="bg-[#fdfdfd] border-[1px] text-[12px] p-2 text-center"
              >
                <GenericInput
                  width="75"
                  height="28"
                  pl="6"
                  pr="6"
                  pt="1"
                  pb="1"
                  textsize="13"
                  type="number"
                  placeholder="Transport"
                  :order="index"
                  name="transport"
                  @customFunction="getInputValue"
                />
              </td>
              <td
                :rowspan="rowspanArray[index].rowspan"
                class="bg-[#fdfdfd] border-[1px] text-[12px] p-2 text-center"
              >
                <GenericInput
                  width="75"
                  height="28"
                  pl="6"
                  pr="6"
                  pt="1"
                  pb="1"
                  textsize="13"
                  type="number"
                  placeholder="Expenses"
                  :order="index"
                  name="expenses"
                  @customFunction="getInputValue"
                />
              </td>
              <td
                :rowspan="rowspanArray[index].rowspan"
                class="bg-[#fdfdfd] border-[1px] text-[12px] p-2 text-center"
              >
                <GenericInput
                  width="75"
                  height="28"
                  pl="6"
                  pr="6"
                  pt="1"
                  pb="1"
                  textsize="13"
                  type="number"
                  placeholder="Transport"
                  :order="index"
                  name="service"
                  @customFunction="getInputValue"
                />
              </td>
              <td
                :rowspan="rowspanArray[index].rowspan"
                class="bg-[#fdfdfd] border-[1px] text-[12px] p-2 text-center"
              >
                <GenericInput
                  width="75"
                  height="28"
                  pl="6"
                  pr="6"
                  pt="1"
                  pb="1"
                  textsize="13"
                  type="number"
                  placeholder="Transfer"
                  :order="index"
                  name="transfer"
                  @customFunction="getInputValue"
                />
              </td>
              <td
                :rowspan="rowspanArray[index].rowspan"
                class="bg-[#fdfdfd] border-[1px] text-[12px] p-2 text-center"
              >
                {{
                  rowTotal[index] ? rowTotal[index].toFixed(2) : rowTotal[index]
                }}
              </td>
            </template>
            <template v-else-if="!rowspanArray.length">
              <td class="border-[1px] text-[12px] p-2 text-center">
                <GenericInput
                  width="75"
                  height="28"
                  pl="6"
                  pr="6"
                  pt="1"
                  pb="1"
                  textsize="13"
                  type="number"
                  placeholder="Customs"
                  :order="index"
                  name="customsUZS"
                  @customFunction="getInputValue"
                />
              </td>
              <td class="border-[1px] text-[12px] p-2 text-center">
                {{
                  usdCustoms && fakeCustomsUSDData[index]
                    ? fakeCustomsUSDData[index].toFixed(2)
                    : usdCustoms && customsUSDData[index]
                    ? customsUSDData[index].toFixed(2)
                    : ''
                }}
              </td>
              <td class="border-[1px] text-[12px] p-2 text-center">
                <GenericInput
                  width="75"
                  height="28"
                  pl="6"
                  pr="6"
                  pt="1"
                  pb="1"
                  textsize="13"
                  type="number"
                  placeholder="Transport"
                  :order="index"
                  name="transport"
                  @customFunction="getInputValue"
                />
              </td>
              <td class="border-[1px] text-[12px] p-2 text-center">
                <GenericInput
                  width="75"
                  height="28"
                  pl="6"
                  pr="6"
                  pt="1"
                  pb="1"
                  textsize="13"
                  type="number"
                  placeholder="Expenses"
                  :order="index"
                  name="expenses"
                  @customFunction="getInputValue"
                />
              </td>
              <td class="border-[1px] text-[12px] p-2 text-center">
                <GenericInput
                  width="75"
                  height="28"
                  pl="6"
                  pr="6"
                  pt="1"
                  pb="1"
                  textsize="13"
                  type="number"
                  placeholder="Transport"
                  :order="index"
                  name="service"
                  @customFunction="getInputValue"
                />
              </td>
              <td class="border-[1px] text-[12px] p-2 text-center">
                <GenericInput
                  width="75"
                  height="28"
                  pl="6"
                  pr="6"
                  pt="1"
                  pb="1"
                  textsize="13"
                  type="number"
                  placeholder="Transfer"
                  :order="index"
                  name="transfer"
                  @customFunction="getInputValue"
                />
              </td>
              <td class="border-[1px] text-[12px] p-2 text-center">
                {{
                  rowTotal[index] ? rowTotal[index].toFixed(2) : rowTotal[index]
                }}
              </td>
            </template>
            <!-- rowspan'ga aloqador qism tugadi -->

            <td class="border-[1px] text-[12px] p-2 text-center">
              <GenericSelect
                :is-def-option="true"
                is-def-option-title="1"
                :index="index"
                :is-def-option-title-two="lastNewSelectDefValArray[index]"
                :data="setSelectLastColumnData(completedArray[index], index)"
                :disabled="rowspanArray[index]?.type || lastHeadBody"
                :min-width="40"
                :max-width="40"
                @change="getLastSelectValues"
              />
            </td>

            <!-- rowspan'ga aloqador qism boshlandi -->
            <template v-if="lastOkBtn">
              <td
                v-if="lastRowspanArray.length && lastRowspanArray[index]?.type"
                :rowspan="lastRowspanArray[index]?.rowspan"
                class="bg-[#fdfdfd] border-[1px] text-[12px] p-2 text-center"
              >
                <GenericInput
                  width="75"
                  height="28"
                  pl="6"
                  pr="6"
                  pt="1"
                  pb="1"
                  textsize="13"
                  type="number"
                  placeholder="Product"
                  :order="index"
                  name="product"
                  @customFunction="getInputValue"
                />
              </td>
              <td
                v-else-if="!lastRowspanArray.length"
                :rowspan="lastRowspanArray[index]?.rowspan"
                class="border-[1px] text-[12px] p-2 text-center"
              >
                <GenericInput
                  width="75"
                  height="28"
                  pl="6"
                  pr="6"
                  pt="1"
                  pb="1"
                  textsize="13"
                  type="number"
                  placeholder="Product"
                  :order="index"
                  name="product"
                  @customFunction="getInputValue"
                />
              </td>
            </template>
            <!-- rowspan'ga aloqador qism boshlandi -->

            <td
              v-if="rowspanArray.length && rowspanArray[index]?.type"
              :rowspan="rowspanArray[index]?.rowspan"
              class="bg-[#fdfdfd] border-[1px] text-[12px] p-2 text-center"
            >
              {{ productTotalArray[index] }}
            </td>
            <td
              v-else-if="!rowspanArray.length"
              class="border-[1px] text-[12px] p-2 text-center"
            >
              {{ productTotalArray[index] }}
            </td>
            <td class="border-[1px] text-[12px] p-2 text-center">
              {{
                rowTotal[index]
                  ? (rowTotal[index] / Number(quantityArray[index])).toFixed(2)
                  : rowTotal[index]
              }}
            </td>
            <td class="border-[1px] text-[12px] p-2 text-center"></td>
            <td class="border-[1px] text-[12px] p-2 text-center"></td>
            <td class="border-[1px] text-[12px] p-2 text-center">
              <GenericInput
                width="75"
                height="28"
                pl="6"
                pr="6"
                pt="1"
                pb="1"
                textsize="13"
                type="number"
                placeholder="Wholesale"
                :order="index"
                name="wholesale"
                @customFunction="getInputValue"
              />
            </td>
            <td class="border-[1px] text-[12px] p-2 text-center">
              <GenericInput
                width="75"
                height="28"
                pl="6"
                pr="6"
                pt="1"
                pb="1"
                textsize="13"
                type="number"
                placeholder="Retail"
                :order="index"
                name="retail"
                @customFunction="getInputValue"
              />
            </td>
          </template>
        </tr>

        <!-- Total start -->
        <tr v-if="centerHeadBody" class="bg-[rgb(229,235,245)] text-center">
          <td
            class="text-[14px] p-3 text-[rgb(188,8,8)] font-semibold border-[1px] border-[solid] border-[rgba(119,136,153,0.2)]"
          >
            Total
          </td>
          <td
            v-for="summ in tableHeadStart"
            :key="summ"
            class="text-[12px] p-2 text-[rgb(188,8,8)] font-semibold border-[1px] border-[solid] border-[rgba(119,136,153,0.2)]"
          ></td>
          <td
            class="text-[12px] p-2 text-[rgb(188,8,8)] font-semibold border-[1px] border-[solid] border-[rgba(119,136,153,0.2)]"
          ></td>
          <template v-if="centerHeadBody">
            <td
              v-for="summ in tableHeadCenterOne"
              :key="summ.key"
              class="text-[12px] p-2 text-[rgb(188,8,8)] font-semibold border-[1px] border-[solid] border-[rgba(119,136,153,0.2)]"
            >
              {{
                columnTotal[summ.key]
                  ? Math.trunc(columnTotal[summ.key])
                  : columnTotal[summ.key]
              }}
              {{ summ.key === 'customsUSD' ? customsUSDTotal.toFixed(2) : '' }}
              {{
                costPriceTotal[summ.key]
                  ? costPriceTotal[summ.key].toFixed(2)
                  : costPriceTotal[summ.key]?.toFixed(2)
              }}
            </td>
            <td
              class="text-[12px] p-2 text-[rgb(188,8,8)] font-semibold border-[1px] border-[solid] border-[rgba(119,136,153,0.2)]"
            ></td>
            <td
              v-if="lastHeadBody"
              class="text-[12px] p-2 text-[rgb(188,8,8)] font-semibold border-[1px] border-[solid] border-[rgba(119,136,153,0.2)]"
            ></td>
            <td
              v-for="summ in lastHeadBody
                ? [...tableHeadCenterToo].splice(
                    0,
                    tableHeadCenterToo.length - 1
                  )
                : tableHeadCenterToo"
              :key="summ"
              class="text-[12px] p-2 text-[rgb(188,8,8)] font-semibold border-[1px] border-[solid] border-[rgba(119,136,153,0.2)]"
            ></td>
          </template>
        </tr>
        <!-- Total end -->

        <!-- sticky row -->
        <tr
          v-if="centerHeadBody"
          class="bg-[rgb(229,235,245)] border-[1px] border-solid border-[#F0F0F0]"
        >
          <td
            colspan="21"
            class="p-1 border-[1px] border-[solid] border-[rgba(119,136,153,0.2)]"
          >
            <span class="flex items-center gap-1">
              <GenericInput
                width="65"
                height="29"
                pl="6"
                pr="6"
                pt="1"
                pb="1"
                textsize="13"
                type="number"
                placeholder="USD Customs"
                class="sticky left-0"
                name="USDCutoms"
                @customFunction="getUSDInputValue"
              />
              <GenericButton
                name="Save"
                pl="8"
                pt="3"
                pr="8"
                pb="3"
                bg="rgb(54,155,215,0.7)"
                textsize="14"
                class="sticky left-[69px]"
                @click="getData"
              />
            </span>
          </td>
        </tr>
        <!-- sticky row -->
      </tbody>
    </table>
  </div>
</template>

<script>
import GenericButton from '../../Button/GenericButton.vue'
import GenericInput from '../../Input/GenericInput.vue'
import GenericSelect from '../../Select/GenericSelect.vue'
export default {
  components: {
    GenericButton,
    GenericInput,
    GenericSelect,
  },

  // PROPS
  props: {
    tableData: {
      type: Object,
      default: () => ({}),
    },
  },

  // DATA
  data() {
    return {
      invoiceItemsArray: this.tableData?.invoiceItems,
      newInvoiceItemsArray: [],
      tableHeadStart: ['Product Name', 'Quantity', 'Unit Price', 'Total'],
      tableHeadCenterOne: [
        { name: 'Customs (UZS)', key: 'customsUZS' },
        { name: 'Customs (USD)', key: 'customsUSD' },
        { name: 'Transport', key: 'transport' },
        { name: 'Expenses', key: 'expenses' },
        { name: 'Transportation service', key: 'service' },
        { name: 'Transfer', key: 'transfer' },
        { name: 'costPrice Total', key: 'total' },
      ],
      tableHeadCenterToo: [
        'Product volume Total',
        'costPrice 1',
        'costPrice 2',
        'Additional percentage',
        'Wholesale price',
        'Retail price',
      ],
      tableHeadEnd: 'Product volume',
      centerHeadBody: false,
      lastHeadBody: false,
      lastOkBtn: false,
      quantityArray: [],
      firstSelectsValueObj: new Map(),
      lastSelectsValueObj: new Map(),
      sortedSelectValueArray: [],
      lastSortedSelectValueArray: [],
      newSelectDefValArray: [],
      lastNewSelectDefValArray: [],
      sortedArray: [],
      lastSortedArray: [],
      rowspanArray: [],
      lastRowspanArray: [],
      grouped: [],
      count: 0,
      currentCount: 0,
      type: true,
      lastCount: 0,
      lastCurrentCount: 0,
      lastType: true,
      temporalArray: [],
      completedArray: [],
      inputValuesData: [],
      columnTotal: {
        customsUZS: 0,
        customsUSD: null,
        transport: 0,
        expenses: 0,
        service: 0,
        transfer: 0,
      },
      rowTotal: {},
      oldRowTotal: {},
      costPriceTotal: {
        total: 0,
      },
      usdCustoms: 0,
      customsUSDData: {},
      fakeCustomsUSDData: {},
      customsUSDTotal: 0,
      productTotalArray: [],
      newProductTotalArray: [],
      isLastSelectChange: false,
      temporaryAmount: 0,
    }
  },

  // METHODS
  methods: {
    // first selects uchun ishlab beradi
    sortedRowAction() {
      this.sortedSelectValueArray.forEach((oneObj) => {
        this.newInvoiceItemsArray.push(
          this.invoiceItemsArray[Number(Object.keys(oneObj)) - 1]
        )
      })
    },
    // first selects uchun ishlab beradi

    // Ok button click qilganda ishlaydi
    firstLastBtnAction(prop) {
      if (prop === 'first') {
        // function
        this.sortedRowAction()
        this.newSelectDefValArray = this.sortedSelectValueArray.map((obj) =>
          Object.values(obj)
        )
        !this.newSelectDefValArray.length && (this.lastHeadBody = true)
        this.newSelectDefValArray = this.newSelectDefValArray.flat(Infinity)
        // function
        this.sortedAction()
        // function
        this.sortedArray.length && this.rowspanArrayAction()
        this.temporalArray = this.newSelectDefValArray
        // function
        this.createLastSelectDataAction()
        this.centerHeadBody = true
        // first sorted select keys
        if (this.sortedSelectValueArray.length) {
          this.sortedSelectValueArray.forEach((obj) => {
            for (const key in obj) this.quantityArray.push(key)
          })
        } else {
          this.invoiceItemsArray.forEach((obj, i) => {
            this.quantityArray.push(i + 1)
          })
        }
        // first sorted select keys
      } else {
        this.GroupsArrayAction()
        this.tableHeadCenterToo.unshift(this.tableHeadEnd)
        this.lastHeadBody = true
        this.lastOkBtn = true
      }
    },
    // Ok button click qilganda ishlaydi

    // rowspan counter sort bu selectning qaysi qiymati nechtadan borligini hisoblaydi
    sortedAction() {
      let counter = 1
      this.newSelectDefValArray.forEach((item, index) => {
        if (item === this.newSelectDefValArray[index + 1]) {
          counter++
        } else {
          this.sortedArray.push(new Map().set(item, counter))
          counter = 1
        }
      })
    },
    // rowspan counter sort bu selectning qaysi qiymati nechtadan borligini hisoblaydi

    // rowspan Array Action
    rowspanArrayAction() {
      this.currentCount = Object.values(
        Object.fromEntries(this.sortedArray[this.count])
      )[0]
      for (let i = 0; i < this.sortedSelectValueArray.length; i++) {
        if (this.currentCount) {
          this.rowspanArray.push({
            type: this.type,
            rowspan: this.currentCount,
          })
          this.currentCount--
          this.type = false
        } else {
          this.count++
          this.type = true
          this.currentCount = Object.values(
            Object.fromEntries(this.sortedArray[this.count])
          )
          this.rowspanArray.push({
            type: this.type,
            rowspan: this.currentCount,
          })
          this.currentCount--
          this.type = false
        }
      }
    },
    // rowspan Array Action

    // First Select data sini yaratish
    setSelectFirstColumnData(index) {
      this.firstSelectsValueObj.set(`${index + 1}`, index + 1)
      const array = []
      for (let i = 1; i <= index + 1; i++) {
        array.push({ value: i, name: i })
      }
      return array
    },
    // First Select data sini yaratish

    // Last Select data sini yaratish
    createLastSelectDataAction() {
      this.temporalArray.forEach((value) => {
        this.sortedArray.forEach((mapObj) => {
          if (value === Number(Object.keys(Object.fromEntries(mapObj))[0])) {
            this.completedArray.push(mapObj.get(value))
          }
        })
      })
    },
    setSelectLastColumnData(prop, index) {
      this.lastSelectsValueObj.set(index + 1, 1)
      const array = []
      for (let i = 1; i <= prop; i++) {
        array.push({ value: i, name: i })
      }
      return array
    },
    // Last Select data sini yaratish

    // Select valuesini guruhlash
    getSelectValues(value, id, isDefOptionTitle) {
      this.firstSelectsValueObj.set(isDefOptionTitle, value === '' ? 1 : value)
      this.sortedSelectValueArray = this.sortedData(
        Array.from(this.firstSelectsValueObj.entries())
      )
      this.sortedSelectValueArray = this.sortedSelectValueArray.map((arr) =>
        Object.fromEntries([arr])
      )
    },
    sortedData(data) {
      return data.sort((a, b) => a[1] - b[1])
    },
    // Select valuesini guruhlash

    // last Select valuesini guruhlash
    getLastSelectValues(value, id, isDefOptionTitle, index) {
      this.isLastSelectChange = true
      this.lastSelectsValueObj.set(index + 1, value === '' ? 1 : value)
    },
    // last Select valuesini guruhlash

    // nested groups
    GroupsArrayAction() {
      const pureArray = Object.values(
        Object.fromEntries(this.lastSelectsValueObj)
      )
      if (this.sortedArray.length) {
        this.sortedArray.forEach((mapObj) => {
          for (const key in Object.fromEntries(mapObj)) {
            this.grouped.push(
              pureArray.splice(0, Object.fromEntries(mapObj)[key])
            )
          }
        })
      } else {
        this.invoiceItemsArray.forEach((val, index) => {
          this.sortedArray.push(new Map().set(index + 1, 1))
        })
        this.sortedArray.forEach((mapObj) => {
          for (const key in Object.fromEntries(mapObj)) {
            this.grouped.push(
              pureArray.splice(0, Object.fromEntries(mapObj)[key])
            )
          }
        })
      }
      // last ok btn bosilganda selectga new value set bo'ladi
      this.grouped.forEach((arr) => [
        this.lastNewSelectDefValArray.push(...arr.sort()),
      ])
      // function
      this.lastSortedAction()
      // function
      this.lastRowspanArrayAction()
    },
    // nested groups

    // rowspan counter sort bu selectning qaysi qiymati nechtadan borligini hisoblaydi
    lastSortedAction() {
      this.grouped.forEach((subArr) => {
        let counter = 1
        subArr.forEach((item, index) => {
          if (item === subArr[index + 1]) {
            counter++
          } else {
            this.lastSortedArray.push(new Map().set(item, counter))
            counter = 1
          }
        })
      })
    },
    // rowspan counter sort bu selectning qaysi qiymati nechtadan borligini hisoblaydi

    // last Rowspan Array Action
    lastRowspanArrayAction() {
      this.lastCurrentCount = Object.values(
        Object.fromEntries(this.lastSortedArray[this.lastCount])
      )[0]
      for (let i = 0; i < this.sortedSelectValueArray.length; i++) {
        if (this.lastCurrentCount) {
          this.lastRowspanArray.push({
            type: this.lastType,
            rowspan: this.lastCurrentCount,
          })
          this.lastCurrentCount--
          this.lastType = false
        } else {
          this.lastCount++
          this.lastType = true
          this.lastCurrentCount = Object.values(
            Object.fromEntries(this.lastSortedArray[this.lastCount])
          )
          this.lastRowspanArray.push({
            type: this.lastType,
            rowspan: this.lastCurrentCount,
          })
          this.lastCurrentCount--
          this.lastType = false
        }
      }
    },
    // last Rowspan Array Action

    // columns total amount ni hisoblab beradi
    getLogisticTotalColAction(key, id) {
      this.columnTotal[key] = 0
      this.inputValuesData.forEach((obj) => {
        if (obj[key]) this.columnTotal[key] += obj[key]
      })
    },
    // columns total amount ni hisoblab beradi

    // rows total amount ni hisoblab beradi
    getLogisticTotalRowAction(name, id) {
      this.oldRowTotal[id] = 0
      for (const key in this.inputValuesData[id]) {
        if (
          key === 'transport' ||
          key === 'expenses' ||
          key === 'service' ||
          key === 'transfer'
        ) {
          this.oldRowTotal[id] += this.inputValuesData[id][key]
        }
      }
      this.rowTotal = this.oldRowTotal
      // function
      this.getTotalCostPriceAmountAction()
    },
    // rows total amount ni hisoblab beradi

    // col costPrice Total summ hisoblash
    getTotalCostPriceAmountAction() {
      if (Object.values(this.rowTotal).length) {
        this.costPriceTotal.total = Object.values(this.rowTotal).reduce(
          (summ, curr) => summ + curr,
          0
        )
      } else {
        this.costPriceTotal.total = Object.values(this.oldRowTotal).reduce(
          (summ, curr) => summ + curr,
          0
        )
      }
    },
    // col costPrice Total summ hisoblash

    // Customs (USD) ning data sini yaratish
    getCustomsUSDData(name, value, id) {
      this.inputValuesData.forEach((obj, index) => {
        if ('customsUZS' in obj) {
          if (id in this.customsUSDData) {
            this.customsUSDData[id] = this.inputValuesData[id]?.customsUZS
          } else {
            this.customsUSDData[index] = obj?.customsUZS
          }
        }
      })
      // function
      this.getUSDInputValueInsideAction(this.usdCustoms)
    },
    // Customs (USD) ning data sini yaratish

    // USD_Customs inside action
    getUSDInputValueInsideAction(value) {
      this.customsUSDTotal = 0
      const data = {}
      if (value) {
        for (const key in this.customsUSDData) {
          data[key] = this.customsUSDData[key] / value
        }
        this.fakeCustomsUSDData = data

        if (Object.values(this.fakeCustomsUSDData).length) {
          for (const key in this.fakeCustomsUSDData) {
            this.customsUSDTotal += this.fakeCustomsUSDData[key]
          }
        } else {
          for (const key in this.customsUSDData) {
            this.customsUSDTotal += this.customsUSDData[key]
          }
        }
      }
      this.fakeCustomsUSDData = data
    },
    // USD_Customs inside action

    // Costums_USD va costPrice_Total col result'larini qo'shish
    getTwoColumnAddResultAction() {
      this.rowTotal = this.oldRowTotal
      if (Object.values(this.fakeCustomsUSDData).length) {
        const data = {}
        for (const key in this.rowTotal) {
          data[key] = this.rowTotal[key] + this.fakeCustomsUSDData[key]
        }
        this.rowTotal = data
      }
    },
    // Costums_USD va costPrice_Total col result'larini qo'shish

    // Sub USD_Customs input action
    getUSDInputValue(name, value) {
      this.usdCustoms = value
      // function
      this.getUSDInputValueInsideAction(value)
      // function
      this.getTwoColumnAddResultAction()
      // function
      this.getTotalCostPriceAmountAction()
    },
    // Sub USD_Customs input action

    // product volume total ni xisoblash
    getProductTotalAction(name, value, id) {
      if (this.isLastSelectChange) {
        this.$set(this.productTotalArray, id, Number(value))
      } else {
        this.$set(this.productTotalArray, id, Number(value))
      }
      console.log(this.productTotalArray)
    },
    // product volume total ni xisoblash

    // Input value'sini olish va grouped objectni "this.inputValuesData" arrayga push qilish
    getInputValue(name, value, id) {
      if (this.inputValuesData[id]) {
        this.inputValuesData[id][name] = Number(value)
      } else {
        const inputValues = {}
        inputValues[name] = Number(value)
        this.inputValuesData[id] = inputValues
      }

      // function
      name === 'customsUZS' && this.getCustomsUSDData(name, value, id)
      // function
      name === 'product' && this.getProductTotalAction(name, value, id)
      // function
      this.getLogisticTotalColAction(name, id)
      // function
      this.getLogisticTotalRowAction(name, id)
      // function
      this.getTwoColumnAddResultAction()
      // function
      this.getTotalCostPriceAmountAction()
    },
    // Input value'sini olish va grouped objectni "this.inputValuesData" arrayga push qilish

    // save btn
    getData() {
      console.log('hayyy')
    },
    // save btn
  },
}
</script>
