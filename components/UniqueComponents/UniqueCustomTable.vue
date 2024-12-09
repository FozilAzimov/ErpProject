<template>
  <div>
    <UniqueColumnConfig
      v-if="buttonObject && buttonObject.columnConfig.show"
      :action-url="tableActionUrl"
      :dialog-visible="showModal"
      :visible-data="visibleTableHeader"
      :hidden-data="hiddenTableHeader"
      @newStatus="
        (value) => {
          showModal = value
        }
      "
      @newVisibleColumnData="
        (value) => {
          visibleTableHeader = value
        }
      "
    />

    <div
      v-if="dataId"
      class="tableSectionTitle mt-2 mb-2 flex w-[15%]"
      @click="showTable = !showTable"
    >
      <p v-if="showTable">&#11167;</p>
      <p v-if="!showTable">&#11166;</p>
      <p>Панель операций. PanelId {{ dataId }}</p>
    </div>

    <!-- CUSTOM TABLE BUTTONS BELOW -->
    <div v-if="showTable">
      <div class="flex gap-1 flex-wrap mt-2 mb-2">
        <GenericButton
          v-if="buttonObject && buttonObject.columnConfig.show"
          name="Column Setting"
          pl="8"
          pt="2"
          pr="8"
          pb="2"
          textsize="14"
          bggradient="linear-gradient(to top, rgb(25,52,79),rgba(25,52,79, 0.58))"
          :url="img.setting"
          :istherepicture="true"
          @click="showModal = !showModal"
        />
        <GenericButton
          v-if="buttonObject && buttonObject.saveTable.show && isCanEdit"
          name="Save"
          pl="8"
          pt="2"
          pr="8"
          pb="2"
          textsize="14"
          bg="rgb(119,191,66)"
          disabled-bg="rgba(119,191,66,0.6)"
          @click="
            () => {
              isCanEdit = false
              saveTableChanges()
            }
          "
        />
        <GenericButton
          v-if="buttonObject && buttonObject.saveTable.show && isCanEdit"
          name="Discard"
          pl="8"
          pt="2"
          pr="8"
          pb="2"
          textsize="14"
          bg="rgb(221 76 76)"
          @click="
            () => {
              isCanEdit = false
              discardChanges()
            }
          "
        />
        <GenericButton
          v-if="buttonObject && buttonObject.editTable.show && !isCanEdit"
          name="Edit"
          pl="8"
          pt="2"
          pr="8"
          pb="2"
          textsize="14"
          bg="rgb(119,191,66)"
          :url="img.edit"
          :istherepicture="true"
          @click="isCanEdit = true"
        />
        <GenericButton
          v-if="buttonObject && buttonObject.printPreview.show"
          name="Print Preview"
          pl="8"
          pt="2"
          pr="8"
          pb="2"
          textsize="14"
          bg="rgba(54, 155, 215, 0.8)"
          :url="img.printer"
          :istherepicture="true"
        />
        <GenericButton
          v-if="buttonObject && buttonObject.createPack.show"
          name="Create pack"
          pl="8"
          pt="2"
          pr="8"
          pb="2"
          textsize="14"
          bg="rgba(54, 155, 215, 0.8)"
        />
        <GenericButton
          v-if="buttonObject && buttonObject.updateBarcode.show"
          name="Update barcodes"
          pl="8"
          pt="2"
          pr="8"
          pb="2"
          textsize="14"
          bg="rgba(54, 155, 215, 0.8)"
        />
        <UniqueCheckbox
          v-if="buttonObject && buttonObject.numberOneInput.show"
          :def-label="'№'"
          @newValue="(value) => (tableHeaderValuesObj['numberOne'] = value)"
        />
        <GenericButton
          v-if="buttonObject && buttonObject.printBarcode.show"
          name="Print Barcode"
          pl="8"
          pt="2"
          pr="8"
          pb="2"
          textsize="14"
          bg="rgba(54, 155, 215, 0.8)"
        />
        <div class="flex">
          <UniqueCheckbox
            v-if="buttonObject && buttonObject.numberTwoInput.show"
            :def-label="'№2'"
            @newValue="(value) => (tableHeaderValuesObj['numberTwo'] = value)"
          />
        </div>
      </div>
      <div class="flex gap-[10px]">
        <div v-if="buttonObject && buttonObject.kroyLookUp.show" class="flex">
          <p>Kрой</p>
          <UniqueLookUp
            :custom-url="'invoiceBase/findAllKroyByFinal'"
            :custom-parameter="{ orderId: dataId }"
            @newValue="(value) => (tableHeaderValuesObj['kroy'] = value)"
          />
        </div>
        <div
          v-if="buttonObject && buttonObject.cardNumberInput.show"
          class="flex"
        >
          <p>Номер карты</p>
          <GenericInput
            @input="(value) => (tableHeaderValuesObj['cardNumber'] = value)"
          />
        </div>
        <div
          v-if="buttonObject && buttonObject.printBarcodeCheckbox.show"
          class="flex"
        >
          <UniqueCheckbox
            :def-label="'Печать Штрихкодов от я-а'"
            @newValue="
              (value) => (tableHeaderValuesObj['printBarcode'] = value)
            "
          />
        </div>
        <div
          v-if="buttonObject && buttonObject.allSimilarQtyCheckbox.show"
          class="flex"
        >
          <UniqueCheckbox
            :def-label="'Одинаковое кол-во для всех строк'"
            :def-value="true"
            @newValue="
              (value) => (tableHeaderValuesObj['similarQtyForAll'] = value)
            "
          />
        </div>
      </div>
    </div>
    <!-- {{ tableHeaderValuesObj }} -->
    <!-- CUSTOM TABLE BUTTONS ABOVE-->

    <!-- CUSTOM TABLE CONTENT BELOW -->
    <div
      v-if="showTable"
      class="overflow-scroll border-l-2 border-r-2 my-2"
      :style="'max-height:' + tableHeight + 'px'"
    >
      <table class="w-full text-[13px]">
        <thead v-if="visibleTableHeader" class="sticky top-0 z-[99]">
          <tr
            class="bg-[rgba(239,243,249)] hover:bg-gradient-to-b hover:from-transparent hover:via-transparent hover:to-[rgba(220,229,243,0.7)]"
          >
            <th
              class="border-[1px] border-[solid] border-[#778899] p-[2px] w-[50px]"
            >
              <div class="flex items-center justify-between">
                №
                <el-button
                  circle
                  size="mini"
                  icon="el-icon-d-caret"
                  class="h-[30px] w-[30px]"
                  @click="filterColumns('uniqueOrderNumber')"
                ></el-button>
              </div>
            </th>

            <th
              v-for="(item, index) in visibleTableHeader"
              :key="index"
              :style="{
                width: item.dwidth
                  ? item.dwidth + 'px'
                  : item.width
                  ? item.width + 'px'
                  : '',
              }"
              class="border-[1px] border-[solid] border-[#778899] p-[2px]"
            >
              <div
                class="flex items-center justify-between"
                :style="{
                  minWidth: item.dwidth
                    ? item.dwidth + 'px'
                    : item.width
                    ? item.width + 'px'
                    : '',
                }"
              >
                <p class="flex items-center justify-center w-[90%]">
                  {{ item.headerText ? item.headerText : item.name }}
                </p>
                <el-button
                  circle
                  size="mini"
                  icon="el-icon-d-caret"
                  class="h-[30px] w-[30px]"
                  @click="
                    filterColumns(item.uniqueId ? item.uniqueId : item.name)
                  "
                >
                </el-button>
              </div>
            </th>
            <td
              v-if="isCanEdit"
              class="border-[1px] border-[solid] border-[#778899] p-[5px] text-center"
            ></td>
          </tr>
          <tr>
            <td
              class="border-[1px] border-[solid] border-[#778899] p-[2px] w-[50px]"
            >
              <div class="flex justify-center">
                <UniqueInput
                  class="w-[50px]"
                  @newValue="
                    (newValue) => {
                      filterColumnsByInput(newValue, 'uniqueOrderNumber')
                    }
                  "
                />
              </div>
            </td>
            <td
              v-for="(item, index) in visibleTableHeader"
              :key="index"
              :style="{
                width: item.dwidth
                  ? item.dwidth + 'px'
                  : item.width
                  ? item.width + 'px'
                  : '',
              }"
              class="border-[1px] border-[solid] border-[#778899] p-[2px]"
            >
              <div class="flex justify-center">
                <UniqueInput
                  :style="{ width: item.dwidth ? item.dwidth + 'px' : '100%' }"
                  @newValue="
                    (newValue) => {
                      filterColumnsByInput(
                        newValue,
                        item.uniqueId ? item.uniqueId : item.name
                      )
                    }
                  "
                />
              </div>
            </td>
            <td
              v-if="isCanEdit"
              class="border-[1px] border-[solid] border-[#778899] p-[5px] text-center"
            ></td>
          </tr>
        </thead>
        <template v-if="visibleTableBody">
          <!-- non-editable body below -->
          <tbody v-show="!isCanEdit">
            <tr
              v-for="(object, index) in visibleTableBody"
              v-show="object.uniqueVisibleStatus"
              :key="index"
              :style="object.row_styles"
              :class="object.row_classes"
            >
              <td
                class="border-[1px] border-[solid] border-[#778899] p-[2px] w-[50px] text-center"
              >
                {{ object.uniqueOrderNumber }}
              </td>
              <td
                v-for="(item, id) in visibleTableHeader"
                :key="id"
                :style="combineStyles(object, item)"
                class="border-[1px] border-[solid] border-[#778899] p-[5px] text-center"
                :class="object[item.uniqueId + '_classes']"
              >
                <template v-if="item.type == 'list'">
                  {{ object[item.name].text }}
                </template>

                <template v-else-if="item.type == 'button'">
                  <GenericButton
                    class="text-center"
                    :name="object[item.name]"
                    pl="8"
                    pt="2"
                    pr="8"
                    pb="2"
                    textsize="14"
                    bg="#9760b3"
                    url=""
                    @click="tableCellBtnEvent(object, item.name)"
                  />
                </template>

                <template
                  v-else-if="
                    item.hasOwnProperty('uniqueId') &&
                    (item.uniqueId.toLowerCase().includes('picture') ||
                      item.uniqueId.toLowerCase().includes('image'))
                  "
                >
                  <div v-html="object[item.uniqueId]"></div>
                </template>

                <template
                  v-else-if="
                    item.hasOwnProperty('uniqueId') &&
                    typeof object[item.uniqueId] === 'string' &&
                    object[item.uniqueId].includes('</a>')
                  "
                >
                  <div
                    class="hover:underline cursor-pointer text-sky-500"
                    :class="{
                      label: object[item.uniqueId].includes('btn'),
                      'label-important':
                        object[item.uniqueId].includes('btn-important'),
                      'label-success':
                        object[item.uniqueId].includes('btn-success'),
                    }"
                    v-html="object[item.uniqueId].replace('?id=', '/')"
                  ></div>
                </template>

                <template
                  v-else-if="
                    item.hasOwnProperty('uniqueId') &&
                    typeof object[item.uniqueId] === 'string' &&
                    object[item.uniqueId].includes('</span>')
                  "
                >
                  <div
                    :class="{
                      label: object[item.uniqueId].includes('label'),
                      'label-important':
                        object[item.uniqueId].includes('label-important'),
                      'label-success':
                        object[item.uniqueId].includes('label-success'),
                    }"
                    v-html="object[item.uniqueId]"
                  ></div>
                </template>

                <template
                  v-else-if="
                    item.hasOwnProperty('uniqueId') &&
                    object[item.uniqueId] &&
                    typeof object[item.uniqueId] === 'object' &&
                    object[item.uniqueId].textContentStr.includes('</a>')
                  "
                >
                  <div
                    class="hover:underline cursor-pointer text-sky-500"
                    @click="
                      $emit(
                        'setZeroAfterClick',
                        object[item.uniqueId].emitValuesObj
                      )
                    "
                    v-html="object[item.uniqueId].textContentStr"
                  ></div>
                </template>

                <template
                  v-else-if="
                    item.hasOwnProperty('uniqueId') &&
                    typeof object[item.uniqueId] === 'string' &&
                    object[item.uniqueId].includes('<br>')
                  "
                >
                  <div v-html="object[item.uniqueId]"></div>
                </template>

                <!-- test start -->
                <template
                  v-else-if="
                    item.hasOwnProperty('uniqueId') &&
                    typeof object[item.uniqueId] === 'boolean'
                  "
                >
                  {{ object[item.uniqueId] }}
                  <UniqueCheckbox
                    :def-value="object[item.uniqueId]"
                    @newValue="
                      (value) =>
                        $emit('columnCheckboxValue', {
                          key: item.uniqueId,
                          value,
                          index,
                        })
                    "
                  />
                </template>
                <!-- test end -->

                <template v-else>
                  {{
                    object[item.uniqueId] || object[item.uniqueId] === 0
                      ? object[item.uniqueId]
                      : object[item.name]
                  }}
                </template>
              </td>
              <td
                v-if="isCanEdit"
                class="border-[1px] border-[solid] border-[#778899] p-[5px] text-center"
              >
                <el-button
                  icon="el-icon-delete-solid"
                  circle
                  @click="deleteRowElement(object.id)"
                ></el-button>
              </td>
            </tr>
          </tbody>

          <!-- editable body below -->
          <!-- visibleTableBody -->
          <tbody v-show="isCanEdit">
            <tr
              v-for="(object, index) in visibleTableBody"
              v-show="object.uniqueVisibleStatus"
              :key="index"
              :style="object.row_styles"
              :class="object.row_classes"
            >
              <td
                class="border-[1px] border-[solid] border-[#778899] p-[2px] w-[50px] text-center"
              >
                {{ object.uniqueOrderNumber }}
              </td>
              <td
                v-for="(item, id) in visibleTableHeader"
                :key="id"
                :style="combineStyles(object, item)"
                class="border-[1px] border-[solid] border-[#778899] p-[5px] text-center"
                :class="object[item.uniqueId + '_classes']"
              >
                <!-- :style="{ width: item.dwidth + 'px' }" -->
                <template v-if="item.type == 'label'">
                  {{ object[item.name] }}
                </template>

                <template v-else-if="item.type == 'list'">
                  <UniqueLookUp
                    :custom-url="item.durl"
                    :def-value="object[item.name]"
                  />
                </template>

                <template v-else-if="item.type == 'float'">
                  <UniqueInput
                    :def-type="'number'"
                    :def-value="object[item.name]"
                    @newValue="(value) => (object[item.name] = value)"
                  />
                </template>

                <template v-else-if="item.type == 'button'">
                  <GenericButton
                    class="text-center"
                    :name="object[item.name]"
                    pl="8"
                    pt="2"
                    pr="8"
                    pb="2"
                    textsize="14"
                    bg="#9760b3"
                    url=""
                  />
                </template>

                <template v-else-if="item.type == 'checkbox'">
                  <UniqueCheckbox
                    :def-value="object[item.name]"
                    @newValue="(value) => (object[item.name] = value)"
                  />
                </template>

                <template v-else>
                  {{ object[item.name] }}
                </template>
              </td>
              <td
                v-if="isCanEdit"
                class="border-[1px] border-[solid] border-[#778899] p-[5px] text-center"
              >
                <el-button
                  icon="el-icon-delete-solid"
                  circle
                  @click="deleteRowElement(object.id)"
                ></el-button>
              </td>
            </tr>
          </tbody>
          <!-- test -->
        </template>
        <tfoot>
          <tr class="bg-cyan-100">
            <td
              class="border-[1px] border-[solid] border-[#778899] p-[2px] w-[50px] text-center"
            >
              Total:
            </td>
            <td
              v-for="(item, id) in visibleTableHeader"
              :key="id"
              :style="{ width: item.dwidth + 'px' }"
              class="border-[1px] border-[solid] border-[#778899] p-[5px] text-center"
            >
              <!-- {{ totalValuesObj }} -->

              {{
                totalValuesObj[item.uniqueId] ||
                totalValuesObj[item.uniqueId] === 0
                  ? totalValuesObj[item.uniqueId]
                  : totalValuesObj[item.name] || totalValuesObj[item.name] === 0
                  ? totalValuesObj[item.name]
                  : ''
              }}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
    <!-- CUSTOM TABLE CONTENT ABOVE -->
  </div>
