<template>
  <div
    class="bg-[rgb(179,202,223)] max-w-[92%] w-fit max-h-[41vh] overflow-auto p-1 rounded-sm fixed z-[1000] left-[50%] top-[12%] translate-x-[-50%]"
  >
    <div>
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
              :key="headNameCenterOne"
              class="text-[13px] font-semibold border-[1px] border-[solid] border-[rgba(119,136,153,0.2)] p-[5px_10px]"
            >
              {{ headNameCenterOne }}
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
                :disabled="lastHeadBody"
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
                  />
                </td>
                <td
                  :rowspan="rowspanArray[index].rowspan"
                  class="bg-[#fdfdfd] border-[1px] text-[12px] p-2 text-center"
                ></td>
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
                  />
                </td>
                <td
                  :rowspan="rowspanArray[index].rowspan"
                  class="bg-[#fdfdfd] border-[1px] text-[12px] p-2 text-center"
                ></td>
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
                  />
                </td>
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
                    placeholder="Transport"
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
                  />
                </td>
                <td class="border-[1px] text-[12px] p-2 text-center"></td>
              </template>
              <!-- rowspan'ga aloqador qism tugadi -->

              <td class="border-[1px] text-[12px] p-2 text-center">
                <GenericSelect
                  :is-def-option="true"
                  :is-def-option-title="`${index + 1}`"
                  :data="setSelectFirstColumnData(index)"
                  :disabled="lastHeadBody"
                  :min-width="40"
                  :max-width="40"
                />
              </td>

              <td
                v-if="lastHeadBody"
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
                />
              </td>
              <td
                v-if="rowspanArray.length && rowspanArray[index]?.type"
                :rowspan="rowspanArray[index]?.rowspan"
                class="bg-[#fdfdfd] border-[1px] text-[12px] p-2 text-center"
              ></td>
              <td
                v-else-if="!rowspanArray.length"
                class="border-[1px] text-[12px] p-2 text-center"
              ></td>
              <td class="border-[1px] text-[12px] p-2 text-center"></td>
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
                />
              </td>
            </template>
          </tr>

          <!-- Total start -->
          <tr class="bg-[rgb(229,235,245)] text-center">
            <td
              class="border-[1px] text-[13px] p-3 text-[rgba(0,0,0,0.7)] border-[1px] border-[solid] border-[rgba(119,136,153,0.2)]"
            >
              Total
            </td>
            <td
              v-for="summ in tableHeadStart"
              :key="summ"
              class="text-[12px] p-2 text-[rgb(29,119,255)] border-[1px] border-[solid] border-[rgba(119,136,153,0.2)]"
            ></td>
            <td
              class="text-[12px] p-2 text-[rgb(29,119,255)] border-[1px] border-[solid] border-[rgba(119,136,153,0.2)]"
            >
              btn
            </td>
            <template v-if="centerHeadBody">
              <td
                v-for="summ in tableHeadCenterOne"
                :key="summ"
                class="text-[12px] p-2 text-[rgb(29,119,255)] border-[1px] border-[solid] border-[rgba(119,136,153,0.2)]"
              ></td>
              <td
                class="text-[12px] p-2 text-[rgb(29,119,255)] border-[1px] border-[solid] border-[rgba(119,136,153,0.2)]"
              >
                btn
              </td>
              <td
                v-if="lastHeadBody"
                class="text-[12px] p-2 text-[rgb(29,119,255)] border-[1px] border-[solid] border-[rgba(119,136,153,0.2)]"
              >
                PV
              </td>
              <td
                v-for="summ in lastHeadBody
                  ? [...tableHeadCenterToo].splice(
                      0,
                      tableHeadCenterToo.length - 1
                    )
                  : tableHeadCenterToo"
                :key="summ"
                class="text-[12px] p-2 text-[rgb(29,119,255)] border-[1px] border-[solid] border-[rgba(119,136,153,0.2)]"
              ></td>
            </template>
          </tr>
          <!-- Total end -->
        </tbody>
      </table>
    </div>
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
        'Customs (UZS)',
        'Customs (USD)',
        'Transport',
        'Expenses',
        'Transportation service',
        'Transfer',
        'costPrice Total',
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
      selectValueObj: new Map(),
      sortedSelectValueArray: [],
      newSelectDefValArray: [],
      lastSortedArray: [],
      rowspanArray: [],
      count: 0,
      curCount: 0,
      type: true,
    }
  },

  // COMPUTED
  computed: {},

  // MOUNTED
  mounted() {},

  // METHODS
  methods: {
    sortedRowAction() {
      this.sortedSelectValueArray.forEach((oneObj) => {
        this.newInvoiceItemsArray.push(
          this.invoiceItemsArray[Number(Object.keys(oneObj)) - 1]
        )
      })
    },

    // Ok button click qilganda ishlaydi
    firstLastBtnAction(prop) {
      if (prop === 'first') {
        this.sortedRowAction()
        this.newSelectDefValArray = this.sortedSelectValueArray.map((obj) =>
          Object.values(obj)
        )
        this.newSelectDefValArray = this.newSelectDefValArray.flat(Infinity)
        this.sortedAction()
        this.rowspanArrayAction()
        this.centerHeadBody = true
      } else {
        this.tableHeadCenterToo.unshift(this.tableHeadEnd)
        this.lastHeadBody = true
      }
    },
    // Ok button click qilganda ishlaydi

    // rowspan counter sort
    sortedAction() {
      let counter = 1
      this.newSelectDefValArray.forEach((item, index) => {
        if (item === this.newSelectDefValArray[index + 1]) {
          counter++
        } else {
          this.lastSortedArray.push(new Map().set(item, counter))
          counter = 1
        }
      })
    },
    // rowspan counter sort

    // rowspan Array Action
    rowspanArrayAction() {
      this.curCount = this.lastSortedArray[this.count]?.get(this.count + 1)
      for (let i = 0; i < this.sortedSelectValueArray.length; i++) {
        if (this.curCount) {
          this.rowspanArray.push({ type: this.type, rowspan: this.curCount })
          this.curCount--
          this.type = false
        } else {
          this.type = true
          this.count++
          this.curCount = this.lastSortedArray[this.count]?.get(this.count + 1)
          this.rowspanArray.push({ type: this.type, rowspan: this.curCount })
          this.curCount--
          this.type = false
        }
      }
      // this.rowspanArray = this.rowspanArray.splice(
      //   0,
      //   this.rowspanArray.length - 1
      // )
      console.log(this.lastSortedArray)
      console.log(this.rowspanArray)
    },
    // rowspan Array Action

    // Select data sini yaratish
    setSelectFirstColumnData(index) {
      this.selectValueObj.set(`${index + 1}`, index + 1)
      const array = []
      for (let i = 1; i <= index + 1; i++) {
        array.push({ value: i, name: i })
      }
      return array
    },
    // Select data sini yaratish

    getSelectValues(value, id, index) {
      this.selectValueObj.set(index, value)
      this.sortedSelectValueArray = this.sortedData(
        Array.from(this.selectValueObj.entries())
      )
      this.sortedSelectValueArray = this.sortedSelectValueArray.map((arr) =>
        Object.fromEntries([arr])
      )
    },

    sortedData(data) {
      return data.sort((a, b) => a[1] - b[1])
    },
  },
}
</script>
