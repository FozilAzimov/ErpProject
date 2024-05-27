<template>
  <div
    class="w-[90%] max-h-[85vh] p-3 rounded-md overflow-auto bg-[rgb(208,225,243)] shadow-[0px_0px_50px_rgba(0,0,0,0.2)] flex justify-between"
  >
    <LoadingPage
      v-if="isLoading"
      class="fixed left-[50%] top-[8px] translate-x-[-50%]"
    />
    <div class="w-full">
      <div class="flex items-center justify-between gap-5">
        <h2 class="font-bold text-[rgb(49,126,172)]">Filtering</h2>
        <div class="flex items-center justify-between gap-2">
          <GenericButton
            name="Accept"
            pl="8"
            pt="2"
            pr="8"
            pb="2"
            bg="rgb(119,191,120)"
            textsize="13"
            @click="acceptAction"
          />
          <GenericButton
            name="Close"
            pl="8"
            pt="2"
            pr="8"
            pb="2"
            bg="rgb(245,108,108)"
            textsize="13"
            @click="closeAction"
          />
        </div>
      </div>

      <!-- Line -->
      <span class="block h-[1px] w-full bg-[rgb(119,136,153)] my-2"></span>
      <!-- Line -->

      <div>
        <div
          v-if="$route.path.includes('prepareProductionInvoiceNew.htm')"
          class="flex items-end justify-between gap-2 h-[50px]"
        >
          <span class="flex flex-col items-start">
            <label class="text-[13px] font-medium whitespace-nowrap pl-1"
              >Date from</label
            >
            <generic-input-date-page
              width="165"
              height="30"
              pl="10"
              pr="10"
              pt="1"
              pb="1"
              textsize="13"
              type="datetime-local"
              valuecolor="rgba(0,0,0,0.7)"
              name="date_from"
              :value="new Date().toISOString().split('.')[0]"
              @customFunction="getDateValue"
            />
          </span>

          <span class="flex flex-col items-start">
            <label class="text-[13px] font-medium whitespace-nowrap pl-1"
              >Date to</label
            >
            <generic-input-date-page
              width="165"
              height="30"
              pl="10"
              pr="10"
              pt="1"
              pb="1"
              textsize="13"
              type="datetime-local"
              valuecolor="rgba(0,0,0,0.7)"
              name="date_to"
              :value="new Date().toISOString().split('.')[0]"
              @customFunction="getDateValue"
            />
          </span>

          <span class="flex flex-col items-start">
            <label class="text-[13px] font-medium whitespace-nowrap pl-1"
              >Planing No</label
            >
            <generic-input
              pl="8"
              pr="8"
              pt="2"
              pb="2"
              textsize="13"
              type="number"
              width="100"
              widthtype="%"
              name="planing"
              @customFunction="getInputValue"
            />
          </span>

          <span class="flex flex-col items-start">
            <label class="text-[13px] font-medium whitespace-nowrap pl-1"
              >Planing Type</label
            >
            <look-up
              dwidth="100"
              widthtype="%"
              dlist="100"
              durl="invoice/findAllPlanningType"
              name="planing_type"
              @customFunction="getLookUpValue"
            />
          </span>

          <span class="flex flex-col items-start">
            <label class="text-[13px] font-medium whitespace-nowrap pl-1"
              >Client Order</label
            >
            <generic-input
              pl="8"
              pr="8"
              pt="2"
              pb="2"
              textsize="13"
              type="text"
              width="100"
              widthtype="%"
              name="client_order"
              @customFunction="getInputValue"
            />
          </span>

          <span class="flex flex-col items-start">
            <label class="text-[13px] font-medium whitespace-nowrap pl-1"
              >Order</label
            >
            <generic-input
              pl="8"
              pr="8"
              pt="2"
              pb="2"
              textsize="13"
              type="text"
              width="100"
              widthtype="%"
              name="order"
              @customFunction="getInputValue"
            />
          </span>

          <span class="flex flex-col items-start">
            <label class="text-[13px] font-medium whitespace-nowrap pl-1"
              >Client Company</label
            >
            <look-up
              dwidth="100"
              widthtype="%"
              dlist="100"
              durl="invoice/findAllCompanyForInvoice"
              name="client_company"
              @customFunction="getLookUpValue"
            />
          </span>

          <span class="flex flex-col items-start">
            <label class="text-[13px] font-medium whitespace-nowrap pl-1"
              >Department</label
            >
            <look-up
              dwidth="100"
              widthtype="%"
              dlist="100"
              durl="invoice/findAllDepartment"
              name="department"
              @customFunction="getLookUpValue"
            />
          </span>

          <span class="flex flex-col items-start">
            <label class="text-[13px] font-medium whitespace-nowrap pl-1"
              >Start/Stop</label
            >
            <look-up
              dwidth="100"
              widthtype="%"
              dlist="100"
              durl="invoice/findAllPlanOpenOrClose"
              name="start_stop"
              @customFunction="getLookUpValue"
            />
          </span>

          <span class="flex items-center">
            <generic-input
              type="checkbox"
              class="cursor-pointer"
              name="keep"
              @customFunction="getInputValue"
            />
            <label class="text-[12px] whitespace-nowrap pl-1"
              >Keep Window</label
            >
          </span>

          <generic-button
            name="Get"
            pl="10"
            pt="3"
            pr="10"
            pb="3"
            bg="rgba(54, 155, 215, 0.8)"
            textsize="13"
            @click="getResponseData('less')"
          />
        </div>

        <div v-else class="flex items-center justify-between gap-2">
          <div class="flex flex-col items-start gap-1 h-[150px]">
            <span class="flex flex-col items-start">
              <label class="text-[13px] font-medium whitespace-nowrap pl-1"
                >Product</label
              >
              <look-up
                dwidth="100"
                widthtype="%"
                dlist="100"
                durl="invoiceBase/findAllStockProductListUrl"
                name="product"
                :dparam="allParams"
                @customFunction="getLookUpValue"
              />
            </span>
            <span class="flex flex-col items-start">
              <label class="text-[13px] font-medium whitespace-nowrap pl-1"
                >Client Company</label
              >
              <look-up
                dwidth="100"
                widthtype="%"
                dlist="100"
                durl="invoiceBase/findAllCompanyForInvoice"
                name="clientCompany"
                @customFunction="getLookUpValue"
              />
            </span>
            <span class="flex flex-col items-start">
              <label class="text-[13px] font-medium whitespace-nowrap pl-1"
                >Pr Order</label
              >
              <look-up
                dwidth="100"
                widthtype="%"
                dlist="100"
                durl="invoiceBase/findAllPrOrder"
                name="order"
                @customFunction="getLookUpValue"
              />
            </span>
          </div>

          <div class="flex flex-col items-start gap-1 h-[150px]">
            <span class="flex flex-col items-start">
              <label class="text-[13px] font-medium whitespace-nowrap pl-1"
                >Qty
                <span v-if="bodyData.length" class="text-[maroon]"
                  >max = {{ qtyMaxValue }}</span
                ></label
              >
              <generic-input
                pl="8"
                pr="8"
                pt="2"
                pb="2"
                textsize="13"
                type="number"
                width="100"
                widthtype="%"
                name="top_qty"
                :max-value="qtyMaxValue"
                @customFunction="getInputValue"
                @setMAXvalue="setMAXvalue"
              />
            </span>
            <span class="flex flex-col items-start">
              <label class="text-[13px] font-medium whitespace-nowrap pl-1"
                >Batch</label
              >
              <generic-input
                pl="8"
                pr="8"
                pt="2"
                pb="2"
                textsize="13"
                type="text"
                width="100"
                widthtype="%"
                name="batch"
                @customFunction="getInputValue"
              />
            </span>
            <span class="flex flex-col items-start">
              <label class="text-[13px] font-medium whitespace-nowrap pl-1"
                >Packing Type</label
              >
              <look-up
                dwidth="100"
                widthtype="%"
                dlist="100"
                durl="invoice/findAllSewModelPackingType"
                name="packingType"
                @customFunction="getLookUpValue"
              />
            </span>
          </div>

          <div class="flex flex-col items-start gap-1 h-[150px]">
            <span class="flex flex-col items-start">
              <label class="text-[13px] font-medium whitespace-nowrap pl-1"
                >pack qty
                <span v-if="bodyData.length" class="text-[maroon]"
                  >max = {{ packQtyMaxValue }}</span
                ></label
              >
              <generic-input
                pl="8"
                pr="8"
                pt="2"
                pb="2"
                textsize="13"
                type="number"
                width="100"
                widthtype="%"
                name="packQty"
                :max-value="packQtyMaxValue"
                @customFunction="getInputValue"
                @setMAXvalue="setMAXvalue"
              />
            </span>
            <span class="flex flex-col items-start">
              <label class="text-[13px] font-medium whitespace-nowrap pl-1"
                >Lot</label
              >
              <generic-input
                pl="8"
                pr="8"
                pt="2"
                pb="2"
                textsize="13"
                type="text"
                width="100"
                widthtype="%"
                name="lot"
                @customFunction="getInputValue"
              />
            </span>
            <span class="flex flex-col items-start">
              <label class="text-[13px] font-medium whitespace-nowrap pl-1"
                >Color</label
              >
              <look-up
                dwidth="100"
                widthtype="%"
                dlist="100"
                durl="invoice/findAllColor"
                name="color"
                @customFunction="getLookUpValue"
              />
            </span>
          </div>

          <div class="flex flex-col items-start gap-1 h-[150px]">
            <span class="flex flex-col items-start">
              <label class="text-[13px] font-medium whitespace-nowrap pl-1"
                >Item Barcode</label
              >
              <generic-input
                pl="8"
                pr="8"
                pt="2"
                pb="2"
                textsize="13"
                type="number"
                width="100"
                widthtype="%"
                name="itemBarcode"
                @customFunction="getInputValue"
              />
            </span>
            <span class="flex flex-col items-start">
              <label class="text-[13px] font-medium whitespace-nowrap pl-1"
                >Pus</label
              >
              <generic-input
                pl="8"
                pr="8"
                pt="2"
                pb="2"
                textsize="13"
                type="number"
                width="100"
                widthtype="%"
                name="pus"
                @customFunction="getInputValue"
              />
            </span>
            <span class="flex flex-col items-start">
              <label class="text-[13px] font-medium whitespace-nowrap pl-1"
                >Color Variant</label
              >
              <look-up
                dwidth="100"
                widthtype="%"
                dlist="100"
                durl="invoice/findAllColorVariant"
                name="colorVariant"
                @customFunction="getLookUpValue"
              />
            </span>
          </div>

          <div class="flex flex-col items-start gap-1 h-[150px]">
            <span class="flex flex-col items-start">
              <label class="text-[13px] font-medium whitespace-nowrap pl-1"
                >Product Barcode</label
              >
              <generic-input
                pl="8"
                pr="8"
                pt="2"
                pb="2"
                textsize="13"
                type="text"
                width="100"
                widthtype="%"
                name="productBarcode"
                @customFunction="getInputValue"
              />
            </span>
            <span class="flex flex-col items-start">
              <label class="text-[13px] font-medium whitespace-nowrap pl-1"
                >Feine</label
              >
              <generic-input
                pl="8"
                pr="8"
                pt="2"
                pb="2"
                textsize="13"
                type="number"
                width="100"
                widthtype="%"
                name="feine"
                @customFunction="getInputValue"
              />
            </span>
            <span class="flex flex-col items-start">
              <label class="text-[13px] font-medium whitespace-nowrap pl-1"
                >Design</label
              >
              <look-up
                dwidth="100"
                widthtype="%"
                dlist="100"
                durl="invoice/findAllDesign"
                name="design"
                @customFunction="getLookUpValue"
              />
            </span>
          </div>

          <div class="flex flex-col items-start gap-1 h-[150px]">
            <span class="flex flex-col items-start">
              <label class="text-[13px] font-medium whitespace-nowrap pl-1"
                >Common Barcode</label
              >
              <generic-input
                pl="8"
                pr="8"
                pt="2"
                pb="2"
                textsize="13"
                type="text"
                width="100"
                widthtype="%"
                name="commonBarcode"
                @customFunction="getInputValue"
              />
            </span>
            <span class="flex flex-col items-start">
              <label class="text-[13px] font-medium whitespace-nowrap pl-1"
                >Gramm</label
              >
              <generic-input
                pl="8"
                pr="8"
                pt="2"
                pb="2"
                textsize="13"
                type="number"
                width="100"
                widthtype="%"
                name="gramm"
                @customFunction="getInputValue"
              />
            </span>
            <span class="flex flex-col items-start">
              <label class="text-[13px] font-medium whitespace-nowrap pl-1"
                >Design Variant</label
              >
              <look-up
                dwidth="100"
                widthtype="%"
                dlist="100"
                durl="invoice/findAllDesignVariant"
                name="designVariant"
                @customFunction="getLookUpValue"
              />
            </span>
          </div>

          <div class="flex flex-col items-start gap-1 h-[150px]">
            <span class="flex flex-col items-start">
              <label class="text-[13px] font-medium whitespace-nowrap pl-1"
                >External Barcode</label
              >
              <generic-input
                pl="8"
                pr="8"
                pt="2"
                pb="2"
                textsize="13"
                type="text"
                width="100"
                widthtype="%"
                name="externalBarcode"
                @customFunction="getInputValue"
              />
            </span>
            <span class="flex flex-col items-start">
              <label class="text-[13px] font-medium whitespace-nowrap pl-1"
                >fiberClass</label
              >
              <look-up
                dwidth="100"
                widthtype="%"
                dlist="100"
                durl="invoice/findAllQualityFiberClass"
                name="fiberClass"
                @customFunction="getLookUpValue"
              />
            </span>
            <span class="flex flex-col items-start">
              <label class="text-[13px] font-medium whitespace-nowrap pl-1"
                >Client Order</label
              >
              <generic-input
                pl="8"
                pr="8"
                pt="2"
                pb="2"
                textsize="13"
                type="text"
                width="100"
                widthtype="%"
                name="clientOrder"
                @customFunction="getInputValue"
              />
            </span>
          </div>

          <div class="flex flex-col items-start gap-1 h-[150px]">
            <span class="flex flex-col items-start">
              <label class="text-[13px] font-medium whitespace-nowrap pl-1"
                >Equipments</label
              >
              <look-up
                dwidth="100"
                widthtype="%"
                dlist="100"
                durl="invoice/findAllEquipments"
                name="equipments"
                @customFunction="getLookUpValue"
              />
            </span>
            <span class="flex flex-col items-start">
              <label class="text-[13px] font-medium whitespace-nowrap pl-1"
                >Size</label
              >
              <look-up
                dwidth="100"
                widthtype="%"
                dlist="100"
                durl="invoice/findAllSewModelVariantSize"
                name="size"
                @customFunction="getLookUpValue"
              />
            </span>
            <span class="flex flex-col items-start">
              <label class="text-[13px] font-medium whitespace-nowrap pl-1"
                >Packing Number</label
              >
              <generic-input
                pl="8"
                pr="8"
                pt="2"
                pb="2"
                textsize="13"
                type="text"
                width="100"
                widthtype="%"
                name="packingNumber"
                @customFunction="getInputValue"
              />
            </span>
          </div>

          <div
            class="flex flex-col items-start justify-between h-[150px] gap-1"
          >
            <span class="flex items-center">
              <generic-input
                pl="8"
                pr="8"
                pt="2"
                pb="2"
                textsize="13"
                type="checkbox"
                class="cursor-pointer"
                name="keep"
                @customFunction="getInputValue"
              />
              <label class="text-[12px] whitespace-nowrap pl-1"
                >Keep Window</label
              >
            </span>
            <span class="flex items-center">
              <generic-input
                pl="8"
                pr="8"
                pt="2"
                pb="2"
                textsize="13"
                type="checkbox"
                class="cursor-pointer"
                name="all"
                @customFunction="getInputValue"
              />
              <label class="text-[12px] whitespace-nowrap pl-1"
                >All Componies</label
              >
            </span>
            <span class="flex items-center">
              <generic-input
                type="checkbox"
                class="cursor-pointer"
                name="defect"
                @customFunction="getInputValue"
              />
              <label class="text-[12px] whitespace-nowrap pl-1">Defect</label>
            </span>
            <span class="flex flex-col items-start">
              <label class="text-[13px] font-medium whitespace-nowrap pl-1"
                >Grade</label
              >
              <look-up
                dwidth="100"
                widthtype="%"
                dlist="100"
                durl="invoice/findAllGradeWithNullValue"
                name="grade"
                @customFunction="getLookUpValue"
              />
            </span>
          </div>
        </div>

        <div class="w-full h-[550px] overflow-scroll mt-2">
          <table class="w-full">
            <thead
              class="bg-[rgb(229,235,245)] sticky z-[998] top-[1px] shadow-md text-center"
            >
              <tr>
                <th
                  class="text-[13px] font-semibold border-[1px] border-solid border-[rgb(169,184,199)] p-4"
                >
                  №
                </th>
                <th
                  v-for="(headName, key) in headData"
                  :key="key"
                  class="text-[13px] font-semibold border-[1px] border-solid border-[rgb(169,184,199)] p-4 whitespace-nowrap"
                  :class="
                    headName.width
                      ? `w-[${headName.width}px]`
                      : `w-[${headName.dwidth}px]`
                  "
                >
                  {{ headName.headerText }}
                  <span
                    v-if="headName.name === 'qty'"
                    class="block min-h-[22px] h-[100%] bg-[rgb(83,201,107)] p-[2px_15px] text-[12px] font-normal text-white"
                    >{{ totalQty }}</span
                  >
                </th>
              </tr>
              <tr>
                <td
                  class="text-[12px] border-[1px] border-solid border-[rgb(169,184,199)] p-2"
                >
                  <GenericInput
                    width="50"
                    height="20"
                    pl="8"
                    pr="8"
                    pt="1"
                    pb="1"
                    textsize="11"
                    type="text"
                  />
                </td>
                <td
                  v-for="(item, inx) in headData"
                  :key="inx"
                  class="text-[12px] border-[1px] border-solid border-[rgb(169,184,199)] p-2"
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
                  />
                </td>
              </tr>
            </thead>

            <tbody class="bg-white">
              <tr
                v-for="(row, indexOne) in bodyData.length
                  ? bodyData
                  : oldBodyData"
                :key="indexOne"
                class="bg-gradient-to-b from-transparent via-transparent to-[#F4F4F4] text-center"
              >
                <td
                  class="border-[1px] border-solid border-[rgb(169,184,199)] text-[12px] p-2 text-center"
                >
                  {{ indexOne + 1 }}
                </td>
                <td
                  v-for="(item, indexToo) in headData"
                  :key="indexToo"
                  class="border-[1px] border-solid border-[rgb(169,184,199)] text-[12px] p-2"
                >
                  <LookUp
                    v-if="
                      item?.editableElement !== false && item.type == 'list'
                    "
                    :order="indexOne"
                    :name="item.name"
                    :result-type="item.resultType"
                    :durl="`${
                      item?.durl === 'findAllEquipments'
                        ? 'productionReports'
                        : 'invoiceBase'
                    }/${item.durl}`"
                    :dwidth="`${item.dwidth}`"
                    @customFunction="getBodyLookUpValue"
                  />
                  <generic-input
                    v-else-if="
                      item?.editableElement !== false &&
                      item?.type == 'checkbox'
                    "
                    :order="indexOne"
                    :name="item.name"
                    :type="item?.type"
                    @customFunction="getBodyInputValue"
                  />
                  <generic-input
                    v-else-if="item?.editableElement !== false"
                    :value="
                      item.name === 'qty'
                        ? bodyAllInputLookUpValues?.[indexOne]?.[item.name]
                        : row[item.name]
                    "
                    :order="indexOne"
                    :name="item.name"
                    width="150"
                    height="20"
                    pl="8"
                    pr="8"
                    pt="5"
                    pb="5"
                    textsize="11"
                    :type="
                      item?.type === 'float' || item?.type === 'hidden'
                        ? 'number'
                        : 'text'
                    "
                    :limited-value="oldBodyData"
                    :is-it-limited-value="isItLimitedValue"
                    @customFunction="getBodyInputValue"
                    @setMAXvalue="setMAXvalue"
                  />

                  <span
                    v-else-if="
                      row[item.name] && typeof row[item.name] === 'object'
                    "
                    >{{ row[item.name]['text'] }}</span
                  >
                  <span v-else-if="row[item.name] && item.type === 'date'">{{
                    new Date(row[item.name])
                      .toLocaleString('en-GB')
                      .split(',')
                      .join('')
                  }}</span>
                  <img
                    v-else-if="item.type === 'file_image'"
                    src="../../assets/images/no-image.png"
                    class="w-[60px]"
                  />
                  <span
                    v-else-if="
                      item.name === 'realCount' && clickedRalCount[indexOne]
                    "
                    class="text-red-700 font-semibold cursor-pointer"
                    @click="
                      setValueQtyAction(item.name, row[item.name], indexOne)
                    "
                    >{{ row[item.name] }}</span
                  >
                  <span
                    v-else-if="item.name === 'realCount'"
                    class="text-red-700 font-semibold cursor-pointer"
                    @click="
                      setValueQtyAction(item.name, row[item.name], indexOne)
                    "
                    >{{ row[item.name] }}</span
                  >
                  <span v-else>{{ row[item.name] }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GenericButton from '../Button/GenericButton.vue'
import GenericInput from '../Input/GenericInput.vue'
import GenericInputDatePage from '../InputDate/GenericInputDatePage.vue'
import LookUp from '../Lookup/LookUp.vue'

export default {
  components: {
    GenericButton,
    LookUp,
    GenericInput,
    GenericInputDatePage,
  },

  // Props
  props: {
    tableHead: {
      type: Array,
      default: () => [],
    },
    filteringModalPayloadData: {
      type: Object,
      default: () => ({}),
    },
  },

  // Data
  data() {
    return {
      isLoading: false,
      headData: [],
      oldBodyData: [],
      bodyData: [],
      allInputLookUpValues: {},
      bodyAllInputLookUpValues: [],
      qtyMaxValue: 0,
      packQtyMaxValue: 0,
      totalQty: null,
      isItLimitedValue: false,
      clickedRalCount: [],
      tableBodyAllData: [],
      allParams: {},
    }
  },

  // Watch
  watch: {
    tableHead: {
      handler(val) {
        this.headData = val
      },
      deep: true,
    },

    oldBodyData: {
      handler(val) {
        if (val.length) {
          // function
          this.qtyMaxValueAction()
        }
      },
      deep: true,
    },

    bodyData: {
      handler(val) {
        if (val.length) {
          // function
          this.qtyMaxValueAction()
        }
      },
      deep: true,
    },
  },

  // Mounted
  mounted() {
    this.headData = this.tableHead
    this.allParamsAction()
  },

  // Methods
  methods: {
    // Modal close
    closeAction() {
      this.$emit('customCloseAction', false)
    },

    // =====================================================
    // LookUp value'sini olish
    getLookUpValue(name, valueID, order, resultType) {
      this.allInputLookUpValues[name] = valueID
      if (name === 'product' && valueID) this.getResponseData('all')
    },
    // Input value'sini olish
    getInputValue(name, value) {
      this.allInputLookUpValues[name] = value
    },
    // Input value'sini olish
    getDateValue(name, value, rowID) {
      this.allInputLookUpValues[name] = value
    },
    // =====================================================

    // =====================================================
    // Body LookUp value'sini olish
    getBodyLookUpValue(name, valueID, order, resultType) {
      if (this.bodyAllInputLookUpValues?.[order] && resultType === 'object') {
        this.$set(this.bodyAllInputLookUpValues[order], name, { id: valueID })
      } else if (
        this.bodyAllInputLookUpValues?.[order] &&
        resultType !== 'object'
      ) {
        this.$set(this.bodyAllInputLookUpValues[order], name, valueID)
      } else if (resultType === 'object') {
        this.bodyAllInputLookUpValues.push({
          [name]: { id: valueID },
        })
      } else {
        this.bodyAllInputLookUpValues.push({
          [name]: valueID,
        })
      }
    },
    // Body Input value'sini olish
    getBodyInputValue(name, value, order) {
      if (this.bodyAllInputLookUpValues?.[order]) {
        this.$set(this.bodyAllInputLookUpValues[order], name, value)
      } else {
        this.bodyAllInputLookUpValues.push({
          [name]: value,
        })
      }

      // function
      name === 'qty' && this.qtyAndRealCountAction(name, value, order)
    },
    // =====================================================

    // Qty and RealCount action
    qtyAndRealCountAction(name, value, order) {
      this.clickedRalCount[order] = false
      const updatedBodyData = this.bodyData.map((obj) => ({ ...obj }))
      updatedBodyData[order].realCount = this.oldBodyData?.[order]?.realCount
      this.bodyData = updatedBodyData

      if (value > this.oldBodyData?.[order]?.realCount) {
        this.isItLimitedValue = true

        this.bodyAllInputLookUpValues[order][name] =
          this.oldBodyData[order].realCount
      } else {
        this.isItLimitedValue = false
      }

      // function
      this.qtyTotalSummAction()
      // function
      this.createNewBodyDataAction()
    },

    // qty summ action
    qtyTotalSummAction() {
      this.totalQty = null
      this.bodyAllInputLookUpValues.forEach((obj) => {
        this.totalQty += Number(obj.qty)
      })
    },

    // Set value qty input | RealCount click qilganda ishlaydi
    setValueQtyAction(name, value, order) {
      this.clickedRalCount[order] = true
      const updatedBodyData = this.bodyData.map((obj) => ({ ...obj }))
      if (value) {
        this.bodyAllInputLookUpValues[order] = { qty: value }
        updatedBodyData[order][name] = 0
      } else {
        this.bodyAllInputLookUpValues[order].qty = ''
        updatedBodyData[order][name] = this.oldBodyData?.[order]?.[name]
      }
      this.bodyData = updatedBodyData

      // function
      this.qtyTotalSummAction()
    },

    allParamsAction() {
      if (this.$route.path.includes('prepareProductionInvoiceNew.htm')) {
        this.allParams = {
          ...this.filteringModalPayloadData,
          internalStatus: this.$store.state.internalStatus || false,
          orderNumber: this.allInputLookUpValues?.order || null,
          clientOrder: this.allInputLookUpValues?.client_order || null,
          stillage: '',
          planningTypeId: this.allInputLookUpValues?.planing_type || null,
          planningNumber: this.allInputLookUpValues?.planing || null,
          packingNumbers: null,
          startDate: this.allInputLookUpValues?.date_from
            ? new Date(this.allInputLookUpValues?.date_from)
                .toISOString()
                .split('.')[0]
            : new Date().toISOString().split('.')[0],
          endDate: this.allInputLookUpValues?.date_to
            ? new Date(this.allInputLookUpValues?.date_to)
                .toISOString()
                .split('.')[0]
            : new Date().toISOString().split('.')[0],
          clientCompanyId: this.allInputLookUpValues?.client_company || null,
          departmentId: this.allInputLookUpValues?.department || null,
          sewModelSizeVariantId: null,
          planOpenOrCloseId: this.allInputLookUpValues?.start_stop || null,
          prOrderId: null,
          packingTypeId: null,
          colorId: null,
          colorVariantId: null,
          designId: null,
          designVariantId: null,
          gradeId: null,
          fiberClassId: null,
          salesManagerId: null,
          equipmentId: null,
          companyId: null,
          id: null,
          allCompanies: false,
          marriage: false,
          employeeId: null,
        }
      } else {
        this.allParams = {
          ...this.filteringModalPayloadData,
          productId: this.allInputLookUpValues?.product || null,
          batchNumber: this.allInputLookUpValues?.batch || '',
          lot: this.allInputLookUpValues?.lot || '',
          packingNumbers: this.allInputLookUpValues?.packingNumber || '',
          prOrderId: this.allInputLookUpValues?.order || null,
          packingTypeId: this.allInputLookUpValues?.packingType || null,
          colorId: this.allInputLookUpValues?.color || null,
          colorVariantId: this.allInputLookUpValues?.orderVariant || null,
          designId: this.allInputLookUpValues?.design || null,
          designVariantId: this.allInputLookUpValues?.designVariant || null,
          gradeId: this.allInputLookUpValues?.grade || null,
          sewModelSizeVariantId: null,
          fiberClassId: this.allInputLookUpValues?.fiberClass || null,
          clientCompanyId: this.allInputLookUpValues?.clientCompany || null,
          equipmentId: this.allInputLookUpValues?.equipments || null,
          companyId: null,
          id: null,
          allCompanies: this.allInputLookUpValues?.all || false,
          marriage: this.allInputLookUpValues?.order || false,
          employeeId: null,
        }
      }
    },

    // Product LookUp ni tanlanganda ishlaydi
    getResponseData(prop) {
      this.allParamsAction()
      const body = this.allParams

      this.isLoading = !this.isLoading
      this.$axios
        .post(`/invoices/findInvoiceItemListUrl`, body, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'x-auth-token': localStorage.getItem('authToken'),
          },
        })
        .then((res) => {
          this.isLoading = !this.isLoading
          this.oldBodyData = res.data?.invoiceItemListJson
          this.bodyData = [...this.oldBodyData]
        })
        .catch((error) => {
          this.isLoading = !this.isLoading
          // eslint-disable-next-line no-console
          console.log(error)
        })
    },

    // Qty Max value
    qtyMaxValueAction() {
      this.qtyMaxValue = 0
      this.packQtyMaxValue = 0
      this.oldBodyData.forEach((obj) => {
        this.qtyMaxValue += obj?.realCount
        this.packQtyMaxValue += obj?.packsReal != null ? obj.packsReal : 0
      })
    },

    // top_qty va packQty uchun max value set qiladi
    setMAXvalue(name, maxValue, rowID) {
      if (name === 'qty')
        this.$set(this.bodyAllInputLookUpValues[rowID], name, maxValue)
      else this.$set(this.allInputLookUpValues, name, maxValue)
    },

    // yangi table body datasini yaratish
    createNewBodyDataAction() {
      this.tableBodyAllData = [] // bu har doim arrayni clear qilib turadi
      this.bodyData = [] // bu har doim arrayni clear qilib turadi
      const updatedBodyData = this.oldBodyData.map((obj) => ({ ...obj }))
      updatedBodyData.forEach((obj, index) => {
        const newObj = Object.assign(obj, this.bodyAllInputLookUpValues[index])
        if (obj?.qty) {
          newObj.realCount = newObj.realCount - obj.qty
          newObj.id = null
          this.tableBodyAllData.push(newObj)
        }
        this.bodyData.push(newObj)
      })
    },

    // Accept button action addition rows
    acceptAction() {
      // function
      this.createNewBodyDataAction()

      // Emit action
      this.$emit('modalDataAction', this.tableBodyAllData)

      // function
      this.closeAction()
    },
  },
}
</script>