</template>
<script>
// icons
import goBack from '@assets/icons/go-back.png'
import copy from '@assets/icons/copy.png'
import setting from '@assets/icons/settings.png'
import printer from '@assets/icons/printer.png'
import del from '@assets/icons/delete.png'
import edit from '@assets/icons/editIcon.svg'
// components
import GenericInput from '@generics/GenericInput.vue'
import GenericButton from '@generics/GenericButton.vue'
// unique components
import UniqueLookUp from '@components/UniqueComponents/UniqueLookUp.vue'
import UniqueInput from '@components/UniqueComponents/UniqueInput.vue'
import UniqueCheckbox from '@components/UniqueComponents/UniqueCheckbox.vue'
import UniqueColumnConfig from '@components/UniqueComponents/UniqueColumnConfig.vue'
export default {
  components: {
    GenericInput,
    GenericButton,
    // unique components
    UniqueLookUp,
    UniqueInput,
    UniqueCheckbox,
    UniqueColumnConfig,
  },
  props: {
    actionUrl: {
      type: String,
      default: '',
    },
    tableHeader: {
      type: [Array, Object],
      default: () => {},
    },
    // tableBody need to be send with 'uniqueOrderNumber' key with respective numbers, 'uniqueVisibleStatus' key to be only true => need for input filter
    tableBody: {
      type: Array,
      default: () => {},
    },
    dataId: {
      type: [Number, String],
      default: '',
    },
    buttonObject: {
      type: Object,
      default: () => {},
    },
    tableHeight: {
      type: Number,
      default: 350,
    },
  },
  data() {
    return {
      showTable: true,
      visibleTableHeader: [],
      visibleTableBody: [],
      hiddenTableHeader: [],
      img: {
        goBack,
        copy,
        setting,
        printer,
        del,
        edit,
      },
      bodyDataArrCopy: [],
      isCanEdit: false,

      showModal: false, // column config
      tableActionUrl: this.actionUrl, // actionUrl for columnConfig

      sortStatus: false,

      // header input and selector elements values
      tableHeaderValuesObj: {
        numberOne: '',
        numberTwo: '',
        kroy: '',
        cardNumber: '',
        printBarcode: '',
        similarQtyForAll: true,
      },

      totalValuesObj: {},
    }
  },
  watch: {
    tableHeader: {
      handler(newValue) {
        if (Array.isArray(newValue)) {
          const visibleHeader = newValue.filter((obj) => obj.showUI === true)
          const hiddenHeader = newValue.filter((obj) => obj.showUI !== true)
          this.visibleTableHeader = visibleHeader
          this.hiddenTableHeader = hiddenHeader
        } else if (typeof newValue === 'object') {
          const objectKeysArr = Object.keys(newValue)
          for (const item of objectKeysArr) {
            newValue[item].uniqueId = item
          }
          this.visibleTableHeader = newValue
        }
      },
      immediate: true,
    },
    tableBody: {
      handler(newValue) {
        this.visibleTableBody = newValue
        for (const key in this.tableHeader) {
          let totalAmount = 0
          this.visibleTableBody.forEach((obj) => {
            if (
              obj.uniqueVisibleStatus &&
              obj[key] &&
              typeof obj[key] === 'number' &&
              !key.toLowerCase().includes('id') &&
              !key.toLowerCase().includes('year') &&
              !key.toLowerCase().includes('number')
            ) {
              totalAmount += obj[key]
            } else if (
              obj[key] &&
              (typeof obj[key] === 'string' || typeof obj[key] === 'object')
            ) {
              totalAmount = ''
            }
          })
          this.totalValuesObj[key] = this.formatNumberWithSpaces(totalAmount)
        }
        this.bodyDataArrCopy = JSON.parse(JSON.stringify(this.visibleTableBody))
      },
      immediate: true,
    },
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal
    },
    filterColumns(name) {
      if (!this.sortStatus) {
        this.visibleTableBody.sort((a, b) => {
          const nameA = typeof a[name] === 'object' ? a[name]?.text : a[name]
          const nameB = typeof b[name] === 'object' ? b[name]?.text : b[name]
          if (nameA > nameB) {
            return -1
          } else if (nameA < nameB) {
            return 1
          } else {
            return 0
          }
        })
        this.sortStatus = true
      } else {
        this.visibleTableBody.sort((a, b) => {
          const nameA = typeof a[name] === 'object' ? a[name]?.text : a[name]
          const nameB = typeof b[name] === 'object' ? b[name]?.text : b[name]
          if (nameA < nameB) {
            return -1
          } else if (nameA > nameB) {
            return 1
          } else {
            return 0
          }
        })
        this.sortStatus = false
      }
    },
    filterColumnsByInput(value, name) {
      this.visibleTableBody.forEach((item, index) => {
        const currentData =
          typeof item[name] === 'object' ? item[name]?.text : item[name]
        const stringData = String(currentData)
        value = String(value).toLowerCase()

        if (value || value.length > 0) {
          if (stringData.toLowerCase().includes(value)) {
            item.uniqueVisibleStatus = true
          } else {
            item.uniqueVisibleStatus = false
          }
        } else {
          item.uniqueVisibleStatus = true
        }
        this.visibleTableBody.splice(index, 1, item)
      })
    },
    saveTableChanges() {
      this.$emit('newTableValues', this.visibleTableBody)
    },
    discardChanges() {
      this.visibleTableBody = this.bodyDataArrCopy
    },
    deleteRowElement(itemId) {
      this.$emit('deleteRow', itemId)
    },
    tableCellBtnEvent(object, element) {
      const data = {
        object,
        element,
      }
      this.$emit('tableBtnEvent', data)
    },
    formatNumberWithSpaces(number) {
      if (typeof number === 'number' && number) {
        return new Intl.NumberFormat('en-US', {
          useGrouping: true,
          minimumFractionDigits: 0,
        })
          .format(number)
          .replace(/,/g, ' ')
      }
    },
    combineStyles(object, item) {
      const baseStyle = item.dwidth
        ? `width: ${item.dwidth}px;`
        : item.width
        ? `width: ${item.width}px;`
        : ''
      const additionalStyles = object[item.uniqueId + '_styles'] || ''
      return baseStyle + additionalStyles
    },
  },
}
</script>
<style scoped>
.label {
  padding: 2px 4px;
  border-radius: 5px;
  color: white;
}

.label-success {
  background-color: #669533 !important;
}

.label-important {
  background-color: #bd4247;
}
</style>
